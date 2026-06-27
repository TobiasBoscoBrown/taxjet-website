'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navigation from '@/components/Navigation';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-transparent text-ink">
      <Navigation />

      {/* Hero */}
      <section className="relative z-20 min-h-[60vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-ink/65 max-w-3xl mx-auto"
          >
            Not sure where to start? Tell us about your situation and we'll guide you.
          </motion.p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative z-20 py-32 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-ink/70">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ink/70">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ink/70">What services are you looking for?</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink"
              >
                <option value="">Select a service</option>
                <option value="expat">I need help filing U.S. taxes as an expat</option>
                <option value="assets">I have foreign assets (bank accounts, investments, real estate)</option>
                <option value="business">I own or manage a small business</option>
                <option value="missed">I may have missed U.S. tax filings</option>
                <option value="advice">I need advice on cross-border tax issues</option>
                <option value="other">Something else</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-ink/70">Tell us more about your situation</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink resize-none"
                placeholder="Share any details that would help us understand your situation..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full px-8 py-4 bg-ink text-paper rounded-lg text-lg font-medium hover:bg-accent transition-colors"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      {/* Alternative Contact */}
      <section className="relative z-20 py-32 px-6 bg-white/600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-8">Prefer to Talk Directly?</h2>
            <p className="text-xl text-ink/65 mb-8">
              Schedule a consultation with one of our tax experts.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-ink text-paper rounded-full text-xl font-medium hover:bg-accent transition-colors"
            >
              Schedule Consultation
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
