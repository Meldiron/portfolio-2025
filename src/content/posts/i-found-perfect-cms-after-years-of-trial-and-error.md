---
title: "I Found Perfect CMS after Years of Trial and Error"
pubDate: 2025-04-02 #Y-M-D
description: "The best CMS for developers, freelancers, and small agencies"
image: { url: "/posts/cms.png", alt: "CMS list" }
highlight: false
---

TODO: Ask AI to fix grammer
TODO: Add as Draft to dev.to, and share with PagesCMS for review
TODO: Add screenshots to "Why pages CMS"
TODO: Publish on my portfolio, add Canonical URL to Dev.To

As freelancer, I always looked for ways to create admin panels for my clients. It gives them control, and makes me money. It was impossible to find something simple, free, and privacy-friendly. After a fair share of experience with dozens of systems, I finally found one that aligns with my expectations. 

## Finding the Perfect CMS

Every CMS is useful. All of them exist because they got target audience that is willing to pay, since it provides them value.

After years of searching, I created set of rules that define the _"Perfect CMS"_ for static sites.

1. **Own my data**. Don't store my content, and don't become dependency for my projects.
2. **Extendable**. Allow me to add custom components. Ideally open-sourced too, for ease of learning.
3. **Framework agnostic**. Don't tell me to use Angular. Integrate with any framework, and without a framework
4. **Free**. Don't limit amount of projects, clients, or features. Don't relay on paid users keep the product alive
5. **Self-hostable**. Don't require Cloud for authentication. Don't vendor lock-in access to CMS.

On top of those points, CMS must be simple to use, quick to implement, and nice-looking. Those all make it easier to convince clients they need a CMS.

### Choose Wisely, Choose Git-based CMS

> **Own my data**. Don't store my content, and don't become dependency for my project

The biggest difference between Git-based CMS and API-based CMS is complexity. Complexity can be beneficial to large blog platforms or e-commerce platforms, but that is not typical project of freelancers. Much more common is landing page, personal website, or community platform.

Simple websites don't benefit from API-based CMS, and get all the downsides. One must use a SDK, or send raw HTTP requests to fetch the data. One must have fallback behaviour if CMS ever goes into downtime. And most importantly, one must implement caching to make their application quick again.

Git-based CMS solves all the pain points above. All data is stored in a file defined by you, weather it's JSON, YAML, TOML, or Markdown. Data is always accessible during build step, so importing it directly gives you access with code auto-completition, and no delays when rendering website. Data is stored directly as part of your source code, and doesnt create any direct link with CMS that is used to edit them.

A significant downside of using Git-based CMS is speed at which changes are reflected. Since a re-build is required after each change, it can take a couple of seconds (or up to a few minutes, depending on which framework you use) to apply changes on production. This can be a bit frustrating, but from my experience, typical freelancer's client doesn't care. If one would honestly need changes instantly reflected on website, they are large enough to benefit from API-based CMS anyway.

Thankfully, there are many Git-based CMS such as [Decap CMS](https://decapcms.org/), [TinaCMS](https://tina.io/), or [Crafter CMS](https://craftercms.com/).

### Component library is Not Enough

> **Extendable**. Allow me to add custom components. Ideally open-sourced too, for ease of learning.

Basic components are enough for first iteration of your CMS. As client's business grows, so do their demands. Giving data color based on importance, or adding map picker to visually represent location, may sooner or later become highly important for CMS users to be efficient.

When that happens, your CMS should provide you with docs how to extend it, instead of asking you to submit a feature request. Relaying on maintainers is the worst outcome when it comes to custom components in CMS.

Many providers such as [Directus](https://directus.io/), [Appsmith](https://www.appsmith.com/), or [Buibase](https://budibase.com/) all have ways to fully customize viewing and editing experience of each field.

### CMS Doesn't Live in My Application

> **Framework agnostic**. Don't tell me to use Angular. Integrate with any framework, and without a framework

You likely experienced this before. You find amazing UI library, you decide to use it in your next project, and moments later you realize it only supports Next.js. You find amazing PDF library to generate great-looking invoices, only to realise it's for PHP. You find ...

Next.js and PHP are great. But it's my decision if they are great for project I work on. If CMS provided support only for specific framework, either you can't use it for every project, or you throw yourself into framework you may not be familiar with, or may not be the right choice for the job. CMS is there to assist you, not throw logs under your feet.

Standard examples I show are [Payload](https://payloadcms.com/), a CMS powered by Next.js, or [Sveltia CMS](https://github.com/sveltia/sveltia-cms), a Decap CMS alternative using Svelte.

### Save Money to Make Money

> **Free**. Don't limit amount of projects, clients, or features. Don't relay on paid users keep the product alive

TODO

### Authentication, a Bait for Headless CMS

> **Self-hostable**. Don't require Cloud for authentication. Don't vendor lock-in access to CMS.

TODO

## Why Pages CMS is the Best CMS

TODO

## Let's Integrate with Pages CMS

As with any CMS I come across, I try to hook it into simple application. This time around I decided to use [Astrolink](https://github.com/alamguardin/Astrolink), a minimal alternative to [Linktree](https://linktr.ee/). You can check it out on a [demo page](https://astrolink.vercel.app/), or see it's details in [Astro theme catalog](https://astro.build/themes/details/astrolink-template-to-share-about-yourself/).

![Astrolink](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a85jl7ml4h7ckefxpi9d.png)

## Prepare the Website

Initial observation shows Astrolink already sources all of the page data from a single file [src/data/user.json](https://github.com/alamguardin/Astrolink/blob/main/src/data/user.json), which is perfect. This means, Pages CMS will only need access to this file and nothing else.

> If you want to use Pages CMS with your project, and you have your data inside components or JavaScript/TypeScript files, I highly recommend moving data to JSON files first. Many frameworks have ability to import JSON files directly into components. Those that don't can store JSON files in public assets folder, and be loaded with a `fetch()` request.

![User.json file](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gl526m25zw06djw8k340.png)

Getting Astrolink live was matter of a few very simple steps: 

1. Fork GitHub repository
2. Deploy website to Cloud ([Vercel](https://vercel.app/), [Netlify](https://www.netlify.com/), or others)
3. Connect custom domain using DNS

Once deployed, it was time to configure Pages CMS.

## Connect with Pages CMS

To get started with [Pages CMS](https://pagescms.org/), I visited their [Cloud platform](https://app.pagescms.org/), and signed in with GitHub. Through this process I authorized with Page CMS OAuth application, and gave their GitHub application access to my repositories, including read and write access.

> Pages CMS can be self-hosted **very easily**, and they got step-by-step guide how to do that. I highly recommend self-hosting Pages CMS and authorizing your own GitHub application for security and privacy reasons.

Once my GitHub was connected, I saw my newly forked Astrolink repository in the list of Pages CMS projects.

The project was not ready to be used yet, because Pages CMS needs `.pages.yml` configuration file that will hold all the Pages CMS configuration. Franky, I didn't need to know that, or to set it up manually. Nice-looking error page explained it all, and provided button to create an empty configuration file to continue.

Afterwards, I spent couple of minutes reading [Pages CMS documentation](https://pagescms.org/docs/, more specifically [Configuration](https://pagescms.org/docs/configuration/) and [Examples](https://pagescms.org/docs/examples/) pages.

While fields in YAML file were not any standard knowledge developers usually have, it was very easy to understand. I am nowhere near knowing exact schema by heart, but I already feel confident setting up configuration file for any kind of data thanks to it's highlighting, and schema validation directly in Pages CMS.

Below you can find configuration file I used for the Astrolink project:

```yaml
content:
  - name: user
    label: User
    path: src/data/user.json
    type: file
    fields:
      - name: name
        type: string
      - name: profession
        type: string
  - name: links
    label: Links
    path: src/data/user.json
    type: file
    fields:
      - name: links
        type: object
        list: true
        fields:
         - name: title
           type: string
         - name: description
           type: string
         - name: icon
           description: Icon names can be found at www.remixicon.com
           type: string
         - name: url
           type: string
           pattern: ^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$
```

As I saved the configuration file, new options appeared in the left side menu. Inside, I found my schema applied in a simple interface of inputs and buttons. What's even more interesting, all data was already present, indicating the connection to data stored in `src/data.user.json` was successful.

![Pages CMS UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rbikndmz267nv75bccqn.png)

I updated a few texts, and saved the changes. A commit was created automatically, pushed, and a Vercel deployment started. After couple of seconds, I refreshed my website and changes I made were live.

## Collaboration with Client

Since the main purpose of CMS is to provide client with simple interface to update content on their static site, I decided to try full experience with Pages CMS.

In collaboration settings, I added a friend of mine to join the project through email invitation. They recieved the invitation in their inbox, and followed steps provided. An amazing feature presented itself when I noticed sign-in page supports passwordless email login alonside GitHub OAuth. I can't stress enough how important this is since clients almost never have GitHub accounts.

After a passwordless login using Magic URL, my friend already saw Astrolink project in their list, and cound start editing directly with zero setup needed.

Finally, yet another feature amazed me. When my friend started making changes, I saw it all on the right side of Pages CMS, which served as a history of changes. If client **ever** does change that breaks the website, as a developer I can easily see what the change was, when, and within a few clicks I can rollback the changes to make the website stable again. Moments like this makes business relations more stable and lucrative.

![Pages CMS history](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m15umo1vfmre6wi5ebbz.png)

Both website and CMS are now live! Within less than hour of finding out about Pages CMS, I was able to deploy my first site with CMS integrated. You can visit my [Astrolink website](https://matejbaco.vercel.app/), and I invite you to make yours to try out Pages CMS. Additionally, I recommend to make picture URL on the website configurable, to experience how changes are made to Pages CMS. For those looking for challenge, Pages CMS supports media, so you could switch from picture URL to proper drag&drop box.

## Pages CMS in Production

As mentioned above, Pages CMS require read & write access to your repository, which can be scary for multiple reasons:

- Security: Pages CMS has full access to your repository, possibly deleting entire project.
- Privacy: Pages CMS has permission to see source code of your application.
- Billing: Pages CMS Cloud can become paid for more than X collaborators at any moment.

While self-hosting doesn't fully address this, it makes it much better. Bugs in code can still cause problems, but the risk is much more manageable.

Setting up self-hosted Pages CMS wasn't hard for me because I have a lot of experience with GitHub application from working at Appwrite on automated deployments. With that said, their docs are **amazing** and provide follow-along instructions to set everything up. Entire setup was made with developer in mind, as it recommends [Resend](https://resend.com/) and [Turso](https://turso.tech/), both Cloud applications that provide free tiers.

What caught me by surprise was how easy it is to add custom components. From my past experience building CMS for clients, I know simple component changes can make a big difference. _For example, simply coloring date red or green depending on package shipping status can fix a lot of delayed deliveries._ Not only was the process of adding custom components documented, it also linked to over dozen of existing components providing a starting point.

> If you are interested to gain confidence with custom components, I recommend to build component that stores latitude and longitude of location on a map, and provide interface using [Google Maps](https://developers.google.com/maps), [OpenStreetMap](https://www.openstreetmap.org/), or others.

If you use Pages CMS in production, and successfully self-hosted the application, it's the best time to consider [sponsoring Pages CMS](https://github.com/sponsors/hunvreus). Engineers behind this amazing open-source project are active, and providing them with financial support allows them to develop new features, which can benefit you in the long run.

## Conclusion

TODO