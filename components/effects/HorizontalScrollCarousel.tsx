'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
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
  
  const [distance, setDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const itemsCount = Children.count(children);

  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        // The exact distance required to make the right edge of the track flush with the right edge of the layout container
        setDistance(Math.max(trackWidth - containerWidth, 0));
      }
    };
    
    measure();
    
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [children]);

  // Translate exactly by the measured distance.
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    // We keep your original height pacing (itemsCount * 80vh) because you liked that scroll speed!
    <section ref={targetRef} className={`relative ${className}`} style={{ height: `${itemsCount * 80}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* We use your original layout container so the very first item aligns perfectly with the rest of your site */}
        <div ref={containerRef} className="w-full max-w-7xl mx-auto px-6 sm:px-8">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-8 w-max">
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}