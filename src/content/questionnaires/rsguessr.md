---
project: "rsguessr"
title: "RSGuessr"
answeredAt: 2026-10-14
---

These are the questions an agent asked me before writing this case study, and my answers exactly as I typed them, typos included. I answered them in a form, and the agent turned them into the article.

## What the agent found

Before asking anything, the agent read the code, the commit history and the live app. This is the summary it showed me.

You see an in-game RS3 screenshot and click where in Gielinor the camera stood, on a Leaflet map in raw RuneScape tile coordinates. Guesses are pass/fail: within 15 tiles is correct, within 5 is hardmode. Unlimited retries, no answer reveal, progress per location — more completionist checklist than timed GeoGuessr. Content shipped as 19 locations in two packs: Near a Lodestone (8) and City of Um (11, on its own instanced map). Play by magic-link email or as a guest; free, no ads.

SvelteKit SPA with a dark Preline look, Appwrite for auth (magic URL, anonymous guests, user labels for locked packs), database, storage and functions. Answers live in a separate collection players can’t read; a guessLocation function checks guesses server-side.

Timeline: one-day proof of concept on 2023-10-30, weekend build Dec 1–3 2023, game logic and both packs Jan 1–6 2024 (the radius was tuned 20 → 10 → 15 → 25 → 15), a map fix in Jan 2025, then one huge June 2026 rewrite (+8.4k lines): user-made packs with an in-app creator, 776 RS Wiki maps, blurhash placeholders, a corner mini-map. That rewrite's backend reached Appwrite but the Vercel deploy failed.

When the agent looked, the game was offline: the domain had lapsed and the original map tile host was gone. I found no public posts or reception.

## Fact check

Claims the agent wasn't sure about, and my verdict.

- **Locations were authored by hand: screenshot in-game, click the spot on the web map, read lat/lng from the browser console, then create documents in the Appwrite console.**  
  _Correct._
- **Locked packs (via Appwrite user labels) plus the "shop / payments" TODO were an idea for unlocking paid or special packs.**  
  _Correct._
- **The June 2026 rewrite was never live: the Vercel deploy failed, and the domain lapsed sometime after.**  
  _Correct._
- **osrsguessr.com is someone else's Old School version, which you linked as the "Old School alternative".**  
  _Correct._
- **The magic-link email template was adapted from Raycast's email (it still says alt="Raycast").**  
  _Correct._

## Status & framing

### How should the case study present RSGuessr today?

**I'll relaunch it (e.g. on Appwrite Sites) — write it as live**

Go ahead and re-lunch it under project ID rs3-guessr. you might just need to add site and configure properly. Make sure to QA manually with headless browser, ensure all behaviour works fine. Feel free to use 10 minute mails for account.

## Origin

### What's your history with RuneScape, and what sparked "GeoGuessr for Gielinor" in Oct 2023?

I played the game since childhood with my brother, and we still come back to the game from time to time.

### The repo was scaffolded in July 2023 — earlier attempt? And how did osrsguessr.com fit in?

I saw geoguessr, and loved to see it in oldschool.. but I never played that, so I wanted to make app for those Runescape players that only play modern version.

## Content & gameplay

### How did you capture locations and their coordinates? How long did one take?

_4–7 MB PNGs, many at night / Hallowe'en lighting — deliberate? Any camera or screenshot plugin?_

With naked eye, I tried my best. There was no tooling around this back in the days, so a bit of math was all I got.

### Why only 19 locations, and why City of Um as the second pack?

Because all packs were hand-picked, and I didnt want to spend time on content. I was planning to invite influeners to make their own packs.

### Who playtested the radius changes (20 → 10 → 15 → 25 → 15), and why pass/fail instead of distance points?

Pass/fail to not expose exact location too easily. But good point, I would do it with distance points nowadays, if I reworked it.

Playtesting was done by me and my friends.

### Locked packs + a shop TODO — was monetization a real plan? How did you think about Jagex's IP / fan-content rules?

Moenztization was real plan, but it didnt get far. Project was never finished properly, it as back before AI allowed to accelerate development.

### Why keep answers in a separate collection with server-side checks? Did anyone try to cheat?

Noone tried to cheat, but I knew cheating was possible. So separate collection prepared for diseaster - by thinking about data as feature-led schema, not just bucket of similar information.

## The 2026 revival

### What triggered the June 2026 rewrite, and was AI involved?

I wanted to redeploy site again, after losing domain, under a preview domian like Vercel or Appwrite sites.

AI was involved.

### Did the failed deploy and the lapsed domain happen on purpose or just slip?

I didnt renew domain, and deployments likely started failing due to bad maintenance. After revival, everything worked, but I never got to deploying it live again.

## Results & retrospective

### Did you post it anywhere? How many people played? Any memorable feedback?

I wasnt doing good at all on marketing side, it was mostly aimed as a project for portfolio, showcaing what I can build in a weekend.

### What was hardest?

**Map tiles breaking upstream**

### What did you learn?

Working with map APIs and grids. martin was using this as opportunity to learn how payments are implemented.

### What would you do differently?

_Self-hosted tiles, distance scoring, daily challenges, leaderboards, an OSRS version…_

I wouldnt use same card component on multiple screens.

### Anything that would make you pick it up again?

Community effort to revive it, probably.

### Anything else I got wrong or should know?

All good

## Screenshot notes

Notes I left on individual screenshots for the captions.

- `repo-logo-favicon.png`: favicon
- `23-mobile-round-map-pin.png`: focuses on mobile support
