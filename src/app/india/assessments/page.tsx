'use client'
import Link from 'next/link'
import IndiaShell from '@/components/india/IndiaShell'
import { INDIA_ASSESSMENTS } from '@/lib/india'

// In a full build this comes from suite progress per child. Prototype-faithful demo state:
const COMPLETED = new Set<string>(['a'])
const NEXT_UP = 'b'

export default function IndiaTestSelection() {
  const next = INDIA_ASSESSMENTS.find(a => a.slug === NEXT_UP)!

  return (
    <IndiaShell>
      <div style={{ maxWidth: 1100 }}>
        <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--saffron)' }}>India Assessment Suite</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Choose an assessment</h1>
        <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.65, marginBottom: 28 }}>Five assessments, taken once a year, build a longitudinal picture of your child&apos;s world.</p>

        {/* A→E progress line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 32, flexWrap: 'wrap' }}>
          {INDIA_ASSESSMENTS.map((a, i) => {
            const done = COMPLETED.has(a.slug)
            const isNext = a.slug === NEXT_UP
            return (
              <div key={a.slug} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700,
                  background: done ? 'var(--teal)' : isNext ? 'var(--saffron)' : 'var(--cream-deep)',
                  color: done || isNext ? 'white' : 'var(--navy)',
                }}>{done ? '✓' : a.letter}</div>
                {i < INDIA_ASSESSMENTS.length - 1 && <div style={{ width: 28, height: 2, background: done ? 'var(--teal)' : 'var(--line)' }} />}
              </div>
            )
          })}
        </div>

        {/* NEXT UP featured */}
        <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #28507a 100%)', borderRadius: 20, padding: '28px 32px', marginBottom: 28, color: 'var(--cream)' }}>
          <div className="nextup-inner">
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--saffron-soft)', marginBottom: 8 }}>Next up · recommended</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px' }}>{next.icon} {next.name}</h2>
              <p style={{ fontSize: 14, color: 'rgba(245,243,239,0.75)', margin: 0, maxWidth: 520 }}>You&apos;ve completed Peer Pressure — a natural next step is understanding how supported your child feels at home. {next.questionCount} questions · ~{next.minutes} min.</p>
            </div>
            <Link href={`/india/assessments/${next.slug}`} className="nextup-btn">
              <button className="btn btn-saffron">Start now →</button>
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="rg-3up">
          {INDIA_ASSESSMENTS.map(a => {
            const done = COMPLETED.has(a.slug)
            return (
              <Link key={a.slug} href={`/india/assessments/${a.slug}`} className="ix-card" style={{
                background: done ? 'rgba(232,165,152,0.12)' : 'var(--paper)',
                border: `1px solid ${done ? 'var(--coral)' : 'var(--line)'}`,
                borderRadius: 20, padding: 24, display: 'block', transition: 'transform .2s, box-shadow .2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 13, background: a.tile, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 24 }}>{a.letter}</div>
                  {done ? <span className="badge badge-strong">✓ Done</span> : <span className="badge badge-premium">🔒 Premium</span>}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', margin: '0 0 6px' }}>{a.name}</h3>
                <p style={{ fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.6, margin: '0 0 14px', lineHeight: 1.5 }}>{a.short}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--navy-ink)', opacity: 0.6 }}>
                  <span>{a.questionCount} q · ~{a.minutes} min</span>
                  <span style={{ color: 'var(--saffron)', fontWeight: 700 }}>{done ? 'Retake →' : 'Start →'}</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Gentle note */}
        <div style={{ marginTop: 28, background: 'rgba(212,147,58,0.08)', border: '1px solid rgba(212,147,58,0.2)', borderRadius: 14, padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 20 }}>💛</span>
          <p style={{ fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.8, margin: 0, lineHeight: 1.6 }}>
            <strong>A gentle note:</strong> avoid taking an assessment right before or during exam week. Children answer most honestly when they&apos;re calm and unhurried.
          </p>
        </div>
      </div>

      <style>{`.ix-card:hover { transform: translateY(-3px); box-shadow: 0 18px 40px -24px rgba(30,58,95,0.28); }`}</style>
    </IndiaShell>
  )
}
