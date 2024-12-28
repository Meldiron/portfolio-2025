/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "black": "#19191D",
        "white": "#EDEDF0",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
