---
title: "HTTP Games"
pubDate: 2025-11-15 #Y-M-D
description: "Play games by sending REST API requests."
github: "Meldiron/http-games"
demo: "http-games.almostapps.eu"
image: { url: "/projects/http-games.png", alt: "HTTP Games" }
cover:
  { url: "/projects/http-games-thumbnail.png", alt: "HTTP Games Thumbnail" }
---

## Vision

Over the last couple of years, I have been interested in game development on-and-off. So far, the biggest challenge I faced was creating the sprites, animation, music, sound effects... I built a few games with [PICO-8](https://www.lexaloffle.com/pico-8.php) due to its limiting nature when it comes to those challenges, but games I built still didn't feel as professional as I would like.

It got me thinking. So, what parts of game making am I good at? Are there any genres that utilize only this aspect? I decided to try and build a programming game - game that you play by programming. Like [Screeps](https://screeps.com/)!

![Screeps](/projects/http-games/screeps.png)

But that still has visuals... So, `Screeps alternative` without visuals?

After some searching I found even better inspiration, [Artifacts MMO](https://www.artifactsmmo.com/). Similarly to Screeps, it's played by programming a script, but this time it utilizes HTTP REST API directly.

![Artifacts MMO](/projects/http-games/artifactsmmo.png)

Yet, I still wasn't 100% sure... Visualizing seems to be important for playing it, it got a huge wiki and many MMO RPG aspects that would take months to get right. So, `Artifacts MMO alternative`?

As silly as this approach sounds, finding an alternative and looking for its alternatives always led me to discover new ones. Until my sight landed on [SpaceTraders](https://spacetraders.io/)!

![SpaceTraders](/projects/http-games/spacetraders.png)

A game for programmers played entirely through HTTP requests. No visuals, no animations, no sounds. And so I found the genre I want to build, because it only utilized the skill I was most trained in, REST HTTP servers.

---

After trying SpaceTraders for some time, I quickly understood the most important part of such HTTP game\* is documentation.

> - `HTTP Game`. At this point, I already knew what the project will be called.

I searched for go-to framework for building documentations, and there seems to be quite a few options. Most commonly mentioned were [Vuepress](https://vuepress.vuejs.org/) and its Vite alternative [VitePress](https://vitepress.vuejs.org/). From those two, I personally preferred Vitepress due to its more modern-looking design, and being framework agnostic.

There was also [Docusaurus](https://docusaurus.io/), [MkDocs](https://www.mkdocs.org/), [Docsify](https://docsify.js.org/), and many more, but they all lacked modern UI and UX I was hoping for.

By pure chance and luck, I came across [Fumadocs](https://fumadocs.dev/) which had exactly what I needed:

- Modern-looking UI similar to [shadcn/ui](https://ui.shadcn.com/)
- Mobile responsiveness with neat components
- Both light and dark mode
- Searching functionality
- `llms.txt` file generation

It was built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/), so technologies familiar to me, and similar to other docs frameworks, all content was written with Markdown. Specifically, [MDX](https://mdxjs.com/), a combination of Markdown for content and JSX for components.

## Technologies

- [Appwrite](https://appwrite.io/)
  - Databases (TablesDB) for storing relational data and key-value cache
  - Sites for deploying the webapp to the internet
  - Functions for deploying the HTTP REST API
- [PHP](https://www.php.net/) with [Pint](https://laravel.com/docs/12.x/pint), [PHPStan](https://phpstan.org/) and [FrankenPHP](https://github.com/frankenphp/frankenphp)
- [Utopia.php](https://github.com/utopia-php) to build the HTTP server
- [Fumadocs](https://fumadocs.dev/) for modern-looking documentation
- [Hurl](https://hurl.dev/) for E2E tests of REST API
- AI. Bunch of AI. Like.. 80% AI

Most of my AI chatting and vibe-coding was made with [Zed AI](https://zed.ai/) and [Raycast AI](https://raycast.com/).

## Screens

Well, no visual, right? So not much to show...

Documentation page got a typical setup with left side to navigate pages, middle side for content, and right side for sections on current page. One neat feature Fumadocs offered was sidebar dropdown, allowing me to have separate docs sidebars for each game.

![Docs](/projects/http-games/docs.png)

The docs are also nicely responsive on mobile device. I really liked detail of having circular progressbar as I am scrolling through sections of the documentation.

![Docs mobile](/projects/http-games/docs-mobile.png)

And as far as searching goes, indexes were created during the build, and so even without SSR, searching worked flawlessly. I also never required any Cloud services, which amazes me. Until now, I was always scared of searching capabilities and relied on [Elastic Search](https://www.elastic.co/search) or [Algolia](https://www.algolia.com/).

![Docs search](/projects/http-games/docs-search.png)

Since there isn't any UI to showcase, I highly recommend checking it out yourself! I tried the game myself using [Yaak](https://yaak.app/) HTTP client, and later automated it with [Bun](https://bun.sh/) script.

![Dungeon](/projects/http-games/dungeon.png)

![Tiles](/projects/http-games/tiles.png)

## Future plans

While developing the app, I left `TODOs` throughout the codebase. I wanted the prototype and first game to be finished very quickly, so I could give it to a few friends for feedback. And so I cut corners here and there, such as unoptimal looping, missing E2E tests, or ugly patches for loading environment variables. I wouldn't consider it a priority to resolve those, but I am very glad I noted them so I can get back to them easily.

One game is not enough! I will brainstorm more ideas of games that can be added, and motivate community to contribute.

Once the community grows enough, the addition of profiles, challenges, leaderboards and achievements is a must.
