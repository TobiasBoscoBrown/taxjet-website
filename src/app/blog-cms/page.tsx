'use client';

import { useState } from 'react';
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

export default function BlogCMS() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<Post>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch('/api/blog/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        fetchPosts();
      } else {
        setError('Incorrect password');
      }
    } catch {
      setError('Could not reach the server');
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data.posts)) setPosts(data.posts);
    } catch (e) {
      console.error('Failed to fetch posts:', e);
    }
  };

  const handleSave = async () => {
    if (!editingPost.title) {
      setNotice('Please add a title first.');
      return;
    }
    setIsSaving(true);
    setNotice('');
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingPost, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsEditing(false);
        setEditingPost({});
        setNotice('Saved. Your change is publishing and goes live in about a minute.');
        setTimeout(fetchPosts, 1500);
      } else {
        setNotice(data.error || 'Failed to save.');
      }
    } catch {
      setNotice('Failed to save.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this post?')) return;
    try {
      const res = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}&password=${encodeURIComponent(password)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setNotice('Deleted. The site is updating.');
        setTimeout(fetchPosts, 1500);
      } else {
        const data = await res.json();
        setNotice(data.error || 'Failed to delete.');
      }
    } catch {
      setNotice('Failed to delete.');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setIsEditing(true);
    setNotice('');
  };

  const handleNew = () => {
    setEditingPost({});
    setIsEditing(true);
    setNotice('');
  };

  const onFile = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file');
      return;
    }
    setIsUploading(true);
    setUploadError('');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const dataBase64 = (reader.result as string).split(',')[1];
      try {
        const res = await fetch('/api/blog/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, filename: file.name, dataBase64 }),
        });
        const data = await res.json();
        if (res.ok) {
          setEditingPost((p) => ({ ...p, heroImage: data.path }));
        } else {
          setUploadError(data.error || 'Upload failed');
        }
      } catch {
        setUploadError('Upload failed');
      } finally {
        setIsUploading(false);
      }
    };
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-transparent text-ink">
        <Navigation />
        <section className="relative z-20 min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full p-8 border border-ink/10 rounded-2xl bg-white/70 backdrop-blur-sm"
          >
            <h1 className="text-3xl mb-3 text-center">Blog CMS</h1>
            <p className="text-ink/60 mb-6 text-center text-sm">Enter your password to manage posts</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Password"
              className="w-full px-4 py-3 bg-white/70 border border-ink/10 rounded-lg focus:outline-none focus:border-ink/30 transition-colors text-ink mb-4"
            />
            {error && <p className="text-stamp mb-4 text-center text-sm">{error}</p>}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-ink text-paper rounded-full font-medium hover:bg-accent transition-colors"
            >
              Access CMS
            </motion.button>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-ink">
      <Navigation />
      <section className="relative z-20 min-h-screen px-6 pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl mb-2">Blog CMS</h1>
            <p className="text-lg text-ink/60">Write, edit, and publish, all from here.</p>
          </div>

          {notice && (
            <div className="mb-8 px-5 py-3 rounded-xl border border-accent/30 bg-accent/[0.06] text-sm text-ink/80">
              {notice}
            </div>
          )}

          {!isEditing ? (
            <>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleNew}
                className="mb-8 px-6 py-3 bg-ink text-paper rounded-full font-medium hover:bg-accent transition-colors"
              >
                + New Post
              </motion.button>

              <div className="space-y-4">
                {posts.length === 0 && (
                  <p className="text-ink/50">No posts yet. Create your first one.</p>
                )}
                {posts.map((post) => (
                  <div
                    key={post.slug}
                    className="p-6 border border-ink/10 rounded-2xl bg-white/70 flex justify-between items-center gap-4"
                  >
                    <div>
                      <h3 className="text-xl mb-1">{post.title}</h3>
                      <p className="text-ink/55 text-sm">{post.date} • {post.category}</p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button
                        onClick={() => handleEdit(post)}
                        className="px-4 py-2 border border-ink/20 rounded-lg hover:bg-ink/[0.04] transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="px-4 py-2 border border-stamp/30 text-stamp rounded-lg hover:bg-stamp/[0.08] transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-8 border border-ink/10 rounded-2xl bg-white/70">
              <h2 className="text-2xl md:text-3xl mb-8">{editingPost.slug ? 'Edit Post' : 'New Post'}</h2>
              <div className="space-y-6">
                <Field label="Title">
                  <input
                    type="text"
                    value={editingPost.title || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="cms-input"
                  />
                </Field>
                <Field label="Category">
                  <input
                    type="text"
                    value={editingPost.category || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                    className="cms-input"
                  />
                </Field>
                <Field label="Excerpt">
                  <textarea
                    value={editingPost.excerpt || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    rows={3}
                    className="cms-input resize-none"
                  />
                </Field>
                <Field label="Hero Image">
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); onFile(e.dataTransfer.files?.[0]); }}
                    onClick={() => document.getElementById('hero-input')?.click()}
                    className={`w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors text-center ${
                      isDragging ? 'border-accent bg-accent/[0.06]' : 'border-ink/15 bg-white/60 hover:bg-ink/[0.03]'
                    }`}
                  >
                    <input id="hero-input" type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} className="hidden" />
                    {editingPost.heroImage ? (
                      <div className="space-y-3">
                        <img src={editingPost.heroImage} alt="Hero preview" className="max-h-40 mx-auto rounded-lg object-contain" />
                        <p className="text-ink/55 text-sm">{editingPost.heroImage}</p>
                        <p className="text-ink/45 text-xs">Drop or click to replace</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-ink/60">Drop an image here, or click to upload</p>
                        <p className="text-ink/45 text-xs">PNG, JPG, GIF</p>
                      </div>
                    )}
                    {isUploading && <p className="text-accent text-sm mt-2">Uploading…</p>}
                    {uploadError && <p className="text-stamp text-sm mt-2">{uploadError}</p>}
                  </div>
                </Field>
                <Field label="Content (Markdown)">
                  <textarea
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    rows={15}
                    className="cms-input resize-none font-mono text-sm"
                  />
                </Field>
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 py-3 bg-ink text-paper rounded-full font-medium hover:bg-accent transition-colors disabled:opacity-60"
                  >
                    {isSaving ? 'Saving…' : 'Save Post'}
                  </motion.button>
                  <button
                    onClick={() => { setIsEditing(false); setEditingPost({}); }}
                    className="px-8 py-3 border border-ink/20 rounded-full font-medium hover:bg-ink/[0.04] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-ink/70">{label}</label>
      {children}
    </div>
  );
}
