
'use client';

import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ScrollReveal from '../effects/ScrollReveal';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 md:py-40 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          label="Credentials"
          title="Certifications"
          subtitle="Professional recognition and validated industry skills"
        />

        <ScrollReveal once={false} scale={0.97}>
          <Card tilt={false} className="text-center p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="p-5 bg-accent/10 border border-accent/20 rounded-full text-accent text-3xl">
                <FaAward />
              </div>
            </div>

            <h3 className="text-2xl font-display font-bold text-text-primary mb-2">
              Internship Certificate
            </h3>
            <p className="text-accent text-base font-semibold mb-4">
              Pakistan Ordnance Factories (POF) IT Department
            </p>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
              Successfully completed professional internship in Flutter mobile app development, demonstrating strong technical skills and team collaboration abilities.
            </p>
            <Button href="/pof_certificate.jpg" variant="primary">
              <FaExternalLinkAlt className="text-sm" />
              View Certificate
            </Button>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
