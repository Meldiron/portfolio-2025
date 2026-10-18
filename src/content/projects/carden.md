---
title: "Carden"
pubDate: 2026-10-11 #Y-M-D
description: "Your calm picture puzzle, for iPhone and the web. Swap cards around until the picture comes back together, alone or with friends, live."
github: "Meldiron/carden"
demo: "carden.appwrite.network"
image: { url: "/projects/carden.png", alt: "Carden" }
cover:
  {
    url: "/projects/carden-thumbnail.png",
    alt: "Carden Thumbnail",
  }
agentic: true
---

## Vision

I have always liked puzzle games, and a while ago I came across a few apps that cut the picture into cards instead of classic jigsaw pieces. You swap two cards, and when a card lands in its spot, it locks. The idea was great, but every app I found was very minimal, and none of them took it seriously. So I decided to give it proper polish.

The bigger reason was learning. I had never published a mobile game, and I wanted to go through the whole process myself: App Store review, in-app purchases, subscriptions, privacy questionnaires, and all the legal hoops in between. A free-to-play economy was also new to me, so I decided to design one from scratch.

How the game plays:

- A photo is cut into cards and shuffled across the board. Tap two cards to swap them, or drag one where it belongs.
- Cards that are neighbours in the picture snap together anywhere on the board and move as one group.
- A card in its true spot locks into place.
- Fewer moves earn more stars. Every board has a par, the minimum number of swaps needed to solve it.

The game took around a week to build, and most of the work happened while I was asleep. Agents ran overnight, using my session limits on the backlog, and in the morning I had a new build on my phone to test.

The game started as Card Jigsaw World. Before the App Store release, I renamed it to **Carden**, with the slogan "Your calm picture puzzle", and gave it a new icon: a lotus in coloured glass. Calm became the theme for everything around the game, from the copy to the store slides. Carden also got its own homepage, [carden-website.appwrite.network](https://carden-website.appwrite.network), built with TanStack Start and hosted on Appwrite Sites next to the web game. Its boards are made from the same card tiles as the game, and in the Play together section, pretend friends move cards around live while you invite or remove them.

## Technologies

- Flutter with Riverpod and go_router
- Appwrite Auth, including native Sign in with Apple
- Appwrite Databases, with Realtime for playing together
- Appwrite Storage
- Appwrite Functions
- Appwrite Messaging for push notifications
- Appwrite Sites for the web game and the homepage
- StoreKit 2 and TestFlight
- Claude Code with Opus and Fable models

I picked Flutter because I want to release on Android in the future. As a bonus, getting the web build online took a few minutes.

## Screens

Every App Store slide is built from a screenshot taken by an integration test, and a script puts the captions and phone frames around it. When the design changes, the slides are regenerated instead of redrawn by hand. With the rename, the slides got a new design: soft glass panes in the colours of the lotus, big rounded headlines, and real cards lifted out of the screen. The first five slides show the core: swapping cards, thousands of pictures, playing together, a new picture every day, and four ways to cut a picture.

![App Store slides 1 to 5](/projects/carden/1-store-slides-1.png)

The other five show Painting, where cards get their colour back as they lock, giant boards of hundreds of cards, puzzles from your own photos, quests and world-day events, and dark mode.

![App Store slides 6 to 10](/projects/carden/2-store-slides-2.png)

A picture can be cut into cards, squares, triangles or hexagons. Harder shapes pay more: squares give 15% more coins and XP than cards, triangles 35%, and hexagons 50%. Boards go from 3x3 to 7x7, as many cards across as down, and new shapes unlock as the player levels up. Triangle and hexagon boards cover the whole picture, so the edges are made of half pieces.

![Cards, squares, triangles and hexagons boards](/projects/carden/3-shapes.png)

I didn't want ads in the game, but I still wanted to give players a reason to try VIP. So I took inspiration from Spotify: the game shows short breaks between puzzles, closable after 5 seconds, and optional 15-second videos for bonus coins. Every one of these "ads" promotes the game's own store, and VIP members never see them. There is no ad network and no third-party SDK in the app. Usage analytics go only to Appwrite, and players can turn them off.

Purchases go through StoreKit 2, both one-time coin packs and the VIP subscription. Nothing is granted on the device. An Appwrite Function verifies every transaction against Apple's certificates and applies each one exactly once. The same function receives App Store Server Notifications, so subscription changes and Family Sharing stay in sync. For pricing, I looked at competitors and went cheaper on purpose: VIP costs $2.99 a month or $14.99 a year, and a dollar buys a standard pack.

![Store and VIP](/projects/carden/4-store.png)

Friends and the leaderboard are both powered by Appwrite. Players add each other by friend code and compare total XP, with public profiles readable by anyone and everything else protected by row-level security. Once a day, a player can send each friend a small gift, and a push notification through Appwrite Messaging tells the friend it is waiting.

The game works offline first and syncs across devices. A new player gets a guest account on first launch and can later sign in with email or Apple. Sign in with Apple is native: the app passes Apple's ID token to Appwrite instead of opening a browser. If a player already has progress on another device, the two saves merge automatically, and when neither save clearly wins, the player picks one.

![Quests and profile screens](/projects/carden/5-quests-and-profile.png)

## Play together

The biggest addition since the first version. Tap Play together in a board's pause menu, and the game shares a link. Up to five people play the same board at the same time, in the app or in a browser, each in their own colour.

It runs on Appwrite Realtime. Every move is a row with the cards it expects before and after, and every device applies moves in the order the server gave them. A move that no longer fits is skipped everywhere, so all boards end up the same. Drags are live too: each player has one row per game that their device updates five times a second, within Appwrite's limit of 120 updates a minute, and the others see the card glide a fraction of a second behind the finger. When two people grab the same card at once, the first grab wins and the other card slides back. Each game is an Appwrite team, and a player's seat is their membership role, so Appwrite itself decides who may touch a game.

Invite links show the real picture and board in the message preview. An Appwrite Function draws that card in plain JavaScript, with a port of the game's tiling code, and the preview is cached at the edge for ten minutes.

![Play together board and players](/projects/carden/6-play-together.png)

## Retrospective

After the first TestFlight build, my role changed. I mostly acted as a tester: I played the game, noted what I liked and what I didn't, and sent it as TestFlight feedback. At night, agents read that feedback through Apple's API, fixed it, tested it on the simulator, and prepared a new build. TestFlight turned out to be great for this. It collects crash reports and feedback in one place, and because Apple exposes both through an API, much of the bug fixing can run as a daily routine.

To keep this safe, the repository has a set of owner rules that agents must follow. One of them says that only my feedback counts as a product decision. Without it, any tester's comment could quietly turn into a feature, and I wanted to stay the one deciding where the game goes.

The picture catalogue needed the most process. The first packs had poorly chosen photos, so I spent a lot of time preparing skills and tooling for picking pictures. The rules are strict: no people, no repeats, portrait or square only, no text, at least 20 pictures per pack, and only free licences with the author and licence stored for every picture. One pack can take an hour to make, but the quality is consistently high. My part was reviewing the sources by hand and providing API keys. Ideas, licence checks and the rules themselves were written by the agents.

The Appwrite dashboard taught me a lesson too. With only a few players, I was already reaching millions of database reads, because every launch read the whole catalogue of around 8,700 rows. Now a daily function packs the catalogue into one compressed file, devices download it once a week, and on launch they only ask for rows that changed. Reads per launch dropped from 8,741 to 26, and my Appwrite bill dropped with them.

The hardest parts were:

- **Giant boards on a phone.** Boards of 100 to 300 cards felt impossible at first, with cards all over the place. Pinch to zoom, an overview map that shows where a tapped card belongs, and Gather, which brings the cards that belong in view to you, made them playable.
- **Multi-device save sync.** Devices send intentions like "earn 300 coins" instead of new totals, and Appwrite's atomic operators apply them, so two devices add up instead of overwriting each other.
- **Playing together.** Five people moving cards at the same moment, on unreliable networks, must still end up with the same board, and a card two people grab at once must go to one of them.
- **The App Store process.** StoreKit, review, and all the agreements were the main thing I came to learn, and also the slowest.

The detail I am proudest of is the haptic feedback. Pieces snapping and locking feel very good in the hand.

If I could change one thing, I would run a proper security pass earlier. When I finally pointed agents at the attack surface, they wrote a script that tests the live backend the way a curious player could, and an hourly sweep in an Appwrite Function now repairs anything that slips through, such as rows created under another player's ID. The sensitive parts, like purchases, already ran in Appwrite Functions, so the fixes stayed on the server.

## Future plans

The App Store release comes first. After that, I want to research competitors in more depth and reach feature parity with them, and then release on Android.
