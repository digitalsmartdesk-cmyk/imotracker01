'use client'
import Link from 'next/link'
import { IndiaBrandLogo } from './IndiaBrand'

export default function IndiaFooter() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '64px 0 32px' }}>
      <div className="container">
        <div className="rg-4up" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr', marginBottom: 48 }}>
          <div>
            <IndiaBrandLogo dark />
            <p style={{ marginTop: 16, fontSize: 14, color: 'rgba(245,243,239,0.6)', lineHeight: 1.6, maxWidth: 260 }}>
              Emotional wellness assessments built for Indian school and family contexts — ages 7–15.
            </p>
            <p style={{ marginTop: 12, fontSize: 13, color: 'rgba(245,243,239,0.4)' }}>
              india.imotracker.com
            </p>
          </div>
          {[
            { title: 'Assessments', links: [
              { href: '/india/assessments', label: 'All assessments' },
              { href: '/india/assessments/a', label: 'Peer Pressure' },
              { href: '/india/assessments/b', label: 'Parental Pressure' },
              { href: '/india/checkout', label: 'Pricing' },
            ]},
            { title: 'Resources', links: [
              { href: '/india/tips', label: 'Tips for Parents' },
              { href: '/india/faq', label: 'FAQ' },
            ]},
            { title: 'Support', links: [
              { href: '/india/faq', label: 'Help Centre' },
              { href: '/india/tips', label: 'Tele-MANAS · 14416' },
            ]},
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,243,239,0.4)', marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(({ href, label }) => (
                  <Link key={label} href={href} style={{ fontSize: 14, color: 'rgba(245,243,239,0.65)', transition: 'color .15s' }}>{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(245,243,239,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(245,243,239,0.4)' }}>© 2026 ImoTracker India. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 700, background: 'rgba(143,165,152,0.2)', color: 'var(--sage-soft)', padding: '4px 12px', borderRadius: 999, letterSpacing: '0.04em' }}>✓ DPDP Compliant</span>
            <span style={{ fontSize: 13, color: 'rgba(245,243,239,0.4)' }}>Data stored in India · SSL Secured</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
