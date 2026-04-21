import { SignJWT } from 'jose';
import { serialize } from 'cookie';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-in-production');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'E-Mail oder Passwort falsch.' });
  }

  const token = await new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret);

  res.setHeader('Set-Cookie', serialize('fhv_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  }));

  return res.status(200).json({ ok: true });
}
