---
project: "auth-ui-2"
title: "Auth UI 2.0"
answeredAt: 2026-10-14
---

These are the questions an agent asked me before writing this case study, and my answers exactly as I typed them, typos included. I answered them in a form, and the agent turned them into the article.

## What the agent found

Before asking anything, the agent read the code, the commit history and the live app. This is the summary it showed me.

Auth UI 2.0 rebuilds v1's hosted login page as Lit web components that run on the app's own domain. One script tag (or npm @getauthui/core), an &lt;authui-config> element, and &lt;authui-button> / &lt;authui-user-button> give you every Appwrite sign-in method, MFA, sessions and account settings, with no Auth UI backend, no hosted page and no third-party cookies. Configuration moved from v1's no-code dashboard to HTML attributes or AuthUI.init(), and it's Appwrite-only on purpose.

Why v2: v1 lived on *.authui.site, and browsers now block or partition third-party cookies, so sign-in silently failed in Safari, Firefox and Brave. The landing page explains this with a table comparing hosted-page approaches to an in-page component.

2.0 delivers every item from v1's Future plans: account details and password reset, MFA (TOTP, email, SMS, recovery codes, step-up), session management, linking and unlinking social accounts, and deleting the account (as a block an admin can restore). On top: teams, authorized OAuth apps, Google One Tap, identifier-first sign-in, a last-used badge, a password strength meter, cs/de/fr translations, theming tokens copied from the Appwrite Console design system, React wrappers, and a preview mode that runs every screen without a backend.

TypeScript + Lit 3 with the official Appwrite SDK, 251 Vitest tests, and a Next.js + Fumadocs docs site on Appwrite Sites with files written for AI agents (llms.txt, an authui-creator skill). 90 commits over 7 days (Sep 20–28, 2026) and 46 npm releases (0.1.0 → 0.1.45); 0.1.0 was published before the first commit. Shoebox is the only other project I found using it, and it surfaced two bugs.

One thing to know: authui.site now redirects to a domain-parking ad page, so v1 pages look dead and the v1 case study's demo link points there.

## Fact check

Claims the agent wasn't sure about, and my verdict.

- **You rebuilt Auth UI because v1's hosted page broke when browsers started blocking third-party cookies (Safari, Firefox, Brave).**  
  _Correct._
- **2.0 is a personal project, not an official Appwrite product, even though it lives on appwrite.network and uses the Appwrite Console design system.**  
  _Correct._
- **Work started before the public repo: npm 0.1.0 was published ~2h20m before the first commit, which landed 19k lines at once.**  
  _Correct._
- **It was built largely with agents (AGENTS.md, a Playwright UX audit, "hunts" comparing it to Clerk, FirebaseUI and WorkOS), with you directing and reviewing.**  
  _Correct._
- **The npm numbers (7.8k downloads last month, 58 last week) are mostly your own release and build traffic, not real adoption.**  
  _Correct._
- **The bundle is ~106 KB brotli (130 KB gzip); the site says "~106 KB gzipped".**  
  _Correct._

## Why 2.0

### Why rebuild from scratch instead of fixing v1? When did you notice it breaking?

_User reports, your own testing, Safari/Brave changes? Did you consider the code-exchange or JWT-renewal approaches from the landing table?_

It technically still works for those who set up custom domain and subdomains properly, but starting new project was very painful with V1. Rebuilding from scratch also allowed me to redesign towards new Appwrite design system, and do breaking changes safely.

### Why web components with Lit, rather than Svelte (v1) or a React-first kit like Clerk?

_What did shadow DOM cost you: theming, flash of unstyled content, React interop?_

Web components with Lit allowed to make framework-agnostic implemenetaiton that work in any framework. On top of that, I added some react-specific components for those who want great experience with React specifically.

### Why drop the no-code dashboard and the multi-backend idea? Is the playground its replacement?

No-code was limiting in a way library isnt. Also there had to be hosted project, and I had to be trusted to keep it live. Shipping auth components as part of site that uses it is much more reliable.

### Did v1's downtimes and support messages shape the "no Auth UI backend, 0 servers" rule?

Not really, downtimes and 3rd party cookie issues werent reason to drop that marketing copy. it was never too important, so not much pity losing it.

### How does 2.0 relate to Appwrite?

_Personal or sanctioned? Did building it influence Appwrite features like recovery OTP, OAuth2 consents or ID-token sessions?_

It starts as non-official project, but once we see community using it actively, we will make a official port of it, with all the knowledge and feedback we get from our community.

## Building it

### How did you build it? What did you decide, design or review yourself?

_The "hunts", the "lanes", the Playwright UX audit, AGENTS.md. How long before the first commit on Sep 20?_

Agentic programming mostly, a lot of it was autonomous with bots (Grok bot) I was making decisions and giving feedback, but agent was addressing. Agent also had a rutine running to try and find more bugs in different scenarios (docs, SDK, UI, UX, accessability, competitor parity, ..)

### What was hardest?

**Third-party cookie / session placement**, **Theming and shadow DOM**, **Keeping up with Appwrite SDK changes**

### Which design decision are you proudest of?

_Console design tokens with pink only for CTAs, the accordion for 3+ OAuth providers, the last-used badge, preview mode, agent-first docs…_

Customizability, actually. I know design is solid, but I know everyone will want to change my base design. I am proud that that is posible.

### Have you seen agents set up Auth UI correctly from llms.txt and the skill? Was that a goal from day one?

Yes, I myself used it in a few proejcts to skip need to implement entire auth UI from scratch.

### Why 46 npm releases in 9 days, and is a 1.0 planned?

It was agentic to keep up with bugs and improvements that I (and bot) had.

## Results & future

### How has it been received? Was it announced anywhere? Any v1 users migrated?

It was announced to community who instnatly went to try it. Happy to see developers count using it grow. Docs for V2 have migration guide from V1.

### What did you learn?

It allowed me to trust agents and bots a bit more, going fully away from codebase, and only focusing on tooling, processes, end result quality and ideas.

### What would you do differently?

Grok bot feels a bit limiting, and going forward I will surely use OpenMausBot instead, an open-source alternative that gives developer much more control over soul, instruction, skills, MCP tools and such.

### What's next?

_Passkeys, more locales, Vue/Svelte wrappers, an SSR story, a 1.0…_

Ill let community of developers using it grow, and when the right time comes, I make it an official product, natively part of Appwrite.

## The portfolio entries

### authui.site now redirects to a parking/ad page. What should the v1 case study's demo link be?

**Remove the demo link (show it as unavailable)**

### Anything to say on the v1 page next to the link to 2.0?

_For example: "Auth UI is now 2.0, rebuilt as web components." Leave empty and I'll write a short note._

Just quick sentence, I trust you to make it good.

### Which numbers should the case study quote, if any?

_Bundle size (~106 KB brotli / 130 KB gzip), "48 OAuth providers", npm downloads._

Bundle size is good and relevant.

### Anything else I got wrong or should know?

All good.
