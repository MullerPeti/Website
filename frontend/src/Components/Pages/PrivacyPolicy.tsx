import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--color-primary)' }}>Privacy Policy</h1>

        <div style={{ color: 'var(--color-text-secondary)' }} className="space-y-6 text-sm">
          {/* Introduction */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <p>
              <strong>Effective Date:</strong> January 23, 2026
            </p>
            <p className="mt-4">
              This Privacy Policy explains how Traders Meta ("the Website") handles personal data in compliance with the General Data Protection Regulation (GDPR) and Hungarian privacy laws. We are committed to transparency and your data privacy.
            </p>
          </section>

          {/* Data Controller Information */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>1. Data Controller Information</h2>
            <p>
              <strong>Data Controller:</strong> Müller Péter <br />
              <strong>Legal Form:</strong> Hungarian egyéni vállalkozó (sole proprietor)<br />
              <strong>Country:</strong> Hungary<br />
              <strong>Contact Email:</strong> <a href="mailto:support@tradersmeta.com" style={{ color: 'var(--color-primary)' }} className="hover:underline">support@tradersmeta.com</a>
            </p>
          </section>

          {/* Scope of Policy */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>2. Scope of This Policy</h2>
            <p>
              This website provides informational content about trading, strategies, products, and broker partnerships. We do not conduct direct sales on this website. No user registration, accounts, or login systems exist. This policy applies solely to data collected through this website.
            </p>
          </section>

          {/* Personal Data Processed */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>3. Personal Data Processed</h2>
            <p className="mb-3">
              We automatically collect limited technical data when you visit our website:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Visit timestamps and duration</li>
              <li>Referrer information</li>
            </ul>
            <p className="mt-3">
              This data is collected passively through standard web server logs and is not used for profiling or targeted marketing.
            </p>
          </section>

          {/* Hosting and Server Logs */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>4. Hosting and Server Logs</h2>
            <p>
              Our hosting provider automatically maintains server logs containing technical access data. This data is used solely for security, system administration, and troubleshooting purposes. We do not control or access these logs directly for analytics or tracking purposes.
            </p>
          </section>

          {/* Cookies and Technologies */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>5. Cookies and Similar Technologies</h2>
            <p>
              Cookies are small data files stored on your device. We may use cookies for technical website functionality or affiliate tracking purposes. Essential cookies are necessary for the website to function; non-essential cookies require consent. You can disable cookies in your browser settings.
            </p>
          </section>

          {/* Affiliate Links and Third-Party Services */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>6. Affiliate Links and Third-Party Services</h2>
            <p className="mb-3">
              This website contains affiliate links to MQL5 products and broker partners. When you click affiliate links, third parties may collect personal data according to their own privacy policies. We do not control, endorse, or assume responsibility for third-party data processing. Third-party services embedded on our site (e.g., TradingView, YouTube) operate under their own privacy terms.
            </p>
            <p>
              <strong>We recommend reviewing the privacy policies of all third-party services before providing any personal information.</strong>
            </p>
          </section>

          {/* No Direct Data Collection */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>7. What We Do NOT Collect</h2>
            <p className="mb-3">
              This website does NOT:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Maintain user accounts or require registration</li>
              <li>Operate newsletters or mailing lists</li>
              <li>Use contact forms for data collection</li>
              <li>Process direct payments or financial transactions</li>
              <li>Collect data beyond what is technically necessary</li>
            </ul>
          </section>

          {/* Legal Basis */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>8. Legal Basis for Processing</h2>
            <p>
              We process personal data under two legal bases: (1) <strong>Legitimate Interest</strong> — website operation, security, and fraud prevention; (2) <strong>Consent</strong> — where applicable for non-essential cookies or affiliate tracking.
            </p>
          </section>

          {/* Data Retention */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>9. Data Retention</h2>
            <p>
              Personal data is retained only as long as necessary for the purposes stated in this policy. Server logs are typically retained by our hosting provider for 30–90 days. Cookies are retained according to their individual settings. Third parties maintain their own retention policies.
            </p>
          </section>

          {/* Data Sharing */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>10. Data Sharing and International Transfers</h2>
            <p>
              Personal data may be processed outside the EU by our hosting provider or third-party services. Where required by law, appropriate safeguards (such as Standard Contractual Clauses) are in place. You acknowledge these transfers by using this website.
            </p>
          </section>

          {/* User Rights */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>11. Your GDPR Rights</h2>
            <p className="mb-3">
              Under GDPR, you have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request erasure ("right to be forgotten")</li>
              <li>Restrict processing</li>
              <li>Data portability</li>
              <li>Object to processing</li>
              <li>Lodge a complaint with your national supervisory authority</li>
            </ul>
          </section>

          {/* Contact for Requests */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>12. Contact for Privacy Requests</h2>
            <p>
              To exercise any of your rights or submit privacy inquiries, please contact us at: <a href="mailto:support@tradersmeta.com" style={{ color: 'var(--color-primary)' }} className="hover:underline">support@tradersmeta.com</a>
            </p>
            <p className="mt-3">
              We will respond to valid requests within 30 days.
            </p>
          </section>

          {/* Policy Updates */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>13. Policy Updates</h2>
            <p>
              We may update this Privacy Policy to reflect legal changes, business practices, or other factors. Material changes will be published on this page with an updated "Last updated" date. Continued use of the website constitutes acceptance of updates.
            </p>
          </section>

          {/* Footer */}
          <div className="text-center pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-xs">
              Last updated: January 23, 2026
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
