'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function InternationalTaxServices() {
  return (
    <main className="min-h-screen bg-transparent text-ink">
      <Navigation />

      <section className="relative z-20 min-h-[60vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            International Tax Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-ink/65 max-w-3xl mx-auto"
          >
            We'll take the guesswork out of navigating U.S. international tax laws while helping you ensure compliance with U.S. tax regulations.
          </motion.p>
        </div>
      </section>

      <section className="relative z-20 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="p-8 border border-ink/10 rounded-2xl bg-white/60">
              <h3 className="text-2xl font-bold mb-4">Foreign Tax Credit Optimization</h3>
              <p className="text-ink/65 leading-relaxed">Maximize your foreign tax credits to reduce double taxation on foreign income.</p>
            </div>
            <div className="p-8 border border-ink/10 rounded-2xl bg-white/60">
              <h3 className="text-2xl font-bold mb-4">Treaty Benefit Analysis</h3>
              <p className="text-ink/65 leading-relaxed">Leverage U.S. tax treaties to minimize your tax liability across countries.</p>
            </div>
            <div className="p-8 border border-ink/10 rounded-2xl bg-white/60">
              <h3 className="text-2xl font-bold mb-4">Cross-Border Tax Planning</h3>
              <p className="text-ink/65 leading-relaxed">Strategic planning for investments, retirement, and business operations across borders.</p>
            </div>
            <div className="p-8 border border-ink/10 rounded-2xl bg-white/60">
              <h3 className="text-2xl font-bold mb-4">Expatriation Tax Planning</h3>
              <p className="text-ink/65 leading-relaxed">Navigate the complex tax implications of expatriating from the U.S.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
