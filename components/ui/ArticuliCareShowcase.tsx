'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaTimes, FaGithub } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

interface ArticuliCareShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

const images = [
  "/fyp_interface/IMG-20250519-WA0009.jpg",
  "/fyp_interface/IMG-20250519-WA0007.jpg",
  "/fyp_interface/IMG-20250508-WA0011.jpg",
  "/fyp_interface/IMG-20250519-WA0006.jpg",
  "/fyp_interface/IMG-20250519-WA0014.jpg",
  "/fyp_interface/IMG-20250508-WA0010.jpg",
  "/fyp_interface/IMG-20250519-WA0018.jpg",
  "/fyp_interface/IMG-20250519-WA0012.jpg",
];

// Helper component for the parallax phone frame
function PhoneScreenshot({ src, index, scrollYProgress }: { src: string, index: number, scrollYProgress: any }) {
  // Create a subtle staggering parallax effect based on index
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, (index % 2 === 0 ? -60 : -120)]);
  
  return (
    <motion.div 
      style={{ y: yOffset }}
      className="relative rounded-[2rem] md:rounded-[2.5rem] border-[6px] md:border-[8px] border-[#1a1a1e] bg-black shadow-2xl overflow-hidden aspect-[9/19.5] w-full max-w-[320px] mx-auto ring-1 ring-white/[0.05]"
    >
      {/* Subtle top glare effect */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.08] to-transparent z-10 pointer-events-none mix-blend-overlay"></div>
      
      {/* Notch simulation */}
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
        <div className="w-1/3 h-4 bg-[#1a1a1e] rounded-b-xl"></div>
      </div>

      <img 
        src={src} 
        alt={`ArticuliCare Interface ${index + 1}`} 
        className="w-full h-full object-cover"
        loading={index < 2 ? "eager" : "lazy"}
      />
    </motion.div>
  );
}

export default function ArticuliCareShowcase({ isOpen, onClose }: ArticuliCareShowcaseProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
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
          {/* Close Button */}
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
                  Final Year Project
                </span>
                <span className="text-[#71717a] text-sm font-medium tracking-wide">
                  2024 - 2025
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-[1.1] mb-6">
                ArticuliCare
              </h2>

              <p className="text-[#a1a1aa] text-lg leading-relaxed font-body mb-10 max-w-xl">
                An AI-powered Flutter mobile application dedicated to detecting articulation disorders. 
                Integrating a custom Librosa-compatible DSP MFCC pipeline and a TFLite dysarthria model 
                into an MVVM architecture, it provides real-time speech analysis and personalized therapy recommendations.
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <p className="text-[#71717a] text-xs uppercase tracking-widest font-semibold mb-2">Role</p>
                  <p className="text-white font-medium">Lead Developer / ML Integrator</p>
                </div>
                <div>
                  <p className="text-[#71717a] text-xs uppercase tracking-widest font-semibold mb-2">Platform</p>
                  <p className="text-white font-medium">Cross-Platform Mobile</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[#71717a] text-xs uppercase tracking-widest font-semibold mb-3">Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {["Flutter", "Firebase", "TensorFlow Lite", "Supabase", "Python", "Audio DSP"].map(tag => (
                      <span key={tag} className="px-3 py-1.5 text-xs font-semibold text-white bg-white/[0.03] border border-white/[0.1] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://youtu.be/BXg7ROtlc-M?si=Ruo2QvH0yKmTkV1t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-accent text-[#0a0a0b] rounded-xl font-bold text-sm transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/20"
                >
                  <FiExternalLink className="text-lg" /> Watch Demo
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Scrollable Gallery */}
          <div 
            ref={scrollContainerRef}
            className="w-full lg:w-[55%] xl:w-[60%] h-[60vh] lg:h-full overflow-y-auto custom-scrollbar bg-[#121214] p-8 md:p-12 lg:p-20 relative"
          >
            {/* Background texture/grid to make the images pop */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-4xl mx-auto relative z-10 pb-20"
            >
              {images.map((src, idx) => (
                <div key={idx} className={idx % 2 === 1 ? "md:mt-24" : ""}>
                  <PhoneScreenshot src={src} index={idx} scrollYProgress={scrollYProgress} />
                </div>
              ))}
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
