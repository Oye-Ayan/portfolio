'use client';

import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEnabled?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  tiltStrength = 10,
  glareEnabled = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate tilt (normalized -1 to 1)
    const normalX = (e.clientX - centerX) / (rect.width / 2);
    const normalY = (e.clientY - centerY) / (rect.height / 2);

    setTilt({
      rotateX: -normalY * tiltStrength,
      rotateY: normalX * tiltStrength,
    });

    // Calculate glare position (0-100%)
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;

    setGlare({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}

      {/* Spotlight/sheen overlay */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          animate={{ opacity: glare.opacity }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(0,217,255,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)`,
          }}
        />
      )}

      {/* Border shimmer on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-xl"
        animate={{ opacity: glare.opacity > 0 ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          border: '1px solid rgba(0,217,255,0.2)',
          boxShadow: `0 0 20px rgba(0,217,255,${glare.opacity * 0.3}), 0 0 40px rgba(168,85,247,${glare.opacity * 0.15})`,
        }}
      />
    </motion.div>
  );
}
