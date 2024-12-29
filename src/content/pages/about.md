## The Beginnings

I started programming in 5th grade, and I built a web app for tracking homeworks. As ugly and buggy as it was, I will never stop being proud of this monstrosity. Soon after, I learned basics of frontend, backend, and databases - which allowed me to build a [PHP](https://www.php.net/)-based social platform at the age of 14.

![SharePark](/sharepark.png)

_The biggest challenge I faced was querying a database for users that were inactive for more than 5 minutes. I simply couldn't comprehend `user.activeAt >= now - 5min`, and it took me multiple weeks to implement this._

---

Websites weren't my thing, so I switched to gaming and developed many addons, mods, and even standalone games. While exploring [Unity](https://unity.com/), my backend skills backed me up (pun intended) to implement multiplayer and realtime interactions with [Colyseus](https://colyseus.io/) websockets.

As silly as it sounds, even Minecraft servers got a lot of networking complexity under the hood. My greatest achievement was a proxy on top of auto-scaling stateless instances of server using [CloudNet](https://github.com/CloudNetService/CloudNet), allowing to support as many players as imaginable (for me and all my 3 friends).

![Minecraft Cloud](/cloud.png)

---

Software slowly became boring, and I became interested in microcontrollers. [Arduino](https://www.arduino.cc/) and [Raspberry Pi](https://www.raspberrypi.com/) gave me a basic understanding of the Internet of Things, and made my bond with mom stronger, when debugging automated alarm clock 3am in the morning.

![LEDs](/led.jpg)

_It took me multiple dead SD cards and many burned LEDs to understand basics of current, voltage, and resistance. While not relevant in my career path, knowing electronics makes me understand boundaries of technologies, and how to connect them._

---

As you can see, my beginnings were all over the place. For a long time my source of passion wasn't mastering a skill, but learning what technologies are capable of, and finding their (and mine) limits. But slowly, I settled.

## Settle and optimize

Over the years I realised I want to make an impact. I want to build tools, help teachers, students, friends. Everyone. I quickly understood that the most commonly used platform is a web browser, so I aimed most of my focus on web developemt, becoming [fullstack developer](https://www.w3schools.com/whatis/whatis_fullstack.asp) in the process.

My very first work experience was a 1 year side-job building e-commerce store with [Node.js](https://nodejs.org/en)-based backend, and [React](https://react.dev/) frontend.

This was the most stressful time of my career. Not only did I faced many programming challenges, it was also my first time building in a collaborative team, under pressure of deadlines, and weight of responsibilities to deliver features to customer. It feels boring talking about it now as an adult, but my teenager self had a hard time.

![E-commerce database](/database.png)

_Most interesting problem I faced was dealing with large nested category trees. To prevent recursive search through database, I implemented [nested sets](https://en.wikipedia.org/wiki/Nested_set_model). Making it fast and memory-efficient wasn't an easy task for a self-tought developer who never heard of [big O notation](https://en.wikipedia.org/wiki/Big_O_notation) before._

---

After graduating the scool and becoming freelancer, I found out that speed of development is what makes me money. Throughout a year of freelancing I developed `Fullstack Boilerplate`, an web app starter with most of the processes automated. Soon after, when I realised it's hell to maintain such a project, I was faced with a hard decision - do I continue development of my starter, or do I become dependent on someone else technology?

I chose to use [Appwrite](https://appwrite.io/), since it was open sourced, and GitHub hosted everything I needed to be as confident with Appwrite, as I was with my own boilerplate

It didn't take long before I started contributing with to community, and later to source code as well. A magical thing happened when I made my first [pull request](https://github.com/appwrite/appwrite/pull/1308) - removing random 5 secods slowness in serverless functions. Founder of Appwrite reached out to me with a job interview offer, and an opportunity to become core member of Appwrite with full time contract.

![Function slowness](/slowness.png)

## Welcome to Open source

Appwrite was the opportunity of my life. My [GitHub graph](https://github.com/Meldiron?tab=overview&from=2024-12-01&to=2024-12-29) never looked cleaner, and I built dozens of free applications. I learned to work with every major runtime (Bun, C++, Dart, .NET, Go, Java, Kotlin, Node.js, PHP, Pythno, Ruby, Swift) and every major framework (Angular, Analog, Flutter, Next.js, Nuxt, Remix, SvelteKit). I also had opportunity to work on Appwrite Cloud and learn architecture management with [Terraform](https://www.terraform.io/), and Docker cluster orchestration with [Docker Swarm](https://docs.docker.com/engine/swarm/).

The biggest achievement by-far was a 0-downtime migration when I migrated hunderds of thousands projects across couple of databases with millions and millions of records into new databases, changing data structure in the process. The transfer was done while still serving tens of millions request, and the migration was a success with only 0.015% failure rate that were migrated manually afterwards.

Im proud of 0-downtime migration because it allowed me to learn how to develop critical parts of applications safely. Before launching the feature it was heavily tested, benchmarked, and simulated. I included validation scripts for every step with ability to retry, rollback, or recover. With this experience I have confidence into critical thinking when it comes to preventing downtime.

![0-downtime migration](/zdt.jpg)

## Leadership future

...
