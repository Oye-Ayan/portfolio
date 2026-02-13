'use client';

import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaDownload, FaPaperPlane } from 'react-icons/fa';

export default function Contact() {
  const contactInfo = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      label: "Email",
      value: "mayan921111@gmail.com",
      href: "mailto:mayan921111@gmail.com"
    },
    {
      icon: <FaPhone className="text-2xl" />,
      label: "Phone",
      value: "0314-5313125",
      href: "tel:+923145313125"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      label: "Location",
      value: "Wah Cantt, Punjab, Pakistan",
      href: null
    }
  ];

  const socials = [
    {
      icon: <FaGithub className="text-2xl" />,
      label: "GitHub",
      href: "https://github.com/Oye-Ayan"
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/muhammadayankhan/"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan/10 rounded-full blur-3xl top-0 left-1/4 animate-float" />
        <div className="absolute w-96 h-96 bg-purple/10 rounded-full blur-3xl bottom-0 right-1/4 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle 
          title="Let's Connect" 
          subtitle="Open to opportunities and collaborations"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
                Get in Touch
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm currently looking for new opportunities in <span className="text-cyan font-semibold">Flutter Development</span>, 
                <span className="text-purple font-semibold"> Full-Stack Engineering</span>, and <span className="text-cyan font-semibold">Mobile App Development</span>. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-dark-accent/50 hover:bg-dark-accent transition-all"
                  >
                    <div className="text-cyan">{item.icon}</div>
                    <div>
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white hover:text-cyan transition">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card>
              <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
                Connect on Social
              </h3>
              <div className="space-y-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-dark-accent/50 hover:bg-dark-accent transition-all group"
                  >
                    <div className="text-cyan group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                    <span className="text-white group-hover:text-cyan transition">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </Card>

            <Card className="text-center">
              <h3 className="text-xl font-display font-bold mb-4 text-white">
                Download My Resume
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Get a detailed overview of my skills and experience
              </p>
              <Button href="/resume.pdf" variant="primary">
              <FaDownload />
              Download CV
            </Button>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Card className="inline-block">
            <p className="text-gray-400 mb-6">
              Ready to bring your project to life?
            </p>
            <Button href="mailto:mayan921111@gmail.com" variant="primary">
              <FaPaperPlane />
              Send Me an Email
            </Button>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center text-gray-500 text-sm"
        >
          <p>Designed & Built by Muhammad Ayan Khan</p>
          <p className="mt-2">© 2025 All rights reserved</p>
        </motion.div>
      </div>
    </section>
  );
}
