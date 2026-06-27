import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F6F4EF",
        ink: "#16233A",
        accent: "#2F5FE0",
        sky: { 50: "#F4F8FF", 100: "#E7F0FF", 200: "#CFE0FB" },
        stamp: "#9A3B3B",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      letterSpacing: { widest2: "0.28em" },
      transitionTimingFunction: { cinematic: "cubic-bezier(0.25,0.1,0.25,1)" },
    },
  },
  plugins: [],
};

export default config;
