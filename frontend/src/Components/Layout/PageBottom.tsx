import React from 'react'
import { Link } from 'react-router-dom'
import RiskDisclosure from './RiskDisclosure'

export default function PageBottom() {
  return (
    <footer className="border-t mt-20 transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-primary)' }}>Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/imprint"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  Imprint
                </Link>
              </li>
              <li>
                <Link
                  to="/risk-disclosure"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  Risk Disclosure
                </Link>
              </li>
              <li>
                <Link
                  to="/affiliate-disclosure"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--color-primary)' }}>Contact & Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@tradersmeta.com"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  Email: support@tradersmeta.com
                </a>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-4 pt-4 text-center" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
          <p className="text-sm">© {new Date().getFullYear()} Traders Meta. All rights reserved.</p>
        </div>
      </div>
      <RiskDisclosure></RiskDisclosure>
    </footer>
  )
}
