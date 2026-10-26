import { NextResponse } from 'next/server';
import { getSiteContent, saveSiteContent } from '@/lib/db';

export async function GET() {
  try {
    const content = await getSiteContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch site content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await saveSiteContent(body);
    return NextResponse.json({ success: true, message: 'Website content updated successfully!' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update site content' }, { status: 500 });
  }
}
