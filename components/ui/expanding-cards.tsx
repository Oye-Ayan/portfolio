'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { type LucideIcon, X, ExternalLink } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ExpandingCardItem {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
  icon: LucideIcon;
  date?: string;
  verifyUrl?: string;
  pdfSrc?: string;
}

interface ExpandingCardsProps {
  items: ExpandingCardItem[];
  defaultOpenIndex?: number;
  className?: string;
}

// ─── Spring Configs ──────────────────────────────────────────────────────────

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

const CONTENT_SPRING = { type: 'spring' as const, stiffness: 260, damping: 25 };

// ─── Responsive Hook ─────────────────────────────────────────────────────────

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ExpandingCards({
  items,
  defaultOpenIndex = 0,
  className = '',
}: ExpandingCardsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultOpenIndex);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const interactionTimer = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  // ── Scroll-driven auto-advance ──────────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.25'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (isUserInteracting) return;
    const clamped = Math.max(0, Math.min(0.999, v));
    const idx = Math.min(
      Math.floor(clamped * items.length),
      items.length - 1,
    );
    setActiveIndex(idx);
  });

  // ── Hover ───────────────────────────────────────────────────────────────
  const handleMouseEnter = useCallback((index: number) => {
    setIsUserInteracting(true);
    setActiveIndex(index);
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (interactionTimer.current) clearTimeout(interactionTimer.current);
    interactionTimer.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 1500);
  }, []);

  // ── Click: collapsed → expand, expanded → lightbox ──────────────────────
  const handleClick = useCallback(
    (index: number) => {
      setIsUserInteracting(true);
      if (interactionTimer.current) clearTimeout(interactionTimer.current);

      if (index === activeIndex) {
        if (items[index].pdfSrc) {
          window.open(items[index].pdfSrc, '_blank', 'noopener,noreferrer');
        } else {
          setLightboxSrc(items[index].imgSrc);
        }
      } else {
        setActiveIndex(index);
      }

      interactionTimer.current = setTimeout(() => {
        setIsUserInteracting(false);
      }, 2500);
    },
    [activeIndex, items],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(index);
      }
    },
    [handleClick],
  );

  // Cleanup
  useEffect(() => {
    return () => {
      if (interactionTimer.current) clearTimeout(interactionTimer.current);
    };
  }, []);

  // ── Grid template ───────────────────────────────────────────────────────
  // Desktop: horizontal columns. Mobile: vertical rows.
  const gridFr = items
    .map((_, i) => (i === activeIndex ? '5fr' : '1fr'))
    .join(' ');

  const gridStyle: React.CSSProperties = isDesktop
    ? {
      gridTemplateColumns: gridFr,
      transition:
        'grid-template-columns 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
    }
    : {
      gridTemplateRows: gridFr,
      transition:
        'grid-template-rows 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
    };

  return (
    <>
      <div
        ref={containerRef}
        className={`grid w-full gap-2 md:gap-3 ${className}`}
        style={gridStyle}
      >
        {items.map((item, index) => (
          <ExpandCard
            key={item.id}
            item={item}
            isActive={index === activeIndex}
            isDesktop={isDesktop}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            key="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={SPRING}
              onClick={() => setLightboxSrc(null)}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-12 h-12 rounded-full
                         bg-black/40 border border-white/[0.1] text-white backdrop-blur-md
                         flex items-center justify-center
                         hover:bg-black/60 hover:scale-105 transition-all z-[60]"
              aria-label="Close certificate preview"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <motion.img
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={SPRING}
              src={lightboxSrc}
              alt="Certificate preview"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl relative z-50"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Individual Card ─────────────────────────────────────────────────────────

function ExpandCard({
  item,
  isActive,
  isDesktop,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
}: {
  item: ExpandingCardItem;
  isActive: boolean;
  isDesktop: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const IconComponent = item.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`${item.title}${isActive ? ' — click to view certificate' : ''}`}
      className={`group
        relative overflow-hidden rounded-[14px] md:rounded-[18px]
        border transition-all duration-500 ease-out
        ${isActive
          ? 'border-accent/30 shadow-[0_0_30px_rgba(100,217,154,0.06)]'
          : 'border-white/[0.06] hover:border-white/[0.1]'
        }
        ${isActive ? 'cursor-zoom-in' : 'cursor-pointer'}
      `}
      style={{ minHeight: 0, minWidth: 0 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      {/* ── Background image — always present, styled differently ── */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
        style={{
          backgroundImage: `url(${item.imgSrc})`,
          filter: isActive ? 'grayscale(0%) brightness(1)' : 'grayscale(80%) brightness(0.35)',
        }}
        aria-hidden="true"
      />

      {/* ── Gradient overlay for expanded card text readability ── */}
      <div
        className="absolute inset-0 transition-opacity duration-600"
        style={{ opacity: isActive ? 1 : 0 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
        {isDesktop && (
          <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />
        )}
      </div>

      {/* ── Extra darkening for collapsed cards ── */}
      <div
        className="absolute inset-0 bg-dark/40 transition-opacity duration-500"
        style={{ opacity: isActive ? 0 : 1 }}
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 h-full w-full">

        {/* ▸ COLLAPSED STATE ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: isActive ? 'none' : 'auto' }}
        >
          {isDesktop ? (
            /* Desktop collapsed: vertical rotated text */
            <span
              className="text-white/70 text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] font-display select-none"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              {item.title}
            </span>
          ) : (
            /* Mobile collapsed: horizontal icon + title row */
            <div className="flex items-center gap-3 px-5 w-full">
              <div className="w-8 h-8 rounded-lg bg-accent/[0.08] border border-accent/[0.12] flex items-center justify-center shrink-0">
                <IconComponent className="w-4 h-4 text-accent/50" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-semibold text-white/60 truncate tracking-wide font-display">
                {item.title}
              </h3>
              {item.date && (
                <span className="ml-auto text-xs text-white/30 font-medium shrink-0">
                  {item.date}
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* ▸ EXPANDED STATE — content at bottom ── */}
        <motion.div
          className="absolute inset-x-0 bottom-0 p-5 md:p-7 lg:p-8"
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 20,
          }}
          transition={{
            ...CONTENT_SPRING,
            delay: isActive ? 0.12 : 0,
          }}
          style={{ pointerEvents: isActive ? 'auto' : 'none' }}
        >
          {/* Icon */}
          <motion.div
            className="mb-3"
            animate={{ scale: isActive ? 1 : 0.7, opacity: isActive ? 1 : 0 }}
            transition={SPRING}
          >
            <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white/90" strokeWidth={1.5} />
          </motion.div>

          {/* Title + optional date */}
          <div className="flex items-baseline gap-3 mb-2 flex-wrap">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white leading-tight tracking-tight font-display">
              {item.title}
            </h3>
            {item.date && (
              <span className="text-xs text-text-tertiary font-medium shrink-0">
                {item.date}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-xs md:text-sm text-white/60 max-w-md leading-relaxed font-body line-clamp-3">
            {item.description}
          </p>

          {/* Action Row */}
          <motion.div
            className="mt-4 flex items-center gap-4 flex-wrap"
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {item.verifyUrl && (
              <a
                href={item.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()} // Prevent card collapse / lightbox
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] hover:border-white/[0.2] transition-colors text-xs md:text-sm font-medium text-white/90 backdrop-blur-md"
              >
                Verify on Credly
                <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent" strokeWidth={2} />
              </a>
            )}

            {/* View hint */}
            <p className="text-[10px] md:text-xs text-text-tertiary/60 font-medium tracking-wider uppercase flex items-center gap-2 group-hover:text-accent transition-colors duration-300">
              <span className="w-4 h-[1px] bg-accent/30 group-hover:bg-accent inline-block transition-colors duration-300" />
              <span className="group-hover:translate-x-1 transition-transform duration-300">Click to view certificate</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
