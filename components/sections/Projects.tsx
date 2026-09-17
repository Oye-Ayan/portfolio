'use client';

import ScrollReveal from '../effects/ScrollReveal';
import TextReveal from '../effects/TextReveal';
import HorizontalScrollCarousel from '../effects/HorizontalScrollCarousel';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink, FiArrowUpRight, FiMaximize2 } from 'react-icons/fi';
import { useState } from 'react';
import ProjectShowcase, { ProjectShowcaseData } from '../ui/ProjectShowcase';
import TiltCard from '../effects/TiltCard';
import Image from 'next/image';

const articuliCareImages = [
  "/fyp_interface/IMG-20250508-WA0011.jpg", "/fyp_interface/IMG-20250508-WA0012.jpg",
  "/fyp_interface/IMG-20250508-WA0013.jpg", "/fyp_interface/IMG-20250508-WA0015.jpg",
  "/fyp_interface/IMG-20250508-WA0016.jpg", "/fyp_interface/IMG-20250508-WA0019.jpg",
  "/fyp_interface/IMG-20250519-WA0003.jpg", "/fyp_interface/IMG-20250519-WA0004.jpg",
  "/fyp_interface/IMG-20250519-WA0005.jpg", "/fyp_interface/IMG-20250519-WA0006.jpg",
  "/fyp_interface/IMG-20250519-WA0007.jpg", "/fyp_interface/IMG-20250519-WA0008.jpg",
  "/fyp_interface/IMG-20250519-WA0009.jpg", "/fyp_interface/IMG-20250519-WA0010.jpg",
  "/fyp_interface/IMG-20250519-WA0011.jpg", "/fyp_interface/IMG-20250519-WA0012.jpg",
  "/fyp_interface/IMG-20250519-WA0013.jpg", "/fyp_interface/IMG-20250519-WA0014.jpg",
  "/fyp_interface/IMG-20250519-WA0015.jpg", "/fyp_interface/IMG-20250519-WA0016.jpg",
  "/fyp_interface/IMG-20250519-WA0017.jpg", "/fyp_interface/IMG-20250519-WA0018.jpg",
  "/fyp_interface/IMG-20250519-WA0019.jpg", "/fyp_interface/IMG-20250519-WA0020.jpg",
  "/fyp_interface/IMG-20250519-WA0021.jpg"
];

const loanApprovalImages = [
  "/loan_approval_interface/main.png",
  "/loan_approval_interface/validation.png",
  "/loan_approval_interface/approve.png",
  "/loan_approval_interface/reject.png"
];

const apparelStoreImages = [
  "/ayan_apparel_interface/register.png",
  "/ayan_apparel_interface/login.png",
  "/ayan_apparel_interface/homepage.png",
  "/ayan_apparel_interface/shop.png",
  "/ayan_apparel_interface/cart1.png",
  "/ayan_apparel_interface/cart.png",
  "/ayan_apparel_interface/checkout.png",
  "/ayan_apparel_interface/order_confirmation.png",
  "/ayan_apparel_interface/user_account.png",
  "/ayan_apparel_interface/user_orders.png",
  "/ayan_apparel_interface/user_payment.png",
  "/ayan_apparel_interface/wishlist.png",
  "/ayan_apparel_interface/aboutus.png",
  "/ayan_apparel_interface/blog.png",
  "/ayan_apparel_interface/contactus.png",
  "/ayan_apparel_interface/delete_account.png"
];

const chatMateImages = [
  "/chatMate_interface/ChatMatelayout.png",
  "/chatMate_interface/preview_chatmate.png"
];

const dipStoreImages = [
  "/dipstore_interface/dipstoresplash.png",
  "/dipstore_interface/dipstorelogin.png",
  "/dipstore_interface/shop.png",
  "/dipstore_interface/account.png"
];

const bmsImages = [
  "/bms_interface/bank_register.png",
  "/bms_interface/bank_login.png",
  "/bms_interface/bank_mainpage.png",
  "/bms_interface/success_transfer.png",
  "/bms_interface/withdraw_success.png",
  "/bms_interface/acc_notfound.png"
];

const projects = [
  {
    title: "ArticuliCare",
    subtitle: "Final Year Project",
    description: "AI-powered Flutter mobile app for detecting articulation disorders using Firebase, TFLite, and Supabase. Features real-time speech analysis, personalized therapy recommendations, and progress tracking.",
    role: "Lead Developer / ML Integrator",
    platform: "Cross-Platform Mobile",
    tags: ["Flutter", "Firebase", "TFLite", "Supabase", "AI/ML"],
    featured: true,
    image: "/projects/articulicare_main.jpeg",
    demo: "https://youtu.be/BXg7ROtlc-M?si=Ruo2QvH0yKmTkV1t",
    github: "https://github.com/Oye-Ayan/Articu",
    caseStudyImages: articuliCareImages,
    isMobileLayout: true,
  },
  {
    title: "Loan Approval Prediction",
    subtitle: "Machine Learning Application",
    description: "Machine learning application using Streamlit and Google Colab for predicting loan approval likelihood based on applicant data.",
    role: "Machine Learning Engineer",
    platform: "Web Application",
    tags: ["Python", "Streamlit", "ML", "Colab"],
    image: "/projects/loan-prediction.jpeg",
    github: "https://github.com/Oye-Ayan/Loan-Approval-",
    caseStudyImages: loanApprovalImages,
    isMobileLayout: false,
  },
  {
    title: "Apparel Store E-commerce",
    subtitle: "Full-Stack Web Application",
    description: "Full-stack Laravel-based e-commerce platform with an admin panel, shopping cart, checkout module, and payment integration. Built using modern MVC architecture.",
    role: "Full-Stack Developer",
    platform: "Web Application",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    image: "/projects/ecommerce.jpeg",
    github: "https://github.com/Oye-Ayan/ayan-apparel-Ecommerce",
    caseStudyImages: apparelStoreImages,
    isMobileLayout: false,
  },
  {
    title: "ChatMate AI",
    subtitle: "Conversational AI Agent",
    description: "Intelligent chatbot rapidly architected and deployed utilizing a powerful no-code platform (Botpress). Designed for natural language interaction, highly customized conversation flows, and real-time user analytics.",
    role: "AI Integrator",
    platform: "Web Widget",
    tags: ["Botpress", "No-Code", "NLP", "AI"],
    image: "/projects/chatMate.jpeg",
    caseStudyImages: chatMateImages,
    isMobileLayout: false,
  },
  {
    title: "Dip Store UI",
    subtitle: "High-Fidelity App Design",
    description: "High-fidelity UI/UX design using Figma focused on accessibility, responsive layouts, and seamless user flows for an e-commerce platform.",
    role: "UI/UX Designer",
    platform: "Mobile App Design",
    tags: ["Figma", "UI/UX", "HCI", "Design"],
    image: "/projects/DipStore.jpeg",
    demo: "https://www.figma.com/design/LSSVf2YNsTLvAya7Cyerel/Dipstore?node-id=0-1&t=e4bICOSXtuUkNRtX-1",
    caseStudyImages: dipStoreImages,
    isMobileLayout: true,
  },
  {
    title: "Bank Management System",
    subtitle: "Java Desktop Application",
    description: "Robust desktop banking application built with Java Swing and MySQL. Features secure user authentication, real-time transaction processing, and comprehensive account management modules.",
    role: "Java Developer",
    platform: "Desktop Application",
    tags: ["Java", "NetBeans", "Swing", "MySQL"],
    image: "/projects/banking_app.jpeg",
    github: "https://github.com/Oye-Ayan/Bank-Management-System",
    caseStudyImages: bmsImages,
    isMobileLayout: false,
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectShowcaseData | null>(null);

  const openCaseStudy = (project: any) => {
    setActiveProject({
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      role: project.role,
      platform: project.platform,
      tags: project.tags,
      demo: project.demo,
      github: project.github,
      images: project.caseStudyImages,
      isMobileLayout: project.isMobileLayout,
    });
  };

  return (
    <>
      <ProjectShowcase isOpen={!!activeProject} onClose={() => setActiveProject(null)} project={activeProject} />

      <section id="projects" className="py-28 md:py-40 bg-dark" aria-label="Featured projects by Muhammad Ayan Khan">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-12 md:mb-16">
          <TextReveal
            as="h2"
            className="text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-4"
          >
            Selected Work
          </TextReveal>
          <TextReveal
            as="h3"
            className="text-4xl md:text-5xl font-display font-bold text-text-primary tracking-tight mb-4"
          >
            Projects & Case Studies
          </TextReveal>
          <ScrollReveal once={false} delay={0.15}>
            <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
              Mobile apps, machine learning systems, and full-stack platforms built with care and clean architecture.
            </p>
          </ScrollReveal>
        </div>

        <HorizontalScrollCarousel>
          {projects.map((project, i) => {
            const hasCaseStudy = !!project.caseStudyImages;

            return (
              <TiltCard
                key={i}
                tiltStrength={6}
                className="w-[320px] sm:w-[450px] md:w-[600px] flex-shrink-0"
              >
                <div
                  onClick={hasCaseStudy ? () => openCaseStudy(project) : undefined}
                  className={`w-full h-full flex flex-col bg-surface border border-border rounded-3xl overflow-hidden hover:border-accent/[0.4] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1),0_0_30px_-10px_rgba(5,150,105,0.15)] dark:hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(100,217,154,0.15)] transition-all duration-500 group preserve-3d ${hasCaseStudy ? 'cursor-pointer' : ''}`}
                >
                  <div className="relative aspect-[16/10] bg-black/5 dark:bg-black/40 border-b border-border overflow-hidden [transform:translateZ(12px)]">
                    <div className="absolute inset-0 p-6 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 320px, (max-width: 768px) 450px, 600px"
                          className="object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                          quality={85}
                        />
                      </div>
                    </div>

                    {/* Interactive Overlay for Case Study */}
                    {hasCaseStudy && (
                      <div className="absolute inset-0 bg-black/50 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20 backdrop-blur-sm">
                        <span className="flex items-center gap-2 text-white font-bold tracking-widest uppercase text-sm bg-accent/30 dark:bg-accent/20 border border-accent/60 px-6 py-3 rounded-full [transform:translateZ(25px)] shadow-lg">
                          <FiMaximize2 className="text-xl" /> View More
                        </span>
                      </div>
                    )}

                    {project.featured && (
                      <div className="absolute top-4 right-4 z-30 [transform:translateZ(30px)]">
                        <span className="px-3 py-1 text-[10px] font-bold text-dark bg-accent rounded-md uppercase tracking-wider shadow-lg shadow-accent/20">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-1 preserve-3d">
                    <h4 className="text-2xl font-display font-bold text-text-primary mb-2 tracking-tight [transform:translateZ(18px)]">
                      {project.title}
                    </h4>
                    {project.subtitle && (
                      <p className="text-accent text-sm font-semibold mb-4 [transform:translateZ(14px)]">
                        {project.subtitle}
                      </p>
                    )}
                    <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-1 font-body [transform:translateZ(10px)]">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6 [transform:translateZ(16px)]">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2.5 py-1 text-[10px] font-semibold text-text-primary bg-surface/80 border border-border rounded tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.demo && (
                      <div className="mt-auto flex items-center justify-between pt-5 border-t border-border [transform:translateZ(14px)]">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2.5 text-sm font-semibold text-accent hover:text-text-primary transition-colors group/link"
                        >
                          <FiExternalLink className="text-lg" /> Live Demo
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}

          <TiltCard
            tiltStrength={6}
            className="w-[320px] sm:w-[400px] md:w-[500px] flex-shrink-0"
          >
            <a
              href="https://github.com/Oye-Ayan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex flex-col items-center justify-center text-center gap-6 bg-surface border border-border rounded-3xl p-10 hover:border-accent/[0.4] transition-colors duration-500 group preserve-3d"
            >
              <span className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500 [transform:translateZ(25px)] shadow-[0_0_20px_rgba(5,150,105,0.15)] dark:shadow-[0_0_20px_rgba(100,217,154,0.2)]">
                <FaGithub className="text-3xl text-text-primary group-hover:text-dark transition-colors duration-500" />
              </span>
              <div className="[transform:translateZ(18px)]">
                <h4 className="text-2xl font-display font-bold text-text-primary tracking-tight mb-2">
                  More on GitHub
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed font-body">
                  Explore the rest of the code, experiments, and side projects.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:text-text-primary transition-colors [transform:translateZ(20px)]">
                View Profile <FiArrowUpRight className="text-lg" />
              </span>
            </a>
          </TiltCard>
        </HorizontalScrollCarousel>
      </section>
    </>
  );
}