---
project: "carden"
title: "Carden"
answeredAt: 2026-10-14
---

These are the questions an agent asked me before writing this case study, and my answers exactly as I typed them, typos included. I answered them in a form, and the agent turned them into the article.

## What the agent found

Before asking anything, the agent read the code, the commit history and the live app. This is the summary it showed me.

A cozy picture puzzle game for iPhone (public TestFlight, not on the App Store yet) with a web build. Each photo is cut into cards, squares, triangles or hexagons and shuffled; neighbouring pieces snap into groups anywhere on the board, and a piece in its true spot locks. Fewer moves, more stars. Newest additions: Painting mode (colour returns as pieces lock) and giant 100–300-card boards dealt in zones, with Locate and Gather tools.

Around it sits a full free-to-play shell — daily picture and gift streak, daily packs back to Jan 2023 (prepared to Dec 2027), 97 world-day events, quests, levels, coins/tickets, a Lucky Wheel, piggy bank, league, friend codes, My Puzzles and a VIP subscription ($2.99 / $14.99) — but no ad network, analytics or tracking. The only ads are house ads for its own store. Purchases are verified server-side against Apple's root CA.

Flutter (Riverpod, go_router) with an iOS 26 glass look, on Appwrite Cloud: auth incl. native Sign in with Apple, TablesDB with row security, 4 buckets (8k self-hosted pictures), 4 functions, Sites for web. Notable: a daily gzipped catalogue snapshot + delta sync cut reads per launch from 8,741 to 26; saves sync as operations via Appwrite atomic operators so two devices add up instead of overwriting. A Python content pipeline pulls free-licence pictures from museums, Wikimedia, NASA and more, with provenance per picture.

248 commits in ~71 hours (Oct 11–14). The first commit was already v1.5.0 with 96k lines. 61% of commits are co-authored by Claude; the repo has CLAUDE.md "owner rules", project skills, Opus subagents in git worktrees, parallel content workers checkpointing every 30 minutes, and a TestFlight feedback loop through the App Store Connect API. The live league has 6 players.

## Fact check

Claims the agent wasn't sure about, and my verdict.

- **The game was built somewhere else before the public repo — the first commit (2026-10-11) is already v1.5.0 with 96k lines.**  
  _Wrong._ Nope, we just started versioning weirdly.
- **It's iPhone-first, currently in public TestFlight, with the App Store submission still pending (privacy questionnaire, paid apps agreement).**  
  _Correct._ Its a learning project for me, to learn to jump thorugh all the legal an review hoops, learning to publish apps to mobile platforms
- **The mechanic was chosen after a written genre study of jigsaw-solitaire and tile-swap games and their player reviews.**  
  _Correct._ I was inspired by puzzle games, and saw few apps with this concept (cards instead of puzzles), but none took it too seruiusly, so I thoutght why not. why not give it  a shot.
- **Testers are you (iPhone 13 Pro) and a small circle of people you know.**  
  _Correct._ Dont mention names, dont spend too much on testing aspect. But mentio ntestflight is great for both crash reporting, and collecting feedback. thorugh apple's API, agents can be pointed to it and a lot of bug fixing can be automated on daily rutines.
- **The catalogue was rebuilt by parallel Claude content workers reviewing contact sheets, from 14 to 302 verified packs on Oct 12–13.**  
  _Correct._ Yes, this is great point t mention, Heavy skill and tooling preparation ahs been done after I noticed badquality of pictures picked for packs. Going forward, agents can pick pictures for packs, but they have very strict process to find a photo that fits all critedia. this ensures high quality of packs.
- **The web build on Appwrite Sites is older than the latest TestFlight build (no Painting mode / giant boards in play).**  
  _Wrong._ dont mention it, not important. Simply mention we used FLutter so we can build it for web too, and android in future.
- **"AlmostApps" (support@almostapps.eu) is your indie app label.**  
  _Correct._ no need to mention support email. Instead, mention a cool, thing, which is ID token oauth2 sign-in, allowing native sign-in with apple devices.

## Origin & vision

### Where was the game built before the public repo, and for how long?

_The first commit is already v1.5.0 with 96k lines._

I built this for around week. Mostly by agent running overnight, spending my session limits when I was asleep.

### Why this genre and the swap-to-lock + snap-anywhere mechanic? Who is it for?

_A game you or someone close to you played (Jigsolitaire, Cardscapes…)?_

I found this gameplay in anotehr game which was very minimal, so I decided to give it proper polish.

### What's the goal of the project?

**Learn and experiment (Flutter, App Store, F2P economy, agents)**

## Building it with agents

### What did those ~71 hours look like for you?

_61% Claude co-authored, subagents in worktrees, content workers every 30 minutes, an account-switching usage relay. How much did you write or read yourself vs. direct and test on the phone?_

After initial testflight release, mostly just acting as a "tester". Seing what I like, what I dont, and sending it to testlight as feedback. Agent then spin-up at night to address it and prepare new build.

### Which CLAUDE.md "owner rules" came from a real incident? What happened?

_No emojis, no gradients, silent QA, no fixed query limits, builds only when asked…_

No incident, but a security measure so other's people feedback isnt automatically taken as product decision. This ensures only I decide future of product, not random feedback.

### How did the TestFlight feedback loop work in practice? What feedback surprised you?

_e.g. the rewarded-ad exploit in round 3, "feels impossible" on giant boards._

No surprises so far, very smooth. Worst I can imagine is a small change I dont line, but then, it's still going to beta testing first, so I can easily fix before releasing ot.

### Why rebuild the whole picture catalogue with strict rules, and how much did you review by hand?

_No people, portrait only, no text, free licences only, no space pictures, AI art labelled as AI._

I only reviewed sources by hand, and provided API keys as needed. Ideas, licences, exact rules, was all done by agent. The rules are very strict and single pack can take 1 hour to make. But outcome is very high quality.

## Design & tech decisions

### How did you design the economy and prices without ad networks or analytics?

_$2.99 / $14.99 VIP, "a dollar buys a pack", the simulation in docs/economy.md._

Mostly looking at competition, but making it cheaper as to be more inviting to userbase.

### What prompted the catalogue snapshot (8,741 → 26 reads) and op-based save sync? Any Appwrite limitations you'd want fixed?

Appwrite dahsboard showed I was reaching millions of reads with only few users. This strategy lowered my Appwrite bill.

### Flutter with an iOS 26 glass look — would you pick Flutter again, or SwiftUI?

Flutter is great as I want to build it for Android in future. Plus web build was matter of mintues to get online.

### Why ship a web version too? Does anyone play it?

Students often play on phone at home, on couch, but have laptop at school on lessons. It helps them remain somewhat focused while getting dopamine from playing.

### What was hardest?

**Giant boards on a phone**, **Multi-device save sync**, **App Store / StoreKit / review process**

### The detail you're proudest of?

Haptic feedback feels very good

## Results & future

### How many testers are there, and how has it been received?

Not relevant.

### Any numbers you're happy to share?

_TestFlight installs, puzzles solved, session length, the cost/hours of AI usage to build it…_

Not relevant.

### When is the App Store launch, and what's left?

Not relevant.

### What would you do differently? Anything over-engineered for a game that isn't live yet?

Security is open door, I am yet to run proper agentic attack surface area scanning and addressing it, but I feel confident Appwrite serverless functions can handle any of those problems.

### What's next?

_Android, Mac / Vision Pro, more Painting and Giant content, multiplayer…_

Competition research and feature parity wit hthem.

### Anything else I got wrong or should know?

All good

## Screenshot notes

Notes I left on individual screenshots for the captions.

- `50-ios-house-ad-rewarded-offer.png`: mention I didnt want to include ads, but wanted reason to update to VIP. SO I added mid-game breaks (5 seonds) and reward ads (15 seconds), using ads for app itself, similar to Spotify's approach.
- `49-ios-store-bundles.png`: Mention store purchases implementation using Appwrite Functions, both subscriptions, and in app purchases (one-time)
- `54-ios-friends-by-code.png`: Mention leaderboards and friends are both powered by Appwrite.
- `assets/app-icon-1024.png`: Use this as favicon.
- `55-ios-account-sign-in-dark.png`: Mention offline-first support with cross-device sync support, auto-merging, and even manual merging.
