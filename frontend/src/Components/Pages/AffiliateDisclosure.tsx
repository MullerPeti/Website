import React from 'react'

export default function AffiliateDisclosure() {
  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--color-primary)' }}>Affiliate Disclosure</h1>

        <div style={{ color: 'var(--color-text-secondary)' }} className="space-y-6 text-sm">
          {/* Affiliate Relationships */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>1. Affiliate Relationships</h2>
            <p>
              This website contains affiliate links to brokers, trading platforms, educational services, and other products. When you click these links and open an account or make a purchase, we may receive a commission or referral fee at no additional cost to you. This is how we help support the operation and development of this website.
            </p>
            <p className="mt-3">
              We are transparent about these relationships and will always disclose when a link is an affiliate link.
            </p>
          </section>

          {/* No Influence on Content */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>2. No Influence on Content</h2>
            <p>
              Affiliate compensation does not influence our opinions, recommendations, or content. Tools, brokers, and services mentioned on this website are selected based on their merit and relevance to our audience, not on affiliate commissions. We maintain editorial independence in all content.
            </p>
          </section>

          {/* Not Investment Advice */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>3. Not Investment Advice</h2>
            <p>
              Content on this website is for informational and educational purposes only. Nothing published here constitutes investment, trading, financial, or legal advice. We do not provide personal recommendations or endorsements for any specific strategy, broker, or service. Always conduct your own research and consult with qualified professionals before making financial decisions.
            </p>
          </section>

          {/* No Performance Guarantee */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>4. No Performance Guarantee</h2>
            <p>
              We provide no guarantees of profitability or success. Past performance does not indicate or guarantee future results. Trading and investing carry substantial risk, including the potential loss of capital. Results vary based on individual skill, strategy, market conditions, and other factors beyond our control.
            </p>
          </section>

          {/* Third-Party Responsibility */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>5. Third-Party Responsibility</h2>
            <p>
              Affiliate partners and third-party services operate independently. We are not responsible for their products, services, pricing, execution quality, data handling, or customer support. Each third party maintains its own terms of service and privacy policy. We strongly recommend reviewing these documents before engaging with any partner.
            </p>
          </section>

          {/* User Choice and Freedom */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>6. User Choice and Freedom</h2>
            <p>
              You are entirely free to use any broker, platform, or service independently. You are under no obligation to use our affiliate links. We provide them as a convenience; their use is entirely voluntary. Your choice to support us through affiliate links is appreciated but not required.
            </p>
          </section>

          {/* Questions */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Questions?</h2>
            <p>
              If you have questions about our affiliate relationships or this disclosure, please contact us at <a href="mailto:support@tradersmeta.com" style={{ color: 'var(--color-primary)' }} className="hover:underline">support@tradersmeta.com</a>.
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
