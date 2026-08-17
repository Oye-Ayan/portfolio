'use client';

import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import ScrollReveal from '../effects/ScrollReveal';
import { FaCode, FaMobile, FaLightbulb, FaRocket } from 'react-icons/fa';

export default function About() {
  const highlights = [
    {
      icon: <FaMobile className="text-2xl" />,
      title: "Mobile Expertise",
      description: "Flutter, Firebase, Supabase for production-ready apps"
    },
    {
      icon: <FaCode className="text-2xl" />,
      title: "Full-Stack Skills",
      description: "Backend systems with Java, PHP Laravel, Python"
    },
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "AI Integration",
      description: "TensorFlow Lite, machine learning in healthcare"
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Clean Architecture",
      description: "Scalable, maintainable, production-grade code"
    }
  ];

  return (
    <section id="about" className="py-28 md:py-40 px-6 sm:px-8" aria-label="About Muhammad Ayan Khan — Software Engineer overview">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Overview"
          title="About Me"
          subtitle="Results-driven software engineer crafting elegant mobile & web applications"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
          {/* Left - Bio text with bidirectional reveal */}
          <ScrollReveal className="lg:col-span-3" direction="up" once={false}>
            <div className="space-y-6 text-text-secondary text-lg md:text-xl leading-relaxed font-body">
              <p>
                I&apos;m a <span className="text-text-primary font-semibold">Software Engineer</span> and{' '}
                <span className="text-accent font-semibold">Flutter Developer</span> with a focus on building high-performance cross-platform applications.
              </p>
              <p>
                Currently at <span className="text-text-primary font-semibold">eConceptions</span> as a Junior Java Developer, I engineer microservices and robust API integrations. My work on <span className="text-accent font-semibold">ArticuliCare</span> leverages on-device AI for speech pathology detection.
              </p>
            </div>
          </ScrollReveal>

          {/* Right - Highlight cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.08} direction="up" once={false}>
                <Card className="h-full" tilt={false}>
                  <div className="flex items-start gap-4">
                    <div className="text-accent shrink-0 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-base font-display font-semibold text-text-primary mb-1">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
