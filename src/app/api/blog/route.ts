import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, listDir, getFile, putFile, deleteFile, parseFrontmatter } from '@/lib/github';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DIR = 'src/content/blog';
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// List posts (with content) straight from the repo.
export async function GET() {
  try {
    const files = (await listDir(DIR)).filter((f) => f.name.endsWith('.mdx'));
    const posts = await Promise.all(
      files.map(async (f) => {
        const full = await getFile(f.path);
        const raw = full?.content ? Buffer.from(full.content, 'base64').toString('utf8') : '';
        const { data, body } = parseFrontmatter(raw);
        return {
          slug: f.name.replace(/\.mdx$/, ''),
          title: data.title || '',
          date: data.date || '',
          category: data.category || '',
          excerpt: data.excerpt || '',
          heroImage: data.heroImage || '',
          content: body,
        };
      })
    );
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));
    return NextResponse.json({ posts });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to list posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!checkPassword(body.password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { title, date, category, excerpt, content, heroImage } = body;
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const slug = body.slug || slugify(title);
    const path = `${DIR}/${slug}.mdx`;
    const today = new Date().toISOString().split('T')[0];
    const mdx = `---
title: "${title}"
date: "${date || today}"
category: "${category || ''}"
excerpt: "${excerpt || ''}"
${heroImage ? `heroImage: "${heroImage}"` : ''}
---

${content || ''}`;

    const existing = await getFile(path);
    await putFile(
      path,
      Buffer.from(mdx, 'utf8').toString('base64'),
      existing ? `Update blog post: ${title}` : `Create blog post: ${title}`,
      existing?.sha
    );
    return NextResponse.json({ success: true, slug });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to save post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const password = searchParams.get('password') || undefined;
    if (!checkPassword(password)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });
    const path = `${DIR}/${slug}.mdx`;
    const existing = await getFile(path);
    if (!existing) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    await deleteFile(path, `Delete blog post: ${slug}`, existing.sha);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to delete post' }, { status: 500 });
  }
}
