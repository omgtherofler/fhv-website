import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-in-production');

export async function middleware(req) {
  const token = req.cookies.get('fhv_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}

export const config = {
  matcher: ['/admin', '/admin/((?!login).*)'],
};
