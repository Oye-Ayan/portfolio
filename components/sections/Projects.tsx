'use client';

import ScrollReveal from '../effects/ScrollReveal';
import TextReveal from '../effects/TextReveal';
import HorizontalScrollCarousel from '../effects/HorizontalScrollCarousel';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink, FiArrowUpRight, FiMaximize2 } from 'react-icons/fi';
import { useState } from 'react';
import ProjectShowcase, { ProjectShowcaseData } from '../ui/ProjectShowcase';

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
            const hasCaseStudy = !!project.caseStudyImages;

            return (
              <div
                key={i}
                onClick={hasCaseStudy ? () => openCaseStudy(project) : undefined}
                className={`w-[320px] sm:w-[450px] md:w-[600px] flex-shrink-0 flex flex-col bg-[#121214] border border-white/[0.05] rounded-3xl overflow-hidden hover:border-accent/[0.4] transition-colors duration-500 group ${hasCaseStudy ? 'cursor-pointer' : ''}`}
              >
                <div className="relative aspect-[16/10] bg-black/40 border-b border-white/[0.05] overflow-hidden p-6 flex items-center justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Interactive Overlay for Case Study */}
                  {hasCaseStudy && (
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