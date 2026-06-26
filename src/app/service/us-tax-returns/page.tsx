'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AtmosphericTextures from '@/components/AtmosphericTextures';

export default function USTaxReturns() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <AtmosphericTextures />
      <Navigation />

      <section className="relative z-20 min-h-[60vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            U.S. Tax Returns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto"
          >
            We'll take care of your federal and state tax returns, file extensions, file amended returns, help you catch up on back taxes, and much more.
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
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <h3 className="text-2xl font-bold mb-4">Federal & State Returns</h3>
              <p className="text-white/60 leading-relaxed">Complete preparation of your federal and state tax returns with accuracy and attention to detail.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <h3 className="text-2xl font-bold mb-4">Extension Filing</h3>
              <p className="text-white/60 leading-relaxed">File for extensions when you need more time, ensuring you stay compliant while avoiding penalties.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <h3 className="text-2xl font-bold mb-4">Amended Returns</h3>
              <p className="text-white/60 leading-relaxed">Correct errors on previously filed returns and claim any refunds you may be entitled to.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <h3 className="text-2xl font-bold mb-4">Catch-Up Filing</h3>
              <p className="text-white/60 leading-relaxed">Get caught up on back taxes through streamlined procedures and amnesty programs.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
