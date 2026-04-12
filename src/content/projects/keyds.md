---
title: "KeyDS"
pubDate: 2026-04-12 #Y-M-D
description: "Internal management and distribution platform for drop-shipping software keys."
github: ""
demo: ""
image: { url: "/projects/keyds.svg", alt: "KeyDS" }
cover:
  {
    url: "/projects/keyds-thumbnail.png",
    alt: "KeyDS Thumbnail",
  }
pageLayout: "showcase"
labels:
  - { name: "TanStack Start", url: "https://tanstack.com/start" }
  - { name: "React", url: "https://react.dev/" }
  - { name: "Vite", url: "https://vite.dev/" }
  - { name: "Appwrite", url: "https://appwrite.io/" }
  - { name: "shadcn/ui", url: "https://ui.shadcn.com/" }
  - { name: "Tailwind CSS", url: "https://tailwindcss.com/" }
  - { name: "TypeScript", url: "https://www.typescriptlang.org/" }
screenshots:
  - url: "/projects/keyds/1-homepage.png"
    caption: "Landing page with a clear call-to-action, restricted to authorized organization members only. To make this secure, I utilized Appwrite Auth and Appwrite Teams - only members of `admin` team are allowed to see and manage database rows. If attaker overcomes frontend restrictions, API calls to backend will throw 401."
  - url: "/projects/keyds/2-login.png"
    caption: "Email-based sign in with an optional password field. If left empty, a one-time code will be relivered to email inbox instead. Email&password was added at later stages, since preview deployments didn't share cookie, and required login each time. Passwordless is great, but slow."
  - url: "/projects/keyds/3-login-otp.png"
    caption: "OTP verification screen with a security phrase to protect against phishing attempts. To ensure high-security during sign-in, same phrase is shown in browser, and in email. `Lovable volcano` is one of hilarious ones."
  - url: "/projects/keyds/4-unauthorized.png"
    caption: "Graceful access-denied screen for verified users who haven't been added to the team yet. A small touch on this screen is a realtime integration which reloads the site automatically when team membership is created."
  - url: "/projects/keyds/5-suppliers.png"
    caption: "A critical screen, dashboard with table of supplier products. This serves as a quick look into what all products are available in stock to be sold, at what price, with what restrictions, and how recently their price has been updated. Dashboard also includes current balance with the supplier for informative purposes, and a critically important information of last synchronization. As you can imagine, even 5 minute delayed synchronization can result in wrong assumption about supplier price, resulting in a loss when selling for margin."
  - url: "/projects/keyds/6-markets.png"
    caption: "Equally critical screen, a table of auctions at a market. Alongside all important information about supplier, here we also see selling price, price of cheapest competitor, and a detail about remaining free daily price changes. Above table we again see synchronization timer (important to ensure stock changes are reflected as quickly as possible, and competition price remains up to date), and debugging cards useful when something goes wrong."
  - url: "/projects/keyds/6.1-markets-live.png"
    caption: "Live marketplace listing with our auction highlighted. A happy moment to see everything working for final goal."
  - url: "/projects/keyds/6.2-market-order.png"
    caption: "Eneba order history showing fulfilled order. Also, a humble showcase of a few failed orders to showcase not everyone is perfect, but what matters, is the final result."
  - url: "/projects/keyds/7-audits.png"
    caption: "Audit log tracking every human-made, but also automatic action (such as synchronization crom, or market order fullfilment webhooks), to ensure any problem can be tracked down to the root cause."
  - url: "/projects/keyds/8-orders.png"
    caption: "And for final screen, just a celebration of all orders highlighting profit and product sold. Importantly, this also houses digital keys for scenarios order wasn't successful, so key can be re-used, or sent to buyer manually."
  - url: "/projects/keyds/9-time-popover.png"
    caption: "And now, few of my favourites! Every relative datetime, when hovered, shows exact time in UTC, in local timezone, and in engineer-friendly ISO format; all available to be copied easily."
  - url: "/projects/keyds/10-table-column-filter.png"
    caption: "Visibility of columns in all tables can be toggled, for personalization. All of these settings, alongside more below, are stoed in user prefferences, so they are remembered between reloads, sessions, and even devices."
  - url: "/projects/keyds/11-table-column-actions.png"
    caption: "All table columns can also be re-ordered (by dragging, or by left/right move action), or used for sorting of the rows. We also have show/hide action here too, for improved UX, to make finding this action easier."
  - url: "/projects/keyds/12-table-filter-date.png"
    caption: "Tables include multiple types of filters, one of my favourite, a date filter. All dates columns in tables can be filtered for specific day, or a range of days spanning weeks, months, or years."
  - url: "/projects/keyds/13-table-filter-combobox.png"
    caption: "For all enum columns (columns with limited set of possible values) act as search input with dropdown for all available options. This combobox is almost identical to typical search input, with difference, fulltext search is utilized to easier find what the user is looking for."
  - url: "/projects/keyds/14-table-filter-search.png"
    caption: "Full-text search is properly utilized in a search input linked to all relevant string attriutes. Any detail you can remember, you type it into the search box, and it very likely finds what you need."
  - url: "/projects/keyds/15-table-magic-fetch.png"
    caption: "Supplier ID was a special cell. I wanted to remain consistency between table and underlying database schema, but seing supplier details directly in the table was a huge benefit when using the dashboard. A great compromise was adding a toggle between seing ID and labels, with labels being product name and price; exactly the details useful in this dashboard."
  - url: "/projects/keyds/16-table-quick-edit.png"
    caption: "Since selling price needed to be edited very often, I added quick edit by double-clicking the value. Additionally, commision rates were fetched dynamically to always show you the final profit, so you can make the most educated decisions. Additionally, when editing price for more than 10 times per day, extra fee is applied, and this popover shows it in orange to warn you about it. Most likely this fee makes you not want to adjust price anymore, but in rare scenarios when margin still remains profitable, you can proceed after a warning."
  - url: "/projects/keyds/17-mobile-responsivity.png"
    caption: "Entire dashboard is fully responsive, with sidebar moved to the bottom of the screen for easy reachability on phone and tablet devices, and last deployment time moved to header."
  - url: "/projects/keyds/18-light-theme.png"
    caption: "And finally, since everything was made with shadcn/ui, you can easily switch between dark and light mode."
---
