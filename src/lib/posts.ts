import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  heroImage?: string;
  content?: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        category: data.category || '',
        excerpt: data.excerpt || '',
        heroImage: data.heroImage || '',
        content,
      } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return allPostsData;
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      category: data.category || '',
      excerpt: data.excerpt || '',
      heroImage: data.heroImage || '',
      content,
    } as Post;
  } catch {
    return null;
  }
}

export function createPost(post: Omit<Post, 'slug' | 'content'> & { content?: string; slug?: string }): void {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  const frontmatter = `---
title: "${post.title}"
date: "${post.date}"
category: "${post.category}"
excerpt: "${post.excerpt}"
${post.heroImage ? `heroImage: "${post.heroImage}"` : ''}
---

${post.content || ''}`;

  fs.writeFileSync(fullPath, frontmatter);
}

export function updatePost(slug: string, post: Partial<Post>): void {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const updatedData = { ...data, ...post };
  const frontmatter = `---
title: "${updatedData.title}"
date: "${updatedData.date}"
category: "${updatedData.category}"
excerpt: "${updatedData.excerpt}"
${updatedData.heroImage ? `heroImage: "${updatedData.heroImage}"` : ''}
---

${content}`;

  fs.writeFileSync(fullPath, frontmatter);
}

export function deletePost(slug: string): void {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
}
