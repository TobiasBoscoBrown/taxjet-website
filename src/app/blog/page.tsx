'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AtmosphericTextures from '@/components/AtmosphericTextures';

const blogPosts = [
  {
    title: "Understanding the Foreign Earned Income Exclusion",
    excerpt: "Learn how Americans abroad can exclude up to $120,000 of foreign income from U.S. taxes.",
    date: "March 15, 2024",
    category: "Tax Tips"
  },
  {
    title: "FBAR Filing Requirements for Expats",
    excerpt: "Everything you need to know about reporting foreign bank accounts to the IRS.",
    date: "March 10, 2024",
    category: "Compliance"
  },
  {
    title: "Tax Treaties: How They Benefit Expats",
    excerpt: "A guide to understanding how U.S. tax treaties can reduce your tax burden.",
    date: "March 5, 2024",
    category: "Planning"
  },
  {
    title: "Catch-Up Filing: What to Do If You're Behind",
    excerpt: "Options for expats who have missed U.S. tax filing deadlines.",
    date: "February 28, 2024",
    category: "Compliance"
  },
  {
    title: "The Foreign Tax Credit Explained",
    excerpt: "How to claim credits for taxes paid to foreign countries and avoid double taxation.",
    date: "February 20, 2024",
    category: "Tax Tips"
  },
  {
    title: "Digital Nomad Tax Guide",
    excerpt: "Tax considerations for remote workers living and working abroad.",
    date: "February 15, 2024",
    category: "Lifestyle"
  }
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <AtmosphericTextures />
      <Navigation />

      <section className="relative z-20 min-h-[40vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto"
          >
            Insights and guidance for Americans living abroad
          </motion.p>
        </div>
      </section>

      <section className="relative z-20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="text-sm text-blue-400 font-medium mb-3">{post.category}</div>
                <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{post.excerpt}</p>
                <div className="text-white/40 text-sm">{post.date}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
