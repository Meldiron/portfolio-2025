---
title: "Rewrite_"
pubDate: 2024-05-11 #Y-M-D
description: "Practice typing by rewriting books as you read them."
github: "meldiron/rewrite"
demo: "rewrite.almostapps.eu"
image: { url: "/projects/rewrite.png", alt: "Logo" }
cover: { url: "/projects/rewrite-thumbnail.png", alt: "Thumbnail" }
---

## Vision

The website [TypeLit](https://www.typelit.io/), which I used for a couple of weeks, required a paid subscription to add custom books. I upgraded, but soon realized the website was missing many features such as accent configuration, book page screenshots, gamification, and more.

When on a train, after finishing a page, TypeLit couldn't save my progress due to unstable internet connection, and there was no local backup. Instead of rewriting the page again, I decided to build my own application for it - Rewrite.

## Technologies

- Svelte and SvelteKit
- daisyUI with TailwindCSS
- Appwrite Databases
- Appwrite Functions using Node.JS
- Auth UI
- Google Cloud APIs
- EPUB.to APIs

## Screens

A simple homepage invites visitors to sign in before using the platform. To allow quick-play, users are welcome to create anonymous (guest) accounts with 1 click.

![Homepage](/projects/rewrite/homepage.png)

<br />

Authentication flows powered by [Auth UI](/projects/auth-ui), supporting many different authentication methods such as magic URL, phone OTP, email & password, OAuth, and more.

![Auth](/projects/rewrite/auth.png)

<br />

Logged-in users can visit a library containing books. They can pick from many pre-uploaded books, or upload their own `.epub` or `.pdf` books.

![Library](/projects/rewrite/library.png)

<br />

Once a user picks a book, they can select which page they want to rewrite. The table smartly filters out already finished pages, and sorts the rest in ascending order.

![Book](/projects/rewrite/book.png)

<br />

Rewriting a page of a book is the main view of this application. The user is given input and book's text. The goal is to rewrite the page without making mistakes - mistakes must be corrected.

![Game](/projects/rewrite/game.png)

If books include illustrations, users can also toggle page-view and see the book's original page design.

![Game 2-view](/projects/rewrite/game2.png)

<br />

Completing a page grants users experience points, and invites them to continue to the next book's page.

![Finish](/projects/rewrite/finish.png)

<br />

Current level progress and experience remaining can also be found in a level modal.

![level](/projects/rewrite/level.png)

<br />

Alongside leveling up the account, users can also maintain their streaks, and see how long they can go without missing a day of rewriting a page.

![streak](/projects/rewrite/streak.png)

<br />

You may have noticed golden words in the page; those were words needed to finish a quest. Doing quests grants coins that can be used for cool abilities.

![quests](/projects/rewrite/quests.png)

<br />

Users can also look at their profile statistics and complete set of achievements.

![stats](/projects/rewrite/stats.png)

## Retrospective

The project gave me the confidence to develop further apps with daisyUI to support dark theme and theming out of the box. I also experienced the implementation of many gamification features, which can serve as a stepping stone to making a proper gamified self-improvement platform in the future.

While working on this project wasn't much of a learning experience, it became an amazing free alternative to its paid competitors, providing all the features that they do. Since I used it myself, I was able to improve and maintain it for over a year.

One of the most interesting problems I faced was creating a self-explanatory interface while books were being processed, so users wouldn't be left hanging, not knowing what to do next.

## Future plans

Since the app serves exact purpose it was meant to, I don't plan to update it in near future. With that said, following are some features what I can see as an improvement:

- Dependency-free e-book parser
- Streak calendar
- Rewards for levels
- Sharable public profile
- 0 Trust server validation
- Community events and goals
