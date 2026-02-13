'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import { SiFlutter, SiDart, SiFirebase, SiSupabase, SiPython, SiPhp, SiLaravel, SiMysql, SiGit, SiAndroidstudio, SiFigma, SiPostman, SiHtml5, SiCss3, SiReact, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

export default function Skills() {
  const skillCategories = [
    {
      title: "Mobile Development",
      skills: [
        { name: "Flutter", icon: <SiFlutter />, color: "text-blue-400" },
        { name: "Dart", icon: <SiDart />, color: "text-cyan" },
        { name: "Firebase", icon: <SiFirebase />, color: "text-yellow-400" },
        { name: "Supabase", icon: <SiSupabase />, color: "text-green-400" },
      ]
    },
    {
      title: "Backend & Web",
      skills: [
        { name: "Java", icon: <FaJava />, color: "text-red-400" },
        { name: "Python", icon: <SiPython />, color: "text-blue-300" },
        { name: "PHP", icon: <SiPhp />, color: "text-purple-400" },
        { name: "Laravel", icon: <SiLaravel />, color: "text-red-500" },
        { name: "MySQL", icon: <SiMysql />, color: "text-blue-400" },
      ]
    },
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", icon: <SiHtml5 />, color: "text-orange-500" },
        { name: "CSS3", icon: <SiCss3 />, color: "text-blue-400" },
        { name: "React", icon: <SiReact />, color: "text-cyan" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "text-cyan" },
      ]
    },
    {
      title: "Tools & Design",
      skills: [
        { name: "Git", icon: <SiGit />, color: "text-orange-400" },
        { name: "Android Studio", icon: <SiAndroidstudio />, color: "text-green-400" },
        { name: "Figma", icon: <SiFigma />, color: "text-purple" },
        { name: "Postman", icon: <SiPostman />, color: "text-orange-500" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-dark-lighter/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="Technical Skills" 
          subtitle="Modern tech stack for building production-grade applications"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <Card>
                <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-dark-accent/50 hover:bg-dark-accent transition-all"
                    >
                      <div className={`text-3xl ${skill.color}`}>
                        {skill.icon}
                      </div>
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block">
            <p className="text-gray-400">
              <span className="text-cyan font-semibold">Additional Skills:</span> UML Diagrams, Wireframing, SRS Documentation, 
              TensorFlow Lite, Botpress, Streamlit, Clean Architecture, Microservices
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
