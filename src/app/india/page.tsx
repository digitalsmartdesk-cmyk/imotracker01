'use client'
import Link from 'next/link'
import IndiaNav from '@/components/india/IndiaNav'
import IndiaFooter from '@/components/india/IndiaFooter'
import { INDIA_ASSESSMENTS } from '@/lib/india'

const WHY = [
  { icon: '🏆', title: 'Rank-based self-worth', body: 'In most Indian schools, children are publicly ranked by performance. From Class 3 onwards, this shapes how they see themselves — and their peers see them.', stat: '68%', statLabel: 'of Indian children link self-worth to academic rank' },
  { icon: '👨‍👩‍👦', title: 'The comparison culture at home', body: '"Sharma ji ka beta" isn\'t a joke — it\'s a daily psychological event. Parental comparison is one of the most common sources of shame for Indian children.', stat: '3 in 4', statLabel: 'Indian children report frequent comparison by parents' },
  { icon: '🤐', title: "Children who can't speak up", body: 'Hierarchical family and school structures teach children that disagreeing with adults is disrespectful. Many carry enormous stress in silence.', stat: '1 in 2', statLabel: "Indian children say they can't speak freely at home" },
  { icon: '📚', title: 'The interest-reward gap', body: 'A child who loves art, writing, or history — but is pushed toward Maths and Science — learns that what they love doesn\'t matter. This gap widens year on year.', stat: '82%', statLabel: 'of Indian parents prioritise Science/Maths over creative subjects' },
  { icon: '🎓', title: 'Tuition culture and lost childhoods', body: 'After-school tuition, coaching centres, and weekend classes leave Indian children with almost no time for self-directed interests or unstructured play.', stat: '4+ hrs', statLabel: 'average daily tuition burden for urban children ages 10–14' },
  { icon: '📱', title: 'Social media comparison — Indian style', body: 'WhatsApp groups, Instagram, and YouTube expose Indian children to layered comparisons: marks, looks, lifestyle, and parental status — simultaneously.', stat: 'Age 10', statLabel: 'average age children begin feeling social media comparison pressure' },
]

const REVIEWS = [
  { quote: 'For the first time, my daughter told me she felt invisible in class. The report opened a conversation we\'d never had in 11 years.', name: 'Anjali Mehta', role: 'Parent · Mumbai', initials: 'AM' },
  { quote: 'I always said "Sharma ji ka beta" without thinking. Assessment B showed me how much it was hurting my son. We\'ve stopped.', name: 'Rakesh Iyer', role: 'Parent · Bengaluru', initials: 'RI' },
  { quote: 'Calibrated for Indian schools, not some Western idea of childhood. The peer-pressure assessment was frighteningly accurate.', name: 'Dr. Sunita Rao', role: 'Child psychologist · Chennai', initials: 'SR' },
]

const PLANS = [
  { name: 'Single Assessment', price: '₹699', cadence: 'one-time', features: ['Any one of the 5 assessments', 'Full parent + child report', 'Conversation starters', 'Valid for 1 child'], cta: 'Start with one', featured: false },
  { name: 'Full India Suite', price: '₹2,499', cadence: '/ year', features: ['All 5 assessments', 'Cross-assessment patterns', 'Year-on-year tracking', 'Priority support'], cta: 'Get the full suite', featured: true, badge: 'Most popular' },
  { name: 'Family Plan', price: '₹3,999', cadence: '/ year', features: ['All 5 assessments', 'Up to 3 children', 'Compare siblings privately', 'Priority support'], cta: 'Choose family plan', featured: false },
]

export default function IndiaHomepage() {
  return (
    <div style={{ background: 'var(--cream)' }}>
      <IndiaNav />

      {/* Hero */}
      <section className="container" style={{ padding: '72px 32px 56px' }}>
        <div className="rg-hero">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 999, padding: '6px 14px', fontSize: 12.5, fontWeight: 600, color: 'var(--navy)', marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--saffron)' }} />
              Built for India · Ages 7–15 · CBSE / ICSE / State boards
            </div>
            <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 700, lineHeight: 1.04, letterSpacing: '-0.035em', color: 'var(--navy)', margin: '0 0 20px' }}>
              What your child&apos;s report card <span className="serif" style={{ color: 'var(--saffron)' }}>can&apos;t tell you.</span>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--navy-ink)', opacity: 0.72, lineHeight: 1.6, maxWidth: 520, margin: '0 0 32px' }}>
              Five assessments designed specifically for the pressures Indian children face — peer comparison, parental expectations, exam stress, and the gap between what they love and what they&apos;re rewarded for.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/india/assessments" className="btn btn-saffron btn-lg">Explore all 5 assessments →</Link>
              <Link href="#why" className="btn btn-ghost btn-lg">How it works</Link>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 28, flexWrap: 'wrap', fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.7 }}>
              <span>★★★★★ 4.8 from 2,400+ Indian parents</span>
              <span>· Available in English &amp; Hindi</span>
              <span>· Mobile-first</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="rg-hero-visual" style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #28507a 100%)', borderRadius: 28, padding: 36, color: 'var(--cream)', position: 'relative', overflow: 'hidden', minHeight: 360 }}>
              <div style={{ position: 'absolute', top: -50, right: -50, width: 180, height: 180, borderRadius: '50%', background: 'rgba(212,118,59,0.4)' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--coral)', fontWeight: 700, marginBottom: 18 }}>Sample · Pressure index</div>
                {[['Peer comparison', 72, 'var(--saffron)'], ['Heard at home', 58, 'var(--coral)'], ['School comfort', 80, 'var(--sage-soft)'], ['Voice', 64, 'var(--coral-soft)']].map(([label, pct, c]) => (
                  <div key={label as string} style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 6, color: 'rgba(245,243,239,0.85)' }}>
                      <span>{label}</span><span className="mono">{pct}%</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 999, background: 'rgba(245,243,239,0.14)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: c as string, borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip — cities */}
      <div style={{ borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)', background: 'var(--paper)' }}>
        <div className="container" style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 28, flexWrap: 'wrap', fontSize: 13.5, fontWeight: 600, color: 'var(--navy)', opacity: 0.7 }}>
          <span style={{ opacity: 0.6 }}>Trusted by parents in</span>
          {['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune'].map(c => <span key={c}>{c}</span>)}
        </div>
      </div>

      {/* Why India */}
      <section id="why" style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '96px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--saffron)', marginBottom: 12 }}>Why India needs this</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.12, margin: '0 0 16px' }}>
              Indian children carry <span className="serif" style={{ color: 'var(--coral)' }}>specific pressures.</span>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(245,243,239,0.7)', lineHeight: 1.6, margin: 0 }}>
              Generic emotional tools weren&apos;t built for rank lists, parental comparison, hierarchical classrooms, and the IIT-or-nothing conversation. These assessments were.
            </p>
          </div>
          <div className="rg-3up">
            {WHY.map(w => (
              <div key={w.title} style={{ background: 'rgba(245,243,239,0.05)', border: '1px solid rgba(245,243,239,0.1)', borderRadius: 18, padding: 26 }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{w.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--cream)', margin: '0 0 8px' }}>{w.title}</h3>
                <p style={{ fontSize: 13.5, color: 'rgba(245,243,239,0.62)', lineHeight: 1.6, margin: '0 0 18px' }}>{w.body}</p>
                <div className="serif" style={{ fontSize: 34, color: 'var(--coral)', lineHeight: 1 }}>{w.stat}</div>
                <div style={{ fontSize: 12, color: 'rgba(245,243,239,0.5)', marginTop: 6 }}>{w.statLabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessments grid */}
      <section id="assessments" className="container" style={{ padding: '96px 32px' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--saffron)', marginBottom: 12 }}>🇮🇳 India Assessment Suite · 5 topics · 84 questions</div>
          <h2 className="section-title">Five questions every Indian parent should ask.</h2>
          <p style={{ fontSize: 16, color: 'var(--navy-ink)', opacity: 0.65, marginTop: 14, lineHeight: 1.6 }}>
            Each assessment is taken once a year, builds a longitudinal picture, and is calibrated for Indian educational and family contexts.
          </p>
        </div>
        <div className="rg-3up">
          {INDIA_ASSESSMENTS.map(a => (
            <Link key={a.slug} href={`/india/assessments/${a.slug}`} className="ix-card" style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 26, display: 'block', transition: 'transform .2s, box-shadow .2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: a.tile, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 26 }}>{a.letter}</div>
                <span className="badge badge-premium">🔒 Premium</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: '0 0 6px' }}>{a.name}</h3>
              <p style={{ fontSize: 13.5, color: 'var(--navy-ink)', opacity: 0.6, margin: '0 0 14px' }}>{a.short}</p>
              <p className="serif" style={{ fontSize: 15, color: 'var(--teal)', lineHeight: 1.4, margin: '0 0 16px' }}>&ldquo;{a.parentQ}&rdquo;</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: 'var(--navy-ink)', opacity: 0.6 }}>
                <span>{a.questionCount} q · ~{a.minutes} min</span>
                <span style={{ color: 'var(--saffron)', fontWeight: 700 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section style={{ background: 'var(--paper)', padding: '96px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--saffron)', marginBottom: 12 }}>Trusted by 2,400+ Indian parents</div>
            <h2 className="section-title">A vocabulary for feelings.</h2>
          </div>
          <div className="rg-3up">
            {REVIEWS.map(r => (
              <div key={r.name} className="card" style={{ padding: 28 }}>
                <p className="serif" style={{ fontSize: 22, color: 'var(--navy)', lineHeight: 1.4, margin: '0 0 24px' }}>&ldquo;{r.quote}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--saffron-soft), var(--coral-soft))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--navy)', fontSize: 15 }}>{r.initials}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)' }}>{r.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--navy-ink)', opacity: 0.55 }}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container" style={{ padding: '96px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--saffron)', marginBottom: 12 }}>Pricing</div>
          <h2 className="section-title">Simple plans. Cancel anytime.</h2>
          <p style={{ fontSize: 15, color: 'var(--navy-ink)', opacity: 0.6, marginTop: 12 }}>Pay securely by UPI. All prices in ₹, inclusive of taxes.</p>
        </div>
        <div className="rg-pricing">
          {PLANS.map(p => (
            <div key={p.name} style={{
              borderRadius: 22, padding: 32, position: 'relative',
              background: p.featured ? 'var(--navy)' : 'var(--paper)',
              color: p.featured ? 'var(--cream)' : 'var(--navy)',
              border: p.featured ? 'none' : '1px solid var(--line)',
            }}>
              {p.badge && <span style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--saffron)', color: 'white', fontSize: 11.5, fontWeight: 700, padding: '4px 14px', borderRadius: 999, letterSpacing: '0.04em' }}>{p.badge}</span>}
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, opacity: p.featured ? 0.9 : 1 }}>{p.name}</div>
              <div style={{ marginBottom: 18 }}>
                <span className="serif" style={{ fontSize: 44, color: p.featured ? 'var(--coral)' : 'var(--navy)' }}>{p.price}</span>
                <span style={{ fontSize: 14, opacity: 0.6, marginLeft: 6 }}>{p.cadence}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', gap: 10, fontSize: 14, opacity: p.featured ? 0.85 : 0.75 }}>
                    <span style={{ color: p.featured ? 'var(--coral)' : 'var(--teal)' }}>✓</span>{f}
                  </div>
                ))}
              </div>
              <Link href="/india/checkout" className={p.featured ? 'btn btn-saffron btn-lg' : 'btn btn-ghost btn-lg'} style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container" style={{ padding: '0 32px 96px' }}>
        <div style={{ background: 'var(--saffron)', borderRadius: 28, padding: 'clamp(40px, 6vw, 72px)', textAlign: 'center', color: 'var(--cream)' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Understand the pressures your child can&apos;t name yet.
          </h2>
          <p style={{ fontSize: 17, opacity: 0.9, maxWidth: 540, margin: '0 auto 28px', lineHeight: 1.55 }}>
            Five minutes a year. A clearer picture for the conversations that matter most.
          </p>
          <Link href="/india/login?mode=signup" className="btn btn-lg" style={{ background: 'var(--navy)', color: 'var(--cream)' }}>Create your free account →</Link>
        </div>
      </section>

      <IndiaFooter />

      <style>{`
        .ix-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -24px rgba(30,58,95,0.28); }
      `}</style>
    </div>
  )
}
