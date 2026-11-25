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
          page: "#f2f5f8",
          card: "#ffffff",
          line: "#e2e8ef",
          ink: "#0f151d",
          muted: "#5d6b7a",
          accent: "#0f9e7d",
          accentSoft: "#d8f3eb",
          inkPanel: "#0d131a",
          inkCard: "#161e28",
          inkLine: "#26313d",
          inkText: "#e9eff5",
          inkMuted: "#8b9aab",
          warn: "#a86300",
          warnSoft: "#fdf1dc",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 21, 29, 0.05), 0 8px 24px -18px rgba(15, 21, 29, 0.35)",
        panel: "0 0 0 1px rgba(255, 255, 255, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;