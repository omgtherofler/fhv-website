import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production-32chars'
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Server-Konfiguration fehlt. Bitte Env Vars in Vercel setzen.' });
  }

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'E-Mail oder Passwort falsch.' });
  }

  const token = await new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(secret);

  const cookie = `fhv_token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 8}; SameSite=Lax${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
  res.setHeader('Set-Cookie', cookie);
  return res.status(200).json({ ok: true });
}
