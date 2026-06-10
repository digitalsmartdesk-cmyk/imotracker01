'use client'
import { useState } from 'react'
import Link from 'next/link'
import { IndiaBrandLogo, IndiaBadge } from '@/components/india/IndiaBrand'

type View = 'parent' | 'child'
type Interp = 'Steady' | 'Gentle watch' | 'Needs attention'

const INTERP_COLOR: Record<Interp, string> = { 'Steady': 'var(--teal)', 'Gentle watch': 'var(--amber)', 'Needs attention': '#b05a40' }
const INTERP_BADGE: Record<Interp, string> = { 'Steady': 'badge-strong', 'Gentle watch': 'badge-developing', 'Needs attention': 'badge-support' }

const DOMAINS: { domain: string; score: number; interp: Interp; benchmark: string }[] = [
  { domain: 'Peer Awareness', score: 3.2, interp: 'Gentle watch', benchmark: 'Typical for age 11: 2.8–3.6' },
  { domain: 'Comparison Feeling', score: 2.6, interp: 'Needs attention', benchmark: 'Typical for age 11: 3.0–3.8' },
  { domain: 'Rank & Marks Pressure', score: 3.8, interp: 'Gentle watch', benchmark: 'Typical for age 11: 2.6–3.4' },
  { domain: 'Standing Up to Peers', score: 3.0, interp: 'Steady', benchmark: 'Typical for age 11: 2.8–3.6' },
  { domain: 'Social Media Comparison', score: 3.5, interp: 'Gentle watch', benchmark: 'Typical for age 11: 2.4–3.2' },
  { domain: 'Friend Group Acceptance', score: 4.1, interp: 'Steady', benchmark: 'Typical for age 11: 3.2–4.0' },
  { domain: 'Teasing & Mockery', score: 2.9, interp: 'Steady', benchmark: 'Typical for age 11: 2.6–3.4' },
  { domain: 'Competition Feeling', score: 3.3, interp: 'Steady', benchmark: 'Typical for age 11: 2.8–3.6' },
]

const THEMES = [
  { tone: 'warn', icon: '⚠️', title: 'Comparison cuts deep', body: 'Aarav links classmates doing better to feeling "not good enough" — especially in front of family.' },
  { tone: 'strength', icon: '💚', title: 'Strong friendships', body: 'Despite the pressure, Aarav feels genuinely accepted within their main friend group.' },
  { tone: 'warn', icon: '📱', title: 'Social media weighs in', body: 'Online posts often leave Aarav feeling their life is "worse than others".' },
]
const QUOTES = [
  'When my classmate gets more marks, my parents bring it up for days. I feel small.',
  'On Instagram everyone looks like they have a better life than me.',
]
const STARTERS = [
  { n: 1, text: 'Ask Aarav what they\'re proud of this week — that has nothing to do with marks.', target: 'rank-based self-worth' },
  { n: 2, text: 'Share a time you compared yourself to someone and how you moved past it.', target: 'comparison' },
  { n: 3, text: 'Agree on one phone-free hour together each evening.', target: 'social media comparison' },
  { n: 4, text: 'Notice out loud when Aarav stands by their own opinion in a group.', target: 'peer pressure' },
]
const CHANGES = [
  { label: 'Daily', title: 'Drop one comparison', body: 'Catch yourself before "Sharma ji ka beta" — replace it with specific praise.', time: 'ongoing' },
  { label: 'Weekly', title: 'Interest hour', body: 'Protect time for something Aarav loves, with no academic goal.', time: '1 hr · weekly' },
  { label: 'Daily', title: 'Phone-free evening hour', body: 'Reduce the layered online comparison together.', time: '1 hr · daily' },
  { label: 'Monthly', title: 'Check the friendship', body: 'A relaxed chat about who Aarav feels safe with at school.', time: '~15 min · monthly' },
]

function Radar() {
  const pts = DOMAINS.map((d, i) => { const a = (i / 8) * Math.PI * 2 - Math.PI / 2; const r = (d.score / 5) * 80; return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}` }).join(' ')
  const outer = Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 - Math.PI / 2; return `${100 + 80 * Math.cos(a)},${100 + 80 * Math.sin(a)}` }).join(' ')
  return (
    <svg viewBox="0 0 200 200" width="280" height="280">
      {[0.25, 0.5, 0.75, 1].map(s => (
        <polygon key={s} points={Array.from({ length: 8 }, (_, i) => { const a = (i / 8) * Math.PI * 2 - Math.PI / 2; return `${100 + 80 * s * Math.cos(a)},${100 + 80 * s * Math.sin(a)}` }).join(' ')} fill="none" stroke="rgba(245,243,239,0.15)" strokeWidth="1" />
      ))}
      <polygon points={outer} fill="none" stroke="rgba(245,243,239,0.25)" strokeWidth="1" />
      <polygon points={pts} fill="rgba(232,165,152,0.3)" stroke="var(--coral)" strokeWidth="2" />
    </svg>
  )
}

export default function IndiaReportDetail() {
  const [view, setView] = useState<View>('parent')
  const [notes, setNotes] = useState('')
  const overall = (DOMAINS.reduce((s, d) => s + d.score, 0) / DOMAINS.length).toFixed(1)

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(14px)', background: 'rgba(245,243,239,0.82)', borderBottom: '1px solid var(--line-soft)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><IndiaBrandLogo /><IndiaBadge /></div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ display: 'flex', background: 'rgba(30,58,95,0.07)', borderRadius: 999, padding: 4 }}>
                {(['parent', 'child'] as View[]).map(v => (
                  <button key={v} onClick={() => setView(v)} style={{ padding: '7px 16px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: view === v ? 'var(--paper)' : 'transparent', color: view === v ? 'var(--navy)' : 'rgba(30,58,95,0.5)' }}>{v === 'parent' ? 'Parent view' : 'Child summary'}</button>
                ))}
              </div>
              <Link href="/india/reports" className="btn btn-ghost">All reports</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container" style={{ padding: '40px 32px 80px' }}>
        {view === 'parent' ? (
          <>
            <div style={{ marginBottom: 8, fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--saffron)' }}>Assessment A · Peer Pressure &amp; Comparison</div>
            <h1 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: 'var(--navy)', margin: '0 0 6px', letterSpacing: '-0.025em' }}>Aarav&apos;s peer-pressure <span className="serif" style={{ fontWeight: 400 }}>check-in</span></h1>
            <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.6, marginBottom: 32 }}>Class 6 · Age 11 · 16 questions · completed today</p>

            {/* Overview */}
            <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #28507a 100%)', borderRadius: 24, padding: 'clamp(28px, 4vw, 44px)', color: 'var(--cream)', marginBottom: 28 }}>
              <div className="rg-report-hdr">
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--saffron-soft)', marginBottom: 12 }}>Overall pressure index</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                    <span className="serif" style={{ fontSize: 64, color: 'var(--coral)', lineHeight: 1 }}>{overall}</span>
                    <span style={{ fontSize: 18, opacity: 0.6 }}>/ 5</span>
                    <span className="badge badge-developing" style={{ marginLeft: 8 }}>Gentle watch</span>
                  </div>
                  <p style={{ fontSize: 15, color: 'rgba(245,243,239,0.75)', maxWidth: 440, lineHeight: 1.6, margin: 0 }}>
                    Aarav carries real comparison pressure — especially around marks and online life — but has a strong, accepting friend group to build on. Nothing here is alarming; a few gentle conversations will go a long way.
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}><Radar /></div>
              </div>
            </div>

            {/* Domain breakdown */}
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>Domain breakdown</h2>
            <div className="rg-4up" style={{ marginBottom: 36 }}>
              {DOMAINS.map(d => (
                <div key={d.domain} className="card" style={{ padding: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, minHeight: 34 }}>{d.domain}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                    <span className="serif" style={{ fontSize: 36, color: INTERP_COLOR[d.interp], lineHeight: 1 }}>{d.score}</span>
                    <span style={{ fontSize: 12, opacity: 0.5 }}>/5</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 999, background: 'var(--cream-deep)', overflow: 'hidden', marginBottom: 10 }}>
                    <div style={{ height: '100%', width: `${(d.score / 5) * 100}%`, background: `linear-gradient(90deg, var(--teal), var(--sage))`, borderRadius: 999 }} />
                  </div>
                  <span className={`badge ${INTERP_BADGE[d.interp]}`} style={{ fontSize: 10 }}>{d.interp}</span>
                  <div style={{ fontSize: 11, color: 'var(--navy-ink)', opacity: 0.5, marginTop: 8 }}>{d.benchmark}</div>
                </div>
              ))}
            </div>

            {/* Insights */}
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>Insights &amp; patterns</h2>
            <div className="rg-insights" style={{ gap: 28, marginBottom: 36, alignItems: 'start' }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: '0 0 16px' }}>Three <span className="serif">themes</span> we noticed</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {THEMES.map(t => (
                    <div key={t.title} className="card" style={{ padding: 18, display: 'flex', gap: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 11, background: t.tone === 'warn' ? 'rgba(212,147,58,0.14)' : 'rgba(44,95,93,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{t.icon}</div>
                      <div>
                        <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{t.title}</div>
                        <div style={{ fontSize: 13, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.5 }}>{t.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: '0 0 16px' }}>In Aarav&apos;s <span className="serif">own words</span></h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {QUOTES.map((q, i) => (
                    <div key={i} className="serif" style={{ fontSize: 18, color: 'var(--navy)', lineHeight: 1.45, padding: '14px 18px', background: 'var(--paper)', borderLeft: '3px solid var(--coral)', borderRadius: '0 12px 12px 0' }}>&ldquo;{q}&rdquo;</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended next steps */}
            <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 16 }}>Recommended next steps</h2>
            <div className="rg-2col" style={{ marginBottom: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', margin: '0 0 16px' }}>Conversation starters</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {STARTERS.map(s => (
                    <div key={s.n} style={{ display: 'flex', gap: 12 }}>
                      <span className="serif" style={{ fontSize: 22, color: 'var(--saffron)', lineHeight: 1, flexShrink: 0 }}>{s.n}</span>
                      <div>
                        <div style={{ fontSize: 14, color: 'var(--navy-ink)', lineHeight: 1.5 }}>{s.text}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--navy-ink)', opacity: 0.5, marginTop: 3 }}>Targets: {s.target}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', margin: '0 0 16px' }}>Small changes to try</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {CHANGES.map(c => (
                    <div key={c.title} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(44,95,93,0.05)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--teal)' }}>{c.label}</span>
                        <span style={{ fontSize: 11, color: 'var(--navy-ink)', opacity: 0.5 }}>{c.time}</span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{c.title}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.65, marginTop: 2 }}>{c.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Counsellor flag */}
            <div style={{ background: 'rgba(176,90,64,0.08)', border: '1px solid rgba(176,90,64,0.2)', borderRadius: 16, padding: 24, marginBottom: 28, display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 22 }}>🫂</span>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>When to consider talking to a counsellor</div>
                <p style={{ fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.75, margin: 0, lineHeight: 1.6 }}>
                  If comparison pressure starts affecting Aarav&apos;s sleep, appetite, or willingness to go to school, a school counsellor or child psychologist can help. India&apos;s free mental-health helpline <strong>Tele-MANAS</strong> is available at <strong>14416</strong>.
                </p>
              </div>
              <button className="btn btn-ghost" style={{ flexShrink: 0 }}>Find support →</button>
            </div>

            {/* Baseline / longitudinal */}
            <div className="card" style={{ padding: 24, marginBottom: 28 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px' }}>This is the baseline</h3>
              <p style={{ fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.65, margin: 0, lineHeight: 1.6 }}>This is Aarav&apos;s first peer-pressure assessment. Take it again next year to see how this picture changes — the report will then show a year-on-year trend line.</p>
            </div>

            {/* Private notes */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', margin: '0 0 4px' }}>Private parent notes</h3>
              <p style={{ fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.55, margin: '0 0 12px' }}>Only you can see these.</p>
              <textarea className="input" style={{ minHeight: 100, resize: 'vertical' }} placeholder="Jot down anything you'd like to remember or revisit…" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
          </>
        ) : (
          /* CHILD SUMMARY — no scores anywhere */
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ background: 'linear-gradient(135deg, #fbe9da 0%, #f1d9c6 100%)', borderRadius: 28, padding: 'clamp(32px, 5vw, 56px)', position: 'relative', overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ position: 'absolute', top: 24, right: 32, width: 70, height: 70, borderRadius: '50%', background: 'var(--saffron)', opacity: 0.9 }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🌟</div>
                <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'var(--navy)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>Hi Aarav — thank you for sharing!</h1>
                <p className="serif" style={{ fontSize: 20, color: 'var(--navy)', lineHeight: 1.4, margin: 0 }}>There are no scores here — just some things that make you, you.</p>
              </div>
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>Things you&apos;re great at 💚</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                ['🤝', 'You have real friends', 'You feel accepted and included by your friend group — that&apos;s something special to hold onto.'],
                ['🗣️', 'You know your own mind', 'You can tell when something doesn&apos;t feel right for you, even when others feel differently.'],
                ['💪', 'You keep going', 'Even when comparison feels heavy, you keep showing up. That takes real strength.'],
              ].map(([e, t, b]) => (
                <div key={t} className="card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 24 }}>{e}</span>
                  <div><div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{t}</div><div style={{ fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.5 }}>{b}</div></div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 14 }}>Things to grow 🌱</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                ['Be kind to yourself', 'When a classmate does well, it doesn&apos;t take anything away from you. You&apos;re on your own path.'],
                ['Take screen breaks', 'What you see online is only the happy bits. Your real life is bigger than any post.'],
              ].map(([t, b]) => (
                <div key={t} style={{ padding: '16px 20px', borderRadius: 14, background: 'rgba(44,95,93,0.06)', borderLeft: '3px solid var(--teal)' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 3 }}>{t}</div>
                  <div style={{ fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.7, lineHeight: 1.5 }}>{b}</div>
                </div>
              ))}
            </div>

            <div className="serif" style={{ textAlign: 'center', fontSize: 22, color: 'var(--teal)', lineHeight: 1.4, padding: '24px 20px' }}>
              &ldquo;You are already enough — exactly as you are.&rdquo;
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
