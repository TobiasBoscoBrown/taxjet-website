'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AtmosphericTextures from '@/components/AtmosphericTextures';

export default function ClientPortal() {
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
            Let's Tackle Your Tax Needs Together
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto"
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
            className="p-8 rounded-2xl border border-white/10 bg-white/5"
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Create Your Account</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white"
                  placeholder="••••••••"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-8 py-4 bg-white text-black rounded-lg text-lg font-medium hover:bg-white/90 transition-colors"
              >
                Create Account
              </motion.button>
            </form>
            <p className="text-center text-white/60 mt-6">
              Already have an account? <a href="#" className="text-white hover:underline">Sign in</a>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
