'use client';

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

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

const MENU_ID = 'mobile-navigation';
const SCROLL_LOCK_OWNER = 'mobile-menu';
const HEADER_OFFSET = 80;
// Ignore sub-threshold scroll jitter (iOS rubber-banding, trackpad noise) so the bar doesn't flicker.
const SCROLL_DELTA_THRESHOLD = 6;

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function scrollToId(targetId: string) {
  const element = document.getElementById(targetId);
  if (!element) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuOpenRef = useRef(false);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);

    // Keep the bar (and its close button) pinned while the menu is open.
    if (menuOpenRef.current) return;

    const previous = scrollY.getPrevious() ?? 0;
    const delta = latest - previous;
    if (Math.abs(delta) < SCROLL_DELTA_THRESHOLD) return;

    setHidden(latest > 150 && delta > 0);
  });

  // Scroll lock is applied in a layout effect so it is in place before paint and
  // released synchronously during commit when the menu closes.
  useIsomorphicLayoutEffect(() => {
    menuOpenRef.current = mobileMenuOpen;
    if (!mobileMenuOpen) return;

    setHidden(false);
    lockScroll(SCROLL_LOCK_OWNER);
    return () => unlockScroll(SCROLL_LOCK_OWNER);
  }, [mobileMenuOpen]);

  // Close on Escape, and when the viewport grows into the desktop layout.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleBreakpoint);
    firstLinkRef.current?.focus({ preventScroll: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleBreakpoint);
    };
  }, [mobileMenuOpen]);

  // Active section tracking and URL hash synchronization
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);

            // Synchronize browser address bar cleanly without triggering scroll jumps
            if (typeof window !== 'undefined') {
              const targetHash = sectionId === 'home' ? '' : `#${sectionId}`;
              if (window.location.hash !== targetHash) {
                const newUrl = sectionId === 'home'
                  ? window.location.pathname + window.location.search
                  : `${window.location.pathname}${window.location.search}#${sectionId}`;
                window.history.replaceState(null, '', newUrl);
              }
            }
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const navigateTo = (href: string) => {
    // Release the lock imperatively so the programmatic scroll isn't swallowed by overflow: hidden.
    unlockScroll(SCROLL_LOCK_OWNER);
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    scrollToId(targetId);

    if (typeof window !== 'undefined') {
      const newUrl = targetId === 'home'
        ? window.location.pathname + window.location.search
        : `${window.location.pathname}${window.location.search}#${targetId}`;
      window.history.replaceState(null, '', newUrl);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    navigateTo(href);
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: '-100%', opacity: 0 },
        }}
        initial={false}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,padding] duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'bg-dark/70 backdrop-blur-md border-b border-border shadow-[var(--shadow-nav)] dark:shadow-lg dark:shadow-black/20 py-4'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="relative group">
            <span className="text-xl font-display font-bold tracking-tighter text-text-primary">
              Ayan<span className="text-accent">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeSectionIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-accent"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* The floating side rail hosts the toggle on xl+, so the bar only shows it below that. */}
            <ThemeToggle className="xl:hidden" />

            {/* CTA Button Desktop */}
            <div className="hidden lg:block">
              <Button
                variant="primary"
                className="py-2.5 px-6 text-sm"
                onClick={() => navigateTo('#contact')}
              >
                Let&apos;s Talk
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden flex items-center justify-center w-11 h-11 -mr-2 rounded-xl text-text-primary hover:text-accent transition-colors touch-manipulation"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls={MENU_ID}
            >
              {mobileMenuOpen ? <FaTimes className="text-xl" aria-hidden="true" /> : <FaBars className="text-xl" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/*
        Mobile Menu Overlay — rendered as a sibling of the header (not a child) so that the
        header's transform/backdrop-filter can't become the containing block for this fixed layer.
      */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            id={MENU_ID}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeMenu();
            }}
            className="fixed inset-0 z-40 lg:hidden bg-dark/95 backdrop-blur-xl overflow-y-auto overscroll-contain flex flex-col items-center justify-center px-6 pt-24 pb-10"
          >
            <nav className="flex flex-col items-center gap-6 sm:gap-8" aria-label="Mobile">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.a
                    key={link.name}
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-current={isActive ? 'location' : undefined}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.03 * i, ease: [0.16, 1, 0.3, 1] }}
                    className={`px-4 py-1 text-2xl font-display font-semibold tracking-wide transition-colors touch-manipulation ${
                      isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <Button variant="primary" className="mt-4" onClick={() => navigateTo('#contact')}>
                Let&apos;s Talk
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
