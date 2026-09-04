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
        prompty: {
          bg: "#0c1018",
          surface: "#121923",
          elevated: "#1a2430",
          border: "#2d3947",
          muted: "#8e9baa",
          accent: "#796bb0",
          accent2: "#64cfc5",
          glow: "#b47daa",
          success: "#34d399",
          warn: "#fbbf24",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 18px 48px rgba(70, 99, 118, 0.20)",
        "glow-sm": "0 10px 28px rgba(100, 207, 197, 0.10)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(100,207,197,0.07), transparent 55%), radial-gradient(ellipse at bottom right, rgba(167,123,243,0.06), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
