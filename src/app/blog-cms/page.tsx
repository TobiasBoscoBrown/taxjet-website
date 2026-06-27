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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setHeroImageFile(files[0]);
      uploadImage(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setHeroImageFile(files[0]);
      uploadImage(files[0]);
    }
  };

  const uploadImage = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      return;
    }

    setIsUploading(true);
    setUploadError('');

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const fileName = `images/${Date.now()}-${file.name.replace(/\s+/g, '-').toLowerCase()}`;

        const token = prompt('Enter GitHub Personal Access Token to upload image:');
        if (!token) {
          setIsUploading(false);
          return;
        }

        const response = await fetch(`https://api.github.com/repos/TobiasBoscoBrown/taxjet-website/contents/public/${fileName}`, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Upload hero image: ${file.name}`,
            content: base64String,
          }),
        });

        if (response.ok) {
          setEditingPost({ ...editingPost, heroImage: `/${fileName}` });
        } else {
          const errorData = await response.json();
          setUploadError(errorData.message || 'Failed to upload image');
        }
        setIsUploading(false);
      };
    } catch (error) {
      setUploadError('Failed to read image file');
      setIsUploading(false);
    }
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
                  <label className="block text-sm font-medium mb-2 text-white/70">Hero Image</label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('hero-image-input')?.click()}
                    className={`w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors text-center ${
                      isDragging
                        ? 'border-blue-400 bg-blue-400/10'
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <input
                      id="hero-image-input"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    {editingPost.heroImage ? (
                      <div className="space-y-3">
                        <img
                          src={editingPost.heroImage}
                          alt="Hero preview"
                          className="max-h-40 mx-auto rounded-lg object-contain"
                        />
                        <p className="text-white/60 text-sm">{editingPost.heroImage}</p>
                        <p className="text-white/40 text-xs">Drop or click to replace</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-white/60">Drop an image here, or click to upload</p>
                        <p className="text-white/40 text-xs">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                    {isUploading && (
                      <p className="text-blue-400 text-sm mt-2">Uploading to GitHub...</p>
                    )}
                    {uploadError && (
                      <p className="text-red-400 text-sm mt-2">{uploadError}</p>
                    )}
                  </div>
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
