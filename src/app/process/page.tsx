'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Tell Us About Your Situation",
      description: "Share details about your tax situation through our secure portal. We'll review and reach out with a personalized plan."
    },
    {
      number: "02",
      title: "Gather Your Documents",
      description: "We'll provide a checklist of documents needed. Upload everything securely through our encrypted portal."
    },
    {
      number: "03",
      title: "Expert Review & Analysis",
      description: "Our tax experts review your documents, analyze your situation, and develop a comprehensive tax strategy."
    },
    {
      number: "04",
      title: "Preparation & Filing",
      description: "We prepare your returns, review everything with you, and file on time. You'll have peace of mind knowing it's done right."
    }
  ];

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
            Our Process
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-ink/65 max-w-3xl mx-auto"
          >
            Simple, transparent, and stress-free. Here's how we work together to get your taxes done right.
          </motion.p>
        </div>
      </section>

      {/* Steps */}
      <section className="relative z-20 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0">
                  <div className="text-6xl font-bold text-ink/35">{step.number}</div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-xl text-ink/65 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-20 py-32 px-6 bg-white/600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Clients Say</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Gail V.",
                location: "New York, NY",
                text: "The firm is very professional, very friendly, and most of all did miracle work with my mess. They were extremely knowledgeable and fast. I felt like I was important, and I was treated like a VIP."
              },
              {
                name: "Mykal O.",
                location: "Seattle, WA",
                text: "I had a frightening situation with the IRS and she handled it with utmost professionalism. She cleared up the situation in less than a week! She was extremely reasonable with her fees but more importantly, she was honest, kind, non-judgmental and very reassuring."
              },
              {
                name: "Liza I.",
                location: "Dublin, Ireland",
                text: "After months of frustrated searching for an expert who understood both the federal tax code and International – U.S. tax rules, I found Renee at Sound Tax. I cannot praise Renee highly enough for her strengths as a tax specialist."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-ink/10 bg-white/60"
              >
                <p className="text-ink/80 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-ink/65 text-sm">{testimonial.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-20 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Get Started?</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-ink text-paper rounded-full text-xl font-medium hover:bg-accent transition-colors"
            >
              Begin Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
