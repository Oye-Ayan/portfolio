'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function ScrollToTop() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 400);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 group"
        >
          {/* Tooltip on Hover */}
          <div
            role="tooltip"
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl
                       bg-surface/95 dark:bg-[#121214]/95 border border-border shadow-xl backdrop-blur-md
                       text-xs font-semibold text-text-primary whitespace-nowrap
                       opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none
                       translate-x-2 group-hover:translate-x-0"
          >
            Scroll back to top
            <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-border" />
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full
                       bg-[rgba(255,255,255,0.92)] dark:bg-[rgba(18,18,20,0.92)]
                       backdrop-blur-xl border border-black/[0.09] dark:border-white/[0.08]
                       text-text-primary hover:text-accent
                       shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                       hover:border-accent/50 hover:shadow-[0_0_24px_rgba(5,150,105,0.25)] dark:hover:shadow-[0_0_24px_rgba(100,217,154,0.25)]
                       flex items-center justify-center
                       hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <FiArrowUp className="text-xl sm:text-2xl transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
