---
title: "Almost Vault"
pubDate: 2025-09-03 #Y-M-D
description: "Quickly share passwords and secrets with anyone."
github: "Meldiron/almost-vault"
demo: "almost-vault.appwrite.network"
image: { url: "/projects/almost-vault.png", alt: "Almost Vault" }
cover: { url: "/projects/almost-vault-thumbnail.png", alt: "Thumbnail" }
---

## Vision

Few weeks ago I was browsing [daily.dev](https://daily.dev), and I came across an open source tool [Orange-OpenSource/hurl](https://github.com/Orange-OpenSource/hurl), a command line tool for running HTTP tests. From [hurl.dev](https://hurl.dev/), their homepage, I quickly understood it's Curl-based HTTP testing framework, and it immediately clicked with me; Perfect testing tool for Appwrite Functions.

Just couple days later, I discovered [Basecoat](https://basecoatui.com/), an UI library similar to [shadcn/ui](https://ui.shadcn.com/), but with simplicity of [Bootstrap](https://getbootstrap.com/). A CSS library that provides simple one-world classes, giving components a consistent look, extendible with JS functionality for more complex components. This, in my mind, was great addition to my toolset; It felt just like [launch.css](https://launch-css.dev/), just more variations.

And last weekend, at [Appwrite](https://appwrite.io/), we announced Sites hackathon, and I saw it as perfect opportunity to try out those tools I wanted to try out anyway.

But what do I build?

I wanted the focus of the web app to be Appwrite Function, an HTTP server, so I can take full advantage of Hurl testing tool. As I was browsing project ideas, I remembered [Shelve](https://www.shelve.cloud/), a password manager I researched for managing my AI API keys. It had a mini project inside of it, [Shelve Vault](https://vault.shelve.cloud/), a simple platform for sharing secrets with others by sharing an URL.

And so the plan was ready. Build Shelve Vault alternative, but it's weekend project, won't be as finished as theirs. _(or so I thought)_

So, Almost Shelve Vault. So... Almost Vault.

## Technologies

- [Appwrite](https://appwrite.io/)
  - Databases, for storing secrets. With recently released TablesDB, encrypted attributes for privacy, and atomic operations for counting amount of reads
  - Sites, for deploying webapp to internet
  - Functions, for running HTTP REST API
- [Koa.js](https://koajs.com/), a HTTP framework like [Express](https://expressjs.com/), but lightweight
- [Zod](https://zod.dev/), a simple schema validator
- [Alpine.js](https://alpinejs.dev/), a minimal JavaScript framework for reactive UI
- [Vite](https://vite.dev/), a build tool for modern web apps
- [Axios](https://axios-http.com/), a HTTP client, which I used for proxying requests
- [Hurl](https://hurl.dev/), a HTTP testing tool
- [Basecoat](https://basecoatui.com), a simple UI library

And, as everyone nowadays, AI ([Gemini](https://gemini.google.com/) and [Claude Sonet](https://claude.ai/)) as my personal little assistant for writing documentation, improving code quality, generating test assertions, adding CI/CD checks, and other time-consuming tasks.

## Screens

A simple homepage with basic information, and main component for creating a secret.

A secret consists of a value, time to live, and amount of allowed reads.

Time to live supports multiple values beginning at one hour, all the way up to an entire year. While there are usecases for all, I decided to go with 24 hours as default value, since that is safe while also enough for most of the use cases, including remote collaboration.

Amount of reads is typically set to just one, meaning, it can only be read once. This serves as great indication; If target person cannot read the secret, it might have been compromised. But higher values also make sense, for example two (so I can check if it works), or 30, so all my colleagues can use it.

![Homepage](/projects/almost-vault/homepage.png)

Because homepage felt too plain, I added frequently asked questions section and filled it with basic information both engineers and non-engineers might need.

![FAQ](/projects/almost-vault/faq.png)

Once secret is created, an alert shows a summary of configuration for quick double-check, as well as a box that people can screenshot for future reference. A secret ID is provided to be easily copied, or even a URL that can be opened to automatically pre-fill the secret ID.

![Secret created](/projects/almost-vault/secret-created.png)

A person who gets the secret ID can visit the same website, switch the tab to "Decrypt", and paste the secret ID into the input field.

Alternatively, if URL is shared, once URL opens, the tab automatically switches to "Decrypt" and pre-fills the secret ID; So all a visitor needs to do is click "Decrypt".

![Decrypt with secret ID](/projects/almost-vault/decrypt-url.png)

When secret is decrypted, API server ensures TTL meets requirements, and at least one read is still available. Atomic operation decrements read amount while ensuring value is higher than zero during the operation, to prevent race conditions from allowing multiple reads.

Finally, API returns secret to client to be shown. As part of response it also provides configured TTL, remaining amount of reads, and a timestamp of when the secret was created. Those information can be added to UI later.

![Successful decrypt](/projects/almost-vault/decrypt-successful.png)

## Retrospective

I was pretty surprised that within a few days I managed to rebuild entire Shelve Vault web app, without missing any major features. All props to Appwrite and Basecoat!

Talking about Basecoat, amazing UI library. It's exactly like I remember Bootstrap, and I didnt face any problem with it. Everything worked, it had components I needed, and documentation was great. I plan to use it again and again, on any project where shadcn is an overkill.

I am also very happy I took this opportunity to try out all recently released features of Appwrite, including TablesDB, atomic operations, and SDK with object arguments.

Hurl was exactly what I wished it would be! So many times I wrote small APIs in different languages, and I didn't write test, to avoid learning its testing frameworks, and picking the right one. Hurl, with it's own `.hurl` files is a runtime-agnostic testing tool I can use anytime I need E2E tests.

I was pretty confident with Alpine.js for this project, but I was surprised to find out there isn't any simple setup between Alpine.js and Vite that would allow routing and layouts. I will need to keep that in mind for more complex projects - either find out a solution in future, or use more robust frameworks for those use cases.

And finally, AI (LLMs) met my expectations exactly on the spot. I only used it for "side quests", which I could quickly validate. It saved me bunch of time with things I wouldn't otherwise do, like documentation.

## Future plans

My use of Axios was pretty redundant, and I should use native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) instead.

After decrypting the secret, API returns more information, such as TTL (time-to-live), remaining reads, and creation date. I should update UI to display these information in a user-friendly way.

While the application is responsive, mobile integration can be improved by adding a better share functionality with ability to share it with contact, in messaging apps, notes, emails, and more.

As the app grows, proper accounts (not just guests) can be implemented to see all secrets that were created, and better manage them - delete, increase reads, or time-to-live.

If the apps become used by organizations and agencies, teams and team sharing can be added to simplify working across teams.