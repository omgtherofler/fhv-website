import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push('/admin');
    } else {
      const { error } = await res.json();
      setError(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Login – FHV Admin</title></Head>
      <div style={{
        minHeight: '100vh', background: '#f5f4f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Source Serif 4', Georgia, serif",
      }}>
        <div style={{ width: '100%', maxWidth: 400, padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', color: '#1a1a1a' }}>FHV</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b6b66', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>
              Admin Portal
            </div>
          </div>

          <form onSubmit={submit} style={{ background: '#faf9f5', border: '1px solid #d9d5cb', padding: 36 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b6b66', letterSpacing: '0.14em', display: 'block', marginBottom: 6 }}>E-MAIL</label>
              <input type="email" value={form.email} required autoFocus
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ width: '100%', padding: '12px 0', fontSize: 15, color: '#1a1a1a', background: 'transparent', border: 'none', borderBottom: '1px solid #d9d5cb', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#2a3f5f')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#d9d5cb')} />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b6b66', letterSpacing: '0.14em', display: 'block', marginBottom: 6 }}>PASSWORT</label>
              <input type="password" value={form.password} required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{ width: '100%', padding: '12px 0', fontSize: 15, color: '#1a1a1a', background: 'transparent', border: 'none', borderBottom: '1px solid #d9d5cb', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                onFocus={(e) => (e.target.style.borderBottomColor = '#2a3f5f')}
                onBlur={(e) => (e.target.style.borderBottomColor = '#d9d5cb')} />
            </div>

            {error && (
              <div style={{ marginBottom: 16, padding: '10px 14px', background: '#fee2e2', color: '#b91c1c', fontSize: 13, fontFamily: 'inherit' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%', padding: 16, background: '#2a3f5f', color: '#f5f4f0',
              border: 'none', cursor: loading ? 'default' : 'pointer',
              fontFamily: 'inherit', fontSize: 15, letterSpacing: '0.02em',
              opacity: loading ? 0.7 : 1, transition: 'opacity .15s',
            }}>
              {loading ? 'Anmelden…' : 'Anmelden →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <a href="/" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6b6b66', textDecoration: 'none', letterSpacing: '0.08em' }}>
              ← Zurück zur Website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
