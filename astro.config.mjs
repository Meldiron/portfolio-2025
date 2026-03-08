import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://www.matejbaco.eu",
  integrations: [
    sitemap({
      changefreq: "weekly",
      lastmod: new Date(),
      serialize(item) {
        const url = item.url.replace(/\/$/, "");
        if (url === "https://www.matejbaco.eu") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (url.endsWith("/blog") || url.endsWith("/projects")) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        } else if (url.endsWith("/about")) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        } else if (url.includes("/blog/")) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        } else if (url.includes("/projects/")) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        }
        return item;
      },
    }),
    tailwind(),
    icon({
      include: {
        mdi: ["*"],
        devicon: ["*"],
        logos: ["*"],
        "simple-icons": [
          "openai",
          "claude",
          "googlegemini",
          "raycast",
          "meta",
          "perplexity",
          "ollama",
        ],
      },
    }),
    alpinejs({
      entrypoint: "/src/entrypoint",
    }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
