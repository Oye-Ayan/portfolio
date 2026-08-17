'use client';

import { useState, useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
  PanInfo,
  useReducedMotion,
} from 'framer-motion';

export interface ProjectData {
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  period: string;
  featured?: boolean;
  image?: string;
  color?: string;
  github?: string;
  demo?: string;
}

interface ProjectCarouselProps {
  projects: ProjectData[];
}

const CARD_WIDTH = 680;
const CARD_GAP = 24;
const DRAG_THRESHOLD = 50;

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 26, mass: 0.8 });

  // Navigate to a specific card
  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    setActiveIndex(clamped);
    const target = -(clamped * (CARD_WIDTH + CARD_GAP));
    animate(x, target, {
      type: 'spring',
      stiffness: 120,
      damping: 26,
      mass: 0.8,
    });
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -DRAG_THRESHOLD || velocity < -300) {
      goTo(activeIndex + 1);
    } else if (offset > DRAG_THRESHOLD || velocity > 300) {
      goTo(activeIndex - 1);
    } else {
      goTo(activeIndex);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex]);

  const dragConstraints = {
    left: -((projects.length - 1) * (CARD_WIDTH + CARD_GAP)) - 100,
    right: 100,
  };

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      {/* Cards Track */}
      <motion.div
        className="flex items-center py-12 cursor-grab active:cursor-grabbing"
        style={{
          x: springX,
          paddingLeft: 'calc(50% - 340px)',
          paddingRight: 'calc(50% - 340px)',
        }}
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.08}
        onDragEnd={handleDragEnd}
        dragMomentum={false}
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            index={i}
            activeIndex={activeIndex}
            motionX={springX}
            total={projects.length}
            reduce={reduce}
            onClick={() => goTo(i)}
          />
        ))}
      </motion.div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Project navigation">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-400 rounded-full ${
              i === activeIndex
                ? 'w-8 h-2 bg-accent'
                : 'w-2 h-2 bg-text-tertiary/40 hover:bg-text-secondary/60'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`View project ${i + 1}: ${projects[i].title}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 right-4 justify-between pointer-events-none z-10">
        <button
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex === 0}
          className="pointer-events-auto w-12 h-12 rounded-full bg-dark-accent/80 backdrop-blur-sm border border-white/[0.06] flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-white/[0.12] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex === projects.length - 1}
          className="pointer-events-auto w-12 h-12 rounded-full bg-dark-accent/80 backdrop-blur-sm border border-white/[0.06] flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-white/[0.12] transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next project"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}

/* ── Individual Project Card ──────────────────────────────────────────── */

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  activeIndex: number;
  motionX: ReturnType<typeof useSpring>;
  total: number;
  reduce: boolean | null;
  onClick: () => void;
}

function ProjectCard({ project, index, activeIndex, reduce, onClick }: ProjectCardProps) {
  const isActive = index === activeIndex;
  const distance = index - activeIndex;
  
  // Unique gradient per project based on index
  const gradients = [
    'linear-gradient(135deg, #1a1520 0%, #2a1a2e 50%, #1a1520 100%)',
    'linear-gradient(135deg, #151a20 0%, #1a2530 50%, #151a20 100%)',
    'linear-gradient(135deg, #1a1815 0%, #2a2218 50%, #1a1815 100%)',
    'linear-gradient(135deg, #151520 0%, #201a2a 50%, #151520 100%)',
    'linear-gradient(135deg, #181a15 0%, #222a1a 50%, #181a15 100%)',
    'linear-gradient(135deg, #1a1518 0%, #2a1a22 50%, #1a1518 100%)',
  ];

  return (
    <motion.div
      className="flex-shrink-0 relative"
      style={{
        width: CARD_WIDTH,
        marginRight: CARD_GAP,
      }}
      animate={reduce ? {} : {
        scale: isActive ? 1 : 0.88,
        rotateY: distance * -3,
        opacity: isActive ? 1 : 0.5,
        z: isActive ? 50 : -Math.abs(distance) * 30,
      }}
      transition={{
        type: 'spring',
        stiffness: 120,
        damping: 20,
        mass: 0.6,
      }}
      onClick={onClick}
    >
      <div
        className={`relative overflow-hidden rounded-[14px] border transition-all duration-500 ${
          isActive
            ? 'border-white/[0.1] shadow-2xl shadow-black/40'
            : 'border-white/[0.04] cursor-pointer'
        }`}
        style={{ perspective: '1200px' }}
      >
        {/* Card Image/Visual Area */}
        <div
          className="relative h-[280px] md:h-[320px] overflow-hidden"
          style={{ background: project.color || gradients[index % gradients.length] }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} project`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl md:text-7xl font-display font-black text-white/[0.06] tracking-tighter select-none">
                {project.title.split(' ')[0]}
              </span>
            </div>
          )}

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-[10px]  font-medium tracking-wider uppercase bg-accent/90 text-dark rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0b0b0e] to-transparent" />
        </div>

        {/* Card Content */}
        <div className="relative p-6 md:p-8 bg-[#0f0f12]">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary tracking-tight leading-tight">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="text-accent text-sm font-medium mt-1">
                  {project.subtitle}
                </p>
              )}
            </div>
            <span className="text-text-tertiary text-xs  whitespace-nowrap mt-1">
              {project.period}
            </span>
          </div>

          <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies as flowing text */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="text-[11px]  text-text-tertiary tracking-wide"
              >
                {tag}{tagIndex < project.tags.length - 1 && <span className="text-text-tertiary/40 ml-1.5">/</span>}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.github || project.demo) && (
            <div className="flex gap-3 mt-5 pt-4 border-t border-white/[0.04]">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-text-secondary hover:text-accent transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-text-secondary hover:text-accent transition-colors duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
