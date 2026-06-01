import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ImoTracker — Mapping Your Inner World',
  description: 'Science-backed emotional wellness assessments for children ages 7–15.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
