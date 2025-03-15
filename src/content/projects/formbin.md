---
title: "FormBin"
pubDate: 2025-02-18 #Y-M-D
description: "Simple and powerful backend for your HTML forms."
github: "Meldiron/form-bin"
demo: "formbin.almostapps.eu"
image: { url: "/projects/formbin.png", alt: "FormBin" }
cover: { url: "/projects/formbin-thumbnail.png", alt: "Thumbnail" }
---

## Vision

There are multiple websites providing simple connections between HTML forms and e-mails, such as [Formspree](https://formspree.io/) or [Formcarry](https://formcarry.com/). My main issue with those is expensive pricing and limiting free tiers.

My goal was to create an equally simple HTML form backend, which is free and open source. To keep it 100% free, submissions aren't sent by email, but instead are stored in a database. To have an experience similar to e-mail with notifications, pings, and ability to mark it as read, I decided to integrate with Discord.

While this idea was in my mind for over a year, I decided to work on this during [Leo's mini-hackathon](https://www.twitch.tv/learnwithleon) in collaboration with [Appwrite](https://appwrite.io/). The hackathon only lasted 3 days, out of which I spent 2 days working on FormBin.

## Technologies

- Svelte and SvelteKit
- TailwindCSS (shadcn-svelte)
- Appwrite OAuth (GitHub)
- Appwrite Databases
- Discord webhooks

## Screens

A visitor is presented with a landing page that explains the purpose of the service and quick call to actions to try out the demo or sign in. If an existing user visits the homepage, they are instead presented with a button to manage their forms.

![Homepage](/projects/formbin/homepage.png)

<br />

Before a developer implements FormBin, the experience continues to a demo form page, where they can experience how their HTML form may look. A simple form includes a few inputs and a submit button.

![Demo](/projects/formbin/demo.png)

After submitting the form, a thank you page is shown as proof of successful redirection after submission. The developer is now prompted to sign in and create their first form with FormBin. Similar to the homepage, if the developer is already signed in, they are presented with a button to manage their forms.

![Demo thanks](/projects/formbin/demo-thanks.png)

The sign-in page is the most minimal page, with a single button to sign in with GitHub. Once clicked, the user is redirected to GitHub where they authorize access, and then get redirected back to FormBin.

![Login](/projects/formbin/login.png)

Once authenticated, the user is presented with a list of forms. At the beginning it's empty, so only a button to create a new form is available. Once the user adds a few forms, a list of cards shows each form's name, hostname of redirect URL, and amount of submissions. By clicking a card, the developer can view submissions and change form settings.

![Forms](/projects/formbin/forms.png)

Have you noticed the theme toggle in the upper right corner? The entire website is styled with dark and light themes, and you can switch between them by clicking the toggle. The site also automatically detects the user's preferred theme based on their system settings.

![Forms in light](/projects/formbin/light-theme.png)

The modal to create a new form is very simple with focus on having as few inputs as possible. The form's name is a private name to organize it in FormBin, and the redirect URL is a public URL to which visitors are redirected after submitting the HTML form on the developer's site.

![Create form](/projects/formbin/form-create.png)

Once the form is created, an onboarding page is shown where developers can learn how to integrate FormBin into their HTML forms. By default, the entire code snippet is presented, which when copied into an HTML page, will be fully functional. Developers are then expected to modify their source code to include the FormBin form, and visit the website locally, on staging, or in production. Finally, developers are guided to submit the form for the very first time before finishing the onboarding flow.

If for any reason developers cannot finish the onboarding but feel confident about using FormBin, they can click the skip button to bypass the onboarding flow. If done by mistake, they can always see the onboarding screen again from the form's settings page.

![Onboarding](/projects/formbin/form-onboarding.png)

If developers already have an existing form not connected at all, or connected to another service, they can see steps for integrating with the existing HTML form, and a step-by-step checklist is presented. The rest of the flow remains the same.

![Onboarding for existing form](/projects/formbin/form-onboarding-existing.png)

Once developers successfully send their first submission and finish onboarding by checking if the submissions were received by FormBin, they are redirected back to the list of their forms with a confetti celebration effect.

![Forms confetti](/projects/formbin/form-celebrate.png)

By clicking on the form after onboarding, a list of submissions is shown, which now includes at least one submission created by the developer. The submission list supports pagination and presents a "Show more" button if there are more than 25 results. The list of submissions is minimal by default, but when clicked, submissions are expanded to show all details. The details can then be copied, or the submissions can be deleted.

![Forms submission](/projects/formbin/form-submission.png)

Any delete button on FormBin is protected by a confirmation modal to ensure no accidental deletions occur. Thanks to Appwrite, databases are backed up on a daily basis, so in case of emergency, data can always be recovered.

![Deletion confirmation](/projects/formbin/delete-confirm.png)

In form settings, developers can change its configuration, delete it, or integrate it with their Discord server's text channel. Discord integration links to Discord docs that explain how webhooks work, where to generate one, and how to use them.

![Form settings](/projects/formbin/form-settings.png)

Once integrated successfully, all new submissions will be sent to the Discord channel with a branded design.

![Discord integration](/projects/formbin/discord.png)

Last but not least, an account page shows the ability to log out from the account.

![Logout](/projects/formbin/logout.png)

## Retrospective

The biggest learning point for me was focusing on the **onboarding flow**. From the first moment, I ensured to guide visitors through flows that feel simple and intuitive. A great example of this is the demo contact form with registration CTA afterwards. Simplicity of creation also goes a long way by hiding more advanced settings until later steps of configuring the form. Last but not least, I received amazing feedback about the onboarding screen itself and the validation given by checking for first successful submission. Having the flow guide dedicated users is amazing, but the ability to skip it is equally necessary for those who just want to click through the app and see what features it offers.

Building my first production application using **shadcn** gave me confidence with this UI library and strengthened my understanding of UI/UX design. While I don't feel like using it on every project from now on, I am glad it's in my "toolbox" and I can execute with it whenever needed.

"Thanks to" laziness, I was tempted to skip the **landing page** due to time constraints of the weekend hackathon. While I did manage to set it up at the very end, it provided me with great perspective. I used to set up the landing page first to make sure the design was impressive enough to attract users. Doing it at the very end was less focused on design and more on its features. While usually I force copy on the homepage to fill spots, doing it last makes copywriting insanely easy and serves as great validation that the product is exactly what I wanted it to be. I will surely continue in this spirit, building the homepage at the very end.

## Future plans

Thanks to community feedback, I plan to add the following features in the future:

- File and folder drag & drop support in form submission
- Captcha support by multiple providers to prevent spam
- SMTP integration for sending emails
- Improved submission design and ability for export
- Starters with popular frameworks
- Written documentation and video content
