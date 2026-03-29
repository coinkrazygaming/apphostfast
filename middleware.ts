import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-min-32-characters-long'
);

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/api/apps', '/api/deploy'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if route requires authentication
  const requiresAuth = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (requiresAuth) {
    const token = request.cookies.get('auth_token')?.value;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Verify token
    try {
      await jwtVerify(token, secret);
      // Token is valid, allow request
      return NextResponse.next();
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
