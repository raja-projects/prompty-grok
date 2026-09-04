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
          bg: "#0b0d12",
          surface: "#12151c",
          elevated: "#1a1f2b",
          border: "#2a3142",
          muted: "#8b93a7",
          accent: "#7c6cff",
          accent2: "#22d3ee",
          glow: "#a78bfa",
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
        glow: "0 0 40px rgba(124, 108, 255, 0.25)",
        "glow-sm": "0 0 20px rgba(124, 108, 255, 0.15)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(124,108,255,0.12), transparent 55%), radial-gradient(ellipse at bottom right, rgba(34,211,238,0.08), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
