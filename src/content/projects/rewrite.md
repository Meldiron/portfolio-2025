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

A website [TypeLit](https://www.typelit.io/), which I used for couple of weeks, required a paid subscription to add custom books. I upgraded, but soon realised the website is missing many features such as accent configuration, book's page screenshot, gamification, and more.

When on train, after finishing a page, TypeLit couldn't save my progress due to unstable internet connection, and there was no local backup. Instead of rewriting the page again, I decided to build my own application for it - Rewrite.

## Technologies

- Svelte and SvelteKit
- TailwindCSS
- Appwrite Databases
- Appwrite Functions using Node.JS
- Auth UI
- Google Cloud APIs
- EPUB.to APIs

## Screens

A simple homepage inviting visitors to sign in before using the platform. To allow quick-play, users are welcome to create anonymous (guest) accounts with 1 click.

![Homepage](/projects/rewrite/homepage.png)

<br />

Authentication flows powered by [Auth UI](/projects/auth-ui), supporting many different authentication methods such as magic URL, phone OTP, email&password, OAuth, and more.

![Auth](/projects/rewrite/auth.png)

<br />

Logged-in users can visit a library containing books. They can pick from many pre-uploaded books, or upload their own `.epub` or `.pdf` books.

![Library](/projects/rewrite/library.png)

<br />

Once user picks a book, they can select whih page they want to rewrite. Table smartly filters-out already finished pages, and sorts the rest in ascending order.

![Book](/projects/rewrite/book.png)

<br />

Rewriting a page of a book is the main view of this application. User is given input and book's text. The goal is to rewrite the page without making mistakes - mistakes must be corrected.

![Game](/projects/rewrite/game.png)

If books include illustrations, user can also toggle page-view and see the book's page original design.

![Game 2-view](/projects/rewrite/game2.png)

<br />

Completing a page grants user experiences, and invites them to continue to the next book's page.

![Finish](/projects/rewrite/finish.png)

<br />

Current level progress and experience remaining can also be found in a level modal.

![level](/projects/rewrite/level.png)

<br />

Alongside leveling-up the account, users can also maintain their streaks, and see how long they can go without missing a day of rewriting a page.

![streak](/projects/rewrite/streak.png)

<br />

You may have noticed golden words in page, those were words needed to finish a quest. Doing quests grants coins that can be used for cool abilities.

![quests](/projects/rewrite/quests.png)

<br />

Users can also look at their profile statistics and complete set of achievements.

![stats](/projects/rewrite/stats.png)
