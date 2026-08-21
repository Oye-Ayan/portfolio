'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../ui/Button';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Toggle background blur when scrolled past top
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide/Show logic on scroll
    if (latest > 150 && latest > previous) {
      setHidden(true);
      setMobileMenuOpen(false); // Close mobile menu on scroll down
    } else {
      setHidden(false);
    }
  });

  // Active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' } // Adjust for navbar height
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: '-100%', opacity: 0 },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark/70 backdrop-blur-md border-b border-white/[0.05] shadow-lg shadow-black/20 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="relative z-50 group">
          <span className="text-xl font-display font-bold tracking-tighter text-text-primary">
            Ayan<span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                activeSection === link.href.replace('#', '') ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.name}
              {activeSection === link.href.replace('#', '') && (
                <motion.div
                  layoutId="activeSectionIndicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-accent"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden lg:block">
          <Button href="#contact" variant="primary" className="py-2.5 px-6 text-sm">
            Let's Talk
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden relative z-50 p-2 -mr-2 text-text-primary hover:text-accent transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={mobileMenuOpen ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
        className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center"
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`text-2xl font-display font-semibold tracking-wide transition-colors ${
                activeSection === link.href.replace('#', '') ? 'text-accent' : 'text-text-primary'
              }`}
            >
              {link.name}
            </a>
          ))}
          <Button variant="primary" className="mt-4" onClick={() => {
            setMobileMenuOpen(false);
            const element = document.getElementById('contact');
            if (element) {
              const y = element.getBoundingClientRect().top + window.scrollY - 80;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }}>
            Let's Talk
          </Button>
        </nav>
      </motion.div>
    </motion.header>
  );
}
