'use client';

import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../theme/ThemeContext';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] ${className}`} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative flex items-center gap-2 p-2 rounded-xl transition-all duration-300 border ${
        isDark
          ? 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] hover:border-accent/40 text-text-secondary hover:text-accent'
          : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.08] hover:border-accent/50 text-text-secondary hover:text-accent'
      } ${className}`}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-lg flex items-center justify-center"
      >
        {isDark ? (
          <FiSun className="text-accent" />
        ) : (
          <FiMoon className="text-accent" />
        )}
      </motion.div>

      {showLabel && (
        <span className="text-xs font-medium tracking-wide capitalize text-text-primary">
          {isDark ? 'Light' : 'Dark'} Mode
        </span>
      )}
    </motion.button>
  );
}
