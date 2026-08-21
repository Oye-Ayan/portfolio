import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import CursorGlow from "@/components/effects/CursorGlow";
import ParticleField from "@/components/effects/ParticleField";
import JsonLd from "@/components/seo/JsonLd";
import LoadingScreen from "@/components/ui/LoadingScreen";
import FloatingNav from "@/components/ui/FloatingNav";

export default function Home() {
  return (
    <>
      {/* Structured Data for Google Rich Results */}
      <JsonLd />

      <main className="relative" role="main" aria-label="Muhammad Ayan Khan — Software Engineer Portfolio">
        <LoadingScreen />
        <FloatingNav />
        <div className="tech-grid-bg fixed inset-0 -z-10" />

        {/* Global interactive effects */}
        <CursorGlow />
        <ParticleField />

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

