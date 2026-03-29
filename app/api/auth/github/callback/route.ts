import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createToken, exchangeGithubCode } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const cookieStore = await import('next/headers').then(m => m.cookies());
    const storedState = (await cookieStore).get('github_oauth_state')?.value;

    // Verify state parameter
    if (!state || state !== storedState) {
      return NextResponse.json(
        { error: 'Invalid state parameter' },
        { status: 400 }
      );
    }

    // Verify code exists
    if (!code) {
      return NextResponse.json(
        { error: 'Missing authorization code' },
        { status: 400 }
      );
    }

    // Exchange code for access token
    const result = await exchangeGithubCode(code);

    if (!result) {
      return NextResponse.json(
        { error: 'Failed to exchange GitHub code' },
        { status: 500 }
      );
    }

    const { access_token, user: githubUser } = result;

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { githubId: String(githubUser.id) },
    });

    if (!user) {
      // Check if email already exists
      const existingEmailUser = await prisma.user.findUnique({
        where: { email: githubUser.email },
      });

      if (existingEmailUser) {
        // Link GitHub account to existing user
        user = await prisma.user.update({
          where: { email: githubUser.email },
          data: {
            githubId: String(githubUser.id),
            githubToken: access_token,
            avatar: githubUser.avatar_url,
          },
        });
      } else {
        // Create new user
        user = await prisma.user.create({
          data: {
            email: githubUser.email,
            githubId: String(githubUser.id),
            githubToken: access_token,
            fullName: githubUser.name || '',
            avatar: githubUser.avatar_url,
            username: githubUser.login,
          },
        });
      }
    } else {
      // Update GitHub token
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          githubToken: access_token,
          avatar: githubUser.avatar_url,
        },
      });
    }

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.email,
    });

    // Set cookie and redirect to dashboard
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
