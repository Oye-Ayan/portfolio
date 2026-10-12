'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const THEME_STORAGE_KEY = 'theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'dark' || stored === 'light' ? stored : null;
  } catch {
    return null;
  }
}

function applyThemeClass(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
  root.style.colorScheme = theme;
}

/**
 * Swap the theme in one visual step. Where the View Transitions API is available the whole
 * page cross-fades as a single composited snapshot, so every surface (canvas, cards, borders,
 * nav) changes in lockstep instead of each element easing at its own transition speed.
 */
function commitTheme(theme: Theme) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };

  if (doc.startViewTransition && !prefersReducedMotion) {
    doc.startViewTransition(() => applyThemeClass(theme));
  } else {
    applyThemeClass(theme);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Server render defaults to dark; the inline script in <head> has already set the real
  // class on <html> before paint, and we sync React state from it on mount.
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const initial: Theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setThemeState(initial);
    applyThemeClass(initial);

    // Follow OS changes only while the user hasn't made an explicit choice.
    const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (readStoredTheme()) return;
      const next: Theme = e.matches ? 'dark' : 'light';
      setThemeState(next);
      commitTheme(next);
    };

    // Keep multiple open tabs in sync.
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY) return;
      const next: Theme =
        e.newValue === 'dark' || e.newValue === 'light'
          ? e.newValue
          : systemQuery.matches ? 'dark' : 'light';
      setThemeState(next);
      applyThemeClass(next);
    };

    systemQuery.addEventListener('change', handleSystemChange);
    window.addEventListener('storage', handleStorage);
    return () => {
      systemQuery.removeEventListener('change', handleSystemChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the theme still applies for this session.
    }
    commitTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    // Read from the DOM, the source of truth, so rapid clicks never act on stale React state.
    const current: Theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
