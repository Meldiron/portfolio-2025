---
title: "Investment Playground"
pubDate: 2026-10-12 #Y-M-D
description: "A game-like playground showing what investments promise at 65 versus what life actually leaves."
github: "Meldiron/investment-playground-v2"
demo: "investment-playground-v2.appwrite.network"
image: { url: "/projects/investment-playground.svg", alt: "Investment Playground" }
cover:
  {
    url: "/projects/investment-playground-thumbnail.png",
    alt: "Investment Playground Thumbnail",
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
  - url: "/projects/investment-playground/1-hero.png"
    caption: "Hero section with the whole setup written as a single sentence. Instead of a form with sliders, you pick your age, savings, monthly amount, and retirement age right inside the sentence. Below it, the promise from the brochure next to your reality."
  - url: "/projects/investment-playground/2-saving-chart.png"
    caption: "The main chart. The dashed line is the promise, the pink line is your reality, and the shaded gap is what life took. On the right, a deck of life cards split into what life takes, pauses, and gives."
  - url: "/projects/investment-playground/3-drag-card.png"
    caption: "Cards are dragged straight onto the timeline. While dragging, the chart highlights the drop age and shows both lines at that point, so you know exactly where the card lands."
  - url: "/projects/investment-playground/4-event-popover.png"
    caption: "Clicking an icon opens a small popover explaining what the event really cost - not just the price, but what that money would have grown into by 65. Age and price can be adjusted right there."
  - url: "/projects/investment-playground/5-hover-tooltip.png"
    caption: "Hovering anywhere on the chart compares the promise and the reality at that age."
  - url: "/projects/investment-playground/6-retirement.png"
    caption: "Retirement chart showing how long the money lasts with a chosen monthly payout, rising with inflation. Life events can land here too, and once the pot hits zero, debt grows at 8% a year."
  - url: "/projects/investment-playground/7-pdf-export.png"
    caption: "Export to a two-page PDF report with your settings, both charts, and every life event. The scenario is stored inside the PDF, so importing it (or dropping it on the page) restores everything exactly."
  - url: "/projects/investment-playground/8-mobile.png"
    caption: "On phones and tablets, the card deck moves into a bottom bar with slide-up sheets, so the charts keep the whole screen."
  - url: "/projects/investment-playground/9-v1-hockey-stick-playground.png"
    caption: "The previous version, Hockey Stick Playground. The full version with every knob exposed: 400 simulated markets, market crashes, sequence of returns, inflation, and fees. Version 2 keeps the core idea and makes it much simpler."
---

Every investing talk shows the same chart: money goes in, the line curves up, and a huge number waits for you at 65. The original idea came from a podcast and turned into [Hockey Stick Playground](https://github.com/Meldiron/investment-playground-v1), the first version of this project. It starts from that chart and lets you switch on everything it leaves out - retirement payouts, life events, market swings, inflation, and fees.

Version 2 is the simpler, game-like take. You describe your plan in one sentence, then drag life onto your timeline - a new car, a baby, a lost job, an inheritance - and see exactly what each one does to your money, both before and during retirement.
