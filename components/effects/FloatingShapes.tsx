'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type ShapeType = 'java' | 'python' | 'cpp' | 'dart' | 'flutter' | 'mysql' | 'firebase' | 'supabase' | 'groovy' | 'grails' | 'hexagon' | 'circle' | 'triangle' | 'bracket' | 'ring' | 'dot-grid' | 'cross' | 'diamond';

interface Shape {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  baseOpacity: number;
  depth: number;
  color: string;
}

function CombinedShapeSVG({ type, size, color }: { type: ShapeType; size: number; color: string }) {
  const s = size;
  switch (type) {
    case 'java':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 30 C35 20, 45 20, 42 10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M50 28 C50 18, 60 18, 57 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M65 30 C65 20, 75 20, 72 10" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M25 38 L25 72 C25 82, 75 82, 75 72 L75 38 Z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M75 45 C90 45, 90 65, 75 65" stroke={color} strokeWidth="2" fill="none" />
          <ellipse cx="50" cy="88" rx="30" ry="5" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'python':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 C30 8, 20 18, 20 30 L20 42 L50 42 L50 46 L15 46 C15 46, 8 46, 8 58 C8 70, 15 78, 25 78 L32 78 L32 66 C32 60, 38 54, 46 54 L62 54 C68 54, 74 48, 74 42 L74 30 C74 18, 64 8, 50 8Z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M50 92 C70 92, 80 82, 80 70 L80 58 L50 58 L50 54 L85 54 C85 54, 92 54, 92 42 C92 30, 85 22, 75 22 L68 22 L68 34 C68 40, 62 46, 54 46 L38 46 C32 46, 26 52, 26 58 L26 70 C26 82, 36 92, 50 92Z" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="38" cy="22" r="3" fill={color} />
          <circle cx="62" cy="78" r="3" fill={color} />
        </svg>
      );
    case 'cpp':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 25 C20 25, 10 38, 10 50 C10 62, 20 75, 40 75" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
          <line x1="55" y1="40" x2="55" y2="60" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="50" x2="65" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="78" y1="40" x2="78" y2="60" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="68" y1="50" x2="88" y2="50" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case 'dart':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 50 L50 20 L80 50 L50 80 Z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M35 50 L50 35 L65 50 L50 65 Z" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="50" r="5" fill={color} />
          <path d="M80 50 L95 35 L95 50 Z" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'flutter':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 10 L20 50 L35 50 L60 25 Z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M60 10 L60 38 L35 50 Z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M35 50 L60 75 L60 47 Z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M60 47 L80 65 L60 75 Z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M60 75 L80 65 L60 90 L40 70 Z" stroke={color} strokeWidth="2" fill="none" />
        </svg>
      );
    case 'mysql':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="22" rx="30" ry="12" stroke={color} strokeWidth="2" fill="none" />
          <path d="M20 22 L20 78" stroke={color} strokeWidth="2" />
          <path d="M80 22 L80 78" stroke={color} strokeWidth="2" />
          <ellipse cx="50" cy="78" rx="30" ry="12" stroke={color} strokeWidth="2" fill="none" />
          <ellipse cx="50" cy="50" rx="30" ry="12" stroke={color} strokeWidth="1" strokeDasharray="4 3" fill="none" />
          <text x="50" y="54" textAnchor="middle" fontSize="12" fill={color} fontFamily="monospace" fontWeight="bold">SQL</text>
        </svg>
      );
    case 'firebase':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 80 L40 15 L50 45 L60 30 L70 80 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
          <path d="M25 80 L50 92 L75 80" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
          <path d="M35 65 L50 45 L65 65" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'supabase':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 5 L20 55 L48 55 L42 95 L80 42 L52 42 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case 'groovy':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="50,5 61,38 95,38 67,60 78,93 50,73 22,93 33,60 5,38 39,38"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />
          <text x="50" y="58" textAnchor="middle" fontSize="22" fill={color} fontFamily="monospace" fontWeight="bold">G</text>
        </svg>
      );
    case 'grails':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L50 75 L20 75 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
          <path d="M50 20 L50 75 L78 75 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill="none" />
          <path d="M15 78 C15 88, 85 88, 85 78" stroke={color} strokeWidth="2" fill="none" />
          <line x1="50" y1="8" x2="50" y2="78" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'hexagon':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
          <polygon
            points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      );
    case 'circle':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'triangle':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
          <polygon
            points="50,10 90,90 10,90"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      );
    case 'bracket':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
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
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="35" stroke={color} strokeWidth="1" />
          <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="1" />
        </svg>
      );
    case 'dot-grid':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill={color}>
          {[20, 40, 60, 80].map(x =>
            [20, 40, 60, 80].map(y => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
            ))
          )}
        </svg>
      );
    case 'cross':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
          <line x1="50" y1="15" x2="50" y2="85" stroke={color} strokeWidth="1.5" />
          <line x1="15" y1="50" x2="85" y2="50" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'diamond':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
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
  const mousePixelX = useRef(0);
  const mousePixelY = useRef(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const springX = useSpring(mouseX, { damping: 20, stiffness: 60 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 60 });

  const [shapes] = useState<Shape[]>(() => {
    const colors = ['#00D9FF', '#A855F7', '#5FFBF1', '#C084FC', '#00D9FF'];
    const types: ShapeType[] = [
      'java', 'python', 'cpp', 'dart', 'flutter', 'mysql', 'firebase', 'supabase', 'groovy', 'grails',
      'hexagon', 'circle', 'triangle', 'bracket', 'ring', 'dot-grid', 'cross', 'diamond'
    ];
    const generated: Shape[] = [];

    // Increased from 20 to 35 to accommodate both tech icons and geometric shapes
    for (let i = 0; i < 35; i++) {
      generated.push({
        id: i,
        type: types[i % types.length],
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        size: Math.random() * 40 + 40,
        rotation: Math.random() * 360,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 5,
        baseOpacity: 0.04,
        depth: Math.floor(Math.random() * 3) + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return generated;
  });

  // Detect touch device
  useEffect(() => {
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const hasNoHover = window.matchMedia('(hover: none)').matches;
    setIsTouchDevice((hasTouchPoints && hasCoarsePointer) || (hasTouchPoints && hasNoHover));
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

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
  }, [mouseX, mouseY, isTouchDevice]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => {
        const parallaxMultiplier = shape.depth * 25;

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
            isTouchDevice={isTouchDevice}
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
  isTouchDevice,
}: {
  shape: Shape;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
  parallaxMultiplier: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  mousePixelX: React.RefObject<number>;
  mousePixelY: React.RefObject<number>;
  isTouchDevice: boolean;
}) {
  const translateX = useTransform(springX, (v) => v * parallaxMultiplier);
  const translateY = useTransform(springY, (v) => v * parallaxMultiplier);
  const shapeRef = useRef<HTMLDivElement>(null);
  // On touch devices, show at static low opacity; on desktop use proximity reveal
  const [revealOpacity, setRevealOpacity] = useState(
    isTouchDevice ? shape.baseOpacity + 0.12 : shape.baseOpacity
  );

  // Proximity-based reveal — desktop only
  useEffect(() => {
    if (isTouchDevice) return;

    let frameId: number;
    const REVEAL_RADIUS = 250;

    const checkProximity = () => {
      if (shapeRef.current && containerRef.current) {
        const rect = shapeRef.current.getBoundingClientRect();
        const shapeCenterX = rect.left + rect.width / 2;
        const shapeCenterY = rect.top + rect.height / 2;

        const dx = (mousePixelX.current ?? 0) - shapeCenterX;
        const dy = (mousePixelY.current ?? 0) - shapeCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REVEAL_RADIUS) {
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
  }, [shape.baseOpacity, containerRef, mousePixelX, mousePixelY, isTouchDevice]);

  return (
    <motion.div
      ref={shapeRef}
      className="absolute"
      style={{
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        x: isTouchDevice ? 0 : translateX,
        y: isTouchDevice ? 0 : translateY,
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
      <CombinedShapeSVG type={shape.type} size={shape.size} color={shape.color} />
    </motion.div>
  );
}
