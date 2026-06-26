'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold tracking-tight text-white"
        >
          TaxJet
        </motion.div>

        <div className="hidden md:flex items-center space-x-8">
          {['About', 'Services', 'Process', 'Blog', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Get Started
          </motion.button>
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
            {['About', 'Services', 'Process', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block text-white/70 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
