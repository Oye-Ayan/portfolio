'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  // Detect touch/mobile devices — hide cursor glow on them
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth, delayed cursor following
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Detect touch/mobile device on mount
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouchPoints = navigator.maxTouchPoints > 0;
      const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const hasNoHover = window.matchMedia('(hover: none)').matches;
      // Device is touch-only if it has touch AND no fine pointer/hover
      return (hasTouchPoints && hasCoarsePointer) || (hasTouchPoints && hasNoHover);
    };
    setIsTouchDevice(checkTouchDevice());
  }, []);

  useEffect(() => {
    // Skip adding listeners on touch devices
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible, isTouchDevice]);

  // Don't render anything on touch/mobile devices
  if (isTouchDevice) return null;

  return (
    <>
      {/* Primary large glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,217,255,0.09) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      {/* Small bright center dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,217,255,0.6) 0%, rgba(168,85,247,0.4) 50%, transparent 70%)',
            boxShadow: '0 0 20px rgba(0,217,255,0.6), 0 0 40px rgba(0,217,255,0.3), 0 0 60px rgba(168,85,247,0.2)',
          }}
        />
      </motion.div>
    </>
  );
}
