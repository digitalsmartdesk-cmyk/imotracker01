'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandLogo } from './Brand'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      backdropFilter: 'blur(14px)',
      background: 'rgba(245, 243, 239, 0.82)',
      borderBottom: '1px solid var(--line-soft)',
    }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0' }}>
          <BrandLogo />
          <div style={{ display: 'flex', gap: 36 }}>
            {[
              { href: '/about', label: 'Our mission' },
              { href: '/tests', label: 'Assessments' },
              { href: '/tips-for-parents', label: 'Resources' },
              { href: '/faq', label: 'FAQ' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} style={{
                fontSize: 14.5, fontWeight: 500, color: 'var(--navy)',
                opacity: pathname === href ? 1 : 0.78,
                transition: 'opacity .2s',
              }}>{label}</Link>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {user ? (
              <Link href="/dashboard" className="btn btn-primary">Dashboard</Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost">Log in</Link>
                <Link href="/login?tab=signup" className="btn btn-primary">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
