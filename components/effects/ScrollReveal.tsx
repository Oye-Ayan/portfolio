'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  amount?: number;
  scale?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.75,
  once = false,
  amount = 0.15,
  scale = 1,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();

  const directionMap = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { y: 0, x: -36 },
    right: { y: 0, x: 36 },
    none: { y: 0, x: 0 },
  };

  const offset = directionMap[direction];

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: offset.y,
        x: offset.x,
        scale: scale !== 1 ? scale * 0.98 : 1,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
      }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
