---
title: "I Found Perfect CMS after Years of Trial and Error"
pubDate: 2025-04-02 #Y-M-D
description: "The best CMS for developers, freelancers, and small agencies"
image: { url: "/posts/cms.png", alt: "CMS list" }
highlight: false
---

As a freelancer, I always looked for ways to create admin panels for my clients. It gives them control, and makes me money. It was impossible to find something simple, free, and privacy-friendly. After a fair share of experience with dozens of systems, I finally found one that aligns with my expectations.

## Finding the Perfect CMS

Every CMS is useful. All of them exist because they have a target audience that is willing to pay, since it provides them value.

After years of searching, I created a set of rules that define the _"Perfect CMS"_ for static sites.

1. **Own my data**. Don't store my content, and don't become a dependency for my projects.
2. **Extendable**. Allow me to add custom components. Ideally open-sourced too, for ease of learning.
3. **Framework agnostic**. Don't tell me to use Angular. Integrate with any framework, and without a framework.
4. **Free**. Don't limit the amount of projects, clients, or features. Don't rely on paid users to keep the product alive.
5. **Self-hostable**. Don't require Cloud for authentication. Don't vendor lock-in access to CMS.

On top of those points, CMS must be simple to use, quick to implement, and nice-looking. Those all make it easier to convince clients they need a CMS.

### Choose Wisely, Choose Git-based CMS

> **Own my data**. Don't store my content, and don't become a dependency for my project.

The biggest difference between Git-based CMS and API-based CMS is complexity. Complexity can be beneficial to large blog platforms or e-commerce platforms, but that is not a typical project of freelancers. Much more common is a landing page, personal website, or community platform.

Simple websites don't benefit from API-based CMS, and get all the downsides. One must use an SDK, or send raw HTTP requests to fetch the data. One must implement caching to make their application quick again. And most importantly, one must have fallback behavior if CMS ever goes into downtime.

Git-based CMS solves all the pain points above. All data is stored in a file defined by you, whether it's JSON, YAML, TOML, or Markdown. Data is always accessible during the build step, so importing it directly gives you access with code auto-completion, and no delays when rendering the website. Data is stored directly as part of your source code, and doesn't create any direct link with the CMS that is used to edit them.

A significant downside of using Git-based CMS is the speed at which changes are reflected. Since a re-build is required after each change, it can take a couple of seconds (or up to a few minutes, depending on which framework you use) to apply changes on production. This can be a bit frustrating, but a typical freelancer's client doesn't mind. If one would honestly need changes instantly reflected on a website, they are at size when they benefit from API-based CMS anyway.

Thankfully, there are many Git-based CMS such as [Decap CMS](https://decapcms.org/), [TinaCMS](https://tina.io/), or [Crafter CMS](https://craftercms.com/).

### Component Library is Not Enough

> **Extendable**. Allow me to add custom components. Ideally open-sourced too, for ease of learning.

Basic components are enough for the first iteration of your CMS. As client's business grows, so do their demands. Coloring data based on importance, or adding map picker to visually represent location, may sooner or later become highly important for CMS users efficiency.

When that happens, your CMS should provide you with docs on how to extend it, instead of asking you to submit a feature request. Relying on maintainers is the worst outcome when it comes to custom components in CMS.

Many providers such as [Directus](https://directus.io/), [Appsmith](https://www.appsmith.com/), or [Budibase](https://budibase.com/) all have ways to fully customize the viewing and editing experience of each field.

### CMS Doesn't Live in My Application

> **Framework agnostic**. Don't tell me to use Angular. Integrate with any framework, and without a framework.

You likely experienced this before. You find an amazing UI library, you decide to use it in your next project, and moments later you realize it only supports Next.js. You find an amazing PDF library to generate great-looking invoices, only to realize it's for PHP. You find ...

Next.js and PHP are great. But it's my decision if they are great for the project I work on. If CMS provided support only for a specific framework, either you can't use it for every project you build, or you throw yourself into a framework you may not be familiar with, or even worse, it may not be the right choice for the job. CMS is there to assist you, not to throw logs under your feet.

[Payload](https://payloadcms.com/), a CMS powered by Next.js, or [Sveltia CMS](https://github.com/sveltia/sveltia-cms), a Decap CMS alternative using Svelte, are examples of CMS that I recommend to avoid until they become framework agnostic.

### Save Money to Make Money

> **Free**. Don't limit the amount of projects, clients, or features. Don't rely on paid users to keep the product alive.

Limits and free tiers are foundation stones of every commercial platform. It may remain open sourced, or a version 2.0 may be released with cloud-only support. It could remain free for unlimited projects, or it could change the limit to 3 projects over the weekend. It's also a matter of trust whether a Cloud doesn't change pricing from $5 per month to $15.

When picking a preferred CMS for simple sites, it should not limit the amount of projects, collaborators, fields, or rows. Allowing pricing to affect you eventually creates expenses, which lower your income from long-term clients.

[Sanity](https://www.sanity.io/), [Contentful](https://www.contentful.com/), and [Hygraph](https://hygraph.com/) are a few examples. Very often a CMS has a pricing page, but is also open-source, and has docs on how to self-host it for free. A great example of that is [Directus](https://directus.io/), and there is no need to avoid those CMS.

### Authentication, a Bait for Headless CMS

> **Self-hostable**. Don't require Cloud for authentication. Don't vendor lock-in access to CMS.

Git-based CMS often provide Cloud authentication to simplify process of setting it up. This is perfect for development, and initial integration to ensure everything works well together. As soon as application goes to production, it's a great risk to keep using the Cloud offering.

Primary problem is the fact you are authorizing someone's else GitHub application, not yours. This means maintainers of the Cloud offering of the CMS can see contents of your repository, do changes, and possibly even more. This creates potential for security risks, makes app less likely to comply with strict privacy regulations, and can create helpless situation during authentication gateway downtimes. Such Cloud authentication can also sunset at any moment.

## Honorable Mention: Outstatic

Until now, my favourite CMS was [Outstatic](https://outstatic.com/), a CMS for Next.js applications. It's fully open source project that can be self-hosted, and focuses on keeping your data inside your git repository. It's simple-looking interface is amazing for any small CMS, and AI integration for text generation can be a great plus for some projects.

Downside of Outstatic is limited collaboration features, since it doesn't come with database, so only authentication method is GitHub OAuth. This can be limiting, as explaining to clients what GitHub is and why they need the account can be hard. Additionally, it's SDKs tightly couple you to use Next.js.

## Why Pages CMS is the Best CMS

Considering all of the above, the best CMS is [Pages CMS](https://pagescms.org/), a modern Git-based CMS with a focus on static sites. With a single configuration file, in matter of minutes, it allows you to manage your content and its media files through an intuitive UI. Pages CMS support all collaboration features you or your client might need including MagicURL login, history of changes, and more. It comes with a responsive design to let your client do changes from their phone.

Pages CMS keeps all your contents inside your repository, and only requires a single configuration file to be set up. What's even more, it's framework agnostic and can be used with Astro, Next.js, SvelteKit, or any other framework. Because of the nature of Pages CMS, it doesn't integrate with a framework, and only looks at files containing your data such as JSON, YAML, Markdown, or TOML.

It supports 9 file formats and 13 built-in field types. While this is more than enough, Pages CMS can be forked, self-hosted, and extended with custom components. Doing this requires basic understanding of React, but detailed documentation and existing field types serve as great starting points.

The entirety of Pages CMS is free and open sourced, including its Cloud platform. Cloud offering has no limits on the amount of collaborators, projects, or content. Developers of Pages CMS even announced `Free forever` as part of their [1.0 release notes](https://github.com/pages-cms/pages-cms/discussions/128).

## Let's Integrate with Pages CMS

As with any CMS I come across, I try to use it with an application. This time I decided to use [Astrolink](https://github.com/alamguardin/Astrolink), a minimal alternative to [Linktree](https://linktr.ee/). You can check it out on a [demo page](https://astrolink.vercel.app/), or see it's details in [Astro theme catalog](https://astro.build/themes/details/astrolink-template-to-share-about-yourself/).

![Astrolink](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a85jl7ml4h7ckefxpi9d.png)

## Prepare the Website

Initial observation shows Astrolink already sources all of the page data from a single file [src/data/user.json](https://github.com/alamguardin/Astrolink/blob/main/src/data/user.json). This means, Pages CMS will only need access to this file, and I don't need to make any adjustments to source code.

> If you want to use Pages CMS with your project, and you have your data inside components or JavaScript/TypeScript files, I highly recommend moving data to JSON files first. Many frameworks have ability to import JSON files directly into components. Those that don't can store JSON files in public assets folder, and be loaded with a `fetch()` request.

![User.json file](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gl526m25zw06djw8k340.png)

Getting Astrolink live was matter of a few very simple steps:

1. Fork GitHub repository
2. Deploy website to Cloud ([Vercel](https://vercel.app/), [Netlify](https://www.netlify.com/), or others)
3. Connect custom domain using DNS

Once deployed, it was time to configure Pages CMS.

## Connect with Pages CMS

To get started with [Pages CMS](https://pagescms.org/), I visited their [Cloud platform](https://app.pagescms.org/), and signed in with GitHub. Through this process I authorized with Pages CMS OAuth application, and gave their GitHub application access to my repositories, including read and write access.

> Pages CMS can be self-hosted **very easily**, and they have a step-by-step guide on how to do that. I highly recommend self-hosting Pages CMS and authorizing your own GitHub application for security and privacy reasons.

Once my GitHub was connected, I saw my newly forked Astrolink repository in the list of Pages CMS projects.

The project was not ready to be used yet, because Pages CMS needs a `.pages.yml` configuration file that will hold all the Pages CMS configuration. Frankly, I didn't need to know that. A nice-looking error page explained it all, and provided a button to create an empty configuration file to continue.

Afterwards, I spent a couple of minutes reading [Pages CMS documentation](https://pagescms.org/docs/), more specifically [Configuration](https://pagescms.org/docs/configuration/) and [Examples](https://pagescms.org/docs/examples/) pages.

While fields in YAML file were not any standard knowledge developers usually have, it was very easy to understand. I am nowhere near knowing the exact schema by heart, but I already feel confident setting up a configuration file for any kind of data thanks to its highlighting, and schema validation directly in Pages CMS.

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

As I saved the configuration file, new options appeared in the left side menu. Inside, I found my schema applied in a simple interface of inputs and buttons. What's even more interesting, all data was already loaded, indicating the connection to data stored in `src/data/user.json` was successful.

![Pages CMS UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rbikndmz267nv75bccqn.png)

I updated a few texts, and saved the changes. A commit was created automatically, pushed, and a Vercel deployment started. After couple of seconds, I refreshed my website and changes I made were live.

## Collaboration with Client

Since the main purpose of CMS is to provide the client with a simple interface to update content on their static site, I decided to try the full experience with Pages CMS.

In collaboration settings, I added a friend of mine to the project through email invitation. They received the invitation in their inbox, and followed steps provided. An amazing feature presented itself when I noticed the sign-in page supports passwordless email login alongside GitHub OAuth. I can't stress enough how important this is since clients almost never have GitHub accounts.

After a passwordless login using Magic URL, my friend already saw the Astrolink project in their list, and started editing content. No setup was needed from his side.

Finally, yet another feature amazed me. When my friend started making changes, I saw it all on the right side of Pages CMS, which served as a history of changes. If a client **ever** does a change that breaks the website, as a developer I can easily see what the change was, when, and within a few clicks I can rollback the changes to make the website stable again. Moments like this make business relations more stable and lucrative.

![Pages CMS history](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m15umo1vfmre6wi5ebbz.png)

Both website and CMS are now live! Within less than hour of finding out about Pages CMS, I was able to deploy my first site with CMS integrated. You can visit my [Astrolink website](https://matejbaco.vercel.app/), and I invite you to make yours to try out Pages CMS. Additionally, I recommend you to make picture URL on the website configurable, to gain further experience with Pages CMS. For those looking for challenge, Pages CMS supports media, so you can switch from picture URL to proper drag&drop file input.

## Pages CMS in Production

As mentioned above, Pages CMS requires read and write access to your repository, which can be scary for multiple reasons:

- Security: Pages CMS Cloud has full access to your repository, possibly deleting the entire project.
- Privacy: Pages CMS Cloud has permission to see the source code of your application.
- Billing: Pages CMS Cloud can become paid. They promised it won't, but it can.

While self-hosting doesn't fully address security, it surely makes it more secure. Bugs in code can still cause problems, but the risk is much more manageable.

Setting up self-hosted Pages CMS looks like complex task since it has many moving parts, but their docs are **amazing** and provide follow-along instructions to set everything up. The entire setup was made with developers in mind, as it recommends [Resend](https://resend.com/) and [Turso](https://turso.tech/), both Cloud applications that provide free tiers.

What caught me by surprise was how easy it is to add custom components. From my past experience building CMS for clients, I know simple component changes can make a big difference. _For example, simply coloring a date red or green depending on package shipping status can avoid delayed deliveries._ Not only was the process of adding custom components documented, it also linked to over a dozen existing components providing a starting point.

> If you are interested to gain confidence with custom components, I recommend to build component that stores latitude and longitude of location on a map, and provide interface using [Google Maps](https://developers.google.com/maps), [OpenStreetMap](https://www.openstreetmap.org/), or similar map provider.

If you use Pages CMS in production, and successfully self-hosted the application, it's the best time to consider [sponsoring Pages CMS](https://github.com/sponsors/hunvreus). Engineers behind this amazing open-source project are active, and providing them with financial support allows them to develop new features, which can benefit you in the long run.

## Conclusion

I am finally at peace. No more searching for a better CMS. Pages CMS is my go-to, if I ever need one for sites I build. It provides a nice-looking and simple interface that's quick and easy to setup. It's free, open-source, self-hostable, framework-agnostic, and doesn't lack collaboration features. What more should I ask for.

If you don't share my passion for Pages CMS, take inspiration from my criteria for the perfect CMS. Many of them make sense in every situation, and help you find a solution that is long-term, and sustainable. If it wasn't clear already, every static site deserves a CMS.
