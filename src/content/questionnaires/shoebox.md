---
project: "shoebox"
title: "Shoebox"
answeredAt: 2026-10-14
---

These are the questions an agent asked me before writing this case study, and my answers exactly as I typed them, typos included. I answered them in a form, and the agent turned them into the article.

## What the agent found

Before asking anything, the agent read the code, the commit history and the live app. This is the summary it showed me.

A small, dark-only private photo gallery on Appwrite. Sign in, get an auto-created Inbox, manage galleries as pill tabs (inline create, double-click rename, drag a photo onto a tab to move it), drop files to upload, browse 600×600 previews with Load more, open originals in a lightbox. The signed-out view is a dimmed mock of the app instead of a landing page.

The bigger part: Shoebox is also an OAuth 2.1 / OpenID Connect provider ("Sign in with Shoebox"). The consent screen lets you grant an app access to exactly one gallery using RFC 9396 Rich Authorization Requests, and a Bun function returns that gallery as 1-hour presigned S3 links — using Appwrite's OAuth2 server, Apps, token introspection, dynamic function keys, the Storage folder parameter and the S3-compatible API.

Astro 7 static + one React 19 island, Tailwind 4, Appwrite Web SDK 28, and Auth UI 2 for sign-in — it was built four days after @getauthui/core was first published, and bumped Auth UI three times in one evening to fix One Tap and a missing project header it surfaced. About 890 lines of source, 17 commits over ~1.5 days; 9 commits co-authored by Claude Fable 5.1, followed by a visible manual cleanup pass on day two.

I could only capture signed-out screens — the real app is behind login, and the documented demo OAuth client returns "Invalid client ID" now.

## Fact check

Claims the agent wasn't sure about, and my verdict.

- **Built 2026-09-23 → 09-25 (scaffold late on the 23rd, almost everything on the 24th, cleanup on the 25th).**  
  _Correct._
- **Shoebox was largely a dogfooding testbed for Auth UI 2 and Appwrite's new OAuth2 server / Apps / S3 API features.**  
  _Correct._
- **Google sign-in and One Tap were added only to test Auth UI's Google button, then removed.**  
  _Correct._
- **The Sep 25 commits (no AI trailer) are your manual cleanup of AI-written code: unrolled one-liners, removed comments, SDK services instead of raw calls, TODOs.**  
  _Correct._
- **Bucket encryption is off because Appwrite's S3 API doesn't work with encrypted buckets (appwrite.config.json still says encryption: true).**  
  _Correct._
- **Deleting a gallery currently orphans its photos (TODO: background job), although the README says it deletes them.**  
  _Correct._

## Framing

### How should the case study frame Shoebox?

**A testbed for Auth UI 2 and Appwrite's OAuth2 features**

### Should Shoebox get its own case study?

**Yes, its own project page**

### What started it?

_Why a photo gallery as the example, and why the OAuth provider part?_

A need for demo project for Friday presentation to showcase technical deep-dive of Appwrite OAuth2 server

### What does "quiet" mean to you here?

_Dark-only, no landing page, no modals, inline editing, 'the caret is the only editing cue'…_

Minimal, stright to the point .Quiet on features, as well as quiet on codebase.

### Where do the name and the box-with-lid logo come from?

Shoebox is commonly used in real world to store old pictures.

## Building it

### Tell me about the "Sign in with Shoebox" part.

_Who is the imagined client app? Why one-gallery grants (RAR) rather than scopes? Were the OAuth2 server, Apps and S3 API public Appwrite features at the time, or pre-release?_

3rd party is imagined client.. possibly CLI, possibly MCP server.

### What did dogfooding Auth UI 2 here teach you?

_One evening: 0.1.38 → 0.1.41 for the One Tap nonce and a missing project header that looked like CORS._

It found a few bugs around S3 proxy (not working with ephemeral keys), as well as few missing configuration screens in Console of Appwrite. All solved before presentation.

### What bothered you about the AI-written code, and how did the cleanup pass go?

Cleanup was just 1 prompt. The complexity, unreadability and too much comments would make context too large when screen sharing. small, clean, stright to point code is much better for explaining how SDK achieved different things.

### What was hardest?

**/consent → /consent/ redirect dropping grant_id**, **Third-party cookies for private images**

### Why Astro static + a React island (instead of Next.js like Almost Moments)?

Expecting minimal app, I went with Astro. Otherwise I would use TanStack Start. As someone developing platform for running Next.js projects, I know limitations  of Next.js, and I would like to avoid them.

### No EXIF ordering, search, video or share links — deliberately minimal? What would you add first?

These are great ideas for improvements in the future. But yes, minimal was entire idea. Something easy to present, explain and teach in 30 minutes.

## Results & retrospective

### Does anyone use it? Did you show it at Appwrite, in a talk or publicly?

Noone uses it likely, hopefully. It is used during talks and as showcase for devs trying to understand oauth2 server.

### What did you learn?

Not much, I developed the oauth2 server, so I already had the knowledge. App allowed me to share that in a way it can be referenced in future easily.

### What would you do differently?

Not much, it was minimal project and it serves its purpose great. I am happy how it turned out.

### What's next, if anything?

_Background deletion, ephemeral S3 keys, a sample client app, share links, video…_

No new features, I will remain it as a minimal demo for oauth2 server, and refference it in talks, presentations and community support.

## Screenshots & the open issue

### Anything else I got wrong or should know?

You are missing A LOT of screenshots, namely consent screen, gallery with real pictures... Make mocks and render them using headless browser. then use them. I would expect 3-6 screenshots total

## Screenshot notes

Notes I left on individual screenshots for the captions.

- `12-logo-render.png`: Favicon
