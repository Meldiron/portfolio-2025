import tailwindTypograpgy from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screens: {
        xs: "540px",
        xxs: "380px",
      },
      colors: {
        black: "#000",
        white: "#FFF",
      },
    },
  },
  plugins: [tailwindTypograpgy],
};
