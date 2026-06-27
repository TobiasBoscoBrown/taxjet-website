'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import AtmosphericTextures from '@/components/AtmosphericTextures';

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main ref={ref} className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <AtmosphericTextures />
      <Navigation />

      {/* Hero Section */}
      <motion.section
        style={{ y, opacity }}
        className="relative z-20 min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-sm font-medium tracking-widest text-white/60 uppercase">
                U.S. Expat & International Tax Specialists
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8"
            >
              Navigate Foreign Income
              <br />
              <span className="text-white/60">Without Turbulence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-white/70 max-w-xl mb-12 leading-relaxed"
            >
              We help Americans worldwide handle foreign income, overseas assets, and cross-border tax rules quickly, clearly, and without turbulence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-white/90 transition-colors"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/30 rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

        </div>
      </motion.section>

      {/* Services Preview */}
      <section className="relative z-20 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Comprehensive tax solutions for Americans living abroad
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "International Tax Services",
                description: "Navigate U.S. international tax laws with confidence and ensure compliance.",
                icon: "globe"
              },
              {
                title: "U.S. Tax Returns",
                description: "Federal and state tax returns, extensions, amended returns, and catch-up filing.",
                icon: "clipboard"
              },
              {
                title: "FBAR Reporting",
                description: "Meet all foreign account reporting requirements while staying compliant.",
                icon: "card"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="mb-4">
                  {service.icon === 'globe' && (
                    <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                  {service.icon === 'clipboard' && (
                    <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 2v2" />
                      <path d="M15 2v2" />
                      <path d="M12 2v8" />
                      <path d="M8 4h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                      <path d="M9 14h6" />
                      <path d="M9 18h6" />
                    </svg>
                  )}
                  {service.icon === 'card' && (
                    <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M2 10h20" />
                      <path d="M6 15h4" />
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-20 py-32 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why TaxJet?</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Personalized service from tax experts who understand your unique situation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Not Another DIY Solution",
                description: "We're tax experts who use advanced tools, but we never forget the personal connection. No bots, no autopilot—just real expertise tailored to you."
              },
              {
                title: "Expat-Focused",
                description: "We understand the unique challenges faced by expats far from the U.S. Virtual meetings mean we're right there with you, wherever you are."
              },
              {
                title: "Full-Service Firm",
                description: "From international tax services to FBAR reporting, we provide comprehensive solutions for all your cross-border tax needs."
              },
              {
                title: "Stress-Free Process",
                description: "We manage the entire process from start to finish so you can focus on what matters most—your life abroad."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-8"
              >
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-20 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8">
              Let's Tackle Your Tax Needs Together
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Get started today and experience stress-free expat tax filing
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-black rounded-full text-xl font-medium hover:bg-white/90 transition-colors"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold">TaxJet</div>
          <div className="flex gap-8 text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-white/40 text-sm">
            © 2024 TaxJet. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
