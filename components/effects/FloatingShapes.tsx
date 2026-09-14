'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingShapes() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Scroll-linked 3D rotations
  const rotate1 = useTransform(scrollY, [0, 4000], [0, 360]);
  const rotate2 = useTransform(scrollY, [0, 4000], [0, -280]);
  const rotate3 = useTransform(scrollY, [0, 4000], [0, 420]);
  const yParallax1 = useTransform(scrollY, [0, 4000], [0, -350]);
  const yParallax2 = useTransform(scrollY, [0, 4000], [0, -250]);
  const yParallax3 = useTransform(scrollY, [0, 4000], [0, -450]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-[4] overflow-hidden perspective-1000"
      aria-hidden="true"
    >
      {/* ─── Shape 1: 3D Wireframe Cube (Top Left) ─── */}
      <motion.div
        style={{ y: yParallax1, rotateZ: rotate1 }}
        className="absolute top-[22%] left-[3%] sm:left-[5%] w-16 h-16 sm:w-24 sm:h-24 preserve-3d opacity-35 dark:opacity-25 hover:opacity-55 transition-opacity"
      >
        <div className="w-full h-full relative preserve-3d animate-[spin_24s_linear_infinite]">
          {/* 6 Faces of 3D Cube */}
          <div className="absolute inset-0 border border-accent/40 bg-accent/[0.04] dark:bg-accent/[0.02] [transform:translateZ(32px)_sm:translateZ(48px)]" />
          <div className="absolute inset-0 border border-accent/40 bg-accent/[0.04] dark:bg-accent/[0.02] [transform:rotateY(180deg)_translateZ(32px)_sm:translateZ(48px)]" />
          <div className="absolute inset-0 border border-accent/40 bg-accent/[0.04] dark:bg-accent/[0.02] [transform:rotateY(-90deg)_translateZ(32px)_sm:translateZ(48px)]" />
          <div className="absolute inset-0 border border-accent/40 bg-accent/[0.04] dark:bg-accent/[0.02] [transform:rotateY(90deg)_translateZ(32px)_sm:translateZ(48px)]" />
          <div className="absolute inset-0 border border-accent/40 bg-accent/[0.04] dark:bg-accent/[0.02] [transform:rotateX(90deg)_translateZ(32px)_sm:translateZ(48px)]" />
          <div className="absolute inset-0 border border-accent/40 bg-accent/[0.04] dark:bg-accent/[0.02] [transform:rotateX(-90deg)_translateZ(32px)_sm:translateZ(48px)]" />
        </div>
      </motion.div>

      {/* ─── Shape 2: 3D Octahedral Ring / Gyroscope (Mid Right) ─── */}
      <motion.div
        style={{ y: yParallax2, rotateX: rotate2 }}
        className="absolute top-[52%] right-[3%] sm:right-[6%] w-20 h-20 sm:w-28 sm:h-28 preserve-3d opacity-30 dark:opacity-20 hover:opacity-50 transition-opacity"
      >
        <div className="w-full h-full relative preserve-3d animate-[spin_32s_linear_infinite_reverse]">
          <div className="absolute inset-0 rounded-full border border-teal-500/40 dark:border-teal-400/40 [transform:rotateX(45deg)]" />
          <div className="absolute inset-0 rounded-full border border-accent/50 dark:border-accent/40 [transform:rotateY(45deg)]" />
          <div className="absolute inset-0 rounded-full border border-emerald-500/40 dark:border-emerald-300/40 [transform:rotateZ(45deg)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_15px_var(--color-accent)]" />
        </div>
      </motion.div>

      {/* ─── Shape 3: 3D Diamond / Tilted Tetrahedron (Lower Left) ─── */}
      <motion.div
        style={{ y: yParallax3, rotateY: rotate3 }}
        className="absolute top-[78%] left-[4%] sm:left-[7%] w-14 h-14 sm:w-20 sm:h-20 preserve-3d opacity-30 dark:opacity-20 hover:opacity-45 transition-opacity"
      >
        <div className="w-full h-full relative preserve-3d animate-[spin_28s_linear_infinite]">
          <div className="absolute inset-0 border border-accent/50 dark:border-accent/40 bg-accent/[0.02] [transform:rotateX(60deg)_rotateZ(45deg)]" />
          <div className="absolute inset-0 border border-emerald-500/40 dark:border-emerald-400/30 [transform:rotateX(-60deg)_rotateZ(45deg)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-300 shadow-[0_0_12px_var(--color-accent)]" />
        </div>
      </motion.div>
    </div>
  );
}
