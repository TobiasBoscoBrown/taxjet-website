'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const navItems = ['About', 'Services', 'Process', 'Blog', 'FAQ', 'Contact'];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 40));

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 px-6 py-4 transition-all duration-500 ${
        scrolled
          ? 'bg-paper/70 backdrop-blur-xl border-b border-ink/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-7 h-7 rounded-full bg-ink text-paper text-[13px] transition-transform duration-300 group-hover:-translate-y-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M2 12l20-8-8 20-2.5-8.5z" />
            </svg>
          </span>
          <span className="font-display text-2xl tracking-tight text-ink">TaxJet</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`}>
              <motion.span
                className="text-ink/70 hover:text-ink transition-colors text-sm font-medium cursor-pointer"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.span>
            </Link>
          ))}
          <Link href="/contact">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block px-5 py-2 bg-ink text-paper rounded-full text-sm font-medium hover:bg-accent transition-colors"
            >
              Get Started
            </motion.span>
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-ink"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 rounded-2xl bg-paper/90 backdrop-blur-xl border border-ink/10 overflow-hidden"
        >
          <div className="px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}>
                <span className="block text-ink/75 hover:text-ink transition-colors cursor-pointer py-1">
                  {item}
                </span>
              </Link>
            ))}
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <span className="block mt-2 px-5 py-2 bg-ink text-paper rounded-full text-sm font-medium text-center">
                Get Started
              </span>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
