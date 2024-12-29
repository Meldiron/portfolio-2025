---
title: "Why I chose to sponsor Offen"
pubDate: 2022-09-17 #Y-M-D
description: "I fell in love with open source opt-in web analytics."
author: "Matej Bačo"
image: { url: "/posts/offen.avif", alt: "Offen and Appwrite" }
---

Open-source is at the ❤️ of everything we do at Appwrite, and we want to enable and foster the open-source community that helped us grow to thrilling 24,000 stars on [GitHub](https://github.com/appwrite/appwrite). Open-source projects require a great deal of effort to maintain and grow. We use open-source tools every day to build Appwrite, and we want to help our community. To give back, each Appwrite engineer gets to pick an open-source project for Appwrite to sponsor for one year.

## 👁️ Fair analytics tool

Offen’s main product is [web analytics](https://www.offen.dev/), which is quite unique if you ask me. The analytics tool is a core requirement of any commercial website out there, as it provides many KPIs to define marketing success. Not only that, analytics can help you target your services to the right clients, increasing your overall income.

There are many (even self-hosted) analytics tools, but Offen is unique enough to beat them all in my eyes. While others focused on collecting valuable information and storing them lawfully, Offen’s core value is to create visitor-friendly analytics. At your first interaction with Offen, you will notice it only allows first-party cookies, which is a great example of how they focus on visitor security in exchange for making setup a bit more complex. Once you set it up, you notice a second important feature, you can’t really see visitors in your dashboard yet. Offen is opt-in only, which means, you don’t track visitor until he clicks ‘Allow’. Offen also comes with a dashboard for visitors to see what **exact** information you have about them, with an option to opt-out or delete all data with 1 click.

Alongside these product-defining features, you can see functionality that can easily compare with industry-leading competitors:

- Customizable consent banner
- Comply with GDPR
- End-to-end encryption
- Much more!

I am yet to use Offen analytics tool on a real project, but since day one I learned about it, I have been recommending it as a Plausible and Google Analytics alternative.

![Offen showcase](/posts/offen-stats.png)

## 🧰 Developer tooling

Alongside the amazing analytics project Offen has to provide, their GitHub organization includes many different tools such as [schemaify](https://github.com/offen/schemaify), [analyticstxt](https://github.com/offen/analyticstxt) or [l10nify](https://github.com/offen/l10nify). The one tool I like the most is [docker-volume-backup](https://github.com/offen/docker-volume-backup).

Nowadays many self-hosted projects provide Docker support to ensure simple setup, upgrade, deployment and maintenance. Docker also often solves the legendary quote ‘It works on my machine’. Once you start using Docker on production (which you can and should), you will notice there is no backup&restore mechanism available by default.

Offen provides a Docker image that you can run alongside your Docker application to back up anything you might need. Under the hood, the Offen container mounts to the exact same volumes your application does, and backups files depending on your configuration.

What’s cool is Offen’s Docker Volume Backup can be as simple or as complex as your project needs. On my server, I started with a simple `backup.sh` script, but gradually improved it to a more mature solution with many features Offen has to provide:

- Recurring backups (daily/weekly/monthly)
- Upload backups to the cloud
- Mirrored backups to multiple storage providers
- Maintenance mode during backup to ensure data integrity
- Alerts about failed backups
- Backup encryption
- Backup rotation to remove old ones

With such advanced backup in place, all worries about data loss have been taken from my shoulder. I am so confident with Offen’s backup tool I have been recommending it to the Appwrite community to properly [backup their Appwrite instance](https://gist.github.com/Meldiron/47b5851663668102a676aff43c6341f7)!

## ☢️ Open-source Software (OSS) Is Hard

Since Appwrite is open-source, we understand the challenges that OSS projects face. If you fall in love ❤️ with an open-source project (like we have), consider checking out ways to contribute. Most OSS projects happily accept contributions in their own way, whether they be in the form of commits, bug 🐛 reports, advocacy, or even monetary 💰 support. If you love `Offen`, consider joining us as a sponsor. Or, if you're interested in contributing to Appwrite, check out our [contribution guide](https://github.com/appwrite/appwrite/blob/master/CONTRIBUTING.md).

## 🔗 Learn more about Appwrite

Check out Appwrite as the backend for your next [Web](https://appwrite.io/docs/getting-started-for-web), [Flutter](https://appwrite.io/docs/getting-started-for-flutter), or [Server](https://appwrite.io/docs/getting-started-for-server) application. Here are some handy links for more information:

- [Appwrite Contribution Guide](https://github.com/appwrite/appwrite/blob/master/CONTRIBUTING.md)
- [Appwrite Discord](https://appwrite.io/discord)
- [Appwrite Github](https://github.com/appwrite)
- [Appwrite Documentation](https://appwrite.io/docs)
