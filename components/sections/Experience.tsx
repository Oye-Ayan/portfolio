'use client';

import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import ScrollReveal from '../effects/ScrollReveal';

export default function Experience() {
  const experiences = [
    {
      role: "Junior Java Developer",
      company: "eConceptions",
      location: "Pakistan",
      period: "Jul 2025 – Present",
      description: [
        "Contributing to backend microservices and SOAP/REST API integration in Java (Spring, Groovy & Grails)",
        "Collaborating with cross-functional teams to align backend architecture with Flutter-based frontend workflows",
        "Improved system reliability through modular service design and refactoring legacy code"
      ]
    },
    {
      role: "Flutter Development Intern",
      company: "Pakistan Ordnance Factories (POF)",
      location: "Wah Cantt",
      period: "Summer 2024",
      description: [
        "Led a 3-person team to build a Flutter-based internal-use application",
        "Integrated Firebase backend with responsive UI, delivered working prototype in 6 weeks",
        "Conducted regular team reviews and practiced structured task breakdown",
        "Gained hands-on experience with production-level mobile app development"
      ]
    }
  ];

  return (
    <section id="experience" className="py-28 md:py-40 px-6 sm:px-8" aria-label="Work experience — Junior Java Developer at eConceptions">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          label="Career"
          title="Work Experience"
          subtitle="Professional journey in software development and backend systems"
        />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ScrollReveal key={index} delay={index * 0.12} once={false} direction="up">
              <Card tilt={true} className="group">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-6 preserve-3d">
                  <div className="[transform:translateZ(20px)] transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-text-primary tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-accent font-semibold text-base mt-0.5">{exp.company}</p>
                    <p className="text-text-tertiary text-xs">{exp.location}</p>
                  </div>
                  <span className="text-text-secondary text-xs whitespace-nowrap bg-surface px-3 py-1.5 rounded-lg border border-border self-start [transform:translateZ(24px)] shadow-[0_0_15px_rgba(100,217,154,0.05)]">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-3 [transform:translateZ(12px)]">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-text-secondary text-sm md:text-base leading-relaxed flex items-start gap-3">
                      <span className="text-accent mt-1 flex-shrink-0 text-xs">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}