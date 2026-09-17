'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import JsonLd from '@/components/seo/JsonLd';
import LoadingScreen from '@/components/ui/LoadingScreen';
import FloatingNav from '@/components/ui/FloatingNav';

// Code-split decorative effects — they don't affect LCP or page content
const CursorGlow = dynamic(() => import('@/components/effects/CursorGlow'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/effects/ParticleField'), { ssr: false });
const FloatingShapes = dynamic(() => import('@/components/effects/FloatingShapes'), { ssr: false });

// Mount decorative effects after critical content has painted
function useDeferredMount(delayMs: number) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), delayMs);
    return () => clearTimeout(id);
  }, [delayMs]);
  return mounted;
}

export default function Home() {
  const effectsReady = useDeferredMount(1800);

  return (
    <>
      {/* Structured Data for Google Rich Results */}
      <JsonLd />

      <main className="relative" role="main" aria-label="Muhammad Ayan Khan — Software Engineer Portfolio">
        <LoadingScreen />
        <FloatingNav />
        <div className="tech-grid-bg fixed inset-0 -z-10" />

        {/* Global interactive 3D effects — deferred to not compete with LCP */}
        {effectsReady && (
          <>
            <CursorGlow />
            <ParticleField />
            <FloatingShapes />
          </>
        )}

        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
