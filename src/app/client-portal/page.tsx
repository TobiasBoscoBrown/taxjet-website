'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function ClientPortal() {
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
            Let's Tackle Your Tax Needs Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-ink/65 max-w-3xl mx-auto"
          >
            Get started today and experience stress-free expat tax filing
          </motion.p>
        </div>
      </section>

      <section className="relative z-20 py-32 px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-2xl border border-ink/10 bg-white/60"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Create Your Account</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-ink/70">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-ink/70">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-ink/70">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink"
                  placeholder="••••••••"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 bg-ink text-paper rounded-lg text-lg font-medium hover:bg-accent transition-colors"
              >
                Create Account
              </motion.button>
            </form>
            <p className="text-center text-ink/65 mt-6">
              Already have an account? <a href="#" className="text-ink hover:underline">Sign in</a>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
