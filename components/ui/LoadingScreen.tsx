'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const completedRef = useRef(false);

  const notifyComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('loadingComplete'));
    }
    onLoadingComplete?.();
  }, [onLoadingComplete]);

  useEffect(() => {
    const dismiss = () => setIsLoading(false);

    // If page is already loaded, transition after a smooth micro-moment
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      const quickTimer = setTimeout(dismiss, 150);
      return () => clearTimeout(quickTimer);
    }

    const timer = setTimeout(dismiss, 350);
    window.addEventListener('load', dismiss, { once: true });

    // Failsafe timer: ensures completion is always signaled even if animation interrupts
    const fallbackTimer = setTimeout(notifyComplete, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
      window.removeEventListener('load', dismiss);
    };
  }, [notifyComplete]);

  return (
    <AnimatePresence onExitComplete={notifyComplete}>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] pointer-events-none flex flex-col items-center justify-center bg-dark"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4"
          >
            <span className="text-xl font-semibold tracking-[0.3em] text-text-primary uppercase">
              Ayan Khan
            </span>
          </motion.div>

          {/* Subtle loading indicator line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-6 w-24 h-px bg-accent transform origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
