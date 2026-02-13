'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

export default function Projects() {
  const projects = [
    {
      title: "ArticuliCare",
      subtitle: "Final Year Project",
      description: "AI-powered Flutter mobile app for detecting articulation disorders using Firebase, TFLite, and Supabase. Features real-time speech analysis, personalized therapy recommendations, and progress tracking.",
      tags: ["Flutter", "Firebase", "TFLite", "Supabase", "AI/ML"],
      featured: true,
      period: "Oct 2024 – May 2025"
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
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="Featured Projects" 
          subtitle="Building innovative solutions from mobile apps to AI-powered systems"
        />

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className={project.featured ? 'border-2 border-cyan/50 glow-border' : ''}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-display font-bold text-white mb-1">
                          {project.title}
                        </h3>
                        {project.subtitle && (
                          <span className="text-cyan text-sm font-mono">{project.subtitle}</span>
                        )}
                      </div>
                      <span className="text-gray-500 text-sm whitespace-nowrap ml-4">{project.period}</span>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 text-sm rounded-full bg-cyan/10 text-cyan border border-cyan/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Button href="https://github.com/Oye-Ayan" variant="outline">
            <FaGithub className="text-xl" />
            View More on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
