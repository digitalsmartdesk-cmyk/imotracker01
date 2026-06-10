'use client'
import { useState } from 'react'
import Link from 'next/link'
import IndiaShell from '@/components/india/IndiaShell'
import { createClient } from '@/lib/supabase/client'

type Plan = 'suite' | 'family' | 'single'

const PLANS: Record<Plan, { label: string; price: number; cadence: string; credits: number; desc: string; qr: string; dbPlan: 'four_pack' | 'single'; badge?: string }> = {
  suite:  { label: 'Full India Suite', price: 2499, cadence: '/ year', credits: 5, desc: 'All 5 assessments · year-on-year tracking', qr: '/assets/india/qr-pack.png', dbPlan: 'four_pack', badge: 'Most popular' },
  family: { label: 'Family Plan', price: 3999, cadence: '/ year', credits: 15, desc: 'All 5 assessments · up to 3 children', qr: '/assets/india/qr-pack.png', dbPlan: 'four_pack' },
  single: { label: 'Single Assessment', price: 699, cadence: 'one-time', credits: 1, desc: 'Any one assessment · full report', qr: '/assets/india/qr-single.png', dbPlan: 'single' },
}

export default function IndiaCheckout() {
  const supabase = createClient()
  const [plan, setPlan] = useState<Plan>('suite')
  const [upiRef, setUpiRef] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const sel = PLANS[plan]

  const handleConfirm = async () => {
    if (!upiRef) return
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('transactions').insert({
          parent_id: user.id, plan: sel.dbPlan, amount: sel.price,
          credits_added: sel.credits, upi_ref: upiRef, status: 'pending',
        })
      }
    } catch (e) { console.error(e) }
    setLoading(false); setDone(true)
  }

  if (done) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div className="animate-rise" style={{ maxWidth: 440, textAlign: 'center' }}>
          <div className="animate-pop" style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: 'white', margin: '0 auto 24px', boxShadow: '0 0 0 16px rgba(44,95,93,0.1)' }}>✓</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--navy)', marginBottom: 12 }}>Payment received!</h1>
          <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.65, marginBottom: 32 }}>
            We&apos;ve received your UPI reference <span className="mono" style={{ background: 'var(--cream-deep)', padding: '1px 6px', borderRadius: 4 }}>{upiRef}</span>. Payments are verified manually — your {sel.credits} credit{sel.credits > 1 ? 's' : ''} will be added within a few minutes.
          </p>
          <Link href="/india/dashboard" className="btn btn-saffron btn-lg" style={{ display: 'block', textAlign: 'center' }}>Go to dashboard →</Link>
        </div>
      </div>
    )
  }

  return (
    <IndiaShell>
      <div style={{ maxWidth: 960 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--navy)', marginBottom: 4, letterSpacing: '-0.02em' }}>Complete your <span className="serif">purchase</span></h1>
        <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.55, marginBottom: 28 }}>Secure UPI checkout · 256-bit SSL · all prices in ₹</p>

        <div className="rg-checkout">
          <div>
            {/* Step 1 */}
            <Step n={1} title="Choose your plan" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
              {(Object.keys(PLANS) as Plan[]).map(p => {
                const pl = PLANS[p]; const isSel = plan === p
                return (
                  <label key={p} style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px', borderRadius: 16, cursor: 'pointer', border: `2px solid ${isSel ? 'var(--saffron)' : 'var(--line)'}`, background: isSel ? 'rgba(212,118,59,0.05)' : 'var(--paper)', transition: 'all .15s', position: 'relative' }}>
                    <input type="radio" name="plan" checked={isSel} onChange={() => setPlan(p)} style={{ display: 'none' }} />
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${isSel ? 'var(--saffron)' : 'var(--line)'}`, background: isSel ? 'var(--saffron)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{isSel && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--navy)' }}>{pl.label}</span>
                        {pl.badge && <span style={{ fontSize: 11, background: 'var(--saffron)', color: 'white', padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>{pl.badge}</span>}
                      </div>
                      <span style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.6 }}>{pl.desc}</span>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div className="serif" style={{ fontSize: 26, color: 'var(--navy)' }}>₹{pl.price.toLocaleString('en-IN')}</div>
                      <div style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5 }}>{pl.cadence}</div>
                    </div>
                  </label>
                )
              })}
            </div>

            {/* Step 2 */}
            <Step n={2} title="Scan & pay with UPI" />
            <div className="card" style={{ padding: 28, marginBottom: 36 }}>
              <div className="qr-row">
                <div style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 12, padding: 12, flexShrink: 0 }}>
                  <img src={sel.qr} alt={`UPI QR for ${sel.label}`} style={{ width: 200, height: 200, display: 'block' }} />
                </div>
                <div>
                  <div className="serif" style={{ fontSize: 32, color: 'var(--teal)', marginBottom: 4 }}>₹{sel.price.toLocaleString('en-IN')}</div>
                  <div style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.6, marginBottom: 16 }}>Paying <strong>Vikas Gupta · ImoTracker</strong></div>
                  <ol style={{ paddingLeft: 20, margin: '0 0 16px' }}>
                    {['Open GPay, PhonePe, Paytm, or BHIM', 'Scan the QR code', `Pay ₹${sel.price.toLocaleString('en-IN')} and note the UPI reference ID`].map((s, i) => (
                      <li key={i} style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.75, marginBottom: 8 }}>{s}</li>
                    ))}
                  </ol>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(a => <span key={a} style={{ fontSize: 11.5, background: 'var(--cream-deep)', padding: '4px 12px', borderRadius: 999, color: 'var(--navy)', fontWeight: 600 }}>{a}</span>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <Step n={3} title="Confirm your payment" />
            <div className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label>UPI reference / transaction ID *</label>
                  <input className="input mono" maxLength={22} placeholder="e.g. 411234567890" value={upiRef} onChange={e => setUpiRef(e.target.value)} />
                </div>
                <div>
                  <label>Email for receipt</label>
                  <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.6, margin: 0, lineHeight: 1.6 }}>
                  Payments are verified manually against our UPI records and credited within a few minutes. You&apos;ll get an email once your credits are live.
                </p>
              </div>
            </div>
          </div>

          {/* Order summary — navy sticky */}
          <div style={{ position: 'sticky', top: 24 }}>
            <div style={{ borderRadius: 20, padding: 28, background: 'var(--navy)', color: 'var(--cream)' }}>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: 'rgba(245,243,239,0.6)', marginBottom: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Order summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'rgba(245,243,239,0.85)', marginBottom: 12 }}>
                <span>{sel.label}</span><span>₹{sel.price.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(245,243,239,0.15)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontWeight: 700, color: 'rgba(245,243,239,0.8)', fontSize: 14 }}>Total</span>
                <span className="serif" style={{ fontSize: 38, color: 'var(--coral)' }}>₹{sel.price.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ background: 'rgba(212,118,59,0.18)', borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
                <span className="serif" style={{ fontSize: 30, color: 'var(--saffron-soft)', display: 'block', lineHeight: 1 }}>{sel.credits}</span>
                <span style={{ fontSize: 13, color: 'rgba(245,243,239,0.7)' }}>assessment credit{sel.credits > 1 ? 's' : ''} after verification</span>
              </div>
              <button className="btn btn-saffron btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={handleConfirm} disabled={!upiRef || loading}>
                {loading ? 'Confirming…' : "I've completed payment ✓"}
              </button>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                {['UPI', 'BHIM', 'Razorpay'].map(b => <span key={b} style={{ fontSize: 11, background: 'rgba(245,243,239,0.1)', padding: '3px 8px', borderRadius: 6, color: 'rgba(245,243,239,0.6)', fontWeight: 600 }}>{b}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </IndiaShell>
  )
}

function Step({ n, title }: { n: number; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--navy)', color: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{n}</div>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: 0 }}>{title}</h2>
    </div>
  )
}
