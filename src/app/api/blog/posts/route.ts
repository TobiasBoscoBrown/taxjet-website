import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost, updatePost, deletePost } from '@/lib/posts';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const posts = getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const heroImage = formData.get('heroImage') as File;

    let heroImagePath = '';
    if (heroImage) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
      await mkdir(uploadsDir, { recursive: true });
      
      const filename = `${Date.now()}-${heroImage.name}`;
      heroImagePath = `/uploads/blog/${filename}`;
      
      const bytes = await heroImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(path.join(uploadsDir, filename), buffer);
    }

    createPost({
      title,
      date,
      category,
      excerpt,
      content,
      heroImage: heroImagePath,
    });

    // Auto-commit to git
    const { exec } = require('child_process');
    exec('git add src/content/blog public/uploads/blog && git commit -m "Add/update blog post via CMS" && git push', 
      { cwd: process.cwd() },
      (error: any) => {
        if (error) console.error('Git commit failed:', error);
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const slug = formData.get('slug') as string;
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const heroImage = formData.get('heroImage') as File;

    let heroImagePath = undefined;
    if (heroImage && heroImage.size > 0) {
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
      await mkdir(uploadsDir, { recursive: true });
      
      const filename = `${Date.now()}-${heroImage.name}`;
      heroImagePath = `/uploads/blog/${filename}`;
      
      const bytes = await heroImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(path.join(uploadsDir, filename), buffer);
    }

    updatePost(slug, {
      title,
      date,
      category,
      excerpt,
      content,
      heroImage: heroImagePath,
    });

    // Auto-commit to git
    const { exec } = require('child_process');
    exec('git add src/content/blog public/uploads/blog && git commit -m "Update blog post via CMS" && git push', 
      { cwd: process.cwd() },
      (error: any) => {
        if (error) console.error('Git commit failed:', error);
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug required' }, { status: 400 });
    }

    deletePost(slug);

    // Auto-commit to git
    const { exec } = require('child_process');
    exec('git add src/content/blog && git commit -m "Delete blog post via CMS" && git push', 
      { cwd: process.cwd() },
      (error: any) => {
        if (error) console.error('Git commit failed:', error);
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
