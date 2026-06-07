import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

const KV_KEY = 'pd_posted_count';
const DEFAULT_COUNT = 44;

export async function GET() {
  try {
    const count = await kv.get(KV_KEY);
    return NextResponse.json({ posted: count ?? DEFAULT_COUNT });
  } catch {
    return NextResponse.json({ posted: DEFAULT_COUNT });
  }
}

export async function POST(request) {
  try {
    const { password, posted } = await request.json();

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }

    const count = parseInt(posted, 10);
    if (!count || count < 1 || count > 99) {
      return NextResponse.json({ error: 'Invalid count. Must be 1–99.' }, { status: 400 });
    }

    await kv.set(KV_KEY, count);
    return NextResponse.json({ success: true, posted: count });
  } catch (err) {
    console.error('KV error:', err);
    return NextResponse.json({ error: 'Failed to save. Try again.' }, { status: 500 });
  }
}
