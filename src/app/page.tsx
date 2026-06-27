'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

const services = [
  {
    title: 'International Tax Services',
    href: '/service/international-tax-services',
    description: 'Foreign tax credits, treaty positions, and cross-border planning that keep you compliant on both sides of the ocean.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 4 9 14 14 0 0 1-4 9 14 14 0 0 1-4-9 14 14 0 0 1 4-9z" />
      </svg>
    ),
  },
  {
    title: 'U.S. Tax Returns',
    href: '/service/us-tax-returns',
    description: 'Federal and state returns, extensions, amendments, and streamlined catch-up filing, prepared end to end.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <path d="M8 4h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        <path d="M9 2v3M15 2v3M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: 'FBAR Reporting',
    href: '/service/fbar-reporting',
    description: 'Foreign account reporting handled cleanly, so a $10,000 threshold never turns into a compliance problem.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-7 h-7">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </svg>
    ),
  },
];

const steps = [
  { n: '01', title: 'A quiet first call', text: 'We learn where you live, how you earn, and what is keeping you up at night.' },
  { n: '02', title: 'We do the heavy lifting', text: 'Documents, forms, and filings, organized and handled for you from start to finish.' },
  { n: '03', title: 'Filed and clear', text: 'You see exactly what was filed and why, with nothing left hanging over you.' },
];

const reasons = [
  { title: 'Not another DIY tool', text: 'Real specialists, not a wizard and a chatbot. We use sharp software, then a person reviews every return.' },
  { title: 'Built for life abroad', text: 'Time zones, foreign accounts, and treaty rules are the normal case for us, not the exception.' },
  { title: 'One firm, every form', text: 'From 1040 to FBAR to FATCA, your cross-border picture is handled in one place.' },
  { title: 'Calm by design', text: 'We carry the process so you can stay focused on your life, wherever in the world that is.' },
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <main className="min-h-screen text-ink overflow-hidden">
      <Navigation />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24">
        <motion.div style={{ y, opacity }} className="max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="inline-block px-4 py-1.5 rounded-full border border-ink/15 bg-white/50 backdrop-blur-sm text-[12px] font-medium tracking-widest2 uppercase text-ink/55"
          >
            U.S. Expat & International Tax Specialists
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 text-5xl md:text-7xl lg:text-[5.4rem] tracking-tight leading-[1.04] text-balance"
          >
            Navigate foreign income
            <span className="block text-ink/40">without turbulence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-8 text-lg md:text-xl text-ink/60 max-w-2xl mx-auto leading-relaxed"
          >
            We help Americans abroad handle foreign income, overseas assets, and cross-border
            tax rules with clarity and calm.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="px-8 py-4 bg-ink text-paper rounded-full text-base font-medium hover:bg-accent transition-colors duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 border border-ink/20 rounded-full text-base font-medium hover:border-ink/40 hover:bg-white/40 transition-colors duration-300"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/35 text-xs"
        >
          <span className="tracking-widest2 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-ink/35 to-transparent" />
        </motion.div>
      </section>

      {/* Trust strip */}
      <section className="relative px-6 py-10 border-y border-ink/10 bg-white/30 backdrop-blur-sm">
        <motion.div {...reveal} className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['40+', 'countries served'],
            ['1040 · 2555', 'forms we live in'],
            ['FBAR · FATCA', 'fully covered'],
            ['100%', 'human-reviewed'],
          ].map(([big, small]) => (
            <div key={small}>
              <div className="font-display text-2xl md:text-3xl text-ink">{big}</div>
              <div className="mt-1 text-[12px] uppercase tracking-widest text-ink/50">{small}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Services */}
      <section className="relative px-6 py-28 md:py-36">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl tracking-tight">What we handle</h2>
            <p className="mt-5 text-lg text-ink/60 max-w-2xl mx-auto">
              The full cross-border picture for Americans living overseas, in one calm place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.12 }}
              >
                <Link href={service.href}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="group h-full p-8 rounded-2xl border border-ink/10 bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-[0_24px_60px_-30px_rgba(22,35,58,0.35)] transition-all duration-300"
                  >
                    <div className="text-accent">{service.icon}</div>
                    <h3 className="mt-6 font-display text-2xl">{service.title}</h3>
                    <p className="mt-3 text-ink/60 leading-relaxed">{service.description}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      Learn more
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative px-6 py-28 md:py-36 border-y border-ink/10 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl tracking-tight">A process that feels still</h2>
            <p className="mt-5 text-lg text-ink/60 max-w-2xl mx-auto">
              Three quiet steps. You hand it over once, and we take it from there.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div key={step.n} {...reveal} transition={{ ...reveal.transition, delay: i * 0.12 }}>
                <div className="font-display text-5xl text-ink/15">{step.n}</div>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-ink/60 leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...reveal} className="mt-14 text-center">
            <Link href="/process" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              See the full process
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why */}
      <section className="relative px-6 py-28 md:py-36">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl tracking-tight">Why TaxJet</h2>
            <p className="mt-5 text-lg text-ink/60 max-w-2xl mx-auto">
              Expert work, a personal connection, and none of the dread.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-14 gap-y-12">
            {reasons.map((r, i) => (
              <motion.div key={r.title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.08 }} className="border-t border-ink/10 pt-6">
                <h3 className="font-display text-2xl">{r.title}</h3>
                <p className="mt-3 text-ink/60 leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pullquote */}
      <section className="relative px-6 py-24 border-y border-ink/10 bg-white/30 backdrop-blur-sm">
        <motion.blockquote {...reveal} className="max-w-3xl mx-auto text-center">
          <p className="font-display text-2xl md:text-3xl leading-snug text-ink/90 text-balance">
            &ldquo;For the first time since moving abroad, tax season came and went
            and I barely noticed.&rdquo;
          </p>
          <footer className="mt-6 text-sm uppercase tracking-widest text-ink/45">
            A TaxJet client, currently in Lisbon
          </footer>
        </motion.blockquote>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-32">
        <motion.div {...reveal} className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl tracking-tight text-balance">
            Let&rsquo;s clear the runway
          </h2>
          <p className="mt-6 text-lg text-ink/60 max-w-xl mx-auto">
            Tell us where you live and how you earn. We&rsquo;ll take it from there.
          </p>
          <div className="mt-10">
            <Link href="/contact">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block px-10 py-5 bg-ink text-paper rounded-full text-lg font-medium hover:bg-accent transition-colors duration-300"
              >
                Get Started
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-14 border-t border-ink/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-7 h-7 rounded-full bg-ink text-paper">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 12l20-8-8 20-2.5-8.5z" /></svg>
            </span>
            <span className="font-display text-xl">TaxJet</span>
          </div>
          <div className="flex gap-8 text-sm text-ink/60">
            <Link href="/about" className="hover:text-ink transition-colors">About</Link>
            <Link href="/services" className="hover:text-ink transition-colors">Services</Link>
            <Link href="/blog" className="hover:text-ink transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-ink transition-colors">Contact</Link>
          </div>
          <div className="text-ink/40 text-sm">© 2026 TaxJet. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
