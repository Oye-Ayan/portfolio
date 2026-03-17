'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Button from '../ui/Button';
import FloatingShapes from '../effects/FloatingShapes';
import MagneticElement from '../effects/MagneticElement';

// Character-by-character text reveal component
function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const chars = text.split('');

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.8 + i * 0.03,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan/20 rounded-full blur-3xl -top-48 -left-48 animate-float" />
        <div className="absolute w-96 h-96 bg-purple/20 rounded-full blur-3xl -bottom-48 -right-48 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute w-64 h-64 bg-cyan/10 rounded-full blur-3xl top-1/3 right-1/4 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating geometric shapes with parallax */}
      <FloatingShapes />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto text-center relative z-10"
      >
        <motion.div variants={item} className="mb-6">
          <motion.span
            className="text-cyan font-mono text-lg md:text-xl lg:text-2xl inline-block"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            Hello, I&apos;m
          </motion.span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
        >
          <AnimatedText text="Muhammad Ayan Khan" className="gradient-text" />
        </motion.h1>

        <motion.p
          variants={item}
          className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-4 font-medium"
        >
          <motion.span
            initial={{ backgroundPosition: '200% 0' }}
            animate={{ backgroundPosition: '-200% 0' }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: 'linear-gradient(90deg, #e5e7eb 0%, #00D9FF 25%, #A855F7 50%, #00D9FF 75%, #e5e7eb 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 100%',
            }}
          >
            Software Engineer & Flutter Developer
          </motion.span>
        </motion.p>

        <motion.p
          variants={item}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12"
        >
          Building sleek, scalable mobile & web applications with clean architecture.
          Currently crafting backend systems at eConceptions while pushing the boundaries of AI-integrated healthcare solutions.
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap justify-center gap-4 mb-12">
          <MagneticElement strength={0.4}>
            <Button href="https://github.com/Oye-Ayan" variant="primary">
              <FaGithub className="text-xl" />
              GitHub
            </Button>
          </MagneticElement>
          <MagneticElement strength={0.4}>
            <Button href="https://www.linkedin.com/in/muhammadayankhan/" variant="primary">
              <FaLinkedin className="text-xl" />
              LinkedIn
            </Button>
          </MagneticElement>
          <MagneticElement strength={0.4}>
            <Button href="#contact" variant="outline">
              <FaEnvelope className="text-xl" />
              Get in Touch
            </Button>
          </MagneticElement>
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-wrap justify-center gap-6 text-sm text-gray-400"
        >
          <a href="mailto:mayan921111@gmail.com" className="flex items-center gap-2 hover:text-cyan transition">
            <FaEnvelope /> mayan921111@gmail.com
          </a>
          <span className="flex items-center gap-2">
            <FaPhone /> 0314-5313125
          </span>
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt /> Wah Cantt, Pakistan
          </span>
        </motion.div>

        <motion.div variants={item} className="mt-16">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <svg className="w-6 h-6 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
