import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { remarkReadingTime } from "./remark-reading-time.mjs";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), svelte()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});