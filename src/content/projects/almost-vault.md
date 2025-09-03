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

A few weeks ago I was browsing [daily.dev](https://daily.dev), and I came across an open source tool [Orange-OpenSource/hurl](https://github.com/Orange-OpenSource/hurl), a command line tool for running HTTP tests. From [hurl.dev](https://hurl.dev/), their homepage, I quickly understood it's a Curl-based HTTP testing framework, and it immediately clicked with me; perfect testing tool for Appwrite Functions.

Just a couple of days later, I discovered [Basecoat](https://basecoatui.com/), a UI library similar to [shadcn/ui](https://ui.shadcn.com/), but with the simplicity of [Bootstrap](https://getbootstrap.com/). A CSS library that provides simple one-word classes, giving components a consistent look, extensible with JS functionality for more complex components. This, in my mind, was a great addition to my toolset; it felt just like [launch.css](https://launch-css.dev/), just with more variations.

And last weekend, at [Appwrite](https://appwrite.io/), we announced a Sites hackathon, and I saw it as the perfect opportunity to try out those tools I wanted to try out anyway.

But what do I build?

I wanted the focus of the web app to be Appwrite Function, an HTTP server, so I could take full advantage of the Hurl testing tool. As I was browsing project ideas, I remembered [Shelve](https://www.shelve.cloud/), a password manager I researched for managing my AI API keys. It had a mini project inside of it, [Shelve Vault](https://vault.shelve.cloud/), a simple platform for sharing secrets with others by sharing a URL.

And so the plan was ready. Build a Shelve Vault alternative, but it's a weekend project, so it won't be as finished as theirs. _(or so I thought)_

So, Almost Shelve Vault. So... Almost Vault.

## Technologies

- [Appwrite](https://appwrite.io/)
  - Databases, for storing secrets. With the recently released TablesDB, encrypted attributes for privacy, and atomic operations for counting the amount of reads
  - Sites, for deploying the webapp to the internet
  - Functions, for running the HTTP REST API
- [Koa.js](https://koajs.com/), an HTTP framework like [Express](https://expressjs.com/), but lightweight
- [Zod](https://zod.dev/), a schema validator
- [Alpine.js](https://alpinejs.dev/), a minimal JavaScript framework for reactive UI
- [Vite](https://vite.dev/), a build tool for modern web apps
- [Axios](https://axios-http.com/), an HTTP client, which I used for proxying requests
- [Hurl](https://hurl.dev/), an HTTP testing tool
- [Basecoat](https://basecoatui.com), a simple UI library

And, like everyone nowadays, AI ([Gemini](https://gemini.google.com/) and [Claude Sonnet](https://claude.ai/)) served as my personal assistant for writing documentation, improving code quality, generating test assertions, adding CI/CD checks, and other time-consuming tasks.

## Screens

A simple homepage with basic information, and a main component for creating a secret.

A secret consists of a value, time to live, and amount of allowed reads.

Time to live supports multiple values beginning at one hour, all the way up to an entire year. While there are use cases for all, I decided to go with 24 hours as the default value, since that is safe while also being enough for most use cases, including remote collaboration.

Amount of reads is typically set to just one, meaning it can only be read once. This serves as a great indication; if the target person cannot read the secret, it might have been compromised. But higher values also make sense, for example two (so I can check if it works), or 30, so all my colleagues can use it.

![Homepage](/projects/almost-vault/homepage.png)

Because the homepage felt too plain, I added a frequently asked questions section and filled it with basic information both engineers and non-engineers might need.

![FAQ](/projects/almost-vault/faq.png)

Once a secret is created, an alert shows a summary of the configuration for a quick double-check, as well as a box that people can screenshot for future reference. A secret ID is provided to be easily copied, or even a URL that can be opened to automatically pre-fill the secret ID.

![Secret created](/projects/almost-vault/secret-created.png)

A person who gets the secret ID can visit the same website, switch the tab to "Decrypt," and paste the secret ID into the input field.

Alternatively, if a URL is shared, once the URL opens, the tab automatically switches to "Decrypt" and pre-fills the secret ID; so all a visitor needs to do is click "Decrypt."

![Decrypt with secret ID](/projects/almost-vault/decrypt-url.png)

When a secret is decrypted, the API server ensures the TTL meets requirements and at least one read is still available. An atomic operation decrements the read amount while ensuring the value is higher than zero during the operation, to prevent race conditions from allowing multiple reads.

Finally, the API returns the secret to the client to be shown. As part of the response, it also provides the configured TTL, remaining amount of reads, and a timestamp of when the secret was created. This information can be added to the UI later.

![Successful decrypt](/projects/almost-vault/decrypt-successful.png)

## Retrospective

I was pretty surprised that within a few days I managed to rebuild the entire Shelve Vault web app, without missing any major features. All props to Appwrite and Basecoat!

Speaking of Basecoat, it's an amazing UI library. It's exactly like I remember Bootstrap, and I didn't face any problems with it. Everything worked, it had the components I needed, and the documentation was great. I plan to use it again and again, on any project where shadcn is overkill.

I am also very happy I took this opportunity to try out all the recently released features of Appwrite, including TablesDB, atomic operations, and the SDK with object arguments.

Hurl was exactly what I wished it would be! So many times I wrote small APIs in different languages, and I didn't write tests, to avoid learning their testing frameworks and picking the right one. Hurl, with its own `.hurl` files, is a runtime-agnostic testing tool I can use anytime I need E2E tests.

I was pretty confident with Alpine.js for this project, but I was surprised to find out there isn't any simple setup between Alpine.js and Vite that would allow routing and layouts. I will need to keep that in mind for more complex projects - either find a solution in the future, or use more robust frameworks for those use cases.

And finally, AI (LLMs) met my expectations exactly. I only used it for "side quests," which I could quickly validate. It saved me a bunch of time with things I wouldn't otherwise do, like documentation.

## Future plans

My use of Axios was pretty redundant, and I should use the native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) instead.

After decrypting the secret, the API returns more information, such as TTL (time-to-live), remaining reads, and creation date. I should update the UI to display this information in a user-friendly way.

While the application is responsive, mobile integration can be improved by adding better share functionality with the ability to share it with contacts, in messaging apps, notes, emails, and more.

As the app grows, proper accounts (not just guests) can be implemented to see all secrets that were created and better manage them - delete, increase reads, or extend time-to-live.

If the app becomes used by organizations and agencies, teams and team sharing can be added to simplify working across teams.

And finally, to allow even more users to use Almost Vault, integrations are very important; Starting with CLI tool, REST API docs, GitHub action templates, and more.