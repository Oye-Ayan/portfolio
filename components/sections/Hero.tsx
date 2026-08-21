'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useRef } from 'react';
import Button from '../ui/Button';

function RevealWord({ word, index, total }: { word: string; index: number; total: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.8,
        delay: 0.3 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="inline-block"
    >
      {word}{index < total - 1 ? '\u00A0' : ''}
    </motion.span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const name = 'Muhammad Ayan Khan';
  const nameWords = name.split(' ');

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-label="Hero — Muhammad Ayan Khan, Software Engineer and Flutter Developer"
    >
      {/* Video Background */}
      <motion.div
        className="video-bg-container"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          className="video-bg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster=""
        >
          <source src="/portfolio_vid.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Dark overlay gradient */}
      <div className="video-overlay" />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 text-center"
      >
        {/* Role label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className=" text-xs sm:text-sm tracking-[0.15em] text-accent uppercase">
            Software Engineer & Flutter Developer
          </span>
        </motion.div>

        {/* Name - large editorial display */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-display font-bold tracking-tighter leading-[1.05] mb-8">
          {nameWords.map((word, i) => (
            <RevealWord key={i} word={word} index={i} total={nameWords.length} />
          ))}
        </h1>

        {/* Short tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building sleek, scalable mobile & web applications with clean architecture and a passion for elegant solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        >
          <Button href="https://github.com/Oye-Ayan" variant="primary" aria-label="View Muhammad Ayan Khan's GitHub profile">
            <FaGithub className="text-lg" />
            GitHub
          </Button>
          <Button href="https://www.linkedin.com/in/muhammadayankhan/" variant="outline" aria-label="View Muhammad Ayan Khan's LinkedIn profile">
            <FaLinkedin className="text-lg" />
            LinkedIn
          </Button>
          <Button href="#contact" variant="secondary">
            Get in Touch
          </Button>
        </motion.div>

        {/* Quick contact - subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-6 text-xs text-text-tertiary "
        >
          <a href="mailto:mayan921111@gmail.com" className="hover:text-accent transition-colors duration-300">
            mayan921111@gmail.com
          </a>
          <span>Wah Cantt, Pakistan</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
          className="flex flex-col items-center gap-2 group"
          aria-label="Scroll to About section"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          >
            <motion.div className="w-1 h-1.5 rounded-full bg-text-secondary" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}

/* REDESIGNED HERO BACKUP (commented out for reference):
 * iOS autoPlay fallback handler, portfolio_poster.png fallback, visibility change auto-pause.
 */
