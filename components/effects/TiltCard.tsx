'use client';

import { useRef, useState, useCallback, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEnabled?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  tiltStrength = 8,
  glareEnabled = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const prefersReduced = useReducedMotion();

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseEnter = useCallback(() => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

  const calculateTilt = useCallback((clientX: number, clientY: number) => {
    if (!rectRef.current && cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (!rect || rect.width === 0 || rect.height === 0) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalX = (clientX - centerX) / (rect.width / 2);
    const normalY = (clientY - centerY) / (rect.height / 2);

    setTilt({
      rotateX: -normalY * tiltStrength,
      rotateY: normalX * tiltStrength,
      scale: 1.015,
    });

    const glareX = ((clientX - rect.left) / rect.width) * 100;
    const glareY = ((clientY - rect.top) / rect.height) * 100;

    setGlare({ x: glareX, y: glareY, opacity: 0.12 });
  }, [tiltStrength]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (prefersReduced) return;
    calculateTilt(e.clientX, e.clientY);
  }, [calculateTilt, prefersReduced]);

  const handleReset = useCallback(() => {
    rectRef.current = null;
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  if (prefersReduced) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative preserve-3d ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleReset}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.scale,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Child Elements */}
      <div className="relative z-10 w-full h-full preserve-3d">
        {children}
      </div>

      {/* 3D Dynamic Specular Light Glare */}
      {glareEnabled && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-20"
          animate={{ opacity: glare.opacity }}
          transition={{ duration: 0.2 }}
          style={{
            background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, var(--color-accent-glow) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}
