import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function COPPAPage() {
  return (
    <>
      <Nav />
      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '72px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="section-label" style={{ color: 'var(--coral)' }}>Legal</div>
          <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 16px' }}>COPPA Notice</h1>
          <p style={{ fontSize: 15, color: 'rgba(245,243,239,0.6)' }}>Children's Online Privacy Protection Act — Compliance Statement</p>
          <p style={{ fontSize: 15, color: 'rgba(245,243,239,0.6)', marginTop: 4 }}>Last updated: June 1, 2026</p>
        </div>
      </section>

      <section style={{ padding: '64px 0 96px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {[
            {
              title: 'Parent-first design',
              body: 'ImoTracker is designed so that parents are always in control. A parent or legal guardian must create and own the account. Children cannot create their own accounts, cannot access the full parent report, and cannot make purchases. Every piece of data about a child flows through and is controlled by the parent account.',
            },
            {
              title: 'Verifiable parental consent',
              body: 'Before any child profile is created, the parent account holder must:\n• Verify their email address\n• Confirm they are 18 or older and the parent or legal guardian of the child\n• Accept our Terms of Service and Privacy Policy\n\nThis process satisfies COPPA\'s verifiable parental consent requirement.',
            },
            {
              title: 'What we collect from children (and what we don\'t)',
              body: '',
              table: [
                { collected: 'Child\'s first name (for report personalisation)', notCollected: 'Surname or full legal name' },
                { collected: 'Date of birth / age range (for age-appropriate content)', notCollected: 'School name or location' },
                { collected: 'Assessment answers (for generating the wellness report)', notCollected: 'Photos or biometric data' },
                { collected: 'Session metadata (for resume functionality)', notCollected: 'Social media information' },
                { collected: '', notCollected: 'Device location' },
                { collected: '', notCollected: 'Contact information for the child' },
              ],
            },
            {
              title: 'Parent rights and controls',
              body: 'As the parent account holder, you have the right to:\n• Review all data collected about your child by logging into your account\n• Download all data in a machine-readable format (Account Settings → Data & Deletion → Export)\n• Correct any inaccurate information about your child\n• Delete your child\'s profile and all associated data at any time\n• Opt out of any data uses beyond what is strictly necessary for the service\n\nTo exercise any of these rights, use Account Settings or email privacy@imotracker.com.',
            },
            {
              title: 'No advertising, no selling',
              body: 'We do not display advertising to children. We do not sell, share, or disclose children\'s personal information to third parties for commercial purposes. Assessment data is never used for targeted advertising or profiling.',
            },
            {
              title: 'Security',
              body: 'Children\'s data is encrypted in transit and at rest. Access controls ensure that only the parent account holder and essential ImoTracker technical staff (for support and maintenance purposes only) can access child profile data. We conduct regular security audits.',
            },
            {
              title: 'Data review and deletion',
              body: 'You can request a full export or deletion of your child\'s data at any time. Deletion requests are processed within 30 days. Once deleted, data cannot be recovered. To make a request, go to Account Settings → Data & Deletion, or email privacy@imotracker.com with the subject line "Child data deletion request."',
            },
            {
              title: 'Contact for COPPA inquiries',
              body: 'If you have questions about our COPPA compliance or your child\'s data:\n\nEmail: privacy@imotracker.com\nSubject line: "COPPA inquiry"\nResponse time: within 5 business days',
            },
          ].map(s => (
            <div key={s.title} style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>{s.title}</h2>
              {s.body && s.body.split('\n').map((line, i) => (
                line === '' ? <br key={i} /> :
                line.startsWith('•') ? <p key={i} style={{ paddingLeft: 16, margin: '4px 0', fontSize: 14.5, color: 'var(--navy-ink)', opacity: 0.8, lineHeight: 1.65 }}>{line}</p> :
                <p key={i} style={{ fontSize: 14.5, color: 'var(--navy-ink)', opacity: 0.8, lineHeight: 1.65, margin: '6px 0' }}>{line}</p>
              ))}
              {s.table && (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16, fontSize: 14 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '10px 14px', background: 'rgba(44,95,93,0.08)', color: 'var(--teal)', fontWeight: 700, textAlign: 'left', borderRadius: '8px 0 0 0' }}>What we collect</th>
                      <th style={{ padding: '10px 14px', background: 'rgba(192,57,43,0.07)', color: '#c0392b', fontWeight: 700, textAlign: 'left', borderRadius: '0 8px 0 0' }}>What we never collect</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.table.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '8px 14px', color: 'var(--navy-ink)', opacity: 0.8 }}>{row.collected || '—'}</td>
                        <td style={{ padding: '8px 14px', color: 'var(--navy-ink)', opacity: 0.8 }}>{row.notCollected}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div style={{ borderBottom: '1px solid var(--line)', marginTop: 32 }} />
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <p style={{ fontSize: 14, color: 'var(--navy-ink)', opacity: 0.6, marginBottom: 16 }}>
              For more detail on how we handle all user data, see our{' '}
              <Link href="/privacy" style={{ color: 'var(--teal)', textDecoration: 'underline' }}>Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
