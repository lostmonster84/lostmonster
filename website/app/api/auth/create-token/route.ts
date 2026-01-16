import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  // Create a simple signed token for cross-origin auth
  const payload = {
    userId: session.user.id,
    email: session.user.email,
    name: session.user.name,
    exp: Date.now() + 60000, // 1 minute expiry
  };

  // Base64 encode the payload (the dashboard will verify using shared secret)
  const token = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const secret = process.env.AUTH_SECRET || '';

  // Create a simple HMAC-like signature using the shared secret
  const crypto = await import('crypto');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(token)
    .digest('base64url');

  const signedToken = `${token}.${signature}`;

  return NextResponse.json({ token: signedToken });
}
