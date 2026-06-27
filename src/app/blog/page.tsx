import Navigation from '@/components/Navigation';
import AtmosphericTextures from '@/components/AtmosphericTextures';
import { getAllPosts } from '@/lib/posts';
import BlogPosts from './BlogPosts';

export default function Blog() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <AtmosphericTextures />
      <Navigation />

      <section className="relative z-20 min-h-[40vh] flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Blog
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
            Insights and guidance for Americans living abroad
          </p>
        </div>
      </section>

      <section className="relative z-20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <BlogPosts posts={posts} />
        </div>
      </section>
    </main>
  );
}
