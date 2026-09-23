'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fail-open immediately: never gatekeep DOM visibility or wait on slow third-party scripts.
    // Cap screen display to a maximum of 400ms under all network conditions.
    const dismiss = () => setIsLoading(false);

    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      dismiss();
      return;
    }

    const timer = setTimeout(dismiss, 400);

    window.addEventListener('load', dismiss, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', dismiss);
    };
  }, []);

  return (
    <AnimatePresence>
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
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mt-6 w-24 h-px bg-accent transform origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
