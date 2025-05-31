// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const auth = request.headers.get('authorization');

  if (auth) {
    const [scheme, encoded] = auth.split(' ');

    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [username, password] = decoded.split(':');

      // 🔐 Replace with your desired credentials
      if (username === 'admin' && password === 'Archstudio123') {
        return NextResponse.next(); // allow access
      }
    }
  }

  // 🔒 If not authorized, prompt login
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Area"',
    },
  });
}

export const config = {
  matcher: ['/admin/:path*'], // lock any route under /admin
};
