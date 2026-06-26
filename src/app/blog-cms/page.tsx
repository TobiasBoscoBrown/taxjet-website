'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import AtmosphericTextures from '@/components/AtmosphericTextures';

interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  heroImage?: string;
  content?: string;
}

const CMS_PASSWORD = 'password';

export default function BlogCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Post>>({});
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);

  const handleLogin = () => {
    if (password === CMS_PASSWORD) {
      setIsAuthenticated(true);
      fetchPosts();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://api.github.com/repos/TobiasBoscoBrown/taxjet-website/contents/src/content/blog');
      const data = await response.json();
      
      const postsData = await Promise.all(
        data
          .filter((file: any) => file.name.endsWith('.mdx'))
          .map(async (file: any) => {
            const contentResponse = await fetch(file.url);
            const contentData = await contentResponse.json();
            const content = atob(contentData.content);
            
            // Parse frontmatter
            const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
            let frontmatter: any = {};
            if (frontmatterMatch) {
              frontmatterMatch[1].split('\n').forEach((line: string) => {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length) {
                  frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^"|"$/g, '');
                }
              });
            }
            
            return {
              slug: file.name.replace('.mdx', ''),
              title: frontmatter.title || '',
              date: frontmatter.date || '',
              category: frontmatter.category || '',
              excerpt: frontmatter.excerpt || '',
              heroImage: frontmatter.heroImage || '',
              content: content.replace(/---\n[\s\S]*?\n---/, '').trim(),
            };
          })
      );
      
      setPosts(postsData.sort((a, b) => (a.date < b.date ? 1 : -1)));
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleSave = async () => {
    const slug = editingPost.slug || editingPost.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const content = `---
title: "${editingPost.title}"
date: "${editingPost.date || new Date().toISOString().split('T')[0]}"
category: "${editingPost.category}"
excerpt: "${editingPost.excerpt}"
${editingPost.heroImage ? `heroImage: "${editingPost.heroImage}"` : ''}
---

${editingPost.content || ''}`;

    const encodedContent = btoa(content);
    const path = `src/content/blog/${slug}.mdx`;

    try {
      // Check if file exists
      const existingFileResponse = await fetch(`https://api.github.com/repos/TobiasBoscoBrown/taxjet-website/contents/${path}`);
      const existingFile = await existingFileResponse.json();

      const method = existingFile.sha ? 'PUT' : 'POST';
      const body = {
        message: editingPost.slug ? `Update blog post: ${editingPost.title}` : `Create blog post: ${editingPost.title}`,
        content: encodedContent,
        sha: existingFile.sha || undefined,
      };

      const token = prompt('Enter GitHub Personal Access Token:');
      if (!token) return;

      const response = await fetch(`https://api.github.com/repos/TobiasBoscoBrown/taxjet-website/contents/${path}`, {
        method,
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
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
      const token = prompt('Enter GitHub Personal Access Token:');
      if (!token) return;

      const response = await fetch(`https://api.github.com/repos/TobiasBoscoBrown/taxjet-website/contents/src/content/blog/${slug}.mdx`, {
        method: 'GET',
        headers: {
          'Authorization': `token ${token}`,
        },
      });

      const file = await response.json();

      await fetch(`https://api.github.com/repos/TobiasBoscoBrown/taxjet-website/contents/src/content/blog/${slug}.mdx`, {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete blog post: ${slug}`,
          sha: file.sha,
        }),
      });

      fetchPosts();
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

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <AtmosphericTextures />
        <Navigation />

        <section className="relative z-20 min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full p-8 border border-white/10 rounded-2xl bg-white/5"
          >
            <h1 className="text-3xl font-bold mb-6 text-center">Blog CMS</h1>
            <p className="text-white/60 mb-6 text-center">Enter password to access</p>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white mb-4"
            />
            
            {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-white text-black rounded-full font-medium"
            >
              Access CMS
            </motion.button>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <AtmosphericTextures />
      <Navigation />

      <section className="relative z-20 min-h-screen px-6 pt-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold mb-4">Blog CMS</h1>
            <p className="text-xl text-white/60">Manage your blog posts</p>
          </motion.div>

          {!isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNew}
                className="mb-8 px-6 py-3 bg-white text-black rounded-full font-medium"
              >
                + New Post
              </motion.button>

              <div className="space-y-4">
                {posts.map((post) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-white/10 rounded-2xl bg-white/5 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-white/60 text-sm">{post.date} • {post.category}</p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
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
              className="p-8 border border-white/10 rounded-2xl bg-white/5"
            >
              <h2 className="text-3xl font-bold mb-8">
                {editingPost.slug ? 'Edit Post' : 'New Post'}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-white/70">Title</label>
                  <input
                    type="text"
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/70">Category</label>
                  <input
                    type="text"
                    value={editingPost.category || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/70">Excerpt</label>
                  <textarea
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/70">Hero Image URL</label>
                  <input
                    type="text"
                    value={editingPost.heroImage || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, heroImage: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white/70">Content (Markdown)</label>
                  <textarea
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={15}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 transition-colors text-white resize-none font-mono"
                  />
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="px-8 py-3 bg-white text-black rounded-full font-medium"
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
                    className="px-8 py-3 border border-white/30 rounded-full font-medium hover:bg-white/10 transition-colors"
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
