'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function Services() {
  const services = [
    {
      title: "International Tax Services",
      description: "We'll take the guesswork out of navigating U.S. international tax laws while helping you ensure compliance with U.S. tax regulations.",
      details: [
        "Foreign tax credit optimization",
        "Treaty benefit analysis",
        "Cross-border tax planning",
        "Expatriation tax planning",
        "Inbound/outbound investment structuring"
      ],
      icon: "globe"
    },
    {
      title: "U.S. Tax Returns",
      description: "We'll take care of your federal and state tax returns, file extensions, file amended returns, help you catch up on back taxes, and much more.",
      details: [
        "Federal and state return preparation",
        "Extension filing",
        "Amended return filing",
        "Catch-up filing for prior years",
        "Tax planning and strategy"
      ],
      icon: "clipboard"
    },
    {
      title: "FBAR Reporting",
      description: "If you have foreign accounts, we'll ensure you meet all reporting requirements while staying compliant with U.S. laws.",
      details: [
        "FBAR (FinCEN Form 114) preparation",
        "Form 8938 (FATCA) reporting",
        "Foreign account analysis",
        "Penalty assessment review",
        "Voluntary disclosure assistance"
      ],
      icon: "card"
    },
    {
      title: "Stress-Free Filing",
      description: "From start to finish, we manage the entire process so you can focus on what matters most.",
      details: [
        "Document collection guidance",
        "Secure document upload",
        "Progress tracking",
        "Direct expert access",
        "Final review and filing"
      ],
      icon: "star"
    }
  ];

  return (
    <main className="min-h-screen bg-transparent text-ink">
      <Navigation />

      {/* Hero */}
      <section className="relative z-20 min-h-[60vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-ink/65 max-w-3xl mx-auto"
          >
            TaxJet is a full-service tax firm offering a range of international tax services. Our dedicated team of credentialed tax experts will meet you where you are and provide a tailored service just for you.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-20 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl border border-ink/10 bg-white/60 backdrop-blur-sm hover:bg-ink/[0.06] transition-all"
              >
                <div className="mb-6">
                  {service.icon === 'globe' && (
                    <svg className="w-14 h-14 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                  {service.icon === 'clipboard' && (
                    <svg className="w-14 h-14 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 2v2" />
                      <path d="M15 2v2" />
                      <path d="M12 2v8" />
                      <path d="M8 4h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                      <path d="M9 14h6" />
                      <path d="M9 18h6" />
                    </svg>
                  )}
                  {service.icon === 'card' && (
                    <svg className="w-14 h-14 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <path d="M2 10h20" />
                      <path d="M6 15h4" />
                    </svg>
                  )}
                  {service.icon === 'star' && (
                    <svg className="w-14 h-14 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  )}
                </div>
                <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                <p className="text-ink/65 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-ink/70">
                      <span className="text-accent mt-1">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-20 py-32 px-6 bg-white/600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Need Help Deciding?</h2>
            <p className="text-xl text-ink/65 mb-12 max-w-2xl mx-auto">
              Not sure which services you need? Tell us about your situation and we'll guide you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-ink text-paper rounded-full text-xl font-medium hover:bg-accent transition-colors"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
