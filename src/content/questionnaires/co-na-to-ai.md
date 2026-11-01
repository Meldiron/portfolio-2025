---
project: "co-na-to-ai"
title: "Co na to AI"
answeredAt: 2026-11-01
---

These are the questions an agent asked me before writing this case study, and my answers exactly as I typed them, typos included. I answered them in a form, and the agent turned them into the article.

## What the agent found

Before asking anything, the agent read the code, the commit history and the live app, and played a local copy. This is the summary it showed me.

Co na to AI is a daily Czech guessing game in the format of Family Feud, or Co na to Češi on Czech TV: "100 AI jsme se zeptali a teď hledáme osm nejčastějších odpovědí na otázku…". Every day one survey question goes to 100 answerers, each a different language model from OpenRouter (100 distinct models from 29 providers) playing one of 100 Czech personas (50 women and 50 men, aged 16 to 88, from all 14 regions, each with a town, a job, a bio and a voice). A judge model (Claude Opus 5.5) merges the one-word answers into canonical answers, drops non-answers that only repeat the question, and writes an answer key of forms, diminutives, slang and umbrella words a player might type. A quality gate rejects questions with one dominant answer or too few shared answers, and a 15-answer probe skips bad questions before the full run. A board costs about $0.15 and takes about a minute; the 28 boards bundled in the repo cost $4.21 in total, and 23 of the 47 saved runs failed the gate.

The player types one word at a time on a split-flap board styled after the Pragotron departure boards on Czech stations, in the state blue and red. The matcher forgives diacritics, i/y, w/v, doubled letters and small typos; "alkohol" counts as Pivo. A hit flips the answer and its vote count; five misses end the game, and the wrong words land in a "Mimo tabuli" row under the board. Each hidden answer has a blue "?" key with two clues: reveal a letter (up to three, each costing a quarter of the points for that answer) and "Kdo to řekl?", a free sentence about the personas who said it ("hlavně muži, skoro všichni z Čech", youngest and oldest named). 10 points per AI, 200 for clearing the board, confetti in the flag colours on a clear. After the game: a receipt-style score breakdown, a share ticket as PNG and text with a "Překonáte mě?" challenge and a dated link, "Kdo co řekl" with region and age bars per answer, stats (streak with two freezes, histogram), "Jak hráli ostatní" with rank and top 10, and "Co na to lidé", the players' own top 8 next to the AI board once three players finished. Weekly Finále: five questions, one 30-second clock, 100 points to win. The archive is a month calendar with a star for a cleared board, "Dotázaní" lists all 100 personas with their model, guest accounts upgrade to email and password, and an admin creates custom games for any question ($0.10 to 0.20 each) and reviews the self-refilling question bank.

Stack: TanStack Start with React 19 and server functions, Tailwind CSS 4, shadcn/ui, Bricolage Grotesque, blobatar avatars, satori and resvg for per-question Open Graph images, the OpenRouter SDK and Zod. Hosted on Appwrite Sites (SSR) in the Playground project, with Appwrite Auth (anonymous sessions kept in an httpOnly cookie, the browser never talks to Appwrite directly), TablesDB (puzzles, games, finales, finale_games, players, questions), a Storage bucket for custom games, and three Functions: daily-puzzles runs hourly and keeps today plus three days and two Finále weeks ready, maintenance refills the question bank nightly and deletes idle guests after 30 days, custom-game runs one custom board. The repo holds a question bank of 442 questions dated through 31 October 2027 plus 43 reserves, about 8,400 lines of TypeScript and 72 unit tests.

Timeline: 32 commits, 30 of them co-authored by Claude Opus 5.5. The scaffold commit is from Saturday 24 October 2026 at 10:45; 38 minutes later the second commit already held the whole game, the pipeline, the cast and the question bank. By 23:17 the same day there were 28 commits: admin and custom games, clues, the split-flap hint key, a QA capture harness and a design review with 38 variant patches across 15 proposals served to you in a local questionnaire (you picked one variant each: the first-visit dialog, the sticky phone input bar, the "Mimo tabuli" row, the calendar archive, the challenge share text with Open Graph images, and so on), confetti, the hourly function, boards back-dated to 1 October, guest accounts with synced progress, the probe and the self-filling bank, password reset, the rebrand from the working name "Ptali jsme se AI" to "Co na to AI" at 19:13, the weekly Finále, and five archive designs behind Vibe Flags that were dropped 13 minutes later. 25 October: Appwrite began rejecting the per-request key of the site, so a stored key was added as a workaround. 26 October: the judge got a review step that drops answers echoing the question, after "Bunda" and "Kabát" landed on the winter coat board.

Live: the board for 1 November is up, the guide dialog opens on the first visit, and every page loads in about 3 seconds. The Finále leaderboard for this week lists three players: Diya 88, Meldiron 42, Host 206A 3. The nightly GitHub workflow "Puzzle queue" has failed every night since 25 October because the OPENROUTER_API_KEY secret is missing; the hourly Appwrite Function makes the boards instead, so players see no gap. The repo has 0 stars and no license file. I played the local copy: diacritics-free guesses, umbrella words, repeats, the letter hint, the clue, a lost game and a cleared board all behaved as the README says, with no console errors.

## Fact check

Claims the agent was not sure about, and my verdict.

- **You built it with Claude Code and did not write the code by hand. 30 of the 32 commits are co-authored by Claude Opus 5.5; only the scaffold commit and "temporary key diagnostics" are not.**  
  _Correct._ Correct, entirely made with agentic flows.
- **Almost the whole game was built in one day, Saturday 24 October 2026, between 10:45 and 23:17 (28 commits). 25 October only fixed the Appwrite key problem, 26 October added the judge review step. Nothing since.**  
  _Correct._ Correct, weekend project, single day, few hours effort in free time, mostly prompting an idea I had.
- **The second commit, 38 minutes after the scaffold, already contained the whole game, the pipeline, the 100 personas and a question bank dated through October 2027. So you started from a written brief or spec, not from a one-line prompt.**  
  _Correct._ Correct, including dooling I wanted to use like taste skill, open router, Appwrite MCP, ..
- **The working name was "Ptali jsme se AI" (the storage keys are still pjs100) and you renamed it to "Co na to AI" on the evening of the first day.**  
  _Correct._ Correct, to follow "Co na to Češi", a czech TV show with similar idea.
- **The design review worked like this: Claude proposed 15 improvements, built 38 variant patches with before and after screenshots at desktop and phone size, served them in a local questionnaire, and you picked one variant per proposal (your picks are in qa/answers.json). Then it applied them in "design review round 1".**  
  _Correct._ Correct, I often ask for variations (using tools like VibeFlags), and for screenshots before&after, so I can decide visually, not from just a text. I also often prompt to screenshot edge cases and inspect for UI/UX improvements.
- **The 100 personas and the 442 questions were written by Claude, not by you, and you did not edit them by hand.**  
  _Correct._
- **Claude Opus 5.5 is the judge, and the 100 answerers are 100 different models (7 Anthropic, 16 OpenAI, 12 Google, 7 Meta, 9 Mistral, 8 Qwen, 5 DeepSeek and smaller ones), paired with the personas deterministically.**  
  _Correct._
- **A board costs about $0.15 through your own OpenRouter key. With the daily boards, the weekly Finále (5 boards), probes and the nightly refill, the game costs you a few dollars a month.**  
  _Correct._
- **The nightly GitHub workflow "Puzzle queue" fails every night because the OPENROUTER_API_KEY secret was never set. You know, and it does not matter, because the hourly Appwrite Function makes the boards.**  
  _Correct._ I noticed it afterwards, but never intended to use GitHub actions in the first place, so I decided to remove it and relay solely on Appwrite Functions for this, to have all under one roof.
- **On 25 October Appwrite started rejecting the per-request API key of the site (a platform bug or change on the Appwrite side, not your code), so you added a stored key as a workaround that is still in place.**  
  _Correct._ It was a bug introduced by colleague. It got fixed next day (during weekend) by me, after incident was opened. Originally we gave it low priority because it was just me, and I expected AI slop to be the problem.
- **The look is the Pragotron split-flap departure boards from Czech railway stations, in the state blue and red of the flag, and the typeface is Bricolage Grotesque. The idea for the look was yours.**  
  _Correct._ AI used taste skill to come up with it, knowing exactly what I am aiming for with this project; I agreed.
- **The format is Co na to Češi, the Czech version of Family Feud on TV Nova. The game is a fan project with no affiliation.**  
  _Correct._ Exactly.
- **The players are you and a handful of friends or family (the Finále leaderboard lists Diya, Meldiron and one guest). You never promoted it.**  
  _Correct._ Me, friends, friends of friends.

## Status & framing

### How should the case study frame Co na to AI?

**A daily game I wanted to exist, built in a day with Claude Code**

I was curious what I can build during weekend in couple of hours, with low effort (while doing chores)

### How should the article treat the live site and its players?

**Live, with a small circle of players**

(no answer)

## Origin

### Where did the idea come from?

_Watching Co na to Češi? A different word game like Wordle? The "ask 100 AIs" twist first, or the game first? Why Czech only?_

TV show mostly. The idea sparked when I was thinking of a good use of AI agents - personas - and combining it with minigame, wordle-style.

### How did the first session start?

_What did your first brief or prompt contain, roughly how long was it, and what did it leave to the agent (the look, the personas, the pipeline)?_

Mid-length, no execution details, just thoughts, tools, and goals.

### Why the rename to "Co na to AI"?

_And what was the working name exactly: "Ptali jsme se AI", "Ptali jsme se 100 AI", something else?_

To be more recognizable, similar to TV show name.

### Why the Pragotron split-flap look and the flag colours?

_Was it in the brief, or a proposal from the agent? Any references you gave it?_

I promoted, I wanted it to be Czech and Czech-only, so following Czech design patterns was the intention.

### Why personas at all?

_The prompt says the persona only lightly colours the answer. Was the point variety in the answers, the "Kdo to řekl" clue, the Dotázaní page, or the fun of it?_

For a bit of variety. Becuase variety with models only would be too little, the models are usually similarly smart, so answers would be very often similar or same.

## Building it

### How did you work with Claude Code on this one?

_One long session? Did you read the code? Roughly how many prompts? How much did you test by hand between commits?_

Few sessions in Zed. Manual testing as in "Is it fun", but of design review. Mostly agentic flows for QA as well.

### The design review with 38 variants and a local questionnaire: tell me about it.

_Was this the first time you used that workflow? Did you write the plan or did the agent? How long did picking take you, and was it worth the tokens?_

Already familiar workflow for me - I like when AI prepares many visual variations and I can pick or mix. I also like local questionnaire, mostly when I am not 100% sure what I want - this helps agent decide what context it wants from me. Helps when I dont really know what I want to prompt exactly - what info is relevant, what is not.

### Which skills and tooling were in play?

_The QA harness imports a design-taste-frontend skill; the archive experiment used Vibe Flags. Anything else: subagents, worktrees, a taste skill, the Appwrite CLI?_

Taste skill, Appwrite skill, subagents, headless browser, Vibe flags..

### What was hardest to get right?

**The judge: merging answers into one word without over-merging**, **The answer key: accepting what a player types without false hits**, **Answers that only repeat the question (Bunda, Kabát)**, **Czech copy, grammar and plurals**

(no answer)

### What surprised you about the answers of the models?

_Favourite board or answer so far? (Orel 22 for the animal question, Semtex among Czech inventions, Vnoučata for what makes you laugh.) Any model that is consistently odd?_

After rounds of fixing, nothing extra-ordinary. Every makes sense. Its funny how "Pivo" fits into many boards. Czechs love beer.

### Why the self-filling question bank and the probe?

_Cost, quality, or not wanting to think up 365 questions? Do you review the drafted questions in the admin?_

I wanted to keep cost managable, and allow me to slightly adjust quality overtime, before spending bunch of money on questions/answers that could be better.

### Why add the weekly Finále on day one, and what is the one 30-second clock about?

_The commit went from 20 seconds per question to one clock for all five._

To better reflect TV show, plus its very funny, time-ticking, compared to casual slow daily game. 30 second clock was 3rd design idea - it felt stressful, which is exactly the goal.

### How was Appwrite for this?

_Sites SSR, three Functions on schedules, TablesDB, anonymous sessions through a cookie. What worked well, what did you have to work around, what did you report?_

Appwrite was great, all features I needed were possible.

## Results & retrospective

### Did you share it, and who plays?

_Friends, family, colleagues? Do you play every day yourself? Your streak or best score?_

Me, friends, friends of friends.

### What did you learn?

_About agents, about the review-by-variants workflow, about surveying models, about Czech._

I can build a fun project in couple of hours with low effort.

### What would you do differently?

Some design decisions I didnt like at all. Taste skill is great, but I am yet to learn what info is relevant and what isnt.

### What does it cost to run per month, roughly?

_OpenRouter and Appwrite. Is there a budget cap?_

Below 10$ a month, this cap seems achievable. I plan to stop it after year or a few.

### What is next, if anything?

_Fix the GitHub secret, an English or Slovak version, more modes, people answering alongside the AIs, promotion…_

Sharing with more people slowly, not online. Listening to feedback, implementing it.

## Screens

### May I play on the live site for the screenshots?

**Yes, play live**

(no answer)

### Which screens should the article show?

**Nothing picked**

Up to you, whatever fits best the content. Make sure to not miss any major screen.

### Which day or question should the screenshots use?

_I used 24. 10. "Co si berete s sebou na chatu?" and 5. 10. "Co nesmí chybět na pořádném chlebíčku?" for the play-test. Pick a favourite board if you have one._

Whichever feels the most impactful, fun, exciting, hilarious.. Find some good ones.

### Anything to say about the screenshots, the logo or the banner?

_The logo would be the red AI tile from the wordmark unless you want something else. The banner is a 3D object; my first thought is a split-flap board mid-flip with one blue "?" key glowing._

(no answer)

## Anything else

### Anything I got wrong or should know?

(no answer)
