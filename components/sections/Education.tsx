'use client';

import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import ScrollReveal from '../effects/ScrollReveal';
import { FaGraduationCap, FaStar } from 'react-icons/fa';

export default function Education() {
  return (
    <section id="education" className="py-28 md:py-40 px-6 sm:px-8" aria-label="Education — BS Software Engineering from COMSATS University">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          label="Academics"
          title="Education"
          subtitle="Academic foundation in software engineering and computer science"
        />

        <ScrollReveal once={false}>
          <Card tilt={true} className="mb-6 group">
            <div className="flex items-start gap-4 mb-6 preserve-3d">
              <div className="p-3.5 bg-accent/10 border border-accent/20 rounded-xl text-accent text-2xl [transform:translateZ(26px)] transition-transform duration-300 shadow-[0_0_20px_rgba(100,217,154,0.15)]">
                <FaGraduationCap />
              </div>
              <div className="flex-1 [transform:translateZ(18px)] transition-transform duration-300">
                <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary mb-1">
                  Bachelor of Science in Software Engineering
                </h3>
                <p className="text-accent text-base font-medium mb-2">
                  COMSATS University Islamabad, Wah Campus
                </p>
                <div className="flex flex-wrap gap-4 text-text-tertiary text-xs">
                  <span>2021 – 2025</span>
                  <span className="flex items-center gap-1 text-accent font-semibold">
                    <FaStar className="text-accent text-xs" />
                    CGPA: 3.52
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-border preserve-3d">
              <div className="[transform:translateZ(14px)]">
                <h4 className="text-sm font-semibold text-text-primary mb-1">Final Year Project</h4>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  <span className="text-accent font-medium">ArticuliCare</span> – AI-powered Flutter app for articulation disorder detection using Supabase & TFLite
                </p>
              </div>

              <div className="[transform:translateZ(16px)]">
                <h4 className="text-sm font-semibold text-text-primary mb-3">Key Courses</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Mobile App Development",
                    "Software Engineering",
                    "Database Systems",
                    "AI Fundamentals",
                    "Human-Computer Interaction",
                    "Web Development",
                    "Data Structures & Algorithms",
                    "Object-Oriented Programming"
                  ].map((course, index) => (
                    <span key={index} className="tag text-xs hover:scale-105 transition-transform">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.15} once={false} className="text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-surface border border-border text-xs text-text-tertiary shadow-lg">
            <span className="text-accent font-semibold">Languages:</span> English (Fluent), Urdu (Native)
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
