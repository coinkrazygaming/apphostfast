import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-characters-long'
);

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

/**
 * Create JWT token
 */
export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

/**
 * Verify JWT token
 */
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, secret);
    return verified.payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Get session from cookie
 */
export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) return null;

  return verifyToken(token);
}

/**
 * Exchange GitHub code for access token
 */
export async function exchangeGithubCode(
  code: string
): Promise<{ access_token: string; user: any } | null> {
  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      console.error('Failed to exchange GitHub code');
      return null;
    }

    const { access_token } = await tokenResponse.json();

    // Get user info from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!userResponse.ok) {
      console.error('Failed to fetch GitHub user');
      return null;
    }

    const user = await userResponse.json();

    return { access_token, user };
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    return null;
  }
}

/**
 * Get GitHub repositories
 */
export async function getGithubRepositories(accessToken: string) {
  try {
    const response = await fetch('https://api.github.com/user/repos?per_page=100', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    return null;
  }
}

/**
 * Create GitHub webhook for a repository
 */
export async function createGithubWebhook(
  accessToken: string,
  owner: string,
  repo: string,
  webhookUrl: string
) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/hooks`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
          name: 'web',
          active: true,
          events: ['push', 'pull_request'],
          config: {
            url: webhookUrl,
            content_type: 'json',
            secret: process.env.GITHUB_WEBHOOK_SECRET,
            insecure_ssl: process.env.NODE_ENV === 'production' ? '0' : '1',
          },
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to create webhook:', await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create webhook:', error);
    return null;
  }
}

/**
 * Verify GitHub webhook signature
 */
export function verifyGithubWebhook(
  payload: string,
  signature: string
): boolean {
  const crypto = require('crypto');
  const secret = process.env.GITHUB_WEBHOOK_SECRET || '';
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  const expectedSignature = `sha256=${hash}`;
  return signature === expectedSignature;
}
