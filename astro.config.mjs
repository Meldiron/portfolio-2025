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
    sitemap(),
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
