import dynamic from 'next/dynamic';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import JsonLd from '@/components/seo/JsonLd';
import LoadingScreen from '@/components/ui/LoadingScreen';
import FloatingNav from '@/components/ui/FloatingNav';
import DeferredDecorativeEffects from '@/components/effects/DeferredDecorativeEffects';

// Below-the-fold sections: Dynamically loaded to prevent asset/JS execution during initial paint (FCP/LCP)
const Skills = dynamic(() => import('@/components/sections/Skills'), {
  loading: () => <div className="min-h-[300px]" aria-hidden="true" />,
});

const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div className="min-h-[500px]" aria-hidden="true" />,
});

const Experience = dynamic(() => import('@/components/sections/Experience'), {
  loading: () => <div className="min-h-[400px]" aria-hidden="true" />,
});

const Education = dynamic(() => import('@/components/sections/Education'), {
  loading: () => <div className="min-h-[300px]" aria-hidden="true" />,
});

const Certifications = dynamic(() => import('@/components/sections/Certifications'), {
  loading: () => <div className="min-h-[300px]" aria-hidden="true" />,
});

const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="min-h-[350px]" aria-hidden="true" />,
});

export default function Home() {
  return (
    <>
      {/* Structured Data for Google Rich Results */}
      <JsonLd />

      <main className="relative" role="main" aria-label="Muhammad Ayan Khan — Software Engineer Portfolio">
        <LoadingScreen />
        <FloatingNav />
        <div className="tech-grid-bg fixed inset-0 -z-10" />

        {/* Global interactive background effects — deferred to browser idle time to never block FCP */}
        <DeferredDecorativeEffects />

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
