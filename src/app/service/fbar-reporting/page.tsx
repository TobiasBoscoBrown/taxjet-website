'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function FBARReporting() {
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
            FBAR Reporting
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-ink/65 max-w-3xl mx-auto"
          >
            If you have foreign accounts, we'll ensure you meet all reporting requirements while staying compliant with U.S. laws.
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
              <h3 className="text-2xl font-bold mb-4">FBAR (FinCEN Form 114)</h3>
              <p className="text-ink/65 leading-relaxed">Preparation and filing of your FBAR to report foreign financial accounts exceeding $10,000.</p>
            </div>
            <div className="p-8 border border-ink/10 rounded-2xl bg-white/60">
              <h3 className="text-2xl font-bold mb-4">Form 8938 (FATCA)</h3>
              <p className="text-ink/65 leading-relaxed">Reporting specified foreign financial assets on your tax return as required by FATCA.</p>
            </div>
            <div className="p-8 border border-ink/10 rounded-2xl bg-white/60">
              <h3 className="text-2xl font-bold mb-4">Foreign Account Analysis</h3>
              <p className="text-ink/65 leading-relaxed">Comprehensive review of your foreign accounts to determine reporting requirements.</p>
            </div>
            <div className="p-8 border border-ink/10 rounded-2xl bg-white/60">
              <h3 className="text-2xl font-bold mb-4">Voluntary Disclosure</h3>
              <p className="text-ink/65 leading-relaxed">Assistance with voluntary disclosure programs if you've missed prior reporting deadlines.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
