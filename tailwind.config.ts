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
        "primary-gray": "rgb(248,248,248)",
        "light-gray": "#E1E4E8",
        "light-lavander": "#F0E7F6",
        "light-green": "#CBDFD8",
      },
    },
  },
  plugins: [],
};
export default config;
