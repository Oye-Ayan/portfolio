
'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ title, subtitle, label, align = 'left' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-16 md:mb-24 ${align === 'center' ? 'text-center' : ''}`}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block  text-xs font-semibold tracking-[0.18em] uppercase text-accent mb-3"
        >
          {label}
        </motion.span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary leading-[1.05] mb-4">
        {title}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`text-text-secondary text-base md:text-lg leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
