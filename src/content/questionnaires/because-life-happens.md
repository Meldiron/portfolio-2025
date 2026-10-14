---
project: "because-life-happens"
title: "Because Life Happens"
answeredAt: 2026-10-14
---

These are the questions an agent asked me before writing this case study, and my answers exactly as I typed them, typos included. I answered them in a form, and the agent turned them into the article.

## What the agent found

Before asking anything, the agent read the code, the commit history and the live app. This is the summary it showed me.

The case study is already live as a short showcase: two paragraphs and nine screenshots with captions. This questionnaire is short too. Your answers will add a few sentences of your own knowledge to the text and captions, and the questions and answers will be linked from the agentic note like the other projects.

What I know: both versions were built on 2026-10-12. v1, Hockey Stick Playground, starts from the classic compound-interest chart and lets you switch on what it leaves out: retirement payouts, life events, 400 simulated markets, a market crash, sequence of returns, inflation and fees. v2, Because Life Happens, is the simpler, game-like take: a setup sentence, life cards you drag onto the timeline, a retirement chart, and a PDF report that stores the scenario so it can be imported again.

Each version is a single HTML file with D3 charts (and pdf-lib in v2), no backend. Every commit in both repos is co-authored by Claude Opus 5.5. v1 is hosted on Surge, v2 on Appwrite Sites in a project called agentic-playground. The defaults are 7% for stocks, 2.5% inflation, 8% debt interest, the 4% rule, and a timeline that ends at 100.

## Fact check

Claims the agent wasn't sure about, and my verdict.

- **Both versions were built on the same day, 2026-10-12. v2's repository was created 17 minutes after v1's.**  
  _Correct._
- **v2 is the main project, and v1 is kept as the more detailed version for people who want every knob.**  
  _Correct._
- **Both were built with Claude, with you directing and testing rather than writing the code yourself.**  
  _Correct._

## Origin

### Which podcast inspired it, and what in it made you want to build this?

_A name and a link to the episode would be great, so the case study can point to it._

I heard a YouTube video on this topic. He had nice visuals but I wanted to tweak it to my numbers and my expected life situations.

### What point were you trying to make with it?

_Is it a warning about investing talks, a tool for your own planning, something for friends?_

Investment products often make promise on early retirement and show graphs that , thanks to compound interest, make it look like you are going to be millionare by age of 60.

But by adding few life events that make you pause investments, or even take them out, the ourcome greatly changes - making small change early-on in portfolio volume can also greatly impact it, due to compboind interest (its two street way, both positive get scaled, but negative too).

I also liked to see how "on paper money" compares to "what it actually  buys", and how increasing deposits yearly can fight that lose of value.

### Who is it for?

V1 is for active investors or learners, looking to understand it better. V2 is for everyone who wants to learn a bit about money.

## Building it

### Why build a second, simpler version on the same day? What wasn't working in v1?

My friends had hard time playing with it. I felt amazed when I saw graphs for first time, but they couldnt get the same experience. thats what expired simpler, V2 version

### Which design decision are you happiest with?

_The setup written as one sentence, life cards you drag onto the timeline, "what it buys today" as the default view, the PDF that stores the scenario…_

I really like how configurations is aslmost as story-telling, just filling some basic easy details, and having the portfolio setup ready.

### How did you pick the numbers and make sure the maths is right?

_7% stocks, 2.5% inflation, 8% debt interest, the 4% rule, card prices._

I already know math isnt right, becasue different currenties give different yields.. But all the stats were picekd by a agentic research of live markets and marketing of investment produts.

### How did you build it, and what is the agentic-playground project it's deployed in?

Not relevant for the case study

## Results

### What did building it teach you, about investing or about building with agents?

I learned that steady investments is the key. Not having to touch funds until retirement is the best goal. Saving for big financial goals like buying house, or a car should not affect portfolio investments (actions, stocks)

I also learned that saving small money early-on has very little impact on the net worth, but huge impact on habit building.

### Did you share it anywhere? How did people react?

I shared it with colleagues on Discord and few found it very interesting.

### Anything you'd still like to add or change?

I want to keep it simple, but I plan to use it as showcase in future when I talk to folks on these topics. These visuals makes it very easy to understand.

### Anything else I got wrong or should know?

All good
