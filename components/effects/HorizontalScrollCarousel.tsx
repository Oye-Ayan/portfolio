'use client';

import { motion, useTransform, useScroll, useReducedMotion } from 'framer-motion';
import { useRef, useState, useLayoutEffect, useEffect, ReactNode, Children } from 'react';

interface HorizontalScrollCarouselProps {
  children: ReactNode;
  className?: string;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function HorizontalScrollCarousel({ children, className = '' }: HorizontalScrollCarouselProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const itemsCount = Children.count(children);

  useIsomorphicLayoutEffect(() => {
    if (prefersReduced) return;

    const measure = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        setDistance(Math.max(trackWidth - containerWidth, 0));
      }
    };

    measure();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => measure());
      if (containerRef.current) resizeObserver.observe(containerRef.current);
      if (trackRef.current) resizeObserver.observe(trackRef.current);
    }

    window.addEventListener('resize', measure, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      resizeObserver?.disconnect();
    };
  }, [children, prefersReduced]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  if (prefersReduced) {
    return (
      <section className={`relative py-12 ${className}`}>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex gap-8 overflow-x-auto pb-6 custom-scrollbar snap-x snap-mandatory">
            {Children.map(children, (child) => (
              <div className="snap-start shrink-0">{child}</div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={targetRef} className={`relative ${className}`} style={{ height: `${itemsCount * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-8 w-max will-change-transform">
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}