'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Post } from '@/lib/posts';

interface BlogPostsProps {
  posts: Post[];
}

export default function BlogPosts({ posts }: BlogPostsProps) {
  return (
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
  );
}
