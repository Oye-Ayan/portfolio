'use client';

import { useState } from 'react';
import TextReveal from '../effects/TextReveal';
import ScrollReveal from '../effects/ScrollReveal';
import { FaTimes, FaSearchPlus, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

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
      description: "Validated knowledge in core Artificial Intelligence concepts, machine learning algorithms, deep learning architectures, computer vision, and ethical AI deployment.",
      image: "/certifications/ibm_cred.png",
      verifyUrl: "https://www.credly.com/badges/ba7b6864-b212-4359-b39b-e2f1ae90ece9/linked_in_profile",
      featured: true,
      badge: "VERIFIED CREDENTIAL"
    },
    {
      id: "bigdata101",
      title: "Big Data 101",
      issuer: "Cognitive Class / Big Data University",
      description: "Foundational mastery in Big Data architecture, distributed storage, Hadoop ecosystem, MapReduce processing framework, and data analytics pipelines.",
      image: "/certifications/bigdata101_preview-1.png",
      pdfUrl: "/BigData101.pdf",
      featured: false,
      badge: "COURSE CERTIFICATE"
    },
    {
      id: "pof-internship",
      title: "Flutter Mobile Engineering Internship",
      issuer: "Pakistan Ordnance Factories (POF)",
      period: "Summer 2024",
      description: "Official recognition for leading cross-platform Flutter application development, Firebase integration, and Agile sprint execution.",
      image: "/certifications/pof_certificate.jpg",
      pdfUrl: "/pof_certificate.jpg",
      featured: false,
      badge: "INTERNSHIP CERTIFICATE"
    },
    {
      id: "ml-python",
      title: "Machine Learning & Python",
      issuer: "Cognitive Class",
      description: "Applied Machine Learning and Python project demonstrating end-to-end data analysis, model training, and evaluation pipelines.",
      image: "/certifications/Ml&Python.png",
      pdfUrl: "/ML&Python_Certificate.pdf",
      featured: false,
      badge: "COURSE CERTIFICATE"
    }
  ];

  return (
    <section id="certifications" className="py-28 md:py-40 px-6 sm:px-8 relative bg-transparent" aria-label="Professional certifications">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <TextReveal as="h2" className="text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-4">
              Credentials
            </TextReveal>
            <TextReveal as="h3" className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
              Certifications & Credentials
            </TextReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-[#a1a1aa] text-lg max-w-xl">
                A curated showcase of verified certifications and credentials that validate my expertise and commitment to continuous learning.
              </p>
            </ScrollReveal>
          </div>

          {/* <ScrollReveal delay={0.2} direction="left">
            <div className="flex items-center gap-8 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 lg:p-8">
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-display font-bold text-white mb-1">03</p>
                <p className="text-[10px] lg:text-xs text-[#71717a] font-semibold uppercase tracking-wider">Certifications</p>
              </div>
              <div className="w-px h-12 bg-white/[0.1]"></div>
              <div className="text-center">
                <p className="text-3xl lg:text-4xl font-display font-bold text-white mb-1">07+</p>
                <p className="text-[10px] lg:text-xs text-[#71717a] font-semibold uppercase tracking-wider">Skills Validated</p>
              </div>
            </div>
          </ScrollReveal> */}
        </div>

        {/* Unified Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {credentials.map((cred, index) => (
            <ScrollReveal key={cred.id} delay={index * 0.1} once={false} direction="up">
              <div className="flex flex-col h-full bg-[#121214] border border-white/[0.05] rounded-[20px] overflow-hidden hover:border-white/[0.12] transition-colors duration-300 group">
                
                <div 
                  className="relative aspect-[16/10] bg-black/40 border-b border-white/[0.05] cursor-pointer overflow-hidden p-6 flex items-center justify-center" 
                  onClick={() => setActiveModalImage(cred.image)}
                >
                  <img
                    src={cred.image}
                    alt={cred.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white backdrop-blur-sm">
                    <FaSearchPlus className="text-3xl" />
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-2.5 py-1 text-[9px] sm:text-[10px] font-bold text-accent bg-accent/[0.1] rounded-md border border-accent/[0.2] tracking-wider uppercase">
                      {cred.badge}
                    </span>
                    {cred.period && (
                      <span className="text-xs text-[#71717a] font-medium">
                        {cred.period}
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 leading-snug">
                    {cred.title}
                  </h4>
                  
                  <p className="text-[#a1a1aa] text-sm leading-relaxed mb-8 flex-1 font-body">
                    {cred.description}
                  </p>
                  
                  <div className="mt-auto flex flex-col gap-4 pt-5 border-t border-white/[0.05]">
                    {cred.verifyUrl && (
                      <a
                        href={cred.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm font-semibold text-accent hover:text-white transition-colors group/link"
                      >
                        <span className="flex items-center gap-2.5"><FiExternalLink className="text-lg" /> Verify on Credly</span>
                        <FiExternalLink className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-accent text-lg" />
                      </a>
                    )}
                    {cred.pdfUrl && (
                      <a
                        href={cred.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm font-semibold text-[#a1a1aa] hover:text-white transition-colors group/link"
                      >
                        <span className="flex items-center gap-2.5"><FiExternalLink className="text-lg" /> View Document</span>
                        <FiExternalLink className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-accent text-lg" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Lightbox Preview Modal */}
      {activeModalImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActiveModalImage(null)}
        >
          <button
            onClick={() => setActiveModalImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="text-xl" />
          </button>
          <img
            src={activeModalImage}
            alt="Preview"
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
