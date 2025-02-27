import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    alpinejs({
      entrypoint: "/src/entrypoint",
    }),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
