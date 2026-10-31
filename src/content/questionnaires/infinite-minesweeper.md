---
project: "infinite-minesweeper"
title: "Infinite Minesweeper"
answeredAt: 2026-10-31
---

These are the questions an agent asked me before writing this case study, and my answers exactly as I typed them, typos included. I answered them in a form, and the agent turned them into the article.

## What the agent found

Before asking anything, the agent read the code, the commit history and the live app. This is the summary it showed me.

Minesweeper on a grid with no edges. Mines come from a hash of the cell coordinates and a per-game seed (15% of cells), so any part of the board is generated on demand and stays the same between visits. The first click clears a 5×5 area, chording works, and the board is split into 8×8 sectors that turn green once every safe cell is open and every mine is flagged or hit. Hitting a mine costs one of five lives, and a life comes back every 3 minutes, also while you are away.

Zoom goes from 10% to 200%. At 50% and below the canvas switches to a sector map, and clicking a sector flies you back in. At 10% you can export a PNG of the 100×100 sectors around the start, with your nickname, tiles cleared, sectors done and percent explored. Progress auto-saves one second after the last move, and a dialog asks which save to keep if another device saved in between. There is a leaderboard by tiles opened, nickname onboarding, guest play with a generated nickname and a "claim account" bar, and phone controls: tap to reveal, long-press to flag, a switch to swap the two, pinch to zoom, and a short vibration on long-press.

TanStack Start (React 19, server functions) from the Imagine template, Tailwind CSS 4 and shadcn/ui, one canvas for the board, Appwrite Auth (email and password, anonymous sessions) and Appwrite Databases. Hosted on Appwrite Sites at minesweeper.almostapps.eu.

146 commits, every one authored by Imagine, between Dec 21 and Dec 26, 2025. Day one (Dec 21, 15:28 to 21:46, 66 commits) produced almost everything: the infinite grid, safe first click, chording, sectors and the sector map, lives, the first PNG export, accounts with auto-save, mobile long-press, onboarding and the leaderboard. On Dec 24 the grid moved from HTML divs to canvas, the minimum zoom settled at 10% (after 1% and 5%), macOS trackpad zoom and click-to-zoom on sectors arrived, multi-device save conflicts got a dialog, and the export shrank from 1000×1000 to 100×100 sectors. Dec 25 went mostly to redesigning the export image: a "Duolingo-style" stats panel, then minimal cards, then a circular progress ring. Dec 26 added guest play, the landing page sections with your own screenshots, and an Open Graph image endpoint that was added and removed again within 18 minutes.

The live site is up, but its leaderboard reports 0 players. The leaderboard server function returns an empty list on any error, so I cannot tell from outside whether the data is gone or the requests fail. I did not create accounts on production to find out.

## Fact check

Claims the agent wasn't sure about, and my verdict.

- **Every change went through Imagine prompts, and you did not edit the code by hand. All 146 commits are authored by Imagine.**  
  _Correct._ App was made during internal Imagine QA, to make sure Imagine can build real, good, useful and valuable web apps. This was one of many, but this one I really liked hwo it turned out, right after first prompt. So I finished it properly
- **Most of the game was built in one session of about six hours on Dec 21, 2025. Dec 24 to 26 were polish.**  
  _Correct._ In one sitting I made the version I was happy with. I shared it with friend for feedback and used improved on the fly (gamification).
- **The grid moved from HTML divs to canvas on Dec 24 because the div version got slow with many cells or at low zoom.**  
  _Correct._ Exactly.. This was noticed on phone, when zoomed out. Plus I wanted to allow zooming out even further.. SO it had to be re-implemented. Agent's focus was performance indeed, including a benchmark. It took multiple rounds to get to final fast implementation (last few improvements were just matter of few percentage points). I also implementned ability for PNG export, because entire board looekd terrible wzen zoomed out (I kept zoom-out limit, just made it bigger than before)
- **The landing page screenshots (8,221 tiles, 1.1% explored, nickname Meldiron) are from your own game.**  
  _Correct._ I played it actively for couple of weeks, trying to see who among friends can get highest percentage of clear (PNG export)
- **The Open Graph image was removed because the generated image did not work once deployed.**  
  _Not sure._ Cant remember exact decision behind removing OG image, but generally-speaking, following are rules I follow: 1. Always include OG images for SEO and sharing benefits 2.Make sure to work on SEO only once product is done and on production - so agent konws design system the best, plus OG image needs absolute URL anyway 3. Always prefer static sites, with static OG images, if possible. Static sites has no cold-start. Alternatively prefer SSG, for pre-buitt static. Only if both those give bad product quality, use SSR.
- **The landing page line "Join thousands of players" was written by the AI and was never true.**  
  _Correct._ Yep.
- **The live leaderboard shows 0 players because the production data was cleared after QA.**  
  _Correct._ Yep, exactly.

## Status & framing

### How should the case study frame Infinite Minesweeper?

**A game I wanted to exist, and Imagine was the tool**

I saw similar games but they were phone-only, and I wanted web version. Plus they were lacking gamification features which I knew I could add. My version is still not perfect, but its amazing starting point that I, or anyone, can build on top of. This is not the case with other close-sourced variants.

### The live leaderboard shows 0 players. How should the article treat the live site?

**It works, present it as live**

Present it as live, just no active playerbase. For screenshots, mock the leaderboard values.

## Origin

### Why minesweeper, and why make it infinite?

_Had you played other infinite minesweeper games? What did you want that they did not have?_

Inspired by mobile app that was low quality.

### What were you testing in Imagine at the time?

_Which part was in QA: the TanStack Start template, Appwrite Auth and Databases, mobile, deployment? Was this one of several QA projects?_

Entire platform, it was either right before, or right after release. It was first Appwrite's experient of a sub-brand, sub-product under same company.

### How did you work with Imagine?

_Did you write every prompt yourself, or let it suggest features? Did you read the code? Roughly one prompt per commit?_

I was involved in Imagine development here-and-there. Most involvement was QA and bug reporting, small bug fixing too.

## Game design

### Lives instead of game over: whose idea was it, and why 3 minutes?

Nessessary design to make board infinite. Exact duration was based on play testing

### Where did sectors, the territory map and the PNG export come from?

_The export image was redesigned five times on Dec 25. What were you after?_

Sectors - a "reminder" to take a break. Plus nice visual green effect on zoomed our board when entire sector is finished
PNG export - to have "end goal" to play towards, instead of actually infinite, which became boring quickly

### Where did you play it most?

**Both about equally**

Friends mostly desktop, at school. Me mostly phone, before bed.

## Building with Imagine

### What was hardest to get right?

**Performance (divs to canvas)**, **Mobile touch: panning, long-press, pinch**

### What did Imagine do better than you expected?

It was one of my first experiences with agentic programming, it was a wow moment for me to go away for 15 minutes and come back to a really good result.

### What did you report back to the Imagine team from this project?

_Bugs, missing features, things that felt good to use_

We were in active discussions; Many bugs, some even sovled myself.

## Results & retrospective

### Did you share it? How many people played, and what is your own record?

In ever did marketing for it properly, so just me and friends.

### What did you learn?

Agents are here to stay. they take away the work. Engineers became managers of agents and product owners making important decisions.

### What would you do differently?

Nowadays I know about importance of taste skill, and overall importance of proper context. Back then it was a learning experience, so same outcome needed multiple iterations.

### What is next, if anything?

_Fix the leaderboard, daily challenges, one shared world for everyone, more modes…_

No plans, but maybe more gamification features in future.

### Anything else I got wrong or should know?

All good
