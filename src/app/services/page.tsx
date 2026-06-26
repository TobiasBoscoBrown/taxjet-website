'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AtmosphericTextures from '@/components/AtmosphericTextures';

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
      icon: "🌍"
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
      icon: "📋"
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
      icon: "💳"
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
      icon: "✨"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <AtmosphericTextures />
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
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto"
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
                className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-white/70">
                      <span className="text-blue-400 mt-1">•</span>
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
      <section className="relative z-20 py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Need Help Deciding?</h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
              Not sure which services you need? Tell us about your situation and we'll guide you.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-black rounded-full text-xl font-medium hover:bg-white/90 transition-colors"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
