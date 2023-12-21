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
        "eldar-grey": "#262626",
        "eldar-light-grey": "#e2e2e2",
        "eldar-blue": "#4A8ECC",
      },
    },
  },
  plugins: [],
};
export default config;
