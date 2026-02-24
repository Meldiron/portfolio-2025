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
        black: "#1a1a1a",
        white: "#f5f5f4",
        accent: "#5cb8a5",
        "accent-hover": "#4a9e8d",
        surface: "#ffffff",
        border: "#d4d4d4",
        muted: "#6b7280",
      },
      fontFamily: {
        mono: ['"Geist Mono"', "monospace"],
      },
    },
  },
  plugins: [tailwindTypograpgy],
};
