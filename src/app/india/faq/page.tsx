'use client'
import { useState } from 'react'
import IndiaNav from '@/components/india/IndiaNav'
import IndiaFooter from '@/components/india/IndiaFooter'

const FAQS = [
  { q: 'Is my child\'s data safe? What about DPDP?', a: 'Yes. ImoTracker India is built to comply with the Digital Personal Data Protection (DPDP) Act. Your child\'s responses are stored securely on servers located in India, encrypted in transit and at rest, and never sold or shared with schools, advertisers, or third parties. You can request deletion of all data at any time.' },
  { q: 'Are these assessments a medical or clinical diagnosis?', a: 'No. ImoTracker assessments are reflective tools to help you understand and talk with your child — not clinical instruments. We deliberately avoid alarming, clinical language. If you\'re ever concerned about your child\'s wellbeing, please speak to a school counsellor or a child psychologist.' },
  { q: 'My child has board exams coming up. Should we wait?', a: 'Yes — we recommend not taking an assessment right before or during exam week. Children answer most honestly when they\'re calm and unhurried. A relaxed weekend, well away from exam stress, is ideal.' },
  { q: 'How is this different from Western emotional tools?', a: 'These assessments were written specifically for Indian school and family contexts — rank lists, "Sharma ji ka beta" comparison, tuition load, hierarchical classrooms, and board-exam pressure. Generic tools weren\'t built for these realities.' },
  { q: 'What payment methods do you accept?', a: 'We accept all UPI apps — GPay, PhonePe, Paytm, and BHIM — via a simple scan-and-pay QR. Card payments are also supported on request. All prices are in ₹ and inclusive of taxes.' },
  { q: 'My child is feeling very low. Where can we get help right now?', a: 'If your child is in distress, India\'s free national mental-health helpline Tele-MANAS is available 24×7 at 14416 (or 1-800-891-4416). For emergencies, please contact a doctor or your nearest hospital immediately.' },
  { q: 'Can both parents and the child see the report?', a: 'The full report — with scores and insights — is for parents. Children see a separate, encouraging "child summary" with no numbers or scores, focused on their strengths and gentle things to grow.' },
  { q: 'How often should we take the assessments?', a: 'Each assessment is designed to be taken about once a year. Over time, this builds a longitudinal picture of how your child\'s world is changing as they grow.' },
]

export default function IndiaFAQ() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div style={{ background: 'var(--cream)' }}>
      <IndiaNav />
      <section className="container" style={{ padding: '72px 32px 96px', maxWidth: 820 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--saffron)', marginBottom: 12 }}>Help &amp; FAQ</div>
        <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'var(--navy)', margin: '0 0 12px', letterSpacing: '-0.025em' }}>Questions, <span className="serif" style={{ fontWeight: 400 }}>answered.</span></h1>
        <p style={{ fontSize: 16, color: 'var(--navy-ink)', opacity: 0.65, marginBottom: 40 }}>Everything Indian parents ask before getting started.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)' }}>{f.q}</span>
                  <span style={{ fontSize: 22, color: 'var(--saffron)', flexShrink: 0, transition: 'transform .2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div style={{ maxHeight: isOpen ? 400 : 0, overflow: 'hidden', transition: 'max-height .3s ease' }}>
                  <p style={{ fontSize: 14.5, color: 'var(--navy-ink)', opacity: 0.75, lineHeight: 1.65, margin: 0, padding: '0 24px 22px' }}>{f.a}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 32, background: 'rgba(44,95,93,0.06)', border: '1px solid rgba(44,95,93,0.15)', borderRadius: 16, padding: 24, textAlign: 'center' }}>
          <p style={{ fontSize: 14.5, color: 'var(--navy)', margin: 0 }}>
            💛 Need someone to talk to right now? India&apos;s free helpline <strong>Tele-MANAS</strong> is available 24×7 at <strong className="mono">14416</strong>.
          </p>
        </div>
      </section>
      <IndiaFooter />
    </div>
  )
}
