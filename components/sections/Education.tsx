'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import { FaGraduationCap, FaStar } from 'react-icons/fa';

export default function Education() {
  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="Education" 
          subtitle="Academic foundation in software engineering"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-cyan/20 rounded-lg">
                  <FaGraduationCap className="text-4xl text-cyan" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    Bachelor of Science in Software Engineering
                  </h3>
                  <p className="text-cyan text-lg font-semibold mb-1">
                    COMSATS University Islamabad, Wah Campus
                  </p>
                  <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                    <span>2021 – 2025</span>
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      CGPA: 3.52
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-cyan mb-2">Final Year Project</h4>
                  <p className="text-gray-300">
                    <span className="font-semibold">ArticuliCare</span> – AI-powered Flutter app for articulation 
                    disorder detection using Supabase & TFLite
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-cyan mb-2">Key Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Mobile App Development",
                      "Software Engineering",
                      "Database Systems",
                      "AI Fundamentals",
                      "Human-Computer Interaction",
                      "Web Development",
                      "Data Structures & Algorithms",
                      "Object-Oriented Programming"
                    ].map((course, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full bg-purple/10 text-purple border border-purple/30"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Card className="inline-block">
            <p className="text-gray-400">
              <span className="text-cyan font-semibold">Languages:</span> English (Fluent), Urdu (Native)
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
