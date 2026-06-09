import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        njit: {
          red: "#D32032",
          "red-hover": "#B81C2B",
          "red-subtle": "#FEF2F2",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8FAFC",
          tertiary: "#F1F5F9",
        },
        ink: {
          DEFAULT: "#0F172A",
          secondary: "#475569",
          tertiary: "#94A3B8",
        },
        status: {
          open: "#16A34A",
          "open-bg": "#F0FDF4",
          filling: "#CA8A04",
          "filling-bg": "#FEFCE8",
          busy: "#EA580C",
          "busy-bg": "#FFF7ED",
          full: "#DC2626",
          "full-bg": "#FEF2F2",
          unknown: "#94A3B8",
          "unknown-bg": "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.05)",
        "card-hover": "0 4px 6px -1px rgba(0,0,0,0.07)",
        nav: "0 -1px 3px rgba(0,0,0,0.06)",
      },
      borderColor: {
        DEFAULT: "#E2E8F0",
      },
    },
  },
  plugins: [],
};
export default config;
