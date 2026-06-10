'use client'
import { useState } from 'react'
import Link from 'next/link'
import IndiaShell from '@/components/india/IndiaShell'
import { INDIA_ASSESSMENTS } from '@/lib/india'

type Status = 'Steady' | 'Gentle watch' | 'Needs attention'
const STATUS_BADGE: Record<Status, string> = { 'Steady': 'badge-strong', 'Gentle watch': 'badge-developing', 'Needs attention': 'badge-support' }

// Prototype-faithful demo report set
const REPORTS = [
  { id: 'demo-a', slug: 'a', child: 'Aarav', date: 'Today', index: 3.4, status: 'Gentle watch' as Status },
]

const FILTERS = ['All', 'Steady', 'Gentle watch', 'Needs attention'] as const

export default function IndiaReports() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All')
  const [query, setQuery] = useState('')

  const filtered = REPORTS.filter(r => (filter === 'All' || r.status === filter) && (
    !query || r.child.toLowerCase().includes(query.toLowerCase()) ||
    (INDIA_ASSESSMENTS.find(a => a.slug === r.slug)?.name.toLowerCase().includes(query.toLowerCase()))
  ))

  const remaining = INDIA_ASSESSMENTS.length - REPORTS.length

  return (
    <IndiaShell>
      <div style={{ maxWidth: 980 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Reports</h1>
        <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.65, marginBottom: 24 }}>Every completed assessment, with its pressure index.</p>

        {/* Nudge banner */}
        {remaining > 0 && (
          <div style={{ background: 'rgba(212,118,59,0.08)', border: '1px solid rgba(212,118,59,0.2)', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.85 }}>📊 Complete {remaining} more assessment{remaining > 1 ? 's' : ''} to unlock cross-assessment patterns.</span>
            <Link href="/india/assessments"><button className="btn btn-saffron" style={{ flexShrink: 0 }}>Continue suite →</button></Link>
          </div>
        )}

        {/* Filters + search */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`chip ${filter === f ? 'active' : ''}`}>{f}</button>
            ))}
          </div>
          <input className="input" placeholder="Search reports…" value={query} onChange={e => setQuery(e.target.value)} style={{ maxWidth: 240, marginLeft: 'auto' }} />
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(r => {
            const a = INDIA_ASSESSMENTS.find(x => x.slug === r.slug)!
            return (
              <Link key={r.id} href={`/india/reports/${r.id}`} className="ix-row" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 14, background: 'var(--paper)', border: '1px solid var(--line)', transition: 'background .15s' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: a.tile, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 22, flexShrink: 0 }}>{a.letter}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)' }}>{a.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.55 }}>{r.child} · {r.date}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div className="serif" style={{ fontSize: 24, color: 'var(--navy)', lineHeight: 1 }}>{r.index}<span style={{ fontSize: 13, opacity: 0.5 }}>/5</span></div>
                  <div style={{ fontSize: 11, color: 'var(--navy-ink)', opacity: 0.5 }}>pressure index</div>
                </div>
                <span className={`badge ${STATUS_BADGE[r.status]}`} style={{ flexShrink: 0 }}>{r.status}</span>
              </Link>
            )
          })}
          {filtered.length === 0 && (
            <div className="card" style={{ padding: 40, textAlign: 'center', color: 'var(--navy-ink)', opacity: 0.6 }}>No reports match your filters yet.</div>
          )}
        </div>
      </div>
      <style>{`.ix-row:hover { background: var(--cream) !important; }`}</style>
    </IndiaShell>
  )
}
