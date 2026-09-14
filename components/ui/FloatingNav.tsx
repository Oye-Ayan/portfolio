'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

export default function FloatingNav() {
  const links = [
    { name: 'GitHub', icon: <FaGithub className="text-lg" />, href: 'https://github.com/Oye-Ayan' },
    { name: 'LinkedIn', icon: <FaLinkedin className="text-lg" />, href: 'https://www.linkedin.com/in/muhammadayankhan/' },
    { name: 'Email', icon: <FaEnvelope className="text-lg" />, href: 'mailto:mayan921111@gmail.com' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-4 p-3 bg-surface/90 backdrop-blur-xl border border-border rounded-full shadow-2xl shadow-black/10 dark:shadow-black/50"
    >
      {links.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="relative group p-2 text-text-secondary transition-all duration-300 hover:-translate-x-1"
        >
          <span className="relative z-10 group-hover:text-accent transition-colors duration-300">
            {link.icon}
          </span>
          <div className="absolute inset-0 rounded-full bg-accent/[0.15] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-surface border border-border rounded-lg text-[11px] font-medium text-text-primary whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {link.name}
          </div>
        </a>
      ))}

      <div className="w-5 h-px bg-border my-1" />

      <ThemeToggle className="!p-2 !rounded-full !border-0 bg-transparent hover:bg-accent/10" />
    </motion.div>
  );
}
