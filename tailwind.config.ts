import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#071426",
        ocean: "#0b3261",
        signal: "#1687ff",
        mint: "#20c997",
        mist: "#f3f7fb",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "PingFang SC", "Microsoft YaHei", "sans-serif"],
        display: ["var(--font-display)", "STKaiti", "KaiTi", "serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(7, 20, 38, 0.08)",
        glow: "0 0 50px rgba(22, 135, 255, 0.18)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(22,135,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(22,135,255,.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [typography],
};

export default config;
