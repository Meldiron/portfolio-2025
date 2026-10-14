---
title: "RSGuessr"
pubDate: 2024-01-06 #Y-M-D
description: "GeoGuessr, but RuneScape 3. Look at a screenshot and guess where in Gielinor it was taken."
github: "Meldiron/rsguessr"
demo: "rsguessr.appwrite.network"
image: { url: "/projects/rsguessr.png", alt: "RSGuessr" }
cover:
  {
    url: "/projects/rsguessr-thumbnail.png",
    alt: "RSGuessr Thumbnail",
  }
agentic: true
---

## Vision

I have played RuneScape since childhood with my brother, and we still come back to it from time to time. When I saw GeoGuessr, I loved the idea, and someone had already made a version for Old School RuneScape. I never played Old School, though, so I wanted the same game for players of the modern version, RuneScape 3.

RSGuessr shows you an in-game screenshot, and you click where in Gielinor it was taken on a map of the RuneScape world. A guess within 15 game tiles counts as correct, and a guess within 5 tiles also completes hardmode. Retries are unlimited and the answer is never revealed, so every location stays a challenge until you find it. Locations are grouped into packs, which turns the game into a checklist you can complete, much like the achievements RuneScape players already chase.

It's free, with no ads or trackers. You can sign in with a link sent to your email, or play as a guest.

It started as a one-day proof of concept in October 2023. I built the app over a weekend in December and finished the game logic in the first week of January 2024. It was mostly a portfolio project, to show what I can build in a weekend.

## Technologies

- SvelteKit and Tailwind CSS with Preline UI
- Leaflet with RuneScape Wiki map tiles
- Appwrite Auth with magic links and guest sessions
- Appwrite Databases
- Appwrite Storage
- Appwrite Functions
- Appwrite Sites

## Screens

The landing page is short and to the point: a headline, two ways to start, and a screenshot from the game.

![Landing page](/projects/rsguessr/1-home-hero.jpg)

Below it, three reasons to play. RuneScape's overworld can feel overwhelming, burnout is real, and a new challenge for your completionist book is a good excuse to explore again.

![Why play](/projects/rsguessr/2-home-value-props.jpg)

A small gallery of locations sets the mood before you start.

![Explore the world](/projects/rsguessr/3-home-gallery.jpg)

The frequently asked questions cover the basics: the game is free, it keeps your data on Appwrite Cloud, and you can suggest new locations.

![Frequently asked questions](/projects/rsguessr/4-home-faq.jpg)

Signing in only takes an email address. Appwrite sends a magic link, so there are no passwords to remember, and anyone can skip it and play as a guest.

![Sign in](/projects/rsguessr/5-login.jpg)

Packs are split into recommended packs, which I curate, and community packs made by players. Each card shows two progress rings, one for completed locations and one for hardmode.

![Packs](/projects/rsguessr/6-packs.jpg)

A pack shows all of its locations with their status, so you can see at a glance which ones are left.

![Near a Lodestone pack](/projects/rsguessr/7-pack-near-a-lodestone.jpg)

During a round, the screenshot fills the frame so no clues are cropped away. A hint is one click away, and the map waits in the corner.

![Round](/projects/rsguessr/8-round.jpg)

Hovering the map makes it bigger, and you can pin it or blow it up to the full size of the screenshot. Click to drop a pin, then submit the guess.

![Pin placed on the map](/projects/rsguessr/9-pin-placed.jpg)

The result tells you if you were right. There is no distance or score, only correct, or correct and spot on for hardmode.

![Correct guess](/projects/rsguessr/10-result-correct.jpg)

On phones, a corner map is too small to aim with a finger, so the map sits under the screenshot instead.

![Mobile](/projects/rsguessr/11-mobile.png)

Any signed-in player can make their own pack. You upload a screenshot, pick one of 776 maps from the RuneScape Wiki, including instanced areas like the City of Um, click the correct spot, and write a hint. Packs can be shared with a link, and once I recommend a pack, it's locked from further edits.

![Pack creator](/projects/rsguessr/12-pack-creator.jpg)

## Retrospective

All locations were hand-picked, and I placed them with the naked eye. There was no tooling for this back then, so a bit of math was all I had: I stood at a spot in the game, took a screenshot, clicked the same spot on the web map, and saved the coordinates. That's why only 19 locations shipped, across two packs. I didn't want to spend my time on content. My plan was to invite RuneScape content creators to make their own packs, which is exactly what the pack creator now allows.

Guesses are pass or fail on purpose, so the game doesn't reveal the exact location too easily. My friends and I playtested the distance, and it went from 20 tiles to 10, then 15, 25, and back to 15 within six days. If I reworked the game today, I would use distance-based points instead.

Nobody tried to cheat, but I knew it was possible, so I prepared for it. The correct coordinates live in a separate collection that players can't read, and a server-side function checks every guess and only answers correct or not. It taught me to design data around features, not just as a bucket of similar information.

Monetisation was a real plan. Packs could be locked behind Appwrite user labels, with a shop on the to-do list. It didn't get far: the project was never properly finished, and this was before AI could speed up development.

The hardest part was the map tiles, because they kept breaking upstream. First, the tile mirror I used renamed its folders. Later, the mirror disappeared completely. I moved to the official RuneScape Wiki map server, and when I relaunched the game, the exact render I had pinned had been removed too. Working with map APIs and grids was the main thing I learned from this project.

The game went offline after I didn't renew the domain, and deployments stopped working without maintenance. In June 2026 I revived the code with the help of AI, adding the pack creator, the new round layout, and blurred image placeholders, but I never deployed it. For this case study, I relaunched RSGuessr on Appwrite Sites with an agent: the build became a static site, the map points at the current wiki render, and the phone layout got the map under the screenshot.

I was never good at the marketing side, and RSGuessr stayed a small project. If I started again, I wouldn't reuse the same card component across several screens.

## Future plans

RSGuessr is live again at [rsguessr.appwrite.network](https://rsguessr.appwrite.network). The next step is probably a community effort to bring it back to life, with players making packs of their own.
