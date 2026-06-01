import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <>
      <Nav />
      <section style={{ background: 'var(--navy)', color: 'var(--cream)', padding: '72px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <div className="section-label" style={{ color: 'var(--coral)' }}>Legal</div>
          <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', margin: '12px 0 16px' }}>Terms of Service</h1>
          <p style={{ fontSize: 15, color: 'rgba(245,243,239,0.6)' }}>Last updated: June 1, 2026</p>
        </div>
      </section>

      <section style={{ padding: '64px 0 96px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ background: 'rgba(44,95,93,0.08)', border: '1px solid rgba(44,95,93,0.2)', borderRadius: 14, padding: 28, marginBottom: 48 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--teal)', marginBottom: 8 }}>Short version</h3>
            <p style={{ fontSize: 14.5, color: 'var(--navy-ink)', lineHeight: 1.65 }}>
              Use ImoTracker for its intended purpose — supporting your child's emotional wellness. Don't misuse it. Pay for what you use. We're a wellness tool, not a medical provider. You can cancel and delete your data at any time.
            </p>
          </div>

          {[
            { title: '1. Accepting these terms', body: 'By creating an account or using ImoTracker, you agree to these Terms of Service. If you are creating an account on behalf of a child, you represent that you are their parent or legal guardian and have authority to accept these terms on their behalf.' },
            { title: '2. What ImoTracker is (and isn\'t)', body: 'ImoTracker is an emotional wellness and literacy tool designed for children ages 7–15. It is not a clinical assessment, not a diagnostic tool, and not a substitute for professional psychological evaluation or therapy. Nothing in our reports or content constitutes medical or psychological advice. If you have concerns about your child\'s mental health, please consult a qualified professional.' },
            { title: '3. Account requirements', body: 'You must be at least 18 years old and the parent or legal guardian of any child profile you create. You are responsible for keeping your account credentials secure. You must provide accurate information and keep it current. One account per family — you may create multiple child profiles under one parent account.' },
            { title: '4. Credits and pricing', body: 'ImoTracker uses a credit-based model. The free Emotional Awareness assessment never requires credits. Premium assessments each cost 1 credit.\n\n• Single Test: ₹99 for 1 credit\n• Four Tests Pack: ₹299 for 4 credits\n\nCredits never expire. All purchases are final subject to our refund policy. We reserve the right to change pricing with 30 days\' notice to existing account holders.' },
            { title: '5. Refunds', body: 'We offer a 30-day money-back guarantee. If you are not satisfied for any reason within 30 days of a purchase, contact us at support@imotracker.com for a full refund. Refunds are not available after 30 days or for credits that have already been used.' },
            { title: '6. Acceptable use', body: 'You agree not to: misuse the platform to generate false or misleading reports; share account access with people outside your immediate family; attempt to reverse-engineer, copy, or redistribute our assessment content; use the platform in any way that could harm children or violate their privacy; violate any applicable laws or regulations.' },
            { title: '7. Intellectual property', body: 'All content on ImoTracker — including assessment questions, report text, illustrations, and the ImoTracker name and logo — is our proprietary intellectual property. You may download your personal reports for family use but may not distribute, publish, or reproduce ImoTracker content without written permission.' },
            { title: '8. Limitation of liability', body: 'To the maximum extent permitted by law, ImoTracker\'s liability for any claim arising from use of the platform is limited to the amount you paid in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages. This limitation does not apply to our obligations under applicable data protection law.' },
            { title: '9. Changes to these terms', body: 'We may update these terms from time to time. We will notify you of material changes via email at least 14 days before they take effect. Continued use of ImoTracker after changes take effect constitutes acceptance of the revised terms.' },
            { title: '10. Contact', body: 'Questions about these terms: legal@imotracker.com\nGeneral support: support@imotracker.com' },
          ].map(s => (
            <div key={s.title} style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>{s.title}</h2>
              {s.body.split('\n').map((line, i) => (
                line === '' ? <br key={i} /> :
                line.startsWith('•') ? <p key={i} style={{ paddingLeft: 16, margin: '4px 0', fontSize: 14.5, color: 'var(--navy-ink)', opacity: 0.8, lineHeight: 1.65 }}>{line}</p> :
                <p key={i} style={{ fontSize: 14.5, color: 'var(--navy-ink)', opacity: 0.8, lineHeight: 1.65, margin: '6px 0' }}>{line}</p>
              ))}
              <div style={{ borderBottom: '1px solid var(--line)', marginTop: 28 }} />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}
