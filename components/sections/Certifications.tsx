'use client';

/*
BACKUP PREVIOUS CODE:
import { Brain, Database, Smartphone, Code2 } from 'lucide-react';
*/
import { Brain, Database, Smartphone, Code2, Lightbulb } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import ScrollReveal from '../effects/ScrollReveal';
import ExpandingCards, { type ExpandingCardItem } from '../ui/expanding-cards';

// ─── Certification Data ──────────────────────────────────────────────────────
// All dates stripped except "Summer 2024" on Flutter internship

/*
BACKUP PREVIOUS CODE:
const certifications: ExpandingCardItem[] = [
  {
    id: 'ai-fundamentals',
    title: 'Artificial Intelligence Fundamentals',
    description:
      'Validated knowledge in core Artificial Intelligence concepts, machine learning algorithms, deep learning architectures, computer vision, and ethical AI deployment.',
    imgSrc: '/certifications/ibm_cred.png',
    icon: Brain,
  },
  {
    id: 'big-data',
    title: 'Big Data 101',
    description:
      'Foundational mastery in Big Data architecture, distributed storage, Hadoop ecosystem, MapReduce processing framework, and data analytics pipelines.',
    imgSrc: '/certifications/bigdata101_preview-1.png',
    icon: Database,
  },
  {
    id: 'flutter-internship',
    title: 'Flutter Mobile Engineering Internship',
    description:
      'Official recognition for leading cross-platform Flutter application development, Firebase integration, and Agile sprint execution.',
    imgSrc: '/certifications/pof_certificate.jpg',
    icon: Smartphone,
    date: 'Summer 2024',
  },
  {
    id: 'ml-python',
    title: 'Machine Learning & Python',
    description:
      'Applied Machine Learning and Python project demonstrating end-to-end data analysis, model training, and evaluation pipelines.',
    imgSrc: '/certifications/Ml&Python.png',
    icon: Code2,
  },
];
*/
const certifications: ExpandingCardItem[] = [
  {
    id: 'ai-fundamentals',
    title: 'Artificial Intelligence Fundamentals',
    description:
      'Validated knowledge in core Artificial Intelligence concepts, machine learning algorithms, deep learning architectures, computer vision, and ethical AI deployment.',
    imgSrc: '/certifications/ibm_cred.png',
    icon: Brain,
  },
  {
    id: 'big-data',
    title: 'Big Data 101',
    description:
      'Foundational mastery in Big Data architecture, distributed storage, Hadoop ecosystem, MapReduce processing framework, and data analytics pipelines.',
    imgSrc: '/certifications/bigdata101_preview-1.png',
    icon: Database,
  },
  {
    id: 'flutter-internship',
    title: 'Flutter Mobile Engineering Internship',
    description:
      'Official recognition for leading cross-platform Flutter application development, Firebase integration, and Agile sprint execution.',
    imgSrc: '/certifications/pof_certificate.jpg',
    icon: Smartphone,
    date: 'Summer 2024',
  },
  {
    id: 'ml-python',
    title: 'Machine Learning & Python',
    description:
      'Applied Machine Learning and Python project demonstrating end-to-end data analysis, model training, and evaluation pipelines.',
    imgSrc: '/certifications/Ml&Python.png',
    icon: Code2,
  },
  {
    id: 'emotional-intelligence',
    title: 'Deloitte WorldClass Course on Emotional Intelligence',
    description:
      'Developed essential soft skills in emotional intelligence, self-awareness, empathy, and effective communication through Deloitte\'s WorldClass initiative.',
    imgSrc: '/certifications/deloitte.jpeg',
    icon: Lightbulb,
  },
];

// ─── Section Component ───────────────────────────────────────────────────────

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-28 md:py-40 px-6 sm:px-8"
      aria-label="Professional certifications and credentials"
    >
      <div className="max-w-5xl mx-auto">
        {/* ── Header (portfolio-standard SectionTitle) ── */}
        <SectionTitle
          label="Credentials"
          title="Certifications & Credentials"
          subtitle="A curated showcase of verified certifications and credentials that validate my expertise and commitment to continuous learning."
        />

        {/* ── Expanding Cards Accordion ── */}
        <ScrollReveal delay={0.15} direction="up">
          <ExpandingCards
            items={certifications}
            defaultOpenIndex={0}
            className="h-[350px] sm:h-[400px] md:h-[450px] lg:h-[480px]"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
