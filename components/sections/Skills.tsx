'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import ScrollReveal from '../effects/ScrollReveal';
import { SiFlutter, SiDart, SiFirebase, SiSupabase, SiPython, SiPhp, SiLaravel, SiMysql, SiGit, SiAndroidstudio, SiFigma, SiPostman, SiHtml5, SiCss3, SiReact, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

export default function Skills() {
  const skillCategories = [
    {
      title: "Mobile Development",
      skills: [
        { name: "Flutter", icon: <SiFlutter /> },
        { name: "Dart", icon: <SiDart /> },
        { name: "Firebase", icon: <SiFirebase /> },
        { name: "Supabase", icon: <SiSupabase /> },
      ]
    },
    {
      title: "Backend & Web",
      skills: [
        { name: "Java", icon: <FaJava /> },
        { name: "Python", icon: <SiPython /> },
        { name: "PHP", icon: <SiPhp /> },
        { name: "Laravel", icon: <SiLaravel /> },
        { name: "MySQL", icon: <SiMysql /> },
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", icon: <SiHtml5 /> },
        { name: "CSS3", icon: <SiCss3 /> },
        { name: "React", icon: <SiReact /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
      ]
    },
    {
      title: "Tools & Design",
      skills: [
        { name: "Git", icon: <SiGit /> },
        { name: "Android Studio", icon: <SiAndroidstudio /> },
        { name: "Figma", icon: <SiFigma /> },
        { name: "Postman", icon: <SiPostman /> },
      ]
    }
  ];

  return (
    <section id="skills" className="py-28 md:py-40 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Expertise"
          title="Technical Skills"
          subtitle="Modern tech stack for building production-grade mobile and web systems"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal key={catIndex} delay={catIndex * 0.08} once={false}>
              <Card tilt={false}>
                <h3 className="text-lg font-display font-bold mb-6 text-text-primary tracking-tight">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-md bg-white/[0.02] border border-white/[0.04] hover:border-accent/40 transition-all duration-300 group"
                    >
                      <div className="text-xl text-text-secondary group-hover:text-accent transition-colors duration-300">
                        {skill.icon}
                      </div>
                      <span className="text-text-secondary text-sm font-medium group-hover:text-text-primary transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3} once={false} className="mt-12">
          <div className="flex flex-wrap gap-2 justify-center max-w-3xl mx-auto">
            {[
              "UML Diagrams", "Wireframing", "SRS Documentation",
              "TensorFlow Lite", "Botpress", "Streamlit",
              "Clean Architecture", "Microservices"
            ].map((skill, i) => (
              <span key={i} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
