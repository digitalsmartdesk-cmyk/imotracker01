'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { IndiaBrandLogo } from '@/components/india/IndiaBrand'

type Tab = 'login' | 'signup'
const BOARDS = ['CBSE', 'ICSE / ISC', 'State Board', 'IB / IGCSE', 'Other']

function IndiaLoginInner() {
  const router = useRouter()
  const params = useSearchParams()
  const supabase = createClient()
  const [tab, setTab] = useState<Tab>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [showPw, setShowPw] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mobile, setMobile] = useState('')
  const [childName, setChildName] = useState('')
  const [childDob, setChildDob] = useState('')
  const [childClass, setChildClass] = useState('6')
  const [board, setBoard] = useState('CBSE')
  const [agree, setAgree] = useState(false)

  useEffect(() => {
    if (params.get('mode') === 'signup') setTab('signup')
    if (params.get('msg') === 'check-email') setError('✉️ Check your email and click the confirmation link to activate your account.')
  }, [params])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword })
    if (error) setError(error.message)
    else router.push('/india/dashboard')
    setLoading(false)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); setError('')
    if (!agree) { setError('Please agree to the Terms and DPDP privacy notice.'); return }
    setLoading(true)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    const { data, error: signErr } = await supabase.auth.signUp({
      email, password,
      options: { data: { name, mobile, locale: 'india' }, emailRedirectTo: `${siteUrl}/india/dashboard` },
    })
    if (signErr) { setError(signErr.message); setLoading(false); return }
    const uid = data.user?.id
    if (uid) {
      await supabase.from('profiles').insert({ id: uid, name, email, phone: mobile, country: 'India' })
      if (childName && childDob) {
        const age = Math.floor((Date.now() - new Date(childDob).getTime()) / (1000 * 60 * 60 * 24 * 365.25))
        await supabase.from('children').insert({ parent_id: uid, name: childName, date_of_birth: childDob, age, relationship: 'parent' })
      }
      await supabase.from('credits').insert({ parent_id: uid, balance: 0 })
    }
    if (data.user && !data.session) { router.push('/india/login?msg=check-email'); setLoading(false); return }
    router.push('/india/dashboard'); setLoading(false)
  }

  const googleLogin = async () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${siteUrl}/india/dashboard` } })
  }

  return (
    <div className="login-layout">
      {/* Left brand panel */}
      <div className="login-left">
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(212,118,59,0.22)' }} />
        <IndiaBrandLogo dark />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="serif" style={{ fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.2, color: '#F5F3EF', marginBottom: 40 }}>
            &ldquo;It gave us language for the pressure our son couldn&apos;t put into words.&rdquo;
            <span style={{ display: 'block', fontStyle: 'normal', fontFamily: "'Plus Jakarta Sans'", fontSize: 14, color: 'var(--coral)', marginTop: 14 }}>— Parent, Pune · ★★★★★</span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[['1', 'Child takes a 5-minute check-in'], ['2', 'We map the pressures, gently'], ['3', 'You get a report to talk it through']].map(([n, t]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(212,118,59,0.3)', border: '1px solid rgba(212,118,59,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="serif" style={{ color: 'var(--coral)', fontSize: 17 }}>{n}</span>
                </div>
                <span style={{ color: 'rgba(245,243,239,0.85)', fontSize: 15 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {['✓ DPDP Compliant', '🇮🇳 Data stored in India', 'SSL'].map(b => (
            <div key={b} style={{ padding: '6px 14px', borderRadius: 999, background: 'rgba(245,243,239,0.08)', border: '1px solid rgba(245,243,239,0.18)', color: 'rgba(245,243,239,0.75)', fontSize: 12, fontWeight: 600 }}>{b}</div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="login-right">
        <div style={{ width: '100%', maxWidth: 460 }}>
          <div style={{ display: 'flex', background: 'rgba(30,58,95,0.07)', borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {(['login', 'signup'] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); setError('') }} style={{
                flex: 1, padding: '10px 0', borderRadius: 9, border: 'none', fontWeight: 600, fontSize: 14.5, cursor: 'pointer',
                background: tab === t ? 'var(--paper)' : 'transparent', color: tab === t ? 'var(--navy)' : 'rgba(30,58,95,0.5)',
                boxShadow: tab === t ? '0 1px 4px rgba(30,58,95,0.1)' : 'none',
              }}>{t === 'login' ? 'Log in' : 'Sign up'}</button>
            ))}
          </div>

          {error && <div className="alert alert-error" style={{ marginBottom: 20 }}>{error}</div>}

          {tab === 'login' && (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--navy)', margin: '0 0 4px', letterSpacing: '-0.02em' }}>Welcome back.</h1>
                <p style={{ fontSize: 14, color: 'rgba(30,58,95,0.55)', margin: 0 }}>Log in to see your child&apos;s reports.</p>
              </div>
              <div>
                <label>Email address</label>
                <input className="input" type="email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required autoComplete="email" />
              </div>
              <div>
                <label>Password</label>
                <div style={{ position: 'relative' }}>
                  <input className="input" type={showPw ? 'text' : 'password'} placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required style={{ paddingRight: 56 }} autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, color: 'var(--teal)' }}>{showPw ? 'Hide' : 'Show'}</button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</button>
            </form>
          )}

          {tab === 'signup' && (
            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, padding: '20px 20px 16px' }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 14 }}>Your account</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div><label>Full name</label><input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Priya Sharma" required /></div>
                  <div><label>Email address</label><input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
                  <div>
                    <label>Mobile number (OTP verification)</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', padding: '0 14px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--cream-deep)', fontSize: 14.5, fontWeight: 600, color: 'var(--navy)' }}>+91</span>
                      <input className="input mono" type="tel" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="98765 43210" maxLength={10} />
                    </div>
                  </div>
                  <div><label>Password</label><input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={8} /></div>
                </div>
              </div>

              <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, padding: '20px 20px 16px' }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: 14 }}>Your child</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div><label>Child&apos;s name</label><input className="input" value={childName} onChange={e => setChildName(e.target.value)} placeholder="Aarav" /></div>
                  <div className="rg-2col-sm">
                    <div><label>Date of birth</label><input className="input" type="date" value={childDob} onChange={e => setChildDob(e.target.value)} max={new Date().toISOString().split('T')[0]} /></div>
                    <div>
                      <label>Class</label>
                      <select className="input" value={childClass} onChange={e => setChildClass(e.target.value)} style={{ appearance: 'auto' }}>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(c => <option key={c} value={String(c)}>Class {c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label>Board</label>
                    <select className="input" value={board} onChange={e => setBoard(e.target.value)} style={{ appearance: 'auto' }}>
                      {BOARDS.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5, margin: 0 }}>ImoTracker India is designed for children ages 7–15.</p>
                </div>
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontWeight: 400, fontSize: 13.5, color: 'var(--navy-ink)', cursor: 'pointer' }}>
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} required style={{ marginTop: 2, accentColor: 'var(--teal)', flexShrink: 0 }} />
                <span>I agree to the Terms of Service and the <strong>DPDP</strong> privacy notice, and confirm I am the parent or legal guardian of the child above.</span>
              </label>

              <button type="submit" className="btn btn-saffron btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>{loading ? 'Creating account…' : 'Create account'}</button>
              <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.5, margin: 0 }}>We&apos;ll send a verification link to your email before your first report.</p>
            </form>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
            <span style={{ fontSize: 13, color: 'rgba(30,58,95,0.4)', fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={googleLogin} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '12px 20px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--navy)', fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}>
              <span style={{ fontSize: 16 }}>🌐</span> Continue with Google
            </button>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '12px 20px', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--navy)', fontSize: 14.5, fontWeight: 600, cursor: 'pointer' }}>
              <span style={{ fontSize: 16 }}>📱</span> Continue with Mobile OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function IndiaLoginPage() {
  return <Suspense><IndiaLoginInner /></Suspense>
}
