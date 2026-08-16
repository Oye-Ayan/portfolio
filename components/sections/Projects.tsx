import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ScrollReveal from '../effects/ScrollReveal';
import { FaGithub } from 'react-icons/fa';

export default function Projects() {
  const projects = [
    {
      title: "ArticuliCare",
      subtitle: "Final Year Project",
      description: "AI-powered Flutter mobile app for detecting articulation disorders using Firebase, TFLite, and Supabase. Features real-time speech analysis, personalized therapy recommendations, and progress tracking.",
      tags: ["Flutter", "Firebase", "TFLite", "Supabase", "AI/ML"],
      featured: true,
      period: "Oct 2024 - May 2025"
    },
    {
      title: "Loan Approval Prediction App",
      description: "Machine learning application using Streamlit and Google Colab for predicting loan approval likelihood based on applicant data.",
      tags: ["Python", "Streamlit", "ML", "Colab"],
      period: "Dec 2024"
    },
    {
      title: "Gaming Accessories E-commerce",
      description: "Full-stack Laravel-based e-commerce platform with admin panel, shopping cart, checkout module, and payment integration.",
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap"],
      period: "Oct 2023"
    },
    {
      title: "ChatMate AI Chatbot",
      description: "Smart chatbot using Botpress for real-time analytics and natural language interaction with custom conversation flows.",
      tags: ["Botpress", "NLP", "JavaScript"],
      period: "Jun 2024"
    },
    {
      title: "Dript Store UI Screens",
      description: "High-fidelity UI/UX design using Figma focused on accessibility, responsive layouts, and seamless user flows for e-commerce.",
      tags: ["Figma", "UI/UX", "HCI", "Design"],
      period: "May 2024"
    },
    {
      title: "Banking Management Desktop App",
      description: "Java desktop application with user authentication, transaction history, and account management modules using NetBeans.",
      tags: ["Java", "NetBeans", "Swing", "MySQL"],
      period: "Mar 2022"
    }
  ];

  return (
    <section id="projects" className="py-28 md:py-40 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Portfolio"
          title="Featured Projects"
          subtitle="Selected mobile apps, machine learning systems, and full-stack platforms"
        />

        <div className="space-y-6">
          {/* Featured project */}
          {projects.filter(p => p.featured).map((project, index) => (
            <ScrollReveal key={index} once={false}>
              <Card className="border-accent/20 bg-dark-lighter/50">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
                          {project.title}
                        </h3>
                        <span className="tag text-accent border-accent/30 bg-accent/10">
                          Featured
                        </span>
                      </div>
                      {project.subtitle && (
                        <span className="text-accent text-xs font-mono tracking-wide">
                          {project.subtitle}
                        </span>
                      )}
                    </div>
                    <span className="text-text-tertiary text-xs font-mono whitespace-nowrap">
                      {project.period}
                    </span>
                  </div>

                  <p className="text-text-secondary text-base leading-relaxed max-w-3xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}

          {/* Secondary projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.08} once={false}>
                <Card className="h-full" tilt={false}>
                  <div className="flex flex-col h-full gap-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-display font-bold text-text-primary tracking-tight">
                        {project.title}
                      </h3>
                      <span className="text-text-tertiary text-xs font-mono whitespace-nowrap ml-3">
                        {project.period}
                      </span>
                    </div>

                    <p className="text-text-secondary text-sm leading-relaxed flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag text-[10px] px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.3} once={false} className="mt-14 text-center">
          <Button href="https://github.com/Oye-Ayan" variant="outline">
            <FaGithub className="text-lg" />
            View More on GitHub
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
