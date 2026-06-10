'use client'
import { useState } from 'react'
import IndiaNav from '@/components/india/IndiaNav'
import IndiaFooter from '@/components/india/IndiaFooter'

type AgeTab = '7-9' | '10-12' | '13-15'
const TABS: { id: AgeTab; label: string; classes: string }[] = [
  { id: '7-9', label: '7–9 years', classes: 'Class 2–4' },
  { id: '10-12', label: '10–12 years', classes: 'Class 5–7' },
  { id: '13-15', label: '13–15 years', classes: 'Class 8–10' },
]

const TIPS: Record<AgeTab, { icon: string; title: string; body: string }[]> = {
  '7-9': [
    { icon: '🎒', title: 'Ask about the day, not the marks', body: 'Replace "What did you score?" with "What made you laugh today?" Children this age thrive on connection, not evaluation.' },
    { icon: '🚫', title: 'Drop the comparison early', body: 'Comparison to cousins or classmates lands hard at this age. Praise effort and specifics instead of ranks.' },
    { icon: '🎨', title: 'Protect play and interests', body: 'Unstructured play and hobbies build emotional resilience. Guard at least an hour a day from tuition and screens.' },
    { icon: '😴', title: 'Watch sleep and worries', body: 'Bedtime worries are common. A calm, fixed routine helps young children feel safe and regulated.' },
  ],
  '10-12': [
    { icon: '📱', title: 'Start the screen conversation', body: 'This is when social-media comparison begins. Talk about how posts show only the happy bits — and agree on phone-free time together.' },
    { icon: '🗣️', title: 'Make disagreement safe', body: 'In many Indian homes, children learn not to disagree with adults. Let your child voice a different opinion without consequence sometimes.' },
    { icon: '🏆', title: 'Separate worth from rank', body: 'Rank lists peak in impact now. Remind your child — and yourself — that their value isn\'t a number on a notice board.' },
    { icon: '🤝', title: 'Know their friend group', body: 'Friendships become central. A relaxed chat about who they feel safe with tells you a lot.' },
  ],
  '13-15': [
    { icon: '🎓', title: 'Ease the board-exam pressure', body: 'The IIT-or-nothing conversation does real harm. Make space for "What do you actually enjoy?" alongside academic plans.' },
    { icon: '💬', title: 'Listen more than you advise', body: 'Teens disclose less when they feel judged. Reflect back what you hear before jumping to solutions.' },
    { icon: '📚', title: 'Honour their interests', body: 'The gap between what they love and what\'s rewarded widens now. Take their creative or non-STEM interests seriously.' },
    { icon: '🫂', title: 'Know when to get help', body: 'Persistent low mood, sleep or appetite changes deserve attention. Tele-MANAS (14416) and school counsellors are good first steps.' },
  ],
}

export default function IndiaTips() {
  const [tab, setTab] = useState<AgeTab>('10-12')
  return (
    <div style={{ background: 'var(--cream)' }}>
      <IndiaNav />
      <section className="container" style={{ padding: '72px 32px 56px', maxWidth: 980 }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--saffron)', marginBottom: 12 }}>Tips for Parents</div>
        <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: 'var(--navy)', margin: '0 0 12px', letterSpacing: '-0.025em' }}>Supporting your child, <span className="serif" style={{ fontWeight: 400 }}>by age.</span></h1>
        <p style={{ fontSize: 16, color: 'var(--navy-ink)', opacity: 0.65, marginBottom: 32, maxWidth: 600 }}>Practical, India-aware guidance for the pressures children face at each stage — from rank lists to board exams.</p>

        {/* Age tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '12px 22px', borderRadius: 999, border: `2px solid ${tab === t.id ? 'var(--saffron)' : 'var(--line)'}`,
              background: tab === t.id ? 'var(--saffron)' : 'var(--paper)', color: tab === t.id ? 'white' : 'var(--navy)',
              cursor: 'pointer', fontWeight: 600, fontSize: 14.5, transition: 'all .15s',
            }}>
              {t.label} <span style={{ opacity: 0.7, fontWeight: 500 }}>· {t.classes}</span>
            </button>
          ))}
        </div>

        <div className="rg-2col">
          {TIPS[tab].map(tip => (
            <div key={tip.title} className="card" style={{ padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(212,118,59,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{tip.icon}</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', margin: '0 0 6px' }}>{tip.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.72, lineHeight: 1.6, margin: 0 }}>{tip.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Helpline strip */}
      <section className="container" style={{ padding: '0 32px 96px', maxWidth: 980 }}>
        <div style={{ background: 'var(--navy)', borderRadius: 20, padding: 32, color: 'var(--cream)', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ fontSize: 32 }}>🫂</div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px' }}>Free mental-health support in India</h3>
            <p style={{ fontSize: 14, color: 'rgba(245,243,239,0.7)', margin: 0, lineHeight: 1.6 }}>Tele-MANAS, the Government of India&apos;s 24×7 helpline, offers free, confidential support in multiple Indian languages.</p>
          </div>
          <div className="serif" style={{ fontSize: 36, color: 'var(--coral)' }}>14416</div>
        </div>
      </section>

      <IndiaFooter />
    </div>
  )
}
