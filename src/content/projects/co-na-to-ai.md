---
title: "Co na to AI"
pubDate: 2026-10-26 #Y-M-D
description: "A daily Czech survey game answered by 100 AI models. Guess the eight most common answers on a split-flap board before the fifth strike."
github: "Meldiron/co-na-to-ai"
demo: "ai100.appwrite.network"
image: { url: "/projects/co-na-to-ai.png", alt: "Co na to AI" }
cover: { url: "/projects/illustrations/co-na-to-ai.webp", alt: "One cell of a dark split-flap board with the word PIVO half-way through its flip and a glowing blue question mark key next to it" }
agentic: true
---

## Vision

Co na to Češi is the Czech version of Family Feud. A hundred people answer a survey question, and the contestants guess the most common answers. I had been thinking about a good use for AI agents as personas, and about a small daily game in the style of Wordle, and the show put the two together. Co na to AI asks 100 AI models one question a day, and you guess the eight most common answers. The game opens with the line of the show: "100 AI jsme se zeptali a teď hledáme osm nejčastějších odpovědí na otázku…", we asked 100 AIs, and now we are looking for the eight most common answers to the question.

How the game plays:

- A new question comes every day at midnight, Prague time, the same for everyone. "Co si berete s sebou na chatu?", what do you take with you to the cottage?
- You type one word at a time. A hit flips the answer and its vote count on the board. The fifth miss ends the game, and the missed words stay in a row under the board.
- Every hidden answer has a blue "?" key with two clues. Revealing a letter costs a quarter of the points for that answer, up to three letters. "Kdo to řekl?", who said it, is free: it describes the personas who gave the answer, for example mostly retirees from Moravia, and names the youngest and the oldest.
- An answer is worth 10 points for every AI that gave it, and clearing the whole board adds 200.
- Once a week there is a Finále, like the last round of the show: five questions, one 30-second clock for all of them, and 100 points to win.

The 100 answerers are 100 different language models from 29 companies, from the smallest to the largest, all through [OpenRouter](https://openrouter.ai/). Models alone would be too alike, because they are all similarly smart, so their answers would often be the same. Each one therefore plays a Czech persona with an age, a town, a job and a short biography. Věra, 78, a retired librarian from Dejvice, is played by Gemini 4 Argon, and Jiří, 54, a tram driver from Chodov who fixes things at his cottage every weekend, is played by DeepSeek V3. The persona only lightly colours the answer, and that is enough for variety.

Behind every board is a pipeline. The hundred answers go to a judge model, [Claude Opus 5.5](https://claude.com/), which merges them into single-word answers, drops answers that only repeat the question, and writes a key of every word a player might type for each answer, so that "alkohol" counts as Pivo. A quality gate rejects a question with one dominant answer or too few shared ones, and a cheap probe with 15 answerers skips a bad question before the full run. A board costs about 15 cents and takes about a minute. A bank of 442 questions is dated through October 2027, and a nightly job drafts new ones when the reserves run low.

I wanted it to be Czech and Czech only, so the design follows Czech patterns: the split-flap departure boards that Pragotron made for Czech railway stations, and the blue and red of the flag. The name follows the show too. The working name was "Ptali jsme se AI", we asked the AI. It became "Co na to AI" on the first evening, to be more recognisable.

I was curious what I could build in a weekend, in a couple of hours of free time and with low effort, while doing chores. The answer is this game. It was built on Saturday 24 October 2026, between 10:45 and 23:17, with [Claude Code](https://claude.com/claude-code) in [Zed](https://zed.dev/), from a brief of medium length with my thoughts, the tools to use and the goals, and no execution details. The repository holds 32 commits, and 30 of them are co-authored by Claude Opus 5.5. Sunday fixed a key problem on the Appwrite side, and Monday taught the judge to drop answers that only repeat the question.

## Technologies

- [TanStack Start](https://tanstack.com/start) with [React](https://react.dev/) 19 and server functions
- [Tailwind CSS](https://tailwindcss.com/) 4 and [shadcn/ui](https://ui.shadcn.com/)
- [Bricolage Grotesque](https://github.com/ateliertriay/bricolage) and [blobatar](https://www.npmjs.com/package/blobatar) avatars for the personas
- [satori](https://github.com/vercel/satori) and [resvg](https://github.com/thx/resvg-js) for an Open Graph image per question
- [OpenRouter](https://openrouter.ai/) for the 100 answerers and the judge
- [Appwrite](https://appwrite.io/) Sites with server-side rendering
- Appwrite Auth, with anonymous sessions kept in an httpOnly cookie, so the browser never talks to Appwrite directly
- Appwrite Databases for the boards, games, Finále and the question bank, and Appwrite Storage for custom games
- Three Appwrite Functions on a schedule: one runs every hour and keeps today, the next three days and two Finále weeks ready, one refills the question bank every night and deletes idle guests after 30 days, and one runs a custom game for the admin
- [Claude Code](https://claude.com/claude-code) with a taste skill, the Appwrite skill, subagents, a headless browser and [Vibe Flags](/projects/vibe-flags)

I did not write the code myself. Claude Code worked from the brief, and I tested whether the game is fun, picked designs and prompted the next step.

## Screens

The screenshots come from the live site, played as a guest on 1 November 2026, the 32nd board.

The board of the day: "Jaký předmět najdete v každé české kuchyni?", which object do you find in every Czech kitchen. Eight hidden answers, each with a blue "?" key, a red X row for the misses, and one field for one word.

![The board of the day](/projects/co-na-to-ai/1-board.png)

The first visit opens "Jak hrát", how to play, with the three things you need to know: one word, the blue question mark, and the fifth strike.

![How to play](/projects/co-na-to-ai/2-how-to-play.png)

"O čem se mluví u nedělního oběda?", what do people talk about at Sunday lunch. Rodina, family, was the answer of 44 of the 100. A hit flips the answer and its votes like a departure board, and a miss lands in the row under it.

![A hit flipping on the board](/projects/co-na-to-ai/3-hit.webm)

Clues on "Jmenujte český vynález nebo výrobek, který zná svět.", name a Czech invention or product that the world knows. Answer 4 has its first letter revealed. The popover on answer 3 offers the next letter for a quarter of the points, and the free clue under it says that mostly men said it, from the whole country, the youngest Matyáš, 19, from Vinohrady.

![Clues](/projects/co-na-to-ai/4-hint.png)

Becherovka is not on the board: a red X over the board, the first strike, and the word stays in the row under it.

![A wrong guess](/projects/co-na-to-ai/5-wrong-guess.png)

After the fifth miss the board turns over. I found Pivo, Škoda and Semtex. Čočky, the contact lenses, Pilsner, Sklo, Boty and Kostka, the sugar cube, stayed hidden, and Jawa, Lentilky, Remoska and Kofola were all Czech and all wrong. Beer as the best known Czech invention sums up the hundred AIs well.

![Game over](/projects/co-na-to-ai/6-game-over.png)

"Co nesmí chybět na pořádném chlebíčku?", what a proper open sandwich cannot do without. Šunka, ham, had 42 votes and Máslo, butter, 23. The whole board found means 200 extra points and confetti in the colours of the flag.

![A cleared board](/projects/co-na-to-ai/7-cleared.png)

The result with a receipt: points per answer, the bonus for the whole board and the total.

![The result](/projects/co-na-to-ai/8-result.png)

The share ticket goes out as an image or as text: the question, the score, "Překonáte mě?", can you beat me, the eight squares, the five crosses and a link to the same question. Neither gives away an answer.

![The share ticket](/projects/co-na-to-ai/9-ticket.png)

"Kdo co řekl", who said what, after the game. For every answer, a sentence about the personas, bars by region and age, and the personas with their model. Libor, 45, is Claude Haiku 5.5, and Božena, 88, is Qwen3 Next.

![Who said what](/projects/co-na-to-ai/10-who-said.png)

Every persona opens in a dialog. Božena, 88, from Kyjov, raised four children and still works the small field behind her house. She answered "pivo", and she is played by Qwen3 Next from Alibaba.

![A persona](/projects/co-na-to-ai/11-persona.png)

"Jak hráli ostatní", how the others played: how many finished the board, the average score, your rank and the leaderboard. Two players by Sunday noon, and the guest in the first place was me. Once three players have finished, "Co na to lidé", what the people say, puts the top eight of the players next to the board of the AIs.

![How the others played](/projects/co-na-to-ai/12-others.png)

Under the board: the countdown to the next question, the Finále, three recent days to play, and your statistics: games played, boards cleared, average, best, the streak with its two freezes, and how many of the eight answers you usually find.

![Statistics](/projects/co-na-to-ai/13-stats.png)

The weekly Finále: five questions, 30 seconds for all of them, 100 points to win, and the leaderboard of the week.

![The Finále](/projects/co-na-to-ai/14-finale.png)

A round in play, with the clock in the corner: "Jaký kořenový či luštěninový pokrm jíte v zimě?", which root or legume dish do you eat in winter. The server hands out one question at a time and scores every answer as it arrives, so a reload does not reset the clock.

![A Finále round](/projects/co-na-to-ai/15-finale-round.png)

The end of a Finále: each question with your answer, its points and the most common answer. I spent my 30 seconds on Pivo and Rodina, and the AIs said Čočka and Autobus.

![The end of a Finále](/projects/co-na-to-ai/16-finale-result.png)

The archive is a month calendar: played days in blue, a star for a cleared board, a red dot for today, and the Finále weeks above the questions of the month. Older days can be played any time, but only a board finished on its day counts towards the streak.

![The archive](/projects/co-na-to-ai/17-archive.png)

"Dotázaní", the respondents: all 100 personas by region, each with the model that plays them.

![The respondents](/projects/co-na-to-ai/18-cast.png)

Every day has its own Open Graph image, rendered on the server with satori: the question, the date and the hidden board.

![An Open Graph image](/projects/co-na-to-ai/19-og.png)

On a phone, the field, the strikes and the score stick to the bottom, so the board stays visible above the keyboard.

![On a phone](/projects/co-na-to-ai/20-phone-board.png)

## Retrospective

Everything here was made with agentic flows, over a few sessions in Zed. My manual testing was mostly "is it fun", and even most of the QA ran through agents: a headless browser captured every screen at desktop and phone size, with mocked states for the edge cases, and I read the screenshots.

The design review is the part I like most. I often ask for variations, with screenshots before and after, so I can decide visually and not from a text. On this project Claude proposed 15 improvements, built 38 variants of them as separate patches, captured each one at desktop and phone size, and served them in a local questionnaire. I picked one variant per proposal: the first-visit dialog, the sticky phone input, the "Mimo tabuli" row for the missed words, the breakdown bars in "Kdo co řekl", the calendar archive, the challenge share text with the Open Graph images, 44 pixel tap targets, and so on. One prompt later they were applied. The archive got five more designs behind a Vibe Flags switch that evening, and I dropped them 13 minutes later and kept the calendar. The local questionnaire helps most when I am not fully sure what I want: it lets the agent decide what context it needs from me, when I do not know which information is relevant.

The look came from the taste skill. It knew what I aimed for with the project, proposed the Pragotron boards and the flag colours, and I agreed. Not every design decision was to my liking, though. The taste skill is great, but I am yet to learn which information is relevant for it and which is not.

The hardest parts were about words. The judge has to merge "studené pivo", "pivko" and "Plzeň" into one answer without merging "víno" into it. The answer key has to accept what a player types without false hits, so "alkohol" counts as Pivo and "Tatra" counts as Škoda. The winter coat question put "Bunda" and "Kabát" on the board, both only repeating the question, so on Monday the judge got a review step that drops echoes of the question, the asked-for category and catch-alls like "Věci". Czech copy, grammar and plurals needed their own rounds too.

After those rounds, nothing in the boards surprises me any more. Every answer makes sense. It is funny how Pivo fits on so many boards: it was on seven of the first 28, as a drink for the cottage, a cure for a sad day, a wedding essential and the best known Czech invention. Czechs love beer.

The Finále went through three designs before the one 30-second clock for all five questions. It feels stressful, and that is exactly the point, next to the slow daily game.

The probe and the self-filling question bank exist to keep the cost manageable and to let me adjust the quality over time, before spending money on questions and answers that could be better. The whole game runs under 10 dollars a month.

Appwrite was great, and every feature I needed was possible. On Sunday morning the site stopped getting a valid key from the platform, so every database read failed. The bug came from a change by a colleague at Appwrite. It got a low priority at first, because I was the only one affected and we expected the AI-written code to be the problem. I fixed it myself the next day, after an incident was opened, and the site still prefers a stored key as a workaround. The repository also has a nightly GitHub workflow that fails every night, because its secret was never set. I never meant to use GitHub Actions for this, so it goes, and the Appwrite Functions keep everything under one roof.

What I learned is simple: I can build a fun project in a couple of hours with low effort.

## Future plans

The game is live at [ai100.appwrite.network](https://ai100.appwrite.network), with a new question every midnight and a Finále every week. The players are me, my friends and friends of friends. I share it slowly and in person, listen to the feedback and build what comes out of it. It costs under 10 dollars a month, and I plan to keep it running for a year or a few.
