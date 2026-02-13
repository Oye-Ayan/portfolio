'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 bg-dark-lighter/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle 
          title="Certifications" 
          subtitle="Professional recognition and validated skills"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-gradient-to-br from-cyan/20 to-purple/20 rounded-full">
                <FaCertificate className="text-6xl text-cyan" />
              </div>
            </div>

            <h3 className="text-2xl font-display font-bold text-white mb-2">
              Internship Certificate
            </h3>
            <p className="text-cyan text-lg font-semibold mb-4">
              Pakistan Ordnance Factories (POF) IT Department
            </p>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto">
              Successfully completed professional internship in Flutter mobile app development, 
              demonstrating strong technical skills and team collaboration abilities.
            </p>

            <Button href="https://bit.ly/Internship-POF" variant="primary">
              <FaExternalLinkAlt />
              View Certificate
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
