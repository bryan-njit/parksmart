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
          red: "#E8364A",
          "red-hover": "#F0505F",
          "red-subtle": "rgba(232,54,74,0.12)",
        },
        // dark theme: near-black with a slight warm/red tint
        surface: {
          DEFAULT: "#0D0B0A",
          secondary: "#080504",
          tertiary: "#1C1918",
        },
        ink: {
          DEFAULT: "#EDEEF0",
          secondary: "#A8A8B0",
          tertiary: "#8E8E96",
        },
        status: {
          open: "#34D399",
          "open-bg": "rgba(52,211,153,0.12)",
          filling: "#FBBF24",
          "filling-bg": "rgba(251,191,36,0.12)",
          busy: "#FB923C",
          "busy-bg": "rgba(251,146,60,0.12)",
          full: "#F87171",
          "full-bg": "rgba(248,113,113,0.12)",
          unknown: "#71717A",
          "unknown-bg": "rgba(113,113,122,0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.5)",
        nav: "0 -1px 0 rgba(255,255,255,0.04)",
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.07)",
      },
    },
  },
  plugins: [],
};
export default config;
