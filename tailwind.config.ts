import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0a0a0b',
        surface: '#121214',
        'surface-hover': '#1a1a1e',
        accent: {
          DEFAULT: '#64d99a',
          hover: '#4ece88',
          glow: 'rgba(100, 217, 154, 0.15)',
        },
        'text-primary': '#ececee',
        'text-secondary': '#a1a1aa',
        'text-tertiary': '#71717a',
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

/* REDESIGNED TAILWIND CONFIG BACKUP (commented out):
 * Accent #e8a87c (warm amber), Satoshi font-family.
 */
