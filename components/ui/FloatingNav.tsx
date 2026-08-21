'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 p-4 bg-[#121214] border border-white/[0.05] rounded-full shadow-2xl shadow-black/50"
    >
      {links.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className="relative group p-2 text-[#71717a] transition-all duration-300 hover:-translate-x-1"
        >
          {/* Subtle cyan glow effect on hover via CSS classes */}
          <span className="relative z-10 group-hover:text-accent transition-colors duration-300">
            {link.icon}
          </span>
          <div className="absolute inset-0 rounded-full bg-accent/[0.15] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#121214] border border-white/[0.05] rounded text-[10px] font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            {link.name}
          </div>
        </a>
      ))}
    </motion.div>
  );
}
