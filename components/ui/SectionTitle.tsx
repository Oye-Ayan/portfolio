'use client';

import { motion } from 'framer-motion';
import MagneticElement from '../effects/MagneticElement';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <MagneticElement strength={0.15} distance={200}>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 relative inline-block">
          <span className="gradient-text">{title}</span>
          {/* Animated underline */}
          <motion.div
            className="absolute -bottom-2 left-0 right-0 h-0.5 mx-auto"
            style={{
              background: 'linear-gradient(90deg, transparent, #00D9FF, #A855F7, transparent)',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </h2>
      </MagneticElement>
      {subtitle && (
        <motion.p
          className="text-gray-400 text-lg max-w-2xl mx-auto mt-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
