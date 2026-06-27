import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, putFile } from '@/lib/github';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { password, filename, dataBase64 } = await request.json();
    if (!checkPassword(password)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    if (!filename || !dataBase64) return NextResponse.json({ error: 'Missing image data' }, { status: 400 });

    const safe = filename.replace(/[^a-zA-Z0-9.\-_]/g, '-').toLowerCase();
    const rel = `images/${Date.now()}-${safe}`;
    await putFile(`public/${rel}`, dataBase64, `Upload blog image: ${safe}`);
    return NextResponse.json({ success: true, path: `/${rel}` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Failed to upload image' }, { status: 500 });
  }
}
