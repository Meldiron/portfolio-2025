---
title: "Infinite Minesweeper"
pubDate: 2025-12-26 #Y-M-D
description: "Minesweeper on a grid with no edges. Clear 8×8 sectors, survive on five regenerating lives, and export your territory as a picture."
github: "Meldiron/infinite-minesweeper"
demo: "minesweeper.almostapps.eu"
image: { url: "/projects/infinite-minesweeper.svg", alt: "Infinite Minesweeper" }
cover:
  {
    url: "/projects/infinite-minesweeper-thumbnail.png",
    alt: "Infinite Minesweeper Thumbnail",
  }
agentic: true
---

## Vision

I once played an infinite minesweeper app on my phone, and the idea stuck with me more than the app did. It was low quality, and every similar game I found was phone-only. None of them had the gamification I knew I could add, so I wanted a proper web version.

The chance came during internal QA of [Imagine](https://imagine.dev/), the artificial intelligence web builder from [Appwrite](https://appwrite.io/). It was the first experiment of Appwrite with a sub-brand, a separate product under the same company, and it was right around the public release. The goal of the QA was to make sure Imagine can build real, useful web apps, so I built many of them. This one turned out so well after the first prompt that I decided to finish it properly.

How the game plays:

- Mines are placed by a hash of the cell coordinates and a seed, so the board can be generated anywhere, forever, and stays the same when you come back.
- The first click is always safe and opens a 5×5 area.
- The board is split into 8×8 sectors. A sector turns green once every safe cell is open and every mine is flagged or hit.
- Hitting a mine costs one of five lives. A life comes back every 3 minutes, even while the game is closed.
- Zoom goes from 10% to 200%. Zoomed out, the board becomes a map of sectors.

One sitting of about six hours on 21 December 2025 gave me a version I was happy with. I shared it with a friend for feedback and kept improving it on the fly over the following days, mostly with gamification. Every change went through a prompt to Imagine, and the repository holds 146 commits written by it.

## Technologies

- [TanStack Start](https://tanstack.com/start) with [React](https://react.dev/) 19 and server functions
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- An HTML canvas for the board
- [Appwrite](https://appwrite.io/) Auth, with email and password accounts and anonymous sessions for guests
- Appwrite Databases
- Appwrite Sites
- [Imagine](https://imagine.dev/)

I did not write the code myself. Imagine started from its TanStack Start template, connected to an Appwrite project, and did the rest from my prompts.

## Screens

The production data was cleared after QA, so the screenshots below come from a local copy with a generated board and made-up players.

The landing page offers three ways in: create an account, sign in, or play as a guest.

![Landing page](/projects/infinite-minesweeper/1-landing-hero.png)

Four cards sum up what makes it different from classic minesweeper.

![Why you will love it](/projects/infinite-minesweeper/2-landing-features.png)

The challenge section shows a real export from my own game, with 1.1% of the map explored. For a couple of weeks, my friends and I competed over exactly this number.

![Can you achieve 100%](/projects/infinite-minesweeper/3-landing-challenge.png)

Signing up only takes an email and a password, and a guest button sits under every form.

![Sign up](/projects/infinite-minesweeper/4-sign-up.png)

New accounts pick a nickname for the leaderboard, checked for availability while you type.

![Choosing a nickname](/projects/infinite-minesweeper/5-onboarding-nickname.png)

This is the board at 70% zoom. Finished sectors are green, and the grey ones on the right are still in progress. Lives and opened tiles sit in the top left, while zoom and the other controls sit in the top right. Sectors were meant as a reminder to take a break, since finishing one is a natural place to stop.

![Gameplay](/projects/infinite-minesweeper/6-gameplay.png)

Finishing a sector, zooming out to the sector map, and clicking a sector to fly back in.

![Finishing a sector](/projects/infinite-minesweeper/7-finish-a-sector.webm)

Lives were a necessity, not a feature. On a board that never ends, one wrong click cannot be allowed to reset everything. The 3-minute regeneration came from playtesting.

![Lives regenerating](/projects/infinite-minesweeper/8-lives-regenerating.png)

With no lives left, the board locks until the next one comes back. The progress is saved first, so closing the tab costs nothing.

![Out of lives](/projects/infinite-minesweeper/9-out-of-lives.png)

At 50% zoom or less, every sector becomes a single block: dark for untouched, grey for in progress, green for finished. Clicking a block flies you back in.

![Sector map](/projects/infinite-minesweeper/10-sector-map.png)

At 10% zoom, a button exports the 100×100 sectors around the start as a PNG, with your nickname, tiles cleared, and the percentage explored. A truly infinite game became boring quickly, and the export gave us an end goal to play towards. The image went through five redesigns in one day before it looked like something worth sharing.

![Exported map](/projects/infinite-minesweeper/11-map-export.png)

The leaderboard ranks players by opened tiles, with your own rank pinned above the list.

![Leaderboard](/projects/infinite-minesweeper/12-leaderboard.png)

Guests get a generated nickname and can play right away. A bar at the top offers to add an email and password later, without losing any progress.

![Claiming a guest account](/projects/infinite-minesweeper/13-guest-claim-account.png)

Progress saves one second after the last move. If another device saved in the meantime, the game asks which save to keep.

![Save conflict](/projects/infinite-minesweeper/14-save-conflict.png)

On phones, a tap reveals and a long-press flags, with a short vibration. The switch at the bottom swaps the two. My friends mostly played on desktop at school, and I mostly played on my phone before bed.

![Mobile](/projects/infinite-minesweeper/15-mobile.png)

## Retrospective

This was one of my first experiences with agentic programming. Going away for 15 minutes and coming back to a really good result was a wow moment for me. Next to building projects like this one, my involvement with [Imagine](https://imagine.dev/) was mostly QA and bug reporting, with a few small bug fixes of my own. We were in active discussions the whole time, and this game alone produced many bug reports, some of which I solved myself.

The hardest part was performance. The first version drew every cell as an HTML element, and on my phone, zoomed out, it slowed to a crawl. I also wanted to zoom out further, so the board had to be reimplemented on a canvas. Imagine focused on performance, even writing a benchmark, and it took multiple rounds to reach the final version. The last few rounds only won a few percent. Even then, the whole board looked terrible when zoomed far out, so I kept a minimum zoom, made it larger than before, and let the PNG export show the big picture instead.

Touch controls were the other hard part. Panning opened tiles when the finger lifted, pinching placed flags, and the long-press needed a few rounds of tuning before it felt right.

On the last day, Imagine added an [Open Graph](https://ogp.me/) image and removed it again 18 minutes later. I do not remember the exact reason, but these are the rules I follow today:

- **Always include Open Graph images**, for search engine optimization and for sharing.
- **Work on search engine optimization last**, once the product is done and in production. By then the agent knows the design system best, and the image needs an absolute URL anyway.
- **Prefer static sites with static Open Graph images**, because they have no cold start. Static site generation is the next best option, and server-side rendering is the last resort, only when both give a worse product.

The landing page still says "Join thousands of players". Imagine wrote that line, and it was never true. I never did any marketing, so the players were me and my friends.

If I built it again, I would put more weight on taste and on proper context. I know now how much a taste skill and good context change the result. Back then it was a learning experience, and the same outcome often needed several iterations.

The biggest lesson was not about minesweeper. Agents are here to stay, and they take away the work. Engineers become managers of agents and product owners who make the important decisions.

## Future plans

The game is live at [minesweeper.almostapps.eu](https://minesweeper.almostapps.eu), just without an active player base. I have no plans for it right now, but I might add more gamification in the future. It is still not perfect, but the source is open, so it is a good starting point that I, or anyone else, can build on. That was never possible with the closed-source versions that inspired it.
