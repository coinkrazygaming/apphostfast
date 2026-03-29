import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

export async function GET(request: NextRequest) {
  try {
    // Generate state parameter for CSRF protection
    const state = randomBytes(16).toString('hex');

    // Store state in cookie for verification later
    const response = NextResponse.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`
      )}&scope=repo,user&state=${state}`
    );

    response.cookies.set('github_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
    });

    return response;
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return NextResponse.json(
      { error: 'Failed to start GitHub authentication' },
      { status: 500 }
    );
  }
}
