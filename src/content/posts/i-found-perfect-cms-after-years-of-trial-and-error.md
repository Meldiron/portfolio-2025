---
title: "I Found Perfect CMS after Years of Trial and Error"
pubDate: 2025-04-02 #Y-M-D
description: "The best CMS for developer, freelancer, and small agency"
image: { url: "/posts/cms.png", alt: "CMS list" }
highlight: false
---

TODO: Ask AI to write conclusion, review, improve
TODO: Write each section for each point (any links to existing CMS as examples of "bad")
TODO: Write why Pages CMS (screenshot)
TODO: Finalize OG image
TODO: Add to my portfolio first, link to original article (Canonical URL)
TODO: Restore or rewrite section about using it

As freelancer, I always looked for ways to create admin panels for my clients. It gives them control, and makes me money. It was impossible to find something simple, free, and privacy-friendly. After a fair share of experience with dozens of systems, I finally found one that aligns with my expectations. 

## Finding the Perfect CMS

Every CMS is useful. All of them exist because they got target audience that is willing to pay, because it provides them value.

After years of searching, I created set of rules that define the _"Perfect CMS"_ for solo-developer, freelancer, and small agency.

1. **Own my data**. Don't store my content, and don't become dependency for my projects.
2. **Extendable**. Allow me to add custom components. Ideally open-sourced too, for ease of learning.
3. **Framework agnostic**. Don't tell me to use Next.js. Integrate with any framework, and without a framework
4. **Free**. Don't limit amount of projects, clients, or features. Don't relay on paid users keep the product alive
5. **Self-hostable**. Don't require Cloud for authentication. Don't vendor lock-in access to CMS.

Alongside those, CMS should also preferably be simple to use, quick to implement, and nice-looking. Those all make it easier to convince clients to be interested in a CMS.

### Choose Wisely, Choose Git-based CMS

> **Own my data**. Don't store my content, and don't become dependency for my project

### Component library is Not Enough

> **Extendable**. Allow me to add custom components. Ideally open-sourced too, for ease of learning.

### CMS Doesn't Live in My Application

> **Framework agnostic**. Don't tell me to use Next.js. Integrate with any framework, and without a framework

### Save Money to Make Money

> **Free**. Don't limit amount of projects, clients, or features. Don't relay on paid users keep the product alive

### Authentication, a Bait for Headless CMS

> **Self-hostable**. Don't require Cloud for authentication. Don't vendor lock-in access to CMS.

## Why Pages CMS is the Best CMS

## Let's Integrate with Pages CMS

Lets use Astrolink. GitHub link, astro theme catalog link, demo link

![Onelink](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jf0chuh7ud2bl9hat3t2.png)

Mention file, explain all config is there, say pages cms will be working with that

![User.json file](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gl526m25zw06djw8k340.png)

steps:
1. fork
2. deploy to Cloud (link to Vercel and Netlify)
3. Connect to custom domain

OAuth sign in on Pages cms, and authroize app to see repository

> mention it can be selfhosted and use own app for privacy and security

mention button to create config file

link to docs, configuration and examples

mention code snippet

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

mention I save, side menu item appers

Mention I can see all contents and easily edit

![Pages CMS UI](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qq2si0n95cxwveiznj3z.png)

Mention after saving, it starts vercel deployment, and wihtin seconds its live.

Mention I wnated full experience, I invited friend.
He got invitation over e-mail, and signed in passwordless (no need for github, client doesnt have that)
He selected project and he saw exactly what I, allowing to edit anything.

Because clients often delelte thins by mistake, cool feature history. I see what, when, and can easily rolblack.

![Pages CMS history](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m15umo1vfmre6wi5ebbz.png)

Link to my version of the page. if they want to try pages cms out, make profile picture configurable with custom URL. if they want challange, use it's media feature to have simple drag&drop

## Conclusion
