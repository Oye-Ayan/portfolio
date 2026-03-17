/* ORIGINAL tailwind.config.ts - BACKUP:
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**\/*.{js,ts,jsx,tsx,mdx}",
    "./components/**\/*.{js,ts,jsx,tsx,mdx}",
    "./app/**\/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0A0E27',
          lighter: '#151B3D',
          accent: '#1E2749'
        },
        cyan: {
          DEFAULT: '#00D9FF',
          light: '#5FFBF1',
          dark: '#0099CC'
        },
        purple: {
          DEFAULT: '#A855F7',
          light: '#C084FC',
          dark: '#7C3AED'
        }
      },
      fontFamily: {
        'display': ['var(--font-display)'],
        'body': ['var(--font-body)'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00D9FF, 0 0 10px #00D9FF' },
          '100%': { boxShadow: '0 0 10px #00D9FF, 0 0 20px #00D9FF, 0 0 30px #00D9FF' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
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
          DEFAULT: '#0A0E27',
          lighter: '#151B3D',
          accent: '#1E2749'
        },
        cyan: {
          DEFAULT: '#00D9FF',
          light: '#5FFBF1',
          dark: '#0099CC'
        },
        purple: {
          DEFAULT: '#A855F7',
          light: '#C084FC',
          dark: '#7C3AED'
        }
      },
      fontFamily: {
        'display': ['var(--font-display)'],
        'body': ['var(--font-body)'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'drift': 'drift 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00D9FF, 0 0 10px #00D9FF' },
          '100%': { boxShadow: '0 0 10px #00D9FF, 0 0 20px #00D9FF, 0 0 30px #00D9FF' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'rotate-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0,217,255,0.2), 0 0 10px rgba(0,217,255,0.1)' },
          '50%': { boxShadow: '0 0 15px rgba(0,217,255,0.4), 0 0 30px rgba(0,217,255,0.2), 0 0 45px rgba(168,85,247,0.1)' },
        },
        drift: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(10px, -15px)' },
          '50%': { transform: 'translate(-5px, -25px)' },
          '75%': { transform: 'translate(-15px, -10px)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
