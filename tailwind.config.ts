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
        background: "#FAF8F2",
        cream: "#FAF8F2",
        paper: "#FDFBF5",
        primary: {
          DEFAULT: "#237A57",
          dark: "#1a5e42",
          light: "#2d9a6e",
          50: "#EDF7F1",
          100: "#D4EBDD",
          200: "#A8D7BB",
          300: "#7DC399",
          400: "#52AF77",
          500: "#237A57",
          600: "#1a5e42",
          700: "#11422D",
          800: "#0A2B1D",
        },
        heading: "#0A2B1D",
        accent: {
          DEFAULT: "#D97745",
          light: "#E89A6D",
          dark: "#B85C2E",
        },
        warning: "#B42318",
        text: "#1F2933",
        muted: "#6B7280",
        border: "rgba(10, 43, 29, 0.08)",
      },
      fontFamily: {
        display: ['"Lora"', '"Be Vietnam Pro"', "Georgia", "serif"],
        sans: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
        body: ['"Be Vietnam Pro"', "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.55" }],
        base: ["17px", { lineHeight: "1.65" }],
        lg: ["19px", { lineHeight: "1.6" }],
        xl: ["22px", { lineHeight: "1.5" }],
        "2xl": ["28px", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
        "3xl": ["36px", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "4xl": ["48px", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "5xl": ["64px", { lineHeight: "1.05", letterSpacing: "-0.035em" }],
        "6xl": ["80px", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "7xl": ["104px", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        "8xl": ["128px", { lineHeight: "0.92", letterSpacing: "-0.05em" }],
      },
      borderRadius: {
        DEFAULT: "16px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10, 43, 29, 0.04), 0 4px 12px rgba(10, 43, 29, 0.04)",
        card: "0 4px 12px rgba(10, 43, 29, 0.06), 0 16px 48px rgba(10, 43, 29, 0.08)",
        premium: "0 24px 80px rgba(10, 43, 29, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
