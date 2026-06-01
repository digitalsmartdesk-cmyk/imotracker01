'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const FAQ_SECTIONS = [
  {
    title: 'Getting started',
    items: [
      { q: 'What is ImoTracker?', a: 'ImoTracker is an emotional wellness platform for children ages 7–15. It offers short, age-appropriate assessments that help children explore their feelings, while giving parents detailed insights into their child\'s emotional development. It\'s not a diagnostic tool — it\'s a way to build emotional literacy and understanding over time.' },
      { q: 'Is this a pass/fail test?', a: 'Absolutely not. There are no right or wrong answers — only honest ones. ImoTracker is designed to be a safe, judgment-free space for your child to express how they genuinely feel. The goal is insight, not evaluation.' },
      { q: 'Can my child take the assessment alone?', a: 'Yes, children can take the assessment independently. For younger children (ages 7–9) we recommend a parent is nearby in case they have questions. The language and question types are specifically designed to be clear and friendly for children in the 7–15 age range.' },
      { q: 'What age range is ImoTracker designed for?', a: 'ImoTracker is designed for children ages 7 to 15. The free check-in is tailored for ages 7–8, and the premium assessments cover the full 7–15 range with age-appropriate language and context.' },
    ],
  },
  {
    title: 'Assessments & reports',
    items: [
      { q: 'How long does each assessment take?', a: 'Most assessments take between 5 and 7 minutes. The free check-in (10 questions) takes about 3–4 minutes. Premium assessments have 15–20 questions and typically take 5–7 minutes. Your child can pause and resume at any time — progress is saved automatically.' },
      { q: 'What\'s included in the parent report?', a: 'Parent reports include: an overall wellness index, scores across 8 emotional domains, age-appropriate context for each score, key themes and insights, conversation starters drawn from your child\'s actual answers, suggested activities, and guidance on when professional support may be worth considering. Over time, reports also show longitudinal trends.' },
      { q: 'Can my child see their results?', a: 'Yes. There\'s a child-friendly version of the report that shows strengths and growth areas in warm, encouraging language. The full parent report is accessible only to the parent account. Children can\'t see domain scores or the clinical interpretation — just an age-appropriate "emotional snapshot."' },
      { q: 'Can I share the report with my child\'s therapist or teacher?', a: 'Yes. You can download a PDF version of the full report, and the sharing option lets you send it to a therapist or counsellor. This is entirely your choice — ImoTracker never shares data with third parties.' },
    ],
  },
  {
    title: 'Pricing & credits',
    items: [
      { q: 'How does the credit system work?', a: 'Each premium assessment costs 1 credit. You can buy a Single Test (1 credit, ₹99) or a Four Tests Pack (4 credits, ₹299). Credits are shared across all children in your account and never expire. The free Emotional Awareness check-in never costs credits.' },
      { q: 'What\'s the difference between Single Test and Four Tests Pack?', a: 'Both give you access to any premium assessment. A Single Test gives you 1 credit to use on any topic. The Four Tests Pack gives you 4 credits at a discounted rate (₹299 vs ₹396 separately), which you can use in any order, for any child, at any time.' },
      { q: 'Do credits expire?', a: 'No. Credits never expire. Buy a pack now and use the credits whenever you\'re ready — there\'s no time pressure and no subscription to manage.' },
      { q: 'What\'s your refund policy?', a: 'We offer a 30-day money-back guarantee. If you\'re not satisfied for any reason within 30 days of purchase, contact us at support@imotracker.com and we\'ll refund you in full, no questions asked.' },
    ],
  },
  {
    title: 'Privacy, safety & trust',
    items: [
      { q: 'How is my child\'s data protected?', a: 'We use industry-standard encryption for all data in transit and at rest. Your child\'s assessment answers are never visible to anyone outside your family account. We follow COPPA (Children\'s Online Privacy Protection Act) and GDPR requirements for handling children\'s data.' },
      { q: 'Do you sell data or share it with advertisers?', a: 'Never. We do not sell, share, or monetise your child\'s data in any way. Your family\'s information is used solely to generate reports and improve the platform. There are no ads on ImoTracker.' },
      { q: 'How do I delete my data?', a: 'You can request full data deletion at any time from Account Settings → Data & Deletion. This will permanently delete all account data, child profiles, and assessment results. We\'ll process the request within 30 days.' },
      { q: 'What\'s the scientific basis for the assessments?', a: 'ImoTracker\'s assessments are grounded in developmental psychology, drawing on established frameworks for emotional literacy, attachment theory, and resilience research. Our team includes child psychologists and developmental scientists. These are wellness tools, not clinical diagnostics.' },
    ],
  },
  {
    title: 'Tracking over time',
    items: [
      { q: 'Is one assessment valuable even without past data?', a: 'Yes. A single assessment gives you a clear, detailed picture of where your child is right now — their emotional strengths, areas for growth, and patterns in how they experience their world. The longitudinal picture becomes richer over time, but year one has real value on its own.' },
      { q: 'How often should we do an assessment?', a: 'We recommend one check-in per year per domain. This spacing lets you see meaningful developmental changes rather than day-to-day mood fluctuations. Some families do a check-in at the start of a new school year as an annual tradition.' },
      { q: 'When should I consider professional help for my child?', a: 'ImoTracker is a wellness tool, not a substitute for professional assessment. Consider speaking with your paediatrician, school counsellor, or a child psychologist if you notice: persistent sadness lasting more than two weeks, significant changes in sleep or appetite, withdrawal from friends or activities they previously enjoyed, talk of hopelessness, or any behaviour that genuinely worries you. Your instincts as a parent matter most.' },
    ],
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', fontSize: 15, fontWeight: 600, color: 'var(--navy)',
        }}
      >
        {q}
        <span style={{ fontSize: 20, color: 'var(--teal)', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .2s', flexShrink: 0, marginLeft: 16 }}>+</span>
      </button>
      {open && (
        <div style={{ paddingBottom: 20, fontSize: 15, color: 'var(--navy-ink)', opacity: 0.8, lineHeight: 1.65 }}>{a}</div>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <Nav />
      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '72px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="section-label" style={{ color: 'var(--coral)' }}>Help</div>
          <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 16px' }}>Frequently asked questions</h1>
          <p style={{ fontSize: 17, color: 'rgba(245,243,239,0.7)', lineHeight: 1.6 }}>Everything you need to know about ImoTracker. Can't find an answer? Email us at support@imotracker.com</p>
        </div>
      </section>

      <section style={{ padding: '64px 0 96px' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          {FAQ_SECTIONS.map(section => (
            <div key={section.title} style={{ marginBottom: 56 }}>
              <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 24 }}>{section.title}</h2>
              {section.items.map(item => <AccordionItem key={item.q} q={item.q} a={item.a} />)}
            </div>
          ))}

          <div className="card" style={{ background: 'var(--navy)', color: 'var(--cream)', textAlign: 'center', padding: 40, marginTop: 48 }}>
            <div style={{ fontSize: 24 }}>💬</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: '12px 0 8px' }}>Still have questions?</h3>
            <p style={{ fontSize: 15, color: 'rgba(245,243,239,0.7)', marginBottom: 24 }}>We reply to every email within 24–48 hours.</p>
            <a href="mailto:support@imotracker.com" className="btn btn-coral">Email support</a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
