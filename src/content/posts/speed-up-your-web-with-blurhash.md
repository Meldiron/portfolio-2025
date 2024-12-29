---
title: "Speed-up your web with Blurhash"
pubDate: 2021-08-01 #Y-M-D
description: "Optimize website performance with visual image placeholders."
image: { url: "/posts/blurhash.png", alt: "Slide" }
---

> Alongside this article, I wrote a demo project made with Angular, TailwindCSS and Blurhash. You can check it out on [Github](https://github.com/Meldiron/blurhash-angular-demo).

## Table Of Contents

- [Introduction](#introduction)
- [What is Blurhash?](#what-is-blurhash)
- [Preparing a project](#preparing-a-project)
- [Encoding an image](#encoding-an-image)
- [Decoding an image](#decoding-an-image)

---

## Introduction <a name="introduction"></a>

Since I started working on e-shops with hundreds of products on the website, I have been looking for strategies to optimise the UX.

I started by adding **loading animations**, but seeing the same rolling animation on ten places of a website is **surely** not the solution:

![CleanShot 2021-07-28 at 10.03.18](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cdcjfwip87ge2eqrc9q8.gif)

Then I found out you can use **skeleton loaders** to fill empty spaces with nice-looking elements that represent actual data but are blank at the moment. You can see this approach on dev.to:

![CleanShot 2021-07-28 at 10.04.27](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g2yo0fmdtqoy0elwety6.gif)

This is all you need for most websites, but sadly, this wasn't enough for me. There was still a few seconds of loading time between when my data was loaded and when the images were rendered. I could already see the name and price of a product, but I didn't have pictures loaded yet. Due to this, whenever a new image got loaded, the content jumped. I tried to solve this by defining the size of an image and showing white space while the image was loading, but that made the website feel really boring.

Finally, I met **Blurhash** 🎉

## What is Blurhash? <a name="what-is-blurhash"></a>

Blurhash is a tool that takes our 500kb image and generates a 30B hash that can be used to generate a blurred version of an image. You can easily store this hash as a text into your database and load it with every other text content such as article title or author name.

This comes really handy when working with any images because you don't have to be creative about `What will I do while images are loading?`. Instead of creating empty space, you simply take Blurhash of an image and show the blurred version while the image is loading.

![New Project (13)](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/05vw1yiv1t4i6dmthwmi.png)

## Preparing a project <a name="preparing-a-project"></a>

I started by creating an empty Angular project with TailwindCSS and Blurhash library installed.

First, I defined my array of images. This simulated data that I would receive from an API so I can start working on the blurring algorithm:

```typescript
images = [
  {
    name: "Fastest car ever 💪",
    url: "https://images.unsplash.com/photo-1627392689954-0a4d150687a7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Let's eat 🍉",
    url: "https://images.unsplash.com/photo-1627308595127-d9acf19107ce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80",
  },
  {
    name: "Who doesn't love dogs 🐶",
    url: "https://images.unsplash.com/photo-1627366247844-b4b5df8854d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
  {
    name: "We love cats too 😻",
    url: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
  },
];
```

After adding some basic HTML with Angular data binding, I was able to get the images rendered:

![CleanShot 2021-07-31 at 20.43.18](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ufo4v6mq6fve18ybd4gx.png)

To confirm what Blurhash can do in numbers, I decided to write a tiny script that loads the file size of our images and presented it in the HTML:

```typescript
// Calculate original image size
for (const image of this.images) {
  const fileSize = await new Promise<number>((resolve, _reject) => {
    var http = new XMLHttpRequest();
    http.open("HEAD", image.url, true);
    http.onreadystatechange = function () {
      if (this.readyState == this.DONE) {
        if (this.status === 200) {
          const fileSize = this.getResponseHeader("content-length");
          resolve(fileSize ? +fileSize : 0);
        }
      }
    };
    http.send();
  });
  image.originalSize = fileSize;
}
```

![CleanShot 2021-07-31 at 20.45.32](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1nfwp273d7626wnsaqmm.png)

Looks good to me; let's start using Blurhash! When working with Blurhash, you split the job into two parts: **ENCODE** and **DECODE**.

## Encoding an image <a name="encoding-an-image"></a>

Before using the blur **hash**, I need to have the **hash**, right? Encode function of Blurhash library takes an array of pixels with their colour ([Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)) and returns a simple string that represents newly-created hash for our image. To provide the correct input to the function, I need to render our image inside a virtual canvas and extract data about the pixels in the canvas:

```typescript
private async generateBlurhash(imageUrl: string): Promise<{
  hash: string;
  width: number;
  height: number;
}> {
  const loadedImageObject = await new Promise<HTMLImageElement>(
    (resolve, reject) => {
      const img = new Image();
      img.setAttribute('crossOrigin', '');
      img.onload = () => resolve(img);
      img.onerror = (...args) => reject(args);
      img.src = imageUrl;
    }
  );

  const canvas = document.createElement('canvas');
  canvas.width = loadedImageObject.width;
  canvas.height = loadedImageObject.height;
  const context = canvas.getContext('2d');
  context?.drawImage(loadedImageObject, 0, 0);
  const imageData = context?.getImageData(
    0,
    0,
    loadedImageObject.width,
    loadedImageObject.height
  );

  if (!imageData) {
    throw Error('Could not render an image.');
  }

  return {
    hash: encode(imageData.data, imageData.width, imageData.height, 4, 4),
    width: loadedImageObject.width,
    height: loadedImageObject.height,
  };
}
```

Now I used this function to add `hash` attribute to our array of images:

```typescript
for (const image of this.images) {
  const blurhashData = await this.generateBlurhash(image.url);

  image.hash = blurhashData.hash;
  image.height = blurhashData.height;
  image.width = blurhashData.width;
}
```

Hmm, that wasn't too bad. Few lines of code and the hashing function is ready 💪 When preparing this project, I noticed that hashing is a pretty CPU-heavy method and takes almost 1 second to finish. It is up to you to decide whether you want to use the client's CPU or do the hashing on the server. Anyway, keep in mind, this only needs to be done when uploading an image, so you don't need to worry about extreme load on the backend.

## Decoding an image <a name="decoding-an-image"></a>

Once I had the hash of an image, I needed to do the exact opposite. I needed to convert our string input into image output.

I started with a simple `decode` function provided by Blurhash library. Alongside the image hash, I provided the expected width and height of hashed image:

```typescript
const blurhashPixels = decode(image.hash, image.width, image.height);
```

This function returns a loooooooong array in which every four items represents the RGBA (red, green, blue, alpha) value of a pixel. You can imagine this as a 2D definition of our image.

Although our 2D array od pixels is pretty useless to us, the canvas can easily convert it into an actual image if we tell it the width and height of our 2D array:

```typescript
const blurhashCanvas: HTMLCanvasElement = <HTMLCanvasElement>(
  document.getElementById(`blurhash_canvas_${imageLoopIndex}`)
);
const ctx = blurhashCanvas?.getContext("2d");
const imageData = ctx?.createImageData(image.width, image.height);
imageData.data.set(blurhashPixels);
ctx?.putImageData(imageData, 0, 0);
```

Finally, I put everything together, hook it to an HTML template and add some delays so I can see what is going on. The result is stunning; check it out!

![CleanShot 2021-07-28 at 10.29.33](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ph6dec7woaudfbesh80j.gif)

If you are lost and unsure how some parts work together, please check out my [Github project](https://github.com/Meldiron/blurhash-angular-demo) that contains the whole application I built alongside this article. Snippets in the article were taken from the project to quickly showcase the specific logic of Blurhash.

---

That's it, for now ✨ If you are interested in cool new technologies, feel free to follow me, and you will be notified whenever a new post is published.
