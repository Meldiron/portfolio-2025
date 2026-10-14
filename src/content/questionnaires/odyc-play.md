---
project: "odyc-play"
title: "Odyc Play"
answeredAt: 2026-10-14
---

These are the questions an agent asked me before writing this case study, and my answers exactly as I typed them, typos included. I answered them in a form, and the agent turned them into the article.

## What the agent found

Before asking anything, the agent read the code, the commit history and the live app. This is the summary it showed me.

Odyc.js is a tiny library for narrative pixel games by Charles Cailleteau (achtaitaipai). In June 2025 you became its #2 contributor in ten days (62-colour support, a test suite with visual snapshots, onInput, onRender, visibility…) and started the first Odyc Play together with him on a branch of the monorepo — he wrote the generated avatars, sound editor and the EN/FR translations. That PR (#48) was never merged; you closed it in Sep 2026 pointing to the standalone repo, which squashed the shared history.

Odyc Play (SvelteKit 5 on Appwrite Sites) lets you write, save, share, embed and fork Odyc.js games: a CodeMirror editor with TypeScript autocompletion and Vim mode, sprite paint and sound tools, a version picker for all 132 Odyc.js releases, public game pages, profiles, generated OG images, collaborators and EN/FR. In June 2026 it also became a "Sign in with Odyc.js" OAuth 2.1 / OIDC provider on Appwrite's then pre-release OAuth2 / Apps feature: consent screen with per-game access (RFC 9396), device flow, an Apps marketplace, a REST API and an MCP server so AI agents can create and edit games.

Odyc Avatars is the reference third-party web client: an infinite gallery of seeded 8×8 avatars (131 hand-drawn templates + 156 CC0 OpenGameArt sprites) that you apply to your Odyc Play profile via PKCE — later rewritten without the Appwrite SDK as plain OIDC. Odyc CLI (Go) started in 2025 as a PNG → sprite-code tool and became the reference device-flow client in 2026 with login, create and deploy.

Live since May 2026 on odyc.appwrite.network. Public data shows 17 profiles and 10 games, 5 of them yours. Only a few commits carry Claude trailers.

## Fact check

Claims the agent wasn't sure about, and my verdict.

- **Odyc.js is by Charles Cailleteau (achtaitaipai). You contributed 53 commits / 12 merged PRs upstream between 2025-06-14 and 06-24.**  
  _Correct._
- **Charles co-built the 2025 Odyc Play branch (29 of 100 commits: avatars, sound editor, EN/FR i18n). The editor, paint tool, sound tool and examples come from the official odyc.dev playground.**  
  _Correct._
- **The 2026 standalone Odyc Play (from 2026-05-30) was largely a way to dogfood Appwrite's new OAuth2 provider (Apps) before it was public — it uses preview SDK builds.**  
  _Correct._
- **Odyc Avatars exists mainly as the smallest possible third-party "Sign in with Odyc.js" web app; the CLI is the device-flow client; MCP is the AI-agent client.**  
  _Correct._
- **Odyc Play lives on odyc.appwrite.network rather than on the odyc.dev domain.**  
  _Wrong._ Odyc Play just remains under appwrite.network until official release to Odyc community, when its fully finished. For now it acts as "preview" or "early access"
- **The CLI is installed with go install only (not on npm). Its tags lack a v prefix, so go install resolves a pseudo-version instead of 0.1.1.**  
  _Correct._

## Framing

### How should these be presented?

**One case study: Odyc Play, with Avatars and CLI as sections**

### What is the main story?

**A game-making platform for the Odyc.js community**

### How should Charles (achtaitaipai) be credited?

_He co-built the 2025 version (avatars, sound editor, French) and the editor/paint/sound tools come from his playground. Any wording he'd like, or anything I shouldn't say?_

You can simply link to his GitHub handle

## Origin

### How did you find Odyc.js, and what pulled you in so deep in ten days?

I was looking for engine to build game, but I didnt know music, grahics, 3d, shaders, models, ... I wanted something simple just to capture game ideas, and have for while building it. Then maybe 5 minute playing, thats it.

### How did working with Charles go in summer 2025? Was play.odyc.dev meant to be official?

It went great, he was very active and together we improved both the JS library itself, as well as Odyc Play (originally just website editor)

### Why was PR #48 never merged, and why revive it standalone in May 2026?

I wanted to actively make changes without involving Charles too much, mostly for Appwrite capabilities - this was my first project where I tested our OAtuh2 server impleentation that I built in Appwrite.

### Who is Odyc Play for?

_Odyc.js hobbyists, game-jam folks, teachers and students, Appwrite developers learning OAuth…_

Folks learning to make games, game-jams, teacher and students, even kids.

## Building it

### What did building on Appwrite's pre-release OAuth2 provider teach you, and what did you feed back to the team?

Building this project's oauth2 capabilities was a main driver for pre-release manual QA. it helped shape product in the most fundamental way, and without Odyc as playground, OAuth2 server would still not be as good as it is right now.

### Why per-game access (Rich Authorization Requests) instead of plain scopes, and why tie edit rights to the grant that created a game (creatorGrantId)?

two reasons:

1. RAR is to achieve more granual control, so you can grant CLI or MCP access only to single game, instead of one. this can help keep agent's or CI/CD exposure limited

2. creator grant ID is remembered so when "all" projects are picked, and CLI/MCP then creates new game, such oauth2 token can automatically be given owner permissions to the newly made game without asking for re-authroization.

### Has anyone built a game through the MCP server (you, Claude, Cursor)? Anything worth showing?

I built a few to test it, it was a success, but nothing worth showing. My third game, color thief, was WIP demo, which agent fnished using MCP capabilities.

### Odyc Avatars: did you draw the 131 templates yourself? Why rip out the Appwrite SDK for plain OIDC later?

Odyc Avatars is meant to represent 3rd party app, of devs building with Odyc, so they should not need to have any idea about appwrite SDK, thats why plain OAuth2 flows.

And all avatars are auto-generated from agent-made library to generate avatars. It was first idea of app that would fit odyc nicely - sometihng that makes sense, but would never be part of main product.

### Odyc CLI: what game needed the sprite tool in 2025, and why Go for a JS community?

Golang is faster, plus originally odyc CLi (even before oauth2) was made with go as a learning opportunity for me to get more familiar with golang codebase.

### What was hardest?

**OAuth redirect loops / the fallback cookie system**, **Signing up in the middle of an OAuth flow**, **CSRF vs a cross-origin token endpoint**

### How much of the 2026 work was AI-assisted? (Only a few commits carry Claude trailers.)

Most of it, I was just commiting most manually. Only during 2026 I became confident to let agents commit directly.

## Results & retrospective

### How was it received?

_17 profiles and 10 games are public. Feedback from Charles, the Odyc Discord, Appwrite colleagues? Who is "Igor" with the BODY_* games?_

Odyc.js maintainer loved the project, and I really like it too, as a showcase project.

### What did you learn?

Building side project alongside full time work is more than possible with the right automations and tooling.

### What would you do differently?

_Keeping the monorepo history, v-prefixed tags, a real domain, 404 handling…_

I dont like complexity of some flows, such as collabiration, which I am confident can be simplified to get rid of proxy functions.

### What's next?

_Domain, multiplayer games, more marketplace apps, the JS game engines article and the ~10 minigames you mentioned upstream…_

Using the platform on live and in-person events, slowly building it into official platform in odyc domain.

## Screenshots

### Anything else I got wrong or should know?

I miss screen from Odyc.js homepage (after logging in), and editor view. both on PC.

And mention this youtube annoucnement, this link points to section that talks about Odyc: https://www.youtube.com/live/LYq0qtyQmJk?si=TcVGSZPxyehDeZoJ&t=350

## Screenshot notes

Notes I left on individual screenshots for the captions.

- `play-06-playing-quick-arrows.png`: intro: second game I built with Odyc
- `play-07-playing-forest-hike.png`: intro: First game I built with Odyc
