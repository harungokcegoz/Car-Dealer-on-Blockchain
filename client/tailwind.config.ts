import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    fontWeight: {
      'light': "300",
      'normal': "400",
      'medium': "500",
      'semibold': "600",
      'bold': "700",
      'extrabold': "800",
      'black': "900",
    },
    extend: {
      width: {
        '100px': '100px',
      },
    },
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};
export default config;
