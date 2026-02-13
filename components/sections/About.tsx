'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import { FaCode, FaMobile, FaLightbulb, FaRocket } from 'react-icons/fa';

export default function About() {
  const highlights = [
    {
      icon: <FaMobile className="text-3xl" />,
      title: "Mobile Expertise",
      description: "Flutter, Firebase, Supabase for production-ready apps"
    },
    {
      icon: <FaCode className="text-3xl" />,
      title: "Full-Stack Skills",
      description: "Backend systems with Java, PHP Laravel, Python"
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "AI Integration",
      description: "TensorFlow Lite, machine learning in healthcare"
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Clean Architecture",
      description: "Scalable, maintainable, production-grade code"
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="About Me" 
          subtitle="Results-driven developer with a passion for elegant solutions"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Card className="text-center md:text-left">
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a <span className="text-cyan font-semibold">Flutter Developer</span> and <span className="text-purple font-semibold">Full-Stack Engineer</span> with hands-on experience 
              in cross-platform app development using Flutter, Firebase, and Supabase. Currently working at <span className="text-cyan font-semibold">eConceptions</span> as a Junior Java Developer, 
              I contribute to backend microservices and API integration while exploring innovative mobile solutions.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              My final year project, <span className="text-cyan font-semibold">ArticuliCare</span>, demonstrates my ability to integrate AI with mobile technology for real-world healthcare applications. 
              I'm passionate about crafting elegant UI/UX and delivering reliable, high-performance experiences.
            </p>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <div className="text-cyan mb-4 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-display font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
