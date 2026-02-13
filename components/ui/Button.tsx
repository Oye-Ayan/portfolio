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
  const baseStyles = 'px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cyan to-purple text-white hover:shadow-lg hover:shadow-cyan/50',
    secondary: 'bg-dark-accent text-white hover:bg-dark-lighter border border-cyan/30',
    outline: 'border-2 border-cyan text-cyan hover:bg-cyan/10'
  };

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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
