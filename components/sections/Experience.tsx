'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import { FaBriefcase } from 'react-icons/fa';

export default function Experience() {
  const experiences = [
    {
      role: "Junior Java Developer",
      company: "eConceptions",
      location: "Pakistan",
      period: "Jul 2025 – Present",
      description: [
        "Contributing to backend microservices and SOAP/REST API integration in Java (Spring, Groovy & Grails)",
        "Collaborating with cross-functional teams to align backend architecture with Flutter-based frontend workflows",
        "Improved system reliability through modular service design and refactoring legacy code"
      ]
    },
    {
      role: "Flutter Development Intern",
      company: "Pakistan Ordnance Factories (POF)",
      location: "Wah Cantt",
      period: "Summer 2024",
      description: [
        "Led a 3-person team to build a Flutter-based internal-use application",
        "Integrated Firebase backend with responsive UI, delivered working prototype in 6 weeks",
        "Conducted regular team reviews and practiced structured task breakdown",
        "Gained hands-on experience with production-level mobile app development"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-dark-lighter/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="Work Experience" 
          subtitle="Professional journey in software development"
        />

        <div className="relative space-y-8 md:ml-10">
          {/* Full vertical line behind everything */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 z-0 bg-gradient-to-b from-cyan via-purple to-cyan" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative flex md:items-start"
            >
              {/* Icon with white overlay to "cut" the line */}
              <div className="hidden md:flex flex-shrink-0 w-14 h-14 rounded-full bg-cyan/20 border-4 border-dark flex items-center justify-center z-10 -mt-2 relative">
                {/* White circle to mask the line behind */}
                <div className="absolute inset-0 bg-dark-lighter rounded-full -z-0" />
                <FaBriefcase className="text-cyan text-xl z-10 relative" />
              </div>

              {/* Card */}
              <div className="flex-1 md:ml-6">
                <Card>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-cyan text-lg font-semibold">{exp.company}</p>
                      <p className="text-gray-400 text-sm">{exp.location}</p>
                    </div>
                    <span className="text-purple font-mono text-sm mt-2 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-cyan mt-1.5">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}