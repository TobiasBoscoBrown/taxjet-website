import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Navigation from '@/components/Navigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | TaxJet Blog`,
    description: post.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-transparent text-ink">
      <Navigation />

      <article className="relative z-20 min-h-screen px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="text-sm text-accent font-medium mb-4">{post.category}</div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
              {post.title}
            </h1>
            <div className="text-ink/50">
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {post.heroImage && (
            <div className="mb-12 rounded-2xl overflow-hidden">
              <img src={post.heroImage} alt={post.title} className="w-full" />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            <MDXRemote source={post.content || ''} />
          </div>
        </div>
      </article>
    </main>
  );
}
