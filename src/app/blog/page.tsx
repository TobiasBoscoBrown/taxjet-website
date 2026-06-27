import { motion } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AtmosphericTextures from '@/components/AtmosphericTextures';
import { getAllPosts } from '@/lib/posts';

export default function Blog() {
  const posts = getAllPosts();

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
            {posts.map((post, index) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all cursor-pointer h-full"
                >
                  {post.heroImage && (
                    <div className="mb-4 h-40 rounded-lg overflow-hidden bg-white/5">
                      <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="text-sm text-blue-400 font-medium mb-3">{post.category}</div>
                  <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                  <p className="text-white/60 leading-relaxed mb-6">{post.excerpt}</p>
                  <div className="text-white/40 text-sm">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
