'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaTimes, FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

export interface ProjectShowcaseData {
  title: string;
  subtitle?: string;
  period?: string;
  description: string;
  role: string;
  platform: string;
  tags: string[];
  demo?: string;
  github?: string;
  images: string[];
  isMobileLayout?: boolean;
}

interface ProjectShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectShowcaseData | null;
}

function PhoneScreenshot({ src, index, scrollYProgress }: { src: string, index: number, scrollYProgress: any }) {
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, (index % 2 === 0 ? -60 : -120)]);
  
  return (
    <motion.div 
      style={{ y: yOffset }}
      className="relative rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[8px] border-[#1a1a1e] bg-black shadow-2xl overflow-hidden aspect-[9/19.5] w-full max-w-[320px] mx-auto ring-1 ring-white/[0.05]"
    >
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.08] to-transparent z-10 pointer-events-none mix-blend-overlay"></div>
      
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
        <div className="w-1/3 h-4 bg-[#1a1a1e] rounded-b-xl"></div>
      </div>

      <img 
        src={src} 
        alt={`Project Screenshot ${index + 1}`} 
        className="w-full h-full object-cover"
        loading={index < 2 ? "eager" : "lazy"}
      />
    </motion.div>
  );
}

function DesktopScreenshot({ src, index, scrollYProgress }: { src: string, index: number, scrollYProgress: any }) {
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -80 * (index + 1)]);
  
  return (
    <motion.div 
      style={{ y: yOffset }}
      className="relative rounded-xl border border-white/[0.05] bg-[#1a1a1e] shadow-2xl overflow-hidden w-full max-w-4xl mx-auto ring-1 ring-white/[0.02]"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.05] to-transparent z-10 pointer-events-none mix-blend-overlay"></div>
      
      {/* Fake Browser Chrome */}
      <div className="w-full h-8 bg-[#121214] border-b border-white/[0.05] flex items-center px-4 gap-2">
        <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
      </div>

      <img 
        src={src} 
        alt={`Project Screenshot ${index + 1}`} 
        className="w-full h-auto object-cover"
        loading={index < 2 ? "eager" : "lazy"}
      />
    </motion.div>
  );
}

export default function ProjectShowcase({ isOpen, onClose, project }: ProjectShowcaseProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef
  });

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#0a0a0b] flex flex-col lg:flex-row overflow-hidden"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 lg:right-10 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] hover:scale-105 transition-all duration-300"
            aria-label="Close Case Study"
          >
            <FaTimes className="text-xl" />
          </button>

          {/* Left Column: Sticky Project Details */}
          <div className="w-full lg:w-[45%] xl:w-[40%] h-auto lg:h-full p-8 md:p-12 lg:p-16 xl:p-24 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/[0.05] bg-[#0a0a0b] z-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 text-xs font-bold text-[#0a0a0b] bg-accent rounded-md uppercase tracking-wider">
                  {project.subtitle || "Project Showcase"}
                </span>
                {project.period && (
                  <span className="text-[#71717a] text-sm font-medium tracking-wide">
                    {project.period}
                  </span>
                )}
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6">
                {project.title}
              </h2>

              <p className="text-[#a1a1aa] text-lg leading-relaxed font-body mb-10 max-w-xl">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <p className="text-[#71717a] text-xs uppercase tracking-widest font-semibold mb-2">Role</p>
                  <p className="text-white font-medium">{project.role}</p>
                </div>
                <div>
                  <p className="text-[#71717a] text-xs uppercase tracking-widest font-semibold mb-2">Platform</p>
                  <p className="text-white font-medium">{project.platform}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[#71717a] text-xs uppercase tracking-widest font-semibold mb-3">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 text-xs font-semibold text-white bg-white/[0.03] border border-white/[0.1] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-accent text-[#0a0a0b] rounded-xl font-bold text-sm transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20"
                  >
                    <FiExternalLink className="text-lg" /> Watch Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/[0.03] border border-white/[0.1] text-white rounded-xl font-bold text-sm transition-transform hover:-translate-y-1 hover:bg-white/[0.08]"
                  >
                    <FaGithub className="text-lg" /> Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Scrollable Gallery */}
          <div 
            ref={scrollContainerRef}
            className="w-full lg:w-[55%] xl:w-[60%] h-[60vh] lg:h-full overflow-y-auto custom-scrollbar bg-[#121214] p-8 md:p-12 lg:p-20 relative"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`max-w-4xl mx-auto relative z-10 pb-20 ${project.isMobileLayout ? 'grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14' : 'flex flex-col gap-16'}`}
            >
              {project.images.map((src, idx) => (
                <div key={idx} className={project.isMobileLayout && idx % 2 === 1 ? "md:mt-24" : ""}>
                  {project.isMobileLayout ? (
                    <PhoneScreenshot src={src} index={idx} scrollYProgress={scrollYProgress} />
                  ) : (
                    <DesktopScreenshot src={src} index={idx} scrollYProgress={scrollYProgress} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
