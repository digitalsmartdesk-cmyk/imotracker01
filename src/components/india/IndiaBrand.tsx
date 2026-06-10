'use client'
import Link from 'next/link'
import { BrandMark } from '../Brand'

export function IndiaBrandLogo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/india" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <BrandMark bg={dark ? '#F5F3EF' : 'var(--navy)'} />
      <div>
        <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: dark ? '#F5F3EF' : 'var(--navy)' }}>
          Im<span style={{ color: dark ? '#E8A598' : 'var(--teal)' }}>o</span>Tracker
        </div>
        <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: dark ? 'rgba(245,243,239,0.6)' : 'var(--teal)', fontWeight: 600 }}>
          India · Ages 7–15
        </div>
      </div>
    </Link>
  )
}

export function IndiaBadge({ dark = false }: { dark?: boolean }) {
  if (dark) {
    return (
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 999, padding: '4px 12px',
        fontSize: 11.5, fontWeight: 600, letterSpacing: '0.06em', color: 'rgba(245,243,239,0.8)',
      }}>🇮🇳 India</span>
    )
  }
  return <span className="india-badge-pill">🇮🇳 India</span>
}
