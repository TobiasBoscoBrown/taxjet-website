'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const navItems = ['About', 'Services', 'Process', 'Blog', 'Contact'];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold tracking-tight text-white cursor-pointer"
          >
            TaxJet
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`}>
              <motion.span
                className="text-white/70 hover:text-white transition-colors text-sm font-medium cursor-pointer"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.span>
            </Link>
          ))}
          <Link href="/blog-cms">
            <motion.span
              className="text-white/50 hover:text-white transition-colors text-sm font-medium cursor-pointer"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              CMS
            </motion.span>
          </Link>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
            >
              Get Started
            </motion.button>
          </Link>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10"
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`}>
                <span className="block text-white/70 hover:text-white transition-colors cursor-pointer">
                  {item}
                </span>
              </Link>
            ))}
            <Link href="/blog-cms">
              <span className="block text-white/50 hover:text-white transition-colors cursor-pointer">
                CMS
              </span>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
