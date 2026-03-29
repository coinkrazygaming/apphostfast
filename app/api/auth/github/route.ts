import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Redirect to the start endpoint
  return NextResponse.redirect(new URL('/api/auth/github/start', request.url));
}
