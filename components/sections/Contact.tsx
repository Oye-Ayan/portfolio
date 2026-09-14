'use client';

import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ScrollReveal from '../effects/ScrollReveal';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';

export default function Contact() {
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-xl" />,
      label: "Email",
      value: "mayan921111@gmail.com",
      href: "mailto:mayan921111@gmail.com"
    },
    {
      icon: <FaPhone className="text-xl" />,
      label: "Phone",
      value: "0314-5313125",
      href: "tel:+923145313125"
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      label: "Location",
      value: "Wah Cantt, Punjab, Pakistan",
      href: null
    }
  ];

  const socials = [
    {
      icon: <FaGithub className="text-xl" />,
      label: "GitHub",
      href: "https://github.com/Oye-Ayan"
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammadayankhan/"
    }
  ];

  return (
    <section id="contact" className="py-28 md:py-40 px-6 sm:px-8 relative overflow-hidden" aria-label="Contact Muhammad Ayan Khan — Get in touch">
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          label="Get In Touch"
          title="Let's Start Something Great."
          subtitle="Open to full-time roles, engineering contracts, and technical collaborations"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <ScrollReveal direction="left" once={false}>
            <Card tilt={true} className="h-full group">
              <div className="preserve-3d">
                <h3 className="text-2xl font-display font-bold mb-6 text-text-primary [transform:translateZ(22px)] transition-transform duration-300">
                  Reach Out Directly
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8 [transform:translateZ(14px)]">
                  I&apos;m currently open to new software engineering opportunities in <span className="text-accent font-semibold">Flutter Development</span>, <span className="text-text-primary font-semibold">Backend Engineering</span>, and <span className="text-accent font-semibold">AI Mobile Solutions</span>.
                </p>

                <div className="space-y-4 [transform:translateZ(18px)]">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-border hover:border-accent/30 transition-colors">
                      <div className="text-accent text-lg drop-shadow-[0_0_8px_rgba(100,217,154,0.3)]">{item.icon}</div>
                      <div>
                        <p className="text-text-tertiary text-xs">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-text-primary hover:text-accent transition-colors text-sm font-medium">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-text-primary text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right" once={false} delay={0.1}>
            <div className="space-y-6 flex flex-col justify-between h-full">
              <Card tilt={true} className="group">
                <div className="preserve-3d">
                  <h3 className="text-xl font-display font-bold mb-6 text-text-primary [transform:translateZ(20px)] transition-transform duration-300">
                    Connect on Social
                  </h3>
                  <div className="space-y-3 [transform:translateZ(16px)]">
                    {socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-border hover:border-accent/40 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-all text-text-primary hover:text-accent font-medium text-sm"
                      >
                        <div className="text-accent drop-shadow-[0_0_8px_rgba(100,217,154,0.3)]">{social.icon}</div>
                        <span>{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </Card>

              <Card tilt={true} className="text-center p-8 group">
                <div className="preserve-3d">
                  <h3 className="text-lg font-display font-bold mb-2 text-text-primary [transform:translateZ(20px)]">
                    Download Resume
                  </h3>
                  <p className="text-text-secondary text-xs mb-6 [transform:translateZ(14px)]">
                    Get a complete copy of my background & project experience
                  </p>
                  <div className="[transform:translateZ(24px)] inline-block">
                    <Button href="/resume.pdf" variant="primary">
                      <FaDownload className="text-sm" />
                      Download Resume
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>

        {/* GIANT EDITORIAL WATERMARK NAME */}
        <ScrollReveal once={false} delay={0.2} className="py-12 overflow-hidden">
          <div className="text-center font-display font-extrabold text-[12vw] leading-none tracking-tighter text-black/[0.04] dark:text-white/[0.04] select-none pointer-events-none whitespace-nowrap uppercase">
            AYAN KHAN
          </div>
        </ScrollReveal>

        {/* SITE FOOTER */}
        <footer className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-text-tertiary" role="contentinfo">
          <p>© 2025 Muhammad Ayan Khan. All rights reserved.</p>
          <p className="italic text-text-secondary">Think. Build. Repeat.</p>
          <p>Designed & Built by Ayan</p>
        </footer>
      </div>
    </section>
  );
}
