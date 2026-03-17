'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Shape {
  id: number;
  type: 'hexagon' | 'circle' | 'triangle' | 'bracket' | 'ring' | 'dot-grid';
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  opacity: number;
  depth: number; // 1-3, affects parallax intensity
  color: string;
}

function ShapeSVG({ type, size, color }: { type: Shape['type']; size: number; color: string }) {
  switch (type) {
    case 'hexagon':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.4"
          />
        </svg>
      );
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" opacity="0.3" />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <polygon
            points="50,10 90,90 10,90"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.35"
          />
        </svg>
      );
    case 'bracket':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <text
            x="50"
            y="65"
            textAnchor="middle"
            fontSize="60"
            fill={color}
            opacity="0.25"
            fontFamily="monospace"
          >
            {'{ }'}
          </text>
        </svg>
      );
    case 'ring':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="1" opacity="0.2" />
          <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="1" opacity="0.3" />
        </svg>
      );
    case 'dot-grid':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
          {[20, 40, 60, 80].map(x =>
            [20, 40, 60, 80].map(y => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2" opacity="0.2" />
            ))
          )}
        </svg>
      );
  }
}

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 80 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 80 });

  const [shapes] = useState<Shape[]>(() => {
    const colors = ['#00D9FF', '#A855F7', '#5FFBF1', '#C084FC'];
    const types: Shape['type'][] = ['hexagon', 'circle', 'triangle', 'bracket', 'ring', 'dot-grid'];
    const generated: Shape[] = [];

    for (let i = 0; i < 14; i++) {
      generated.push({
        id: i,
        type: types[i % types.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 30,
        rotation: Math.random() * 360,
        duration: Math.random() * 15 + 15,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1,
        depth: Math.floor(Math.random() * 3) + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return generated;
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        // Normalize to -1 to 1 range
        mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
        mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => {
        const parallaxMultiplier = shape.depth * 15;

        return (
          <FloatingShape
            key={shape.id}
            shape={shape}
            springX={springX}
            springY={springY}
            parallaxMultiplier={parallaxMultiplier}
          />
        );
      })}
    </div>
  );
}

function FloatingShape({
  shape,
  springX,
  springY,
  parallaxMultiplier,
}: {
  shape: Shape;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  parallaxMultiplier: number;
}) {
  const translateX = useTransform(springX, (v) => v * parallaxMultiplier);
  const translateY = useTransform(springY, (v) => v * parallaxMultiplier);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        x: translateX,
        y: translateY,
        opacity: shape.opacity,
      }}
      animate={{
        rotate: [shape.rotation, shape.rotation + 360],
        y: [0, -15, 0, 15, 0],
      }}
      transition={{
        rotate: {
          duration: shape.duration,
          repeat: Infinity,
          ease: 'linear',
        },
        y: {
          duration: shape.duration / 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: shape.delay,
        },
      }}
    >
      <ShapeSVG type={shape.type} size={shape.size} color={shape.color} />
    </motion.div>
  );
}
