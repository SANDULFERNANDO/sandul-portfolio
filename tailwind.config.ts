import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#F7F4EF",
          dark: "#111111",
        },
        fg: {
          DEFAULT: "#111111",
          dark: "#F7F4EF",
        },
        muted: {
          DEFAULT: "#666666",
          dark: "#888888",
        },
        card: {
          DEFAULT: "#FFFFFF",
          dark: "#1A1A1A",
        },
        pill: {
          DEFAULT: "#EDEAE4",
          dark: "#2A2A2A",
        },
        accent: "#8B7355",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
      },
      letterSpacing: {
        tightest: "-0.05em",
        tighter: "-0.03em",
        tight: "-0.02em",
      },
      boxShadow: {
        card: "0 2px 20px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04)",
        "card-dark": "0 2px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
