'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  heroImage?: string;
  content?: string;
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Post>>({});
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('title', editingPost.title || '');
    formData.append('date', editingPost.date || new Date().toISOString().split('T')[0]);
    formData.append('category', editingPost.category || '');
    formData.append('excerpt', editingPost.excerpt || '');
    formData.append('content', editingPost.content || '');
    if (heroImageFile) {
      formData.append('heroImage', heroImageFile);
    }
    if (editingPost.slug) {
      formData.append('slug', editingPost.slug);
    }

    try {
      const response = await fetch('/api/blog/posts', {
        method: editingPost.slug ? 'PUT' : 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsEditing(false);
        setEditingPost({});
        setHeroImageFile(null);
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to save post:', error);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/blog/posts?slug=${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPosts();
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsEditing(true);
  };

  const handleNew = () => {
    setEditingPost({});
    setIsEditing(true);
  };

  return (
    <main className="min-h-screen bg-transparent text-ink">
      <Navigation />

      <section className="relative z-20 min-h-screen px-6 pt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">Blog Admin</h1>
            <p className="text-xl text-ink/65">Manage your blog posts</p>
          </motion.div>

          {!isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNew}
                className="mb-8 px-6 py-3 bg-ink text-paper rounded-full font-medium"
              >
                + New Post
              </motion.button>

              <div className="space-y-4">
                {posts.map((post) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-ink/10 rounded-2xl bg-white/60 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-ink/65 text-sm">{post.date} • {post.category}</p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-4 py-2 border border-ink/25 rounded-lg hover:bg-ink/[0.06] transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 border border-ink/10 rounded-2xl bg-white/60"
            >
              <h2 className="text-3xl font-bold mb-8">
                {editingPost.slug ? 'Edit Post' : 'New Post'}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-ink/70">Title</label>
                  <input
                    type="text"
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-ink/70">Category</label>
                  <input
                    type="text"
                    value={editingPost.category || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-ink/70">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-ink/70">Hero Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setHeroImageFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-ink/70">Content (Markdown)</label>
                  <textarea
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={15}
                    className="w-full px-4 py-3 bg-white/60 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/25 transition-colors text-ink resize-none font-mono"
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="px-8 py-3 bg-ink text-paper rounded-full font-medium"
                  >
                    Save Post
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsEditing(false);
                      setEditingPost({});
                      setHeroImageFile(null);
                    }}
                    className="px-8 py-3 border border-ink/25 rounded-full font-medium hover:bg-ink/[0.06] transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
