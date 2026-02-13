'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -10, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`glass-effect rounded-xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}
