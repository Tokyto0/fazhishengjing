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
        ink: "#10271d",
        ocean: "#155b3a",
        signal: "#17875f",
        mint: "#76c893",
        mist: "#f1f7f2",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "PingFang SC", "Microsoft YaHei", "sans-serif"],
        display: ["var(--font-display)", "STKaiti", "KaiTi", "serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16, 39, 29, 0.08)",
        glow: "0 0 50px rgba(23, 135, 95, 0.18)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(23,135,95,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(23,135,95,.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [typography],
};

export default config;
