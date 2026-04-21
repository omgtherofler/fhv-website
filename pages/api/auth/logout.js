import { serialize } from 'cookie';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', serialize('fhv_token', '', {
    httpOnly: true, path: '/', maxAge: 0,
  }));
  res.status(200).json({ ok: true });
}
