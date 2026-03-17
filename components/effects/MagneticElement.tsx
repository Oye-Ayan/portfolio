'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MagneticElementProps {
  children: ReactNode;
  className?: string;
  strength?: number; // How strongly it pulls (default 0.3)
  distance?: number; // Detection distance in px (default 100)
}

export default function MagneticElement({
  children,
  className = '',
  strength = 0.3,
  distance = 100,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (dist < distance) {
      setPosition({
        x: deltaX * strength,
        y: deltaY * strength,
      });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
