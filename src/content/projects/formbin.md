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

There are multiple websites providing simple connection between HTML forms and e-mails, such as [Formspree](https://formspree.io/) or [Formcarry](https://formcarry.com/). My main issue with those is expensive pricing, and limiting free tier.

My goal was to create equally simple HTML form backend, which is free and open source. To keep it 100% free, submissions aren't send by email, instead, stored in a database. To have experience similar to e-mail with notifications, pings, and ability to mark it as read, I decided to integrate with Discord.

While this idea was in my mind for over a year, I decided to work on this during [Leo's mini-hackathon](https://www.twitch.tv/learnwithleon) in collaboration with [Appwrite](https://appwrite.io/). Hackathon only lasted 3 days, out of which, I spent 2 days working on FormBin.

## Technologies

- Svelte and SvelteKit
- TailwindCSS (shadcn-svelte)
- Appwrite OAuth (GitHub)
- Appwrite Databases
- Discord webhooks

## Screens

A visitor is presented with a landing page that explains the purpose of the service, and quick call to actions to try out demo, or sign in. If an existing user visits homepage, instead, they are presented with a button to manage their forms.

![Homepage](/projects/formbin/homepage.png)

<br />

Before developer implements FormBin, the experience continues to a demo form page, where developer can experience how their HTML form may look like. A simple form includes a few inputs and a submit button.

![Demo](/projects/formbin/demo.png)

After submitting the form, a thank you page is showed, as proof of successful redirection after submission. Developer is now prompted to sign in and create their first form with FormBin. Similar to homepage, if developer is already signed in, they are presented with a button to manage their forms.

![Demo thanks](/projects/formbin/demo-thanks.png)

Sign-in page is the most minimal page, with a single button to sign in with GitHub. Once clicked, user is redirected to GitHub where they authorize the access, and then get redirected back to FormBin.

![Login](/projects/formbin/login.png)

Once authenticated, user is presented with list of forms. At the beginning it's empty, so only button to create new form is available. Once user adds a few forms, a list of cards shows form's name, hostname of redirect URL, and amount of submissions. By clicking a card, developer can view submissions and change form's settings.

![Forms](/projects/formbin/forms.png)

Have you noticed theme toggle in upper right corner? The entire website is styled with dark and light themes, and you can switch between them by clicking the toggle. Site also automatically detects user's preferred theme based on their system settings.

![Forms in light](/projects/formbin/light-theme.png)

Modal to create new form is very simple with focus on having as few inputs as possible. Form's name is a private name to organize it in FormBin, and redirect URL is a public URL to which visitor is redirected after submission HTML form on the developer's site.

![Create form](/projects/formbin/form-create.png)

Once the form is created, an onboarding page is shown, where developer can learn how to integrate FormBin into their HTML forms. By default, entire code snippet is presented, which when copied into HTML page, will be fully functional. Developer is then expected to modify their source code to incldue FormBin form, and visit the website locally, on staging, or on production. Finally, developer is guided to submit the form for the very first time, before finishing the onboarding flow.

If for any reason developer cannot finish the onboarding, but feels confident about using FormBin, they can click the skip button to get rid of the onboarding flow. If done by mistake, they can always see onboarding screen again from form's settings page.

![Onboarding](/projects/formbin/form-onboarding.png)

If developer already has existing form not connected at all, or connected to another service, they can see steps for integrating with existing HTML form, and a step by step cehcklist is presented. Rest of the flow remains the same.

![Onboarding for existing form](/projects/formbin/form-onboarding-existing.png)

Once developer successfully sends their first submission, and finishes onboarding by checking if the submissions were received by FormBin, they are redirected back to the list of their forms, with a confetti celebration effect.

![Forms confetti](/projects/formbin/form-celebrate.png)

By clicking on the form after onboarding, a list of submissions is shown, which now include at least one submission created by developer. A submission list supports pagination and presents "Show more" button if there are more than 25 results. A list of submissions is minimal by default, but when cliced, sumission is expanded to show all the details. The details can then be copied, or the submissions can be deleted.

![Forms submission](/projects/formbin/form-submission.png)

Any delete button on the FormBin is protected by a confirmation modal, to ensure no accidental deletes occur. Thanks to Appwrite, databases are backed up on daily basis, so in case of emergency, data can always be recovered.

![Deletion confirmation](/projects/formbin/delete-confirm.png)

In form settings, developer can change it's configuration, delete it, or integrate it with their Discord server's text channel. Discord integration links to Discord docs that explain how webhooks work, where to generate one, and how to use it.

![Form settings](/projects/formbin/form-settings.png)

Once integrated successfully, all new submissions will be sent to the Discord channel with a branded design.

![Discord integration](/projects/formbin/discord.png)

Last but not least, an account page shows ability to logout from the account.

![Logout](/projects/formbin/logout.png)

## Retrospective

The biggest learning point for me was focusing on **onboarding flow**. From the first moment I ensured to guide visitor through flows that feel simple and intuitive. Great example of this is demo contact form with registration CTA afterwards. Simplicity of creation also goes long way, by hiding more advanced settings to later step of configuring the form. Last but not least, I recieved amazing feedback about onboarding screen itself, and the validation given by checking for first successful submission. Having the flow guide dedicated user is amazing, but ability to skip it is equally necessary for those who just want to click through the app and see what features it offers.

Building my first production application using **shadcn** gave me confidence with this UI library, and strengthened my understanding of UI/UX design. While I don't feel like using it on every project from now on, I am glad it's in my "toolbox" and I can execute with it whenever needed.

"Thanks to" laziness I was tempted to skip **landing page** due to time constrains of weekend hackathon. While I did manage to set it up at the very end, it provided me great perspective. I used to setup landing page first, to make sure the design is impressive enough to attract users. Doing it at the very end was less focused on design, and more on it's features. While usually I force copy on homepage to fill spots, doing it last makes copy-writing insanely easy and serves as great validation that the product is exactly what I wanted it to be. I will surely continue in this spirit, building homepage at the very end.

## Future plans

Thanks to community feedback, I plan to add following features in the future:

- File and folder drag&drop support in the form submittion
- Captcha support by multiple providers to prevent spam
- SMTP integration for sending emails
- Improved submittion design and ability for export
- Starters with popular frameworks
- Written documentation and video content