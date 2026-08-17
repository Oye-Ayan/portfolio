'use client';

import ScrollReveal from '../effects/ScrollReveal';
import TextReveal from '../effects/TextReveal';
import ProjectCarousel, { ProjectData } from '../ui/ProjectCarousel';
import { FaGithub } from 'react-icons/fa';

const projects: ProjectData[] = [
  {
    title: "ArticuliCare",
    subtitle: "Final Year Project",
    description: "AI-powered Flutter mobile app for detecting articulation disorders using Firebase, TFLite, and Supabase. Features real-time speech analysis, personalized therapy recommendations, and progress tracking.",
    tags: ["Flutter", "Firebase", "TFLite", "Supabase", "AI/ML"],
    featured: true,
    period: "Oct 2024 - May 2025",
    image: "/projects/articulicare.png",
    demo: "https://youtu.be/BXg7ROtlc-M?si=Ruo2QvH0yKmTkV1t",
  },
  {
    title: "Loan Approval Prediction",
    description: "Machine learning application using Streamlit and Google Colab for predicting loan approval likelihood based on applicant data.",
    tags: ["Python", "Streamlit", "ML", "Colab"],
    period: "Dec 2024",
    image: "/projects/loan-prediction.png",
  },
  {
    title: "Gaming E-commerce",
    description: "Full-stack Laravel-based e-commerce platform with admin panel, shopping cart, checkout module, and payment integration.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    period: "Oct 2023",
    image: "/projects/ecommerce.png",
  },
  {
    title: "ChatMate AI",
    description: "Smart chatbot using Botpress for real-time analytics and natural language interaction with custom conversation flows.",
    tags: ["Botpress", "NLP", "JavaScript"],
    period: "Jun 2024",
    image: "/projects/chatmate.png",
  },
  {
    title: "Dript Store UI",
    description: "High-fidelity UI/UX design using Figma focused on accessibility, responsive layouts, and seamless user flows for e-commerce.",
    tags: ["Figma", "UI/UX", "HCI", "Design"],
    period: "May 2024",
    image: "/projects/dript-store.png",
  },
  {
    title: "Banking Manager",
    description: "Java desktop application with user authentication, transaction history, and account management modules using NetBeans.",
    tags: ["Java", "NetBeans", "Swing", "MySQL"],
    period: "Mar 2022",
    image: "/projects/banking-app.png",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 mb-12 md:mb-16">
        <TextReveal
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary leading-[1.05] mb-4"
        >
          Selected Work
        </TextReveal>
        <ScrollReveal once={false} delay={0.15}>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
            Mobile apps, machine learning systems, and full-stack platforms built with care
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal once={false} delay={0.2}>
        <ProjectCarousel projects={projects} />
      </ScrollReveal>

      <ScrollReveal delay={0.3} once={false} className="mt-14 text-center px-6">
        <a
          href="https://github.com/Oye-Ayan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[10px] font-medium text-sm tracking-wide border border-white/[0.1] text-text-primary hover:border-accent/40 hover:text-accent transition-all duration-300 active:scale-[0.98]"
        >
          <FaGithub className="text-lg" />
          View More on GitHub
        </a>
      </ScrollReveal>
    </section>
  );
}
