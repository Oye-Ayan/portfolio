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

  const sizeClasses = showLabel ? 'p-2' : 'w-10 h-10 justify-center';

  if (!mounted) {
    // Same footprint as the real button to avoid a layout shift; theme-neutral tokens avoid a flash.
    return (
      <div
        aria-hidden="true"
        className={`rounded-xl border border-border bg-surface/40 ${sizeClasses} ${className}`}
      />
    );
  }

  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative flex items-center gap-2 rounded-xl transition-colors duration-300 border touch-manipulation ${sizeClasses} ${
        isDark
          ? 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] hover:border-accent/40 text-text-secondary hover:text-accent'
          : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.08] hover:border-accent/50 text-text-secondary hover:text-accent'
      } ${className}`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-lg flex items-center justify-center"
        aria-hidden="true"
      >
        {isDark ? <FiSun className="text-accent" /> : <FiMoon className="text-accent" />}
      </motion.span>

      {showLabel && (
        <span className="text-xs font-medium tracking-wide capitalize text-text-primary">
          {isDark ? 'Light' : 'Dark'} Mode
        </span>
      )}
    </motion.button>
  );
}
