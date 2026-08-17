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
            <Card tilt={false} className="h-full">
              <h3 className="text-2xl font-display font-bold mb-6 text-text-primary">
                Reach Out Directly
              </h3>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-8">
                I&apos;m currently open to new software engineering opportunities in <span className="text-accent font-semibold">Flutter Development</span>, <span className="text-text-primary font-semibold">Backend Engineering</span>, and <span className="text-accent font-semibold">AI Mobile Solutions</span>.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-accent">{item.icon}</div>
                    <div>
                      <p className="text-text-tertiary text-xs ">{item.label}</p>
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
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="right" once={false} delay={0.1}>
            <div className="space-y-6 flex flex-col justify-between h-full">
              <Card tilt={false}>
                <h3 className="text-xl font-display font-bold mb-6 text-text-primary">
                  Connect on Social
                </h3>
                <div className="space-y-3">
                  {socials.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-accent/40 transition-all text-text-primary hover:text-accent font-medium text-sm"
                    >
                      <div className="text-accent">{social.icon}</div>
                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </Card>

              <Card tilt={false} className="text-center p-8">
                <h3 className="text-lg font-display font-bold mb-2 text-text-primary">
                  Download Resume
                </h3>
                <p className="text-text-secondary text-xs mb-6 ">
                  Get a complete copy of my background & project experience
                </p>
                <Button href="/resume.pdf" variant="primary">
                  <FaDownload className="text-sm" />
                  Download Resume
                </Button>
              </Card>
            </div>
          </ScrollReveal>
        </div>

        {/* GIANT EDITORIAL WATERMARK NAME */}
        <ScrollReveal once={false} delay={0.2} className="py-12 overflow-hidden">
          <div className="text-center font-display font-extrabold text-[12vw] leading-none tracking-tighter text-white/[0.04] select-none pointer-events-none whitespace-nowrap uppercase">
            AYAN KHAN
          </div>
        </ScrollReveal>

        {/* SITE FOOTER */}
        <footer className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs  text-text-tertiary" role="contentinfo">
          <p>© 2025 Muhammad Ayan Khan. All rights reserved.</p>
          <p className="italic text-text-secondary">Think. Build. Repeat.</p>
          <p>Designed & Built by Ayan</p>
        </footer>
      </div>
    </section>
  );
}

/* REDESIGNED CONTACT BACKUP (commented out for reference):
 * Editorial contact layout.
 */
