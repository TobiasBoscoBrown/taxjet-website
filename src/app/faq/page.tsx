'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Link from 'next/link';

const faqs = [
  {
    q: 'Do I need to report foreign assets if I am working in the U.S.?',
    a: "Yes. If you have foreign assets or accounts, you may need to report them to the IRS using forms such as the FBAR (FinCEN Form 114) and Form 8938. This applies to U.S. citizens, resident aliens, and certain non-resident aliens. For 2025, unmarried individuals report foreign assets worth more than $50,000 at year end or $75,000 at any time during the year; married filing jointly report more than $100,000 at year end or $150,000 at any time during the year.",
  },
  {
    q: 'What is a foreign tax credit and how can I claim it?',
    a: 'A foreign tax credit lets you reduce your U.S. tax liability by the amount of foreign taxes paid. You claim it by filing Form 1116 with your U.S. tax return.',
  },
  {
    q: 'How do I report foreign income on my U.S. tax return?',
    a: 'Report all foreign income on your U.S. tax return using forms like the 1040 and, where required, Form 8938.',
  },
  {
    q: 'Do I need to report foreign mutual funds on my U.S. tax return?',
    a: 'Yes. Foreign mutual funds must be reported, and they may be subject to special tax rules.',
  },
  {
    q: 'How can I benefit from the Foreign Earned Income Exclusion (FEIE)?',
    a: 'The FEIE lets you exclude a portion of your foreign earned income from U.S. taxation if you meet certain criteria, such as the Bona Fide Residence Test or the Physical Presence Test.',
  },
  {
    q: 'Do I need to pay U.S. taxes on foreign rental income?',
    a: 'Yes. You must report and pay U.S. taxes on foreign rental income.',
  },
  {
    q: 'What is a tax treaty?',
    a: 'Tax treaties can reduce or eliminate double taxation on income earned in treaty countries. You claim treaty benefits using the appropriate W-8 form (W-8BEN for individuals, W-8BEN-E for entities) and Form 8833 with your U.S. tax return, depending on your situation.',
  },
  {
    q: 'What is the difference between a tax resident and a non-resident alien?',
    a: 'A tax resident is subject to U.S. tax on worldwide income, while a non-resident alien is taxed only on U.S. source income.',
  },
  {
    q: 'Do I need to report foreign gifts on my U.S. tax return?',
    a: 'Yes, you may need to report foreign gifts above certain thresholds. For 2025, you must report foreign gifts if the total received from a nonresident alien or foreign estate exceeds $100,000 in a year, or if the total from foreign corporations or partnerships exceeds about $20,116.',
  },
  {
    q: 'What is the expatriation tax and how do I report it?',
    a: 'The expatriation tax applies to individuals who renounce U.S. citizenship or long-term residency. It applies to the net unrealized gain on all your property, in the U.S. or abroad. To report it, complete and submit Form 8854 to the IRS.',
  },
  {
    q: "What if I have been living abroad for years and have not filed a U.S. tax return?",
    a: 'As a U.S. citizen you may face penalties and interest on unpaid taxes if you do not file. The IRS eventually learns through information-sharing agreements with foreign institutions and governments. The good news: you can use the Streamlined Foreign Offshore Procedure to catch up without facing penalties. Unused foreign tax credits can be carried forward up to 10 years or carried back.',
  },
  {
    q: 'What is the Foreign Housing Exclusion?',
    a: 'The Foreign Housing Exclusion lets you exclude certain housing expenses from your taxable income if you live abroad and qualify for the FEIE.',
  },
  {
    q: 'What are the requirements for filing the FBAR?',
    a: 'File an FBAR if the total value of your foreign accounts exceeds $10,000 at any time during the year.',
  },
  {
    q: 'How do I report foreign pensions?',
    a: 'Report foreign pensions as income on your U.S. tax return. You may be eligible for a foreign tax credit.',
  },
];

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.03, 0.3) }}
      className="border-b border-ink/10"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="font-display text-xl md:text-2xl text-ink group-hover:text-accent transition-colors">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-ink/40 text-2xl leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-ink/65 leading-relaxed max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <main className="min-h-screen bg-transparent text-ink">
      <Navigation />
      <section className="relative z-20 px-6 pt-36 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-ink/15 bg-white/50 text-[12px] font-medium tracking-widest2 uppercase text-ink/55">
            Sound Board
          </span>
          <h1 className="mt-8 text-4xl md:text-6xl tracking-tight">Questions, answered</h1>
          <p className="mt-5 text-lg text-ink/60">
            Some of the most common international tax questions we hear, in plain language.
          </p>
        </div>
      </section>

      <section className="relative z-20 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <Item key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </section>

      <section className="relative z-20 px-6 pb-28">
        <div className="max-w-3xl mx-auto text-center border-t border-ink/10 pt-16">
          <h2 className="text-3xl md:text-4xl tracking-tight">Have a question you'd like us to answer?</h2>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-ink text-paper rounded-full text-base font-medium hover:bg-accent transition-colors"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
