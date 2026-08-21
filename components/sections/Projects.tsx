'use client';

import ScrollReveal from '../effects/ScrollReveal';
import TextReveal from '../effects/TextReveal';
import HorizontalScrollCarousel from '../effects/HorizontalScrollCarousel';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink, FiArrowUpRight, FiMaximize2 } from 'react-icons/fi';
import { useState } from 'react';
import ArticuliCareShowcase from '../ui/ArticuliCareShowcase';

const projects = [
  {
    title: "ArticuliCare",
    subtitle: "Final Year Project",
    description: "AI-powered Flutter mobile app for detecting articulation disorders using Firebase, TFLite, and Supabase. Features real-time speech analysis, personalized therapy recommendations, and progress tracking.",
    tags: ["Flutter", "Firebase", "TFLite", "Supabase", "AI/ML"],
    featured: true,
    image: "/projects/articulicare.png",
    demo: "https://youtu.be/BXg7ROtlc-M?si=Ruo2QvH0yKmTkV1t",
  },
  {
    title: "Loan Approval Prediction",
    description: "Machine learning application using Streamlit and Google Colab for predicting loan approval likelihood based on applicant data.",
    tags: ["Python", "Streamlit", "ML", "Colab"],
    image: "/projects/loan-prediction.png",
  },
  {
    title: "Gaming E-commerce",
    description: "Full-stack Laravel-based e-commerce platform with admin panel, shopping cart, checkout module, and payment integration.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    image: "/projects/ecommerce.png",
  },
  {
    title: "ChatMate AI",
    description: "Smart chatbot using Botpress for real-time analytics and natural language interaction with custom conversation flows.",
    tags: ["Botpress", "NLP", "JavaScript"],
    image: "/projects/chatmate.png",
  },
  {
    title: "Dript Store UI",
    description: "High-fidelity UI/UX design using Figma focused on accessibility, responsive layouts, and seamless user flows for e-commerce.",
    tags: ["Figma", "UI/UX", "HCI", "Design"],
    image: "/projects/dript-store.png",
  },
  {
    title: "Banking Manager",
    description: "Java desktop application with user authentication, transaction history, and account management modules using NetBeans.",
    tags: ["Java", "NetBeans", "Swing", "MySQL"],
    image: "/projects/banking-app.png",
  }
];

export default function Projects() {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  return (
    <>
      <ArticuliCareShowcase isOpen={isCaseStudyOpen} onClose={() => setIsCaseStudyOpen(false)} />

      <section id="projects" className="py-28 md:py-40 bg-[#0a0a0b]" aria-label="Featured projects by Muhammad Ayan Khan">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12 md:mb-16">
          <TextReveal
            as="h2"
            className="text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-4"
          >
            Selected Work
          </TextReveal>
          <TextReveal
            as="h3"
            className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4"
          >
            Projects & Case Studies
          </TextReveal>
          <ScrollReveal once={false} delay={0.15}>
            <p className="text-[#a1a1aa] text-lg leading-relaxed max-w-xl">
              Mobile apps, machine learning systems, and full-stack platforms built with care and clean architecture.
            </p>
          </ScrollReveal>
        </div>

        <HorizontalScrollCarousel>
          {projects.map((project, i) => {
            const isArticuliCare = project.title === "ArticuliCare";

            return (
              <div
                key={i}
                onClick={isArticuliCare ? () => setIsCaseStudyOpen(true) : undefined}
                className={`w-[320px] sm:w-[450px] md:w-[600px] flex-shrink-0 flex flex-col bg-[#121214] border border-white/[0.05] rounded-3xl overflow-hidden hover:border-accent/[0.4] transition-colors duration-500 group ${isArticuliCare ? 'cursor-pointer' : ''}`}
              >
                <div className="relative aspect-[16/10] bg-black/40 border-b border-white/[0.05] overflow-hidden p-6 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Interactive Overlay for Case Study */}
                  {isArticuliCare && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 backdrop-blur-sm">
                      <span className="flex items-center gap-2 text-white font-bold tracking-widest uppercase text-sm bg-accent/20 border border-accent/50 px-6 py-3 rounded-full">
                        <FiMaximize2 className="text-xl" /> View Case Study
                      </span>
                    </div>
                  )}

                  {project.featured && (
                    <div className="absolute top-4 right-4 z-30">
                      <span className="px-3 py-1 text-[10px] font-bold text-[#0a0a0b] bg-accent rounded-md uppercase tracking-wider shadow-lg shadow-accent/20">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <h4 className="text-2xl font-display font-bold text-white mb-2 tracking-tight">
                    {project.title}
                  </h4>
                  {project.subtitle && (
                    <p className="text-accent text-sm font-semibold mb-4">
                      {project.subtitle}
                    </p>
                  )}
                  <p className="text-[#a1a1aa] text-sm leading-relaxed mb-8 flex-1 font-body">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2.5 py-1 text-[10px] font-bold text-white bg-white/[0.03] border border-white/[0.1] rounded tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.demo && (
                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/[0.05]">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm font-semibold text-accent hover:text-white transition-colors group/link"
                      >
                        <FiExternalLink className="text-lg" /> Live Demo
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* CTA is the final item in the horizontal track — the pin
            releases the moment this is in view, flowing straight
            into the next section with no dead scroll. */}
          <a
            href="https://github.com/Oye-Ayan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[320px] sm:w-[400px] md:w-[500px] flex-shrink-0 flex flex-col items-center justify-center text-center gap-6 bg-[#121214] border border-white/[0.05] rounded-3xl p-10 hover:border-accent/[0.4] transition-colors duration-500 group"
          >
            <span className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.1] flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500">
              <FaGithub className="text-3xl text-white group-hover:text-[#0a0a0b] transition-colors duration-500" />
            </span>
            <div>
              <h4 className="text-2xl font-display font-bold text-white tracking-tight mb-2">
                More on GitHub
              </h4>
              <p className="text-[#a1a1aa] text-sm leading-relaxed font-body">
                Explore the rest of the code, experiments, and side projects.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:text-white transition-colors">
              View Profile <FiArrowUpRight className="text-lg" />
            </span>
          </a>
        </HorizontalScrollCarousel>
      </section>
    </>
  );
}