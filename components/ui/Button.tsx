
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = `
    px-6 py-3 rounded-md font-medium text-sm tracking-wide
    inline-flex items-center gap-2.5
    transition-all duration-300
  `.replace(/\s+/g, ' ').trim();

  const variants = {
    primary: 'bg-accent text-white dark:text-dark font-semibold hover:bg-accent-hover shadow-[0_2px_8px_rgba(5,150,105,0.25)] dark:shadow-[0_2px_8px_rgba(100,217,154,0.2)] hover:shadow-[0_4px_16px_rgba(5,150,105,0.35)] dark:hover:shadow-[0_4px_16px_rgba(100,217,154,0.3)] active:scale-[0.98]',
    secondary: 'bg-surface text-text-primary border border-border hover:border-accent/40 hover:bg-surface/80 shadow-[0_1px_3px_rgba(120,100,70,0.06)] dark:shadow-none active:scale-[0.98]',
    outline: 'border border-border text-text-primary hover:border-accent/60 hover:text-accent hover:bg-accent/[0.04] shadow-[0_1px_3px_rgba(120,100,70,0.06)] dark:shadow-none active:scale-[0.98]'
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        target={href && href.startsWith('http') ? '_blank' : undefined}
        rel={href && href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  );
}
