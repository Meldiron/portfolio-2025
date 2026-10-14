---
title: "Because Life Happens"
pubDate: 2026-10-12 #Y-M-D
description: "A game-like playground showing what investments promise at 65 versus what life actually leaves."
github: "Meldiron/because-life-happens-v2"
demo: "because-life-happens.appwrite.network"
image: { url: "/projects/because-life-happens.svg", alt: "Because Life Happens" }
cover:
  {
    url: "/projects/because-life-happens-thumbnail.png",
    alt: "Because Life Happens Thumbnail",
  }
pageLayout: "showcase"
agentic: true
labels:
  - { name: "Vanilla JS" }
  - { name: "D3.js", url: "https://d3js.org/" }
  - { name: "pdf-lib", url: "https://pdf-lib.js.org/" }
  - { name: "Lucide", url: "https://lucide.dev/" }
  - { name: "Appwrite", url: "https://appwrite.io/" }
  - { name: "Claude Code", url: "https://claude.com/claude-code" }
screenshots:
  - url: "/projects/because-life-happens/1-hero.png"
    caption: "Hero section with the whole setup written as a single sentence. Instead of a form with sliders, you pick your age, savings, monthly amount, and retirement age right inside the sentence, so setting up a portfolio reads almost like telling a story. Below it, the promise from the brochure next to your reality."
  - url: "/projects/because-life-happens/2-saving-chart.png"
    caption: "The main chart. The dashed line is the promise, the pink line is your reality, and the shaded gap is what life took. On the right, a deck of life cards split into what life takes, pauses, and gives."
  - url: "/projects/because-life-happens/3-drag-card.png"
    caption: "Cards are dragged straight onto the timeline. While dragging, the chart highlights the drop age and shows both lines at that point, so you know exactly where the card lands."
  - url: "/projects/because-life-happens/4-event-popover.png"
    caption: "Clicking an icon opens a small popover explaining what the event really cost: not just the price, but what that money would have grown into by 65. Age and price can be adjusted right there."
  - url: "/projects/because-life-happens/5-hover-tooltip.png"
    caption: "Hovering anywhere on the chart compares the promise and the reality at that age."
  - url: "/projects/because-life-happens/6-retirement.png"
    caption: "Retirement chart showing how long the money lasts with a chosen monthly payout, rising with inflation. Life events can land here too, and once the pot hits zero, debt grows at 8% a year."
  - url: "/projects/because-life-happens/7-pdf-export.png"
    caption: "Export to a two-page PDF report with your settings, both charts, and every life event. The scenario is stored inside the PDF, so importing it (or dropping it on the page) restores everything exactly."
  - url: "/projects/because-life-happens/8-mobile.png"
    caption: "On phones and tablets, the card deck moves into a bottom bar with slide-up sheets, so the charts keep the whole screen."
  - url: "/projects/because-life-happens/9-v1-hockey-stick-playground.png"
    caption: "The previous version, Hockey Stick Playground, made for active investors and learners. The full version with every knob exposed: 400 simulated markets, market crashes, sequence of returns, inflation, and fees. Version 2 keeps the core idea and makes it much simpler."
---

Investment products love to promise an early retirement. Their charts show compound interest turning a monthly deposit into a fortune by 60. I first saw this explained in a YouTube video with nice visuals, but I wanted to try it with my own numbers and the life I actually expect. That became [Hockey Stick Playground](https://github.com/Meldiron/because-life-happens-v1), the first version of this project. It starts from the classic chart and lets you switch on what it leaves out: retirement payouts, life events, market swings, inflation, and fees.

The surprise is how much a few life events change the result. Compound interest works both ways: it multiplies the good years, but also every pause and every withdrawal. I also wanted to see the difference between the number on paper and what that money actually buys, and how raising the monthly deposit every year fights inflation.

I was amazed the first time I saw those graphs, but my friends had a hard time playing with the first version. So the same day, I built version 2: a simpler, game-like take for anyone who wants to learn a bit about money. You describe your plan in one sentence, almost like telling a story, then drag life onto your timeline and see what a new car, a baby, a lost job, or an inheritance does to your money, before and during retirement. Version 1 stays online for active investors and learners who want every setting.

Building it taught me that steady investing is the key, and that the best goal is not touching the money until retirement, so saving for a house or a car should happen outside the portfolio. Saving small amounts early barely moves your net worth, but it builds the habit. The numbers are rough on purpose: an agent picked them by researching live markets and how investment products are marketed, and different currencies would give different returns. It's a tool for intuition, not financial advice.

I shared it with colleagues on Discord, and a few found it really interesting. I want to keep it simple and use it when I talk to people about money, because the visuals make the idea easy to understand.
