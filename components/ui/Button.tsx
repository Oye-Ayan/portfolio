
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
    primary: 'bg-accent text-dark font-semibold hover:bg-accent/90 active:scale-[0.98]',
    secondary: 'bg-dark-accent text-text-primary border border-white/[0.06] hover:border-white/[0.12] hover:bg-dark-muted active:scale-[0.98]',
    outline: 'border border-white/[0.1] text-text-primary hover:border-accent/40 hover:text-accent active:scale-[0.98]'
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
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  );
}
