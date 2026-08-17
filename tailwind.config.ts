/* ORIGINAL tailwind.config.ts BACKUP:
 * - colors: dark (#0a0a0b), accent (#64d99a green), text (#ececee/#7a7a80/#4a4a50)
 * - fontFamily: display (Syne), body (Space Grotesk), mono (JetBrains Mono)
 * - animations: fadeIn, slideUp, scaleIn
 * - spacing: 18/22/30/34
 */

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
          DEFAULT: '#0b0b0e',
          lighter: '#121215',
          accent: '#1a1a1e',
          muted: '#232328',
        },
        accent: {
          DEFAULT: '#e8a87c',
          dim: 'rgba(232, 168, 124, 0.12)',
          glow: 'rgba(232, 168, 124, 0.06)',
        },
        text: {
          primary: '#e8e8ec',
          secondary: '#8a8a92',
          tertiary: '#52525a',
        },
      },
      fontFamily: {
        'display': ['Satoshi', 'system-ui', 'sans-serif'],
        'body': ['Satoshi', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
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
