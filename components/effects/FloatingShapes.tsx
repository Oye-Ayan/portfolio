'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Shape {
  id: number;
  type: 'hexagon' | 'circle' | 'triangle' | 'bracket' | 'ring' | 'dot-grid' | 'cross' | 'diamond';
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  baseOpacity: number; // very low — shapes appear only when cursor is near
  depth: number;
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
          />
        </svg>
      );
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <polygon
            points="50,10 90,90 10,90"
            stroke={color}
            strokeWidth="1.5"
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
            fontFamily="monospace"
          >
            {'{ }'}
          </text>
        </svg>
      );
    case 'ring':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="1" />
          <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="1" />
        </svg>
      );
    case 'dot-grid':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
          {[20, 40, 60, 80].map(x =>
            [20, 40, 60, 80].map(y => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
            ))
          )}
        </svg>
      );
    case 'cross':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <line x1="50" y1="15" x2="50" y2="85" stroke={color} strokeWidth="1.5" />
          <line x1="15" y1="50" x2="85" y2="50" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
          <polygon
            points="50,5 95,50 50,95 5,50"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      );
  }
}

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Raw pixel position for proximity calc
  const mousePixelX = useRef(0);
  const mousePixelY = useRef(0);

  const springX = useSpring(mouseX, { damping: 20, stiffness: 60 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 60 });

  const [shapes] = useState<Shape[]>(() => {
    const colors = ['#00D9FF', '#A855F7', '#5FFBF1', '#C084FC', '#00D9FF'];
    const types: Shape['type'][] = ['hexagon', 'circle', 'triangle', 'bracket', 'ring', 'dot-grid', 'cross', 'diamond'];
    const generated: Shape[] = [];

    for (let i = 0; i < 20; i++) {
      generated.push({
        id: i,
        type: types[i % types.length],
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        size: Math.random() * 70 + 35,
        rotation: Math.random() * 360,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 5,
        baseOpacity: 0.03, // nearly invisible by default — Antigravity style
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
        mouseX.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
        mouseY.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
        mousePixelX.current = e.clientX;
        mousePixelY.current = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => {
        const parallaxMultiplier = shape.depth * 25; // stronger parallax

        return (
          <FloatingShape
            key={shape.id}
            shape={shape}
            springX={springX}
            springY={springY}
            parallaxMultiplier={parallaxMultiplier}
            containerRef={containerRef}
            mousePixelX={mousePixelX}
            mousePixelY={mousePixelY}
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
  containerRef,
  mousePixelX,
  mousePixelY,
}: {
  shape: Shape;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  parallaxMultiplier: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  mousePixelX: React.RefObject<number>;
  mousePixelY: React.RefObject<number>;
}) {
  const translateX = useTransform(springX, (v) => v * parallaxMultiplier);
  const translateY = useTransform(springY, (v) => v * parallaxMultiplier);
  const shapeRef = useRef<HTMLDivElement>(null);
  const [revealOpacity, setRevealOpacity] = useState(shape.baseOpacity);

  // Proximity-based reveal: shapes illuminate when cursor is nearby
  useEffect(() => {
    let frameId: number;
    const REVEAL_RADIUS = 250; // px — how close cursor needs to be

    const checkProximity = () => {
      if (shapeRef.current && containerRef.current) {
        const rect = shapeRef.current.getBoundingClientRect();
        const shapeCenterX = rect.left + rect.width / 2;
        const shapeCenterY = rect.top + rect.height / 2;

        const dx = (mousePixelX.current ?? 0) - shapeCenterX;
        const dy = (mousePixelY.current ?? 0) - shapeCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REVEAL_RADIUS) {
          // Closer = more visible, max ~0.6 opacity
          const intensity = 1 - dist / REVEAL_RADIUS;
          setRevealOpacity(shape.baseOpacity + intensity * 0.55);
        } else {
          setRevealOpacity(shape.baseOpacity);
        }
      }
      frameId = requestAnimationFrame(checkProximity);
    };

    checkProximity();
    return () => cancelAnimationFrame(frameId);
  }, [shape.baseOpacity, containerRef, mousePixelX, mousePixelY]);

  return (
    <motion.div
      ref={shapeRef}
      className="absolute"
      style={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        x: translateX,
        y: translateY,
        opacity: revealOpacity,
        transition: 'opacity 0.3s ease-out',
        filter: revealOpacity > 0.15 ? `drop-shadow(0 0 ${revealOpacity * 20}px ${shape.color}40)` : 'none',
      }}
      animate={{
        rotate: [shape.rotation, shape.rotation + 360],
        scale: [1, 1.05, 1, 0.95, 1],
      }}
      transition={{
        rotate: {
          duration: shape.duration,
          repeat: Infinity,
          ease: 'linear',
        },
        scale: {
          duration: shape.duration / 3,
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
