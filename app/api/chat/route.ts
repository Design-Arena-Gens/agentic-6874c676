import { NextRequest, NextResponse } from 'next/server';
import { generateReply } from '../../../lib/agent';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = (body?.messages ?? []) as Array<{ role: string; content: string }>;
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    const text = lastUser?.content ?? '';
    const reply = generateReply(text);
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: 'Sorry, there was an error handling your request.' }, { status: 200 });
  }
}
