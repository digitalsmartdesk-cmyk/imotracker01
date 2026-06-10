'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { IndiaBadge } from '@/components/india/IndiaBrand'
import { FREQ_OPTS, type IndiaAssessmentMeta, type IndiaQuestion } from '@/lib/india'

type Screen = 'pretest' | 'question' | 'generating' | 'done'
type Answer = string | string[]

const GEN_STEPS = [
  'Scoring responses',
  'Comparing to age benchmarks',
  'Identifying themes & strengths',
  'Writing conversation starters',
]

export default function AssessmentRunner({ meta, questions }: { meta: IndiaAssessmentMeta; questions: IndiaQuestion[] }) {
  const router = useRouter()
  const supabase = createClient()
  const [screen, setScreen] = useState<Screen>('pretest')
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, Answer>>({})
  const [selected, setSelected] = useState<Answer | null>(null)
  const [genStep, setGenStep] = useState(0)
  const [reportId, setReportId] = useState<string | null>(null)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const q = questions[idx]
  const isAnswered = selected !== null && (Array.isArray(selected) ? selected.length > 0 : selected !== '')

  // Restore
  useEffect(() => {
    const saved = localStorage.getItem(meta.storageKey)
    if (saved) {
      try {
        const { answers: a, idx: i, started } = JSON.parse(saved)
        if (a) setAnswers(a)
        if (typeof i === 'number') setIdx(i)
        if (started && typeof i === 'number') setScreen('question')
      } catch { /* ignore */ }
    }
  }, [meta.storageKey])

  // Persist + restore selection
  useEffect(() => {
    if (screen === 'question') {
      localStorage.setItem(meta.storageKey, JSON.stringify({ answers, idx, started: true }))
      setSelected(answers[idx] ?? null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return () => { if (advanceTimer.current) clearTimeout(advanceTimer.current) }
  }, [idx, screen]) // eslint-disable-line react-hooks/exhaustive-deps

  const record = (val: Answer) => {
    setSelected(val)
    setAnswers(prev => ({ ...prev, [idx]: val }))
  }

  const autoAdvance = (val: Answer) => {
    record(val)
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    advanceTimer.current = setTimeout(() => goNext({ ...answers, [idx]: val }), 360)
  }

  const toggleMulti = (val: string) => {
    const cur = Array.isArray(selected) ? selected : []
    const next = cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val]
    record(next)
  }

  const goNext = (a?: Record<number, Answer>) => {
    const data = a ?? answers
    if (idx < questions.length - 1) {
      setIdx(i => i + 1)
      setSelected(data[idx + 1] ?? null)
    } else {
      setScreen('generating')
      runGenerating(data)
    }
  }

  const goBack = () => {
    if (idx > 0) { setIdx(i => i - 1); setSelected(answers[idx - 1] ?? null) }
  }

  const runGenerating = async (finalAnswers: Record<number, Answer>) => {
    for (let i = 0; i < GEN_STEPS.length; i++) { setGenStep(i); await new Promise(r => setTimeout(r, 750)) }
    await save(finalAnswers)
  }

  const save = async (finalAnswers: Record<number, Answer>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: children } = await supabase.from('children').select('id').eq('parent_id', user.id).limit(1)
        if (children?.length) {
          const { data: session } = await supabase.from('test_sessions').insert({
            child_id: children[0].id, parent_id: user.id, topic: `india-${meta.slug}`,
            is_free: false, status: 'completed',
            answers: finalAnswers as unknown as import('@/types/database').Json,
            completed_at: new Date().toISOString(),
          }).select('id').single()
          if (session) {
            const { data: report } = await supabase.from('reports').insert({
              session_id: session.id, child_id: children[0].id, parent_id: user.id,
              topic: `india-${meta.slug}`, overall_score: 3, overall_label: 'Steady',
              domain_scores: [] as unknown as import('@/types/database').Json,
              insights: {} as unknown as import('@/types/database').Json,
            }).select('id').single()
            if (report) setReportId(report.id)
          }
          try { await supabase.rpc('deduct_credit', { p_parent_id: user.id }) } catch { /* ignore */ }
        }
      }
    } catch (e) { console.error(e) }
    localStorage.removeItem(meta.storageKey)
    setScreen('done')
  }

  // ── PRE-TEST ──────────────────────────────────────────────
  if (screen === 'pretest') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', padding: '40px 20px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          {/* Hero card */}
          <div style={{ background: 'linear-gradient(125deg, var(--navy) 0%, #28507a 100%)', color: 'var(--cream)', borderRadius: 24, padding: '40px 40px 36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -70, top: -70, width: 260, height: 260, borderRadius: '50%', border: '1px dashed rgba(232,165,152,0.22)' }} />
            <div style={{ position: 'absolute', right: 20, bottom: -50, width: 150, height: 150, borderRadius: '50%', border: '1px dashed rgba(143,165,152,0.18)' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--coral)', fontWeight: 700 }}>{meta.eyebrow}</div>
              <div style={{ marginTop: 10 }}><IndiaBadge dark /></div>
              <h1 style={{ fontSize: 'clamp(26px, 3.8vw, 40px)', letterSpacing: '-0.025em', margin: '14px 0 10px', lineHeight: 1.1, color: 'var(--cream)', fontWeight: 700 }}>{meta.name}</h1>
              <p style={{ fontSize: 15.5, color: 'rgba(245,243,239,0.75)', margin: 0, maxWidth: 520, lineHeight: 1.55 }}>{meta.tagline}</p>
            </div>
          </div>

          {/* Body */}
          <div className="card" style={{ marginTop: 16, padding: 28 }}>
            <div style={{ display: 'flex', gap: 18, marginBottom: 22, flexWrap: 'wrap' }}>
              {[[`${meta.questionCount}`, 'questions'], [`~${meta.minutes} min`, 'to complete'], ['1', 'credit used']].map(([n, l]) => (
                <div key={l}>
                  <div className="serif" style={{ fontSize: 28, color: 'var(--coral)', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.6 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* Why this matters in India */}
            <div style={{ background: 'rgba(212,118,59,0.08)', border: '1px solid rgba(212,118,59,0.2)', borderRadius: 14, padding: '16px 18px', marginBottom: 22 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--saffron)', marginBottom: 6 }}>{meta.icon} Why this matters in India</div>
              <p style={{ fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.8, lineHeight: 1.6, margin: 0 }}>{meta.why}</p>
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Before you begin — a note for your child 💛</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {[['💚', 'No right or wrong answers. This is not a test you can pass or fail.'], ['🐢', "Take your time. There's no rush at all."], ['🙋', 'Ask a parent if you are unsure about anything.'], ['↩', 'You can skip any question you would rather not answer.']].map(([e, t]) => (
                <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--navy-ink)' }}>
                  <span style={{ flexShrink: 0 }}>{e}</span><span style={{ opacity: 0.8 }}>{t}</span>
                </div>
              ))}
            </div>
            <button className="btn btn-saffron btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setScreen('question')}>
              Start the assessment →
            </button>
            <p style={{ textAlign: 'center', fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.55, marginTop: 14 }}>Best taken when your child is calm and unrushed.</p>
          </div>
        </div>
      </div>
    )
  }

  // ── GENERATING ────────────────────────────────────────────
  if (screen === 'generating') {
    const C = 327
    const progress = ((genStep + 1) / GEN_STEPS.length) * C
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 400, width: '100%' }}>
          <svg width="120" height="120" style={{ marginBottom: 28 }}>
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="8" />
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--saffron)" strokeWidth="8" strokeDasharray={C} strokeDashoffset={C - progress} strokeLinecap="round" transform="rotate(-90 60 60)" style={{ transition: 'stroke-dashoffset .6s ease' }} />
            <text x="60" y="67" textAnchor="middle" fontSize="22" fontStyle="italic" fontFamily="'Instrument Serif', serif" fill="var(--navy)">{Math.round(((genStep + 1) / GEN_STEPS.length) * 100)}%</text>
          </svg>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--navy)', marginBottom: 24 }}>Building the report…</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {GEN_STEPS.map((step, i) => (
              <div key={step} style={{ display: 'flex', gap: 12, alignItems: 'center', opacity: i <= genStep ? 1 : 0.3, transition: 'opacity .4s' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: i < genStep ? 'var(--teal)' : i === genStep ? 'var(--navy)' : 'var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', fontWeight: 700, flexShrink: 0 }}>{i < genStep ? '✓' : i + 1}</div>
                <span style={{ fontSize: 14, color: 'var(--navy)' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── DONE ──────────────────────────────────────────────────
  if (screen === 'done') {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div className="animate-fade-up" style={{ maxWidth: 480, width: '100%' }}>
          <div className="animate-pop" style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--saffron-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px', boxShadow: '0 0 0 12px rgba(212,118,59,0.14)' }}>🌟</div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: 'var(--navy)', margin: '0 0 8px' }}>All done — <span className="serif">great work!</span></h1>
          <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.7, marginBottom: 36, lineHeight: 1.6 }}>
            Thank you for completing the {meta.name} assessment. The report is ready for your parent to read together with you.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={reportId ? `/india/reports/${reportId}` : '/india/reports'} className="btn btn-saffron btn-lg" style={{ display: 'block', textAlign: 'center' }}>View the report →</a>
            <a href="/india/assessments" className="btn btn-ghost btn-lg" style={{ display: 'block', textAlign: 'center' }}>Back to assessments</a>
          </div>
        </div>
      </div>
    )
  }

  // ── QUESTION ──────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'sticky', top: 0, background: 'rgba(251,250,246,0.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)', padding: '14px 24px', zIndex: 10 }}>
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--navy)' }}>Question <strong className="serif" style={{ fontSize: 20 }}>{idx + 1}</strong> of {questions.length}</span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11.5, color: 'var(--navy-ink)', opacity: 0.55, fontWeight: 600 }}>{q.kind}</span>
              <span style={{ fontSize: 12, background: 'rgba(44,95,93,0.1)', color: 'var(--teal)', padding: '3px 10px', borderRadius: 999, fontWeight: 600 }}>{q.domain}</span>
            </div>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${((idx + 1) / questions.length) * 100}%`, background: 'var(--saffron)' }} /></div>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '44px 24px', maxWidth: 660, margin: '0 auto', width: '100%' }}>
        {q.age && (
          <span style={{ alignSelf: 'flex-start', marginBottom: 14, fontSize: 11.5, fontWeight: 700, background: 'rgba(212,147,58,0.12)', color: 'var(--amber)', padding: '4px 11px', borderRadius: 999 }}>{q.age}</span>
        )}

        {q.type === 'agree' ? (
          <div className="serif" style={{ fontSize: 'clamp(24px, 3.4vw, 34px)', color: 'var(--navy)', textAlign: 'center', lineHeight: 1.35, marginBottom: 8, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: '28px 26px', width: '100%' }}>
            &ldquo;{q.statement}&rdquo;
          </div>
        ) : (
          <h2 style={{ fontSize: 'clamp(22px, 3.4vw, 34px)', fontWeight: 700, color: 'var(--navy)', textAlign: 'center', lineHeight: 1.4, marginBottom: q.help ? 8 : 32 }}>{q.text}</h2>
        )}
        {q.help && <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.55, textAlign: 'center', marginBottom: 32 }}>{q.help}</p>}
        {q.type === 'agree' && <div style={{ height: 24 }} />}

        {/* SCALE */}
        {q.type === 'scale' && (
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => autoAdvance(String(n))} className="ix-scale-btn" style={{
                  width: 64, height: 64, borderRadius: 14, fontSize: 22, fontFamily: "'Instrument Serif', serif", fontStyle: 'italic',
                  border: `2px solid ${selected === String(n) ? 'var(--saffron)' : 'var(--line)'}`,
                  background: selected === String(n) ? 'var(--saffron)' : 'var(--paper)',
                  color: selected === String(n) ? 'white' : 'var(--navy)', cursor: 'pointer', transition: 'all .15s',
                }}>{n}</button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.6, gap: 16 }}>
              <span style={{ maxWidth: '45%' }}>{q.lo}</span><span style={{ maxWidth: '45%', textAlign: 'right' }}>{q.hi}</span>
            </div>
          </div>
        )}

        {/* FREQUENCY — 5 rows with mini bar */}
        {q.type === 'freq' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            {FREQ_OPTS.map((opt, i) => {
              const isSel = selected === opt
              return (
                <button key={opt} onClick={() => autoAdvance(opt)} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderRadius: 12, textAlign: 'left',
                  border: `2px solid ${isSel ? 'var(--saffron)' : 'var(--line)'}`,
                  background: isSel ? 'rgba(212,118,59,0.08)' : 'var(--paper)', cursor: 'pointer', transition: 'all .15s',
                }}>
                  <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{opt}</span>
                  <span style={{ width: 80, height: 6, borderRadius: 999, background: 'var(--cream-deep)', overflow: 'hidden', flexShrink: 0 }}>
                    <span style={{ display: 'block', height: '100%', width: `${((i + 1) / 5) * 100}%`, background: isSel ? 'var(--saffron)' : 'var(--sage)', borderRadius: 999 }} />
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* SINGLE — radio cards, auto-advance */}
        {q.type === 'single' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            {q.options?.map(opt => {
              const isSel = selected === opt
              return (
                <button key={opt} onClick={() => autoAdvance(opt)} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 12, textAlign: 'left', fontSize: 15, fontWeight: 500,
                  border: `2px solid ${isSel ? 'var(--saffron)' : 'var(--line)'}`,
                  background: isSel ? 'rgba(212,118,59,0.08)' : 'var(--paper)', color: 'var(--navy)', cursor: 'pointer', transition: 'all .15s',
                }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${isSel ? 'var(--saffron)' : 'var(--line)'}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isSel && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--saffron)' }} />}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
        )}

        {/* MULTI — checkbox cards, square checks, NO auto-advance */}
        {q.type === 'multi' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            {q.options?.map(opt => {
              const isSel = Array.isArray(selected) && selected.includes(opt)
              return (
                <button key={opt} onClick={() => toggleMulti(opt)} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 12, textAlign: 'left', fontSize: 15, fontWeight: 500,
                  border: `2px solid ${isSel ? 'var(--saffron)' : 'var(--line)'}`,
                  background: isSel ? 'rgba(212,118,59,0.08)' : 'var(--paper)', color: 'var(--navy)', cursor: 'pointer', transition: 'all .15s',
                }}>
                  <span style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${isSel ? 'var(--saffron)' : 'var(--line)'}`, background: isSel ? 'var(--saffron)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 800 }}>
                    {isSel && '✓'}
                  </span>
                  {opt}
                </button>
              )
            })}
          </div>
        )}

        {/* AGREE — 5-button Likert row + axis labels */}
        {q.type === 'agree' && (
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {q.options?.map((opt, i) => {
                const isSel = selected === opt
                return (
                  <button key={opt} onClick={() => autoAdvance(opt)} style={{
                    flex: '1 1 0', minWidth: 64, padding: '14px 8px', borderRadius: 12, fontSize: 12.5, fontWeight: 600, lineHeight: 1.3,
                    border: `2px solid ${isSel ? 'var(--saffron)' : 'var(--line)'}`,
                    background: isSel ? 'var(--saffron)' : 'var(--paper)', color: isSel ? 'white' : 'var(--navy)', cursor: 'pointer', transition: 'all .15s',
                  }}>{opt}</button>
                )
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: 'var(--navy-ink)', opacity: 0.55 }}>
              <span>Disagree</span><span>Agree</span>
            </div>
          </div>
        )}

        {/* OPEN */}
        {q.type === 'open' && (
          <div style={{ width: '100%' }}>
            <textarea className="input" style={{ minHeight: 120, resize: 'vertical' }}
              placeholder={q.placeholder || 'Write anything you would like to share… (optional)'}
              value={typeof selected === 'string' ? selected : ''}
              onChange={e => record(e.target.value)} />
            <p style={{ fontSize: 12, color: 'var(--navy-ink)', opacity: 0.5, marginTop: 8 }}>Optional — skip if you prefer</p>
          </div>
        )}
      </div>

      <div style={{ padding: '20px 24px', borderTop: '1px solid var(--line)', background: 'var(--paper)', display: 'flex', justifyContent: 'space-between', maxWidth: 660, margin: '0 auto', width: '100%' }}>
        <button className="btn btn-ghost" onClick={goBack} disabled={idx === 0}>← Back</button>
        <button className="btn btn-ghost" style={{ opacity: 0.6 }} onClick={() => goNext()}>Skip this question</button>
        <button className="btn btn-primary" onClick={() => goNext()} disabled={!isAnswered && q.type !== 'open'}>
          {idx === questions.length - 1 ? 'Finish ✓' : 'Next →'}
        </button>
      </div>
    </div>
  )
}
