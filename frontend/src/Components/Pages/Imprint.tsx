import React from 'react';
import RiskDisclosure from '../Layout/RiskDisclosure';

export default function Imprint() {
  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--color-primary)' }}>Imprint</h1>

        {/* Company Information */}
        <section className="mb-12 p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Company Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Company Name</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}> Müller Péter Egyéni Vállalkozás </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Business Address</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Baranya u. 24/2<br />
                7634 Pécs<br />
                Hungary
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Registration Details</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Registration Number: 61436646<br />
                VAT ID: 91571434-1-22<br />
                Business Register: Müller Péter EV
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Legal Representative</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Name: Müller Péter<br />
                Position: Owner
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12 p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Contact Information</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Email</h3>
              <a href="mailto:support@tradersmeta.com" style={{ color: 'var(--color-primary)' }} className="hover:underline">
                support@tradersmeta.com
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Website</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>https://www.tradersmeta.com</p>
            </div>
          </div>
        </section>

        {/* Support Information */}
        <section className="mb-12 p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Support & Customer Service</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Technical Support</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Email: <a href="mailto:support@tradersmeta.com" style={{ color: 'var(--color-primary)' }} className="hover:underline">support@tradersmeta.com</a><br />
                Response Time: [24-48 hours]
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>Support Channels</h3>
              <ul style={{ color: 'var(--color-text-secondary)' }} className="list-disc pl-5">
                <li>Email Support: support@tradersmeta.com</li>
                <li>Contact me via MQL5 <a href="https://www.mql5.com/en/users/mullerp04" style={{ color: 'var(--color-primary)' }} className="hover:underline">https://www.mql5.com/en/users/mullerp04</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Responsible Content */}
        <section className="mb-12 p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Responsible for Content</h2>
          
          <div className="space-y-4">
            <p style={{ color: 'var(--color-text-secondary)' }}>
              <strong>Name:</strong> Müller Péter<br />
              <strong>Title:</strong> Owner<br />
              <strong>Email:</strong> <a href="mailto:support@tradersmeta.com" style={{ color: 'var(--color-primary)' }} className="hover:underline">support@tradersmeta.com</a>
            </p>
          </div>
        </section>

        {/* Legal Notice */}
        <section className="mb-12 p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Legal Notice & Disclaimer</h2>
          
          <div style={{ color: 'var(--color-text-secondary)' }} className="space-y-4 text-sm">
            <p>
              The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are liable for our own content on these pages according to general law (Section 7(1) of the TMG). However, according to Sections 8-10 of the TMG, we as service providers are not obligated to monitor transmitted or stored third-party information or investigate circumstances that indicate unlawful activity.
            </p>
            
            <p>
              Obligations to remove or block the use of information according to general law remain unaffected. Liability in this regard is only possible from the moment we become aware of a specific infringement.
            </p>

            <p>
              This website is not intended to provide financial, investment, or trading advice. Past performance is not indicative of future results. Trading and investing involve substantial risk of loss. All content on this website is for educational and informational purposes only.
            </p>
          </div>
        </section>

        {/* Liability for Links */}
        <section className="mb-12 p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Liability for Links</h2>
          
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
            Our website contains links to external websites over which we have no control. Therefore, we cannot accept any liability for the content of these external pages. The content of linked pages is the sole responsibility of their operators. We regularly review the linked pages for legality at the time of linking. If any illegality is detected, we will remove the link immediately.
          </p>
        </section>

        {/* Intellectual Property Rights */}
        <section className="mb-12 p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Intellectual Property Rights</h2>
          
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
            The contents and works on these pages are protected by copyright law.
            The reproduction, processing, distribution, or any form of utilization beyond 
            the limits of copyright requires written permission from the author o
            r creator. Downloads and copies of these pages are permitted for private,
             non-commercial use only. If the content was not created by us, the copyrights of third parties are respected. If you still discover a copyright infringement, please inform us accordingly. We will immediately remove any content that violates copyright upon notification.
          </p>
        </section>

        {/* Data Protection */}
        <section className="mb-12 p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Data Protection & Privacy</h2>
          
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm mb-4">
            For detailed information about our handling of personal data, please see our <a href="/privacy" style={{ color: 'var(--color-primary)' }} className="hover:underline">Privacy Policy</a>.
          </p>
        </section>

        {/* Last Updated */}
        <div className="text-center pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <p style={{ color: 'var(--color-text-secondary)' }} className="text-sm">
            Last updated: 2026-01-29
          </p>
        </div>
      </main>
    </div>
  );
}
