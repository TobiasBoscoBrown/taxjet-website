'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

export default function About() {
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
            About TaxJet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-ink/65 max-w-3xl mx-auto"
          >
            U.S. tax rules are complex. When you add foreign income, overseas assets, or cross-border transactions, the risk of getting it wrong increases quickly.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative z-20 py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <p className="text-xl text-ink/80 leading-relaxed mb-8">
              Many of our clients come to us after realizing their situation is more complicated than expected. Filing requirements are often missed or misunderstood, leading to costly mistakes.
            </p>
            <p className="text-xl text-ink/80 leading-relaxed mb-8">
              We specialize in helping Americans worldwide navigate these complexities with clarity and confidence. Whether you are living abroad, retiring overseas, or managing assets across countries, we help you stay compliant and make informed decisions.
            </p>
            <p className="text-xl text-ink/80 leading-relaxed">
              At TaxJet, we focus on accuracy, strategy, and long-term compliance so you can move forward without uncertainty.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-20 py-32 px-6 bg-white/600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose TaxJet?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Virtual, Yet Personal",
                description: "Gone are the days of visiting a tax professional in person. Virtual meetings have made the world smaller, but we understand the unique challenges faced by expats far from the U.S."
              },
              {
                title: "Full-Service Firm",
                description: "TaxJet is a full-service tax firm offering a range of international tax services. We provide personalized service to help make the process of filing expat and foreign taxes stress-free."
              },
              {
                title: "Not Another DIY Solution",
                description: "Some software companies have figured out that tax is a good product. They grew big and put you on autopilot. AI seems to be taking over, but it's not a one-size-fits-all. You feel lost in cyberspace and crammed into a DIY box chatting with a bot."
              },
              {
                title: "Tax Experts, Not Just Software",
                description: "At TaxJet, we are tax experts that know how to use advanced tools and software, but we won't forget that personal connection."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-8 border border-ink/10 rounded-2xl bg-white/60"
              >
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-ink/65 leading-relaxed">{item.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Work With Us?</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-ink text-paper rounded-full text-xl font-medium hover:bg-accent transition-colors"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
