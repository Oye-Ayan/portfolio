
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
        dark: {
          DEFAULT: '#0a0a0b',
          lighter: '#111113',
          accent: '#19191c',
          muted: '#222226',
        },
        accent: {
          DEFAULT: '#64d99a',
          dim: 'rgba(100, 217, 154, 0.15)',
          glow: 'rgba(100, 217, 154, 0.08)',
        },
        text: {
          primary: '#ececee',
          secondary: '#7a7a80',
          tertiary: '#4a4a50',
        },
      },
      fontFamily: {
        'display': ['var(--font-display)'],
        'body': ['var(--font-body)'],
        'mono': ['var(--font-mono)'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s var(--ease-out-expo) forwards',
        'slide-up': 'slideUp 0.8s var(--ease-out-expo) forwards',
        'scale-in': 'scaleIn 0.6s var(--ease-out-expo) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
    },
  },
  plugins: [],
};
export default config;
