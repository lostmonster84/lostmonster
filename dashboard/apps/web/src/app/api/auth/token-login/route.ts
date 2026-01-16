import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@lostmonster/database';
import type { User } from '@lostmonster/database/types';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Parse and verify the token
    const [payloadB64, signature] = token.split('.');

    if (!payloadB64 || !signature) {
      throw new Error('Invalid token format');
    }

    const secret = process.env.AUTH_SECRET || '';
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payloadB64)
      .digest('base64url');

    if (signature !== expectedSignature) {
      throw new Error('Invalid token signature');
    }

    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());

    // Check expiry
    if (payload.exp < Date.now()) {
      throw new Error('Token expired');
    }

    // Verify user exists in database
    const sql = createClient();
    const users = await sql`SELECT * FROM users WHERE id = ${payload.userId}`;
    const user = users[0] as User | undefined;

    if (!user) {
      throw new Error('User not found');
    }

    // Since both apps use the same AUTH_SECRET and JWT strategy,
    // we can redirect to the home page and let NextAuth handle the session
    // For now, we'll redirect to login with a hint
    const response = NextResponse.redirect(new URL('/', request.url));

    // Set a temporary cookie to indicate successful cross-origin auth
    const cookieStore = await cookies();
    cookieStore.set('cross-auth-user', payload.userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60, // 1 minute
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Token login error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
