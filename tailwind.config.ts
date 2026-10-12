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
      // Channel-based tokens so opacity modifiers (e.g. `bg-dark/95`, `border-accent/40`) compile.
      colors: {
        bg: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        'bg-alt': 'rgb(var(--color-bg-alt-rgb) / <alpha-value>)',
        dark: 'rgb(var(--color-bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        'surface-hover': 'rgb(var(--color-surface-hover-rgb) / <alpha-value>)',
        border: 'var(--color-border)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover-rgb) / <alpha-value>)',
          glow: 'var(--color-accent-glow)',
        },
        'text-primary': 'rgb(var(--color-text-primary-rgb) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary-rgb) / <alpha-value>)',
        'text-tertiary': 'rgb(var(--color-text-tertiary-rgb) / <alpha-value>)',
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
