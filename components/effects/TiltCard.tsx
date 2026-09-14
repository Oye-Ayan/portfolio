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
  tiltStrength = 8,
  glareEnabled = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const calculateTilt = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
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
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    calculateTilt(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      calculateTilt(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleReset = () => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative preserve-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleReset}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleReset}
      onTouchCancel={handleReset}
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
            background: `radial-gradient(circle 350px at ${glare.x}% ${glare.y}%, rgba(100, 217, 154, 0.15) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}
