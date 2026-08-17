'use client';

import { useState } from 'react';
import TextReveal from '../effects/TextReveal';
import ScrollReveal from '../effects/ScrollReveal';
import { FaExternalLinkAlt, FaTimes, FaSearchPlus, FaAward } from 'react-icons/fa';

interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  period?: string;
  description: string;
  image: string;
  verifyUrl?: string;
  pdfUrl?: string;
  badge?: string;
  featured?: boolean;
}

export default function Certifications() {
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const credentials: CredentialItem[] = [
    {
      id: "ibm-ai",
      title: "Artificial Intelligence Fundamentals",
      issuer: "IBM",
      period: "Issued via Credly",
      description: "Validated knowledge in core Artificial Intelligence concepts, machine learning algorithms, deep learning architecture, computer vision, and ethical AI deployment.",
      image: "/ibm_cred.png",
      verifyUrl: "https://www.credly.com/badges/ba7b6864-b212-4359-b39b-e2f1ae90ece9/linked_in_profile",
      featured: true,
      badge: "IBM Verified Credential"
    },
    {
      id: "bigdata101",
      title: "Big Data 101",
      issuer: "Cognitive Class / Big Data University",
      period: "Verified Certificate",
      description: "Foundational mastery in Big Data architecture, distributed storage, Hadoop ecosystem, MapReduce processing framework, and data analytics pipelines.",
      image: "/bigdata101_preview-1.png",
      pdfUrl: "/BigData101.pdf",
      featured: false,
    },
    {
      id: "pof-internship",
      title: "Flutter Mobile Engineering Internship",
      issuer: "Pakistan Ordnance Factories (POF)",
      period: "Summer 2024",
      description: "Official recognition for leading cross-platform Flutter application development, Firebase integration, and Agile sprint execution.",
      image: "/pof_certificate.jpg",
      pdfUrl: "/pof_certificate.jpg",
      featured: false,
    }
  ];

  return (
    <section id="certifications" className="py-28 md:py-40 px-6 sm:px-8 relative" aria-label="Professional certifications — IBM AI, Big Data, POF Internship">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24">
          <TextReveal
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-primary leading-[1.05] mb-4"
          >
            Certifications & Credentials
          </TextReveal>
          <ScrollReveal delay={0.15} once={false}>
            <p className="text-text-secondary text-lg md:text-xl font-body leading-relaxed max-w-2xl">
              Verified industry credentials and professional technical certifications.
            </p>
          </ScrollReveal>
        </div>

        {/* Credentials Editorial Showcase */}
        <div className="space-y-12">
          {/* Featured IBM Credential Banner */}
          {credentials.filter(c => c.featured).map((cred) => (
            <ScrollReveal key={cred.id} once={false} direction="up">
              <div className="relative overflow-hidden rounded-[14px] border border-accent/20 bg-gradient-to-r from-[#141217] via-[#1a171f] to-[#141217] p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1  text-[11px] uppercase font-bold text-dark bg-accent rounded">
                        {cred.badge}
                      </span>
                      <span className="text-text-tertiary text-xs ">
                        {cred.period}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight">
                      {cred.title}
                    </h3>

                    <div className="flex items-center gap-2 text-accent font-medium text-base">
                      <FaAward className="text-xl" />
                      <span>Issued by {cred.issuer}</span>
                    </div>

                    <p className="text-text-secondary text-sm md:text-base leading-relaxed font-body max-w-xl">
                      {cred.description}
                    </p>

                    <div className="pt-4 flex flex-wrap gap-4">
                      {cred.verifyUrl && (
                        <a
                          href={cred.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-[10px] bg-accent text-dark font-display font-semibold text-sm tracking-wide hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/10 active:scale-[0.98]"
                        >
                          Verify on Credly
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                      )}
                      <button
                        onClick={() => setActiveModalImage(cred.image)}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] border border-white/[0.1] text-text-primary hover:border-white/[0.2] transition-colors text-sm font-medium"
                      >
                        <FaSearchPlus className="text-xs text-accent" />
                        Preview Badge Artwork
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex justify-center">
                    <div
                      onClick={() => setActiveModalImage(cred.image)}
                      className="relative cursor-pointer group rounded-xl overflow-hidden border border-white/[0.1] shadow-2xl transition-transform duration-500 hover:scale-[1.03]"
                    >
                      <img
                        src={cred.image}
                        alt={cred.title}
                        className="w-56 h-56 object-cover"
                      />
                      <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                        <FaSearchPlus className="text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}

          {/* Secondary Credentials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {credentials.filter(c => !c.featured).map((cred, index) => (
              <ScrollReveal key={cred.id} delay={index * 0.1} once={false} direction="up">
                <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-[14px] bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-400 group">
                  <div>
                    <div className="relative mb-6 rounded-lg overflow-hidden border border-white/[0.06] bg-dark aspect-[16/10] cursor-pointer" onClick={() => setActiveModalImage(cred.image)}>
                      <img
                        src={cred.image}
                        alt={cred.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                        <FaSearchPlus className="text-xl" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className=" text-xs text-accent font-semibold">
                        {cred.issuer}
                      </span>
                      <span className=" text-[11px] text-text-tertiary">
                        {cred.period}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-text-primary mb-2">
                      {cred.title}
                    </h3>

                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-body mb-6">
                      {cred.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.04] flex items-center gap-3">
                    {cred.pdfUrl && (
                      <a
                        href={cred.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs  font-medium text-text-primary hover:text-accent transition-colors"
                      >
                        View Official Document
                        <FaExternalLinkAlt className="text-[10px]" />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveModalImage(null)}
        >
          <button
            onClick={() => setActiveModalImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="text-lg" />
          </button>
          <img
            src={activeModalImage}
            alt="Certificate Preview"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
