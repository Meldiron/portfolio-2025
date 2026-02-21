---
title: "Almost Moments"
pubDate: 2026-02-08 #Y-M-D
description: "Collect moments that almost slipped away. No apps, no signups, and for free."
github: "Meldiron/almost-moments"
demo: "https://moments.almostapps.eu/"
image: { url: "/projects/almost-moments.svg", alt: "Almost Moments logo" }
cover: { url: "/projects/almost-moments-thumbnail.png", alt: "Almost Moments Thumbnail" }
---

## Vision

Something about going on trips with friends.. trips, birthdays, anniversaries, summer trips, winter tris.. Something about few people being easy to share photos and videos, but 10 and more people gets very tricky.. airdrop needs too many transfers, google drive needs app and an account.. there are apps for this but they cost upwards of 25€ per event.

Something about using immich, open source gallery app, but hosting it on VPS which creates monthly maintain cost.

Something about recent experiment with Imagine, AI web builder for anyone. Something about knowing this abstract a lot of knowledge about how to use AI, talk to it, skills, memories, and much much more. Something about me wanting to learn it in "low-level", without abstraction of any tools. Specifically wanting to learn with Claude Code, as it supports skills.

---

Something about wanting to create application that is easy to use by both event organizer, and participants.

something about Event organizer creating an account (only him, noone else needs to), and quickly in matter of few click creating an empty gallery, being given URL to share, or QR code to print.

Something about public URL not requiring application, or sign ups, and working on all devices including phone, tablet, desktop and more.

Something about privacy and security, using Appwrite Databases, but using them correctly. And when client-side fetch cannot be done securely (like validating expiry date of a gallery), use of API endpoint in Next.js SSR application.

Something about ability to download all files together in single click, into a single file that is easy to backup. Something about this being good enough of export option, since for viewing purpose, public URL should be used, as it shows all images.

Something about public URL using optimizations to show images. Specifically blurhash, similar to Wolt, so blurry version shows before actual image loads, to keep user satisfied with loading process. Also mentioning using appwrite image transformation, preview endpoint, to show smaller version of images in preview, and only loading original file in fullscreen view. That allows loading much smaller images, while showing good enough quality  in grid at 720p, 80% quality, and transformed to webp.

## Technologies

Appwrite - auth, tablesDB, storage, sites (SSR)

blurhash

next.js

shad/cn

tailwind

zod

typescript

sharp

radix

qrcode


## Screens

something about prompting AI to do 5 uniquely different designs from each other for homepage, each on different git branch. Something about using designer and marketer skills from skills.sh. something about combining it and picking what I liked the most.

![Homepage hero](/projects/almost-moments/homepage-hero.png)

Something about being proud specifically about interactive showcase component, looking like apple UI when switching apps. Something about asking AI to do very common horizontal sliding gallery, and then limiting it to mobile border view, to achieve this design.

![Homepage interactive](/projects/almost-moments/homepage-interactive.mp4)

Something about bento grid component, but simple and easy to scan through. Something about specifically liking marking skills here, with copy explaing for who exactly this platform is useful, and what pain points it solves. In marketing its very good approach to point out a pain point, make reader feel it, and then giving a solution.

![Homepage grid](/projects/almost-moments/homepage-grid.png)

Not prompted, but AI decided to add comparasion with Google Drive directly, which is a great marketing catch too. Since google drive often requires app, an account, invitations...

![Homepage compare](/projects/almost-moments/homepage-compare.png)

Something about liking how AI defines F&A section with very good set of questions. Mention some answers were wrong, but very easy to fix before finishing homepage.

![Homepage faq](/projects/almost-moments/homepage-faq.png)

Lastly for homepage, something about a CTA section and a footer, both looking very simple and modern.

![Homepage footer](/projects/almost-moments/homepage-footer.png)

Next, something about login screen that supports sign up with email and password, or using Google OAuth (sign in) directly. Something about Magic URL for password reset.

![Auth login](/projects/almost-moments/auth-login.png)

After successful login, something about ability to use 2 factor authentication. And if enabled, TOTP will be requested before user can access the dashboard.

![Auth 2fa](/projects/almost-moments/auth-2fa.png)

Welcome to dashboard. Something about managing your galleries here.  Seeing list with most important details such as total pictures, title and short description, creation date, and public link expiry date.

Also mention ability to "star" (like) - mark galleries as favourites. Then you can easily filter to only see favourites, or more filters, like soon expiring, or created this year.

![Dashboard galleries](/projects/almost-moments/dashboard-galleries.png)

Mention thanks to use of shadcn, all components automatically support lgiht and dark theme both, so a simple toggle can switch it. This applies to all pages, but mention something about showcasing it here.

![Dashboard galleries light mode](/projects/almost-moments/dashboard-galleries-light.png)

Something about share button in gallery card, opening dropdown with multiple sharing options - qr code, opening link, or copying link.

![Dashboard share](/projects/almost-moments/dashboard-share.png)

Something about modal to create new gallery allowing to set name, optional description, and public link duration.

![Dashboard create gallery](/projects/almost-moments/dashboard-create-gallery.png)

Something about gallery manager page, which shows settings such as name, description, and public link duration, allowing changing all of that.

![Manage images](/projects/almost-moments/manage-images.png)

Something about UX improvement by showing warning alert component when gallery is soon to expire public link, with CTA to easily set new expiry.

![Manage expiring](/projects/almost-moments/manage-expiring.png)

Similarly, something about error alert component when public link already expired, with CTA to set new expiry.

![Manage expired](/projects/almost-moments/manage-expired.png)

Something about seeing all files in a list, paginated using cursor pagination, showing file name, size, and cretion date.

Something about creation date being tricky, weather it should be date of upload, or date when picture was taken. I decided to use date of taking picture, so when exporting all pictures from all participants, they remain in chronological order.

Something about ability to select a file, or bulk select multipe, or also selecting all with single click. Somethign about a slider showing from bottom allowing to delete files, or export them as ZIP.

![Manage bulk](/projects/almost-moments/manage-bulk.png)

Something about export button opening smal popover, showing progress which is useful when exporting large galleries of thousands of files.

![Manage progress download](/projects/almost-moments/manage-progress-download.png)

Something about new page, settings card, allowing you to change email, password, delete account, or enable 2 factor authentication.

![Settings cards](/projects/almost-moments/settings-cards.png)

Something about modal to enable 2 factor authentication showing QR code, or allowing to copy secret manually.

![Settings 2fa](/projects/almost-moments/settings-2fa.png)

Something about showing recovery codes after connecting TOTP (2fa). These can be used when losing device with second factor.

SOmetihng so they notice ability to regenerate recovery codes. Also important to mention user can disable second factor . Both these actions require recently refreshed session, which is done by doing second factor challenge in last 15 minutes. Frontend smartly cehcks that, and shows modal to refresh session by providing TOTP before doing those actions.

![Settings recovery codes](/projects/almost-moments/settings-recovery-codes.png)

## Future plans

Something about ability to show video and audio files too. Currently they are allowed, but preview only shows icon, instead of allowing to play video, or listen to audio files.

Something about read only mode, so participants can only download files, and event organizer can upload. Similarly, upload-only mode, when participants can upload pictures, but cannot see all gallery picturs.

Somehing about a new view for organizer - slideshow. Meant to be opened on some display or monitor on the event location, so participants are more likely to upload their pictures, so they get shown there.

Something about realtime updates to gallery, so if many people enter it at the same time, they can see how others people upload pictures live, jumping into the list one by one.

Finally, something about forgotten feature I realised only after I started using the app myself- a bility to remove galelry. So basic, yet missing, right now.
