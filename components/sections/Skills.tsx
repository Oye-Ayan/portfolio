
'use client';

import { motion } from 'framer-motion';
import TextReveal from '../effects/TextReveal';
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

  const additionalSkills = [
    "UML Diagrams", "Wireframing", "SRS Documentation",
    "TensorFlow Lite", "Botpress", "Streamlit",
    "Clean Architecture", "Microservices"
  ];

  return (
    <section id="skills" className="py-28 md:py-40 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <TextReveal
          as="h2"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary leading-[1.05] mb-16 md:mb-24"
        >
          Technical Skills
        </TextReveal>

        {/* Skill groups - editorial layout, not boxes */}
        <div className="space-y-12 md:space-y-16">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal key={catIndex} delay={catIndex * 0.06} once={false}>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
                {/* Category title */}
                <h3 className="text-sm font-medium text-text-tertiary tracking-wide uppercase">
                  {category.title}
                </h3>

                {/* Skills flow */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-[10px] bg-white/[0.02] border border-white/[0.05] hover:border-accent/30 transition-all duration-300 group"
                    >
                      <div className="text-lg text-text-tertiary group-hover:text-accent transition-colors duration-300">
                        {skill.icon}
                      </div>
                      <span className="text-text-secondary text-sm font-medium group-hover:text-text-primary transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Divider between groups */}
              {catIndex < skillCategories.length - 1 && (
                <div className="border-b border-white/[0.04] mt-12 md:mt-16" />
              )}
            </ScrollReveal>
          ))}
        </div>

        {/* Additional skills - flowing editorial text, not boxes */}
        <ScrollReveal delay={0.3} once={false} className="mt-16 md:mt-20">
          <div className="md:grid md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start">
            <h3 className="text-sm font-medium text-text-tertiary tracking-wide uppercase mb-4 md:mb-0">
              Also proficient in
            </h3>
            <p className="text-text-secondary text-base leading-relaxed">
              {additionalSkills.map((skill, i) => (
                <span key={i}>
                  <span className="hover:text-accent transition-colors duration-300 cursor-default">
                    {skill}
                  </span>
                  {i < additionalSkills.length - 1 && (
                    <span className="text-text-tertiary/60 mx-2">/</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
