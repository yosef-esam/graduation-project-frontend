import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Get the token from cookies or headers
  // Attempt to get 'auth_token', fallback to 'accessToken' if needed based on previous implementation
  const token = request.cookies.get('auth_token')?.value || request.cookies.get('accessToken')?.value;

  // 2. Define the paths that require protection
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
                           request.nextUrl.pathname.startsWith('/superdashboard') ||
                           request.nextUrl.pathname.startsWith('/profile');

  // 3. If it's a protected route and no token exists, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 4. If everything is fine, continue to the requested page
  return NextResponse.next();
}

// Optimization: Only run this middleware on specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/superdashboard/:path*', '/profile/:path*'],
};
