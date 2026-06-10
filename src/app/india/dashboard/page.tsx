'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import IndiaShell from '@/components/india/IndiaShell'
import { createClient } from '@/lib/supabase/client'
import { INDIA_ASSESSMENTS } from '@/lib/india'

const COMPLETED = new Set<string>(['a'])
const NEXT_UP = 'b'

export default function IndiaDashboard() {
  const supabase = createClient()
  const [name, setName] = useState('there')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const n = (data.user?.user_metadata?.name as string) || data.user?.email?.split('@')[0] || 'there'
      setName(n.split(' ')[0])
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const next = INDIA_ASSESSMENTS.find(a => a.slug === NEXT_UP)!
  const doneCount = COMPLETED.size

  return (
    <IndiaShell>
      {/* Top bar */}
      <div className="dash-topbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron-soft), var(--coral-soft))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--navy)' }}>A</div>
          <button style={{ padding: '7px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 600, border: '1px solid var(--teal)', background: 'var(--teal)', color: 'var(--cream)', cursor: 'pointer' }}>Aarav · Class 6 ▾</button>
        </div>
        <div className="dash-topbar-right" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="india-badge-pill">🇮🇳 India</span>
          <Link href="/india/assessments"><button className="btn btn-saffron">New assessment</button></Link>
        </div>
      </div>

      {/* Greeting */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--navy)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Namaste, <span className="serif" style={{ fontWeight: 400 }}>{name}</span>.</h1>
        <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.6, margin: 0 }}>Aarav has completed {doneCount} of 5 assessments. A good next step is {next.name}.</p>
      </div>

      {/* Suite tracker strip */}
      <div className="card" style={{ padding: 24, marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>India Suite progress</h3>
          <span style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.55 }}>{doneCount}/5 complete</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {INDIA_ASSESSMENTS.map(a => {
            const done = COMPLETED.has(a.slug)
            const isNext = a.slug === NEXT_UP
            const status = done ? 'Done' : isNext ? 'Next' : 'Pending'
            return (
              <Link key={a.slug} href={`/india/assessments/${a.slug}`} style={{ flex: '1 1 0', minWidth: 120, textDecoration: 'none' }}>
                <div style={{
                  border: `1px solid ${done ? 'var(--teal)' : isNext ? 'var(--saffron)' : 'var(--line)'}`,
                  background: done ? 'rgba(44,95,93,0.06)' : isNext ? 'rgba(212,118,59,0.06)' : 'var(--paper)',
                  borderRadius: 12, padding: '12px 14px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: a.tile, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 15 }}>{a.letter}</div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: done ? 'var(--teal)' : isNext ? 'var(--saffron)' : 'var(--navy-ink)', opacity: status === 'Pending' ? 0.5 : 1 }}>{status}</span>
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 }}>{a.name}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recommended next banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #28507a 100%)', borderRadius: 20, padding: '28px 32px', marginBottom: 28, color: 'var(--cream)' }}>
        <div className="nextup-inner">
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--saffron-soft)', marginBottom: 8 }}>Recommended next</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>{next.icon} {next.name}</h2>
            <p style={{ fontSize: 14, color: 'rgba(245,243,239,0.75)', margin: 0, maxWidth: 480 }}>Since peer pressure often connects to how heard a child feels at home, this is a natural next step. {next.questionCount} questions · ~{next.minutes} min · uses 1 credit.</p>
          </div>
          <Link href={`/india/assessments/${next.slug}`} className="nextup-btn"><button className="btn btn-saffron">Start this →</button></Link>
        </div>
      </div>

      {/* Two-column */}
      <div className="rg-dash2">
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>Recent reports</h3>
            <Link href="/india/reports" style={{ fontSize: 13, color: 'var(--saffron)', fontWeight: 600 }}>View all →</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid var(--line)' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy-ink)' }}>Peer Pressure &amp; Comparison</div>
              <div style={{ fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.5 }}>Completed today · Pressure index 3.4/5</div>
            </div>
            <span className="badge badge-developing">Gentle watch</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.55, marginTop: 16, marginBottom: 0 }}>Complete more assessments to unlock cross-assessment patterns.</p>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>Credits</h3>
          <div className="serif" style={{ fontSize: 40, color: 'var(--saffron)', lineHeight: 1 }}>3</div>
          <div style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.6, marginTop: 4, marginBottom: 18 }}>assessments left · Full India Suite</div>
          <Link href="/india/checkout"><button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Buy more credits</button></Link>
        </div>
      </div>
    </IndiaShell>
  )
}
