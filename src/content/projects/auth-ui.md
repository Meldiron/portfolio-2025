---
title: "Auth UI"
pubDate: 2024-05-11 #Y-M-D
description: "Fully customizable login flow for any applications."
github: "Meldiron/authui"
demo: "authui.site"
image: { url: "/projects/auth-ui.png", alt: "Auth UI" }
cover: { url: "/projects/auth-ui-thumbnail.png", alt: "Thumbnail" }
---

## Vision

There are many backend-as-a-service platforms that include authentication and authorization as one of their main features. While this already saves a lot of time, popular platforms such as [Auth0](https://auth0.com/), [Supabase](https://supabase.com/), or [Firebase](https://firebase.google.com/) made auth even simpler by providing login pages out of the box.

I researched how they work, and I liked the simplicity of [Auth0 Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login), allowing developers to customize through a simple admin panel. Compared to [Supabase UI Auth](https://ui.supabase.io/components/auth) components, which focus on implementation using React components, I much prefer the simplicity and framework-agnostic approach of Auth0.

With this in mind, I wanted to create a similar Auth UI kit for [Appwrite](https://appwrite.io/). The main focus of the UI kit was:

- Simple setup and use
- Customizable branding
- Platform-agnostic (adapters for popular backends)
- Secure by default
- Free and open-source

## Technologies

- Svelte and SvelteKit
- Pink 1.0 design system
- Appwrite Auth
- Appwrite Databases
- Appwrite Storage

## Screens

The developer is welcomed with the entire application that slowly fades away as the visitor scrolls. Interaction is not possible, and the entire website is locked and overlaid with a prompt to sign in. This design gives visitors a basic understanding of what the website has to offer while prompting them to sign in before getting any value.

![Onboarding](/projects/auth-ui/onboarding.png)

A sign-in page into Auth UI offers simple email and password login, alongside GitHub OAuth authentication. While this doesn't show all features available, it already provides a great understanding of what developers can expect from Auth UI when making their own login screens.

![Sign in](/projects/auth-ui/sign-in.png)

Once developers are signed in, they are redirected back to the homepage that is now unlocked and the website can be interacted with. A form to create a new login page is visible, alongside a quick preview of what the page will look like once finished.

![Create site](/projects/auth-ui/create-site.png)

As seen throughout the remaining steps in the form, developers can customize the auth page to their liking including its design, copy, and which features are enabled.

They can also preview screens for different features:

- Sign-in with all enabled methods
- Sign-up with email and password
- Password recovery
- Phone OTP login
- E-mail OTP or MagicURL login

![Site customization](/projects/auth-ui/site-customization.png)

As the final step of preparation, developers are asked to pick which backend-as-a-service they are using and configure connection to their project. This ensures all users are registered under their accounts and organizations, instead of registering them under Auth UI (and Auth UI owning the authentication database).

![Site connection](/projects/auth-ui/site-connection.png)

Once developers finish configuration of their auth page, a small celebration copy is shown alongside any remaining steps that need to be done in the console of their backend provider. Developers can now also easily copy a URL or small HTML snippet with a link to their newly created auth page.

![Successful creation](/projects/auth-ui/successful-creation.png)

As developers keep creating more auth pages with Auth UI, they can find them at the top of the homepage. Sites can be easily edited, removed, or they can re-visit the celebration screen to easily get access to the URL again.

![Sites list](/projects/auth-ui/sites-list.png)

A screen that wasn't visible to developers yet is one that their users can see if they visit the auth page after already signing in. Developers can decide to show it to them, as this page includes account management for easily knowing which user is currently signed in and the ability to sign out.

![Account page](/projects/auth-ui/account-page.png)

## Retrospective

After sharing the tool with developers using Appwrite in the community Discord server, hundreds of developers started using it. Feedback from those first adopters allowed me to quickly add highly requested features such as customization of legal URLs or roundness of buttons. Furthermore, in following months during free time, I added dark theme support and kept it up to date with latest Appwrite features such as email OTP.

I also received great feedback for making authorization into Auth UI powered by Auth UI itself. This shows confidence in reliability, design, and features supported by the flow.

After a couple of weeks after release, a community member recorded a video on how to use Auth UI with Appwrite, which gave me a huge confidence boost in this project. Since then Auth UI had a couple of downtimes, due to which multiple developers sent me PMs asking when a fix could be expected. All of this goes to show the project idea was quickly validated and has a bright future.

## Future plans

As Auth UI gains more popularity, I plan to add more features as requested. Some ideas provided already include:

- More account details and option to reset password
- 2-factor challenge support
- Session management
- Ability to link/unlink social accounts
- Ability to delete or block account