'use client'
import IndiaSidebar from './IndiaSidebar'

export default function IndiaShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <IndiaSidebar />
      <main className="app-main">{children}</main>
    </div>
  )
}
