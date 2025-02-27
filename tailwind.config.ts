import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1536px",
        "2.5xl": "1745px",
        "3xl": "1920px",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        open: ["var(--font-open-sans)"],
        monse: ["var(--font-monse)"],
      },
      borderColor: {
        "gray-400-40": "rgba(117,117,117, 0.2)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        normal: "var(--normal)",
        dangerous: "var(--dangerous)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
