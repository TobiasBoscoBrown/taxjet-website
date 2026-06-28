'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

export default function Minimal() {
  return (
    <main className="min-h-screen text-ink">
      <Navigation />

      {/* Hero: one quiet statement, lots of air */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.span
          {...fade}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-[12px] tracking-widest2 uppercase text-ink/45"
        >
          U.S. Expat & International Tax
        </motion.span>

        <motion.h1
          {...fade}
          transition={{ duration: 1.1, delay: 0.25 }}
          className="mt-10 text-5xl md:text-7xl tracking-tight leading-[1.05] text-balance"
        >
          Navigate foreign income
          <span className="block text-ink/35">without turbulence</span>
        </motion.h1>

        <motion.div
          {...fade}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-14"
        >
          <Link
            href="/contact"
            className="px-9 py-4 bg-ink text-paper rounded-full text-base font-medium hover:bg-accent transition-colors duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* A single calm line, then space */}
      <section className="px-6 py-40 md:py-56">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-2xl mx-auto text-center font-display text-2xl md:text-3xl leading-snug text-ink/80 text-balance"
        >
          We help Americans abroad handle foreign income, overseas assets, and
          cross-border tax rules with clarity and calm.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-ink/55"
        >
          <Link href="/service/international-tax-services" className="hover:text-ink transition-colors">International Tax</Link>
          <span className="text-ink/20">/</span>
          <Link href="/service/us-tax-returns" className="hover:text-ink transition-colors">U.S. Tax Returns</Link>
          <span className="text-ink/20">/</span>
          <Link href="/service/fbar-reporting" className="hover:text-ink transition-colors">FBAR Reporting</Link>
        </motion.div>
      </section>

      {/* Quiet close */}
      <footer className="px-6 py-16 text-center">
        <Link href="/" className="text-sm text-ink/45 hover:text-ink transition-colors">
          See the full site
        </Link>
        <div className="mt-4 text-ink/30 text-xs">© 2026 TaxJet</div>
      </footer>
    </main>
  );
}
