import React, { useEffect, useState } from 'react'

export default function Donations() {
  const [donations, setDonations] = useState<Record<string, any> | null>(null)
  const [beneficiaries, setBeneficiaries] = useState<string[]>([])

  useEffect(() => {
    let mounted = true
    fetch('/mql5/donations.json')
      .then(res => res.json())
      .then(data => {
        if (!mounted) return
        // donations.json is an object mapping currency -> info
        setDonations(data)
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!donations) return
    const names = new Set<string>()
    Object.values(donations).forEach((info: any) => {
      if (info && info.beneficiaryName) names.add(info.beneficiaryName)
    })
    setBeneficiaries(Array.from(names))
  }, [donations])

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>Buy me a coffee</h1>

      <p className="mb-2" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        Donations are entirely optional and voluntary. They help cover hosting, data, and ongoing maintenance for this site.
      </p>

      {beneficiaries.length > 0 && (
        <p className="mb-2" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          Donations are paid to: {beneficiaries.join(', ')}.
        </p>
      )}

      <p className="mb-2" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        Donations are non-refundable and do not grant access to paid services, private signals, personalised advice, or special support.
      </p>

      <p className="mb-4" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        We do not use donations to track visitors. Apart from the payment transfer itself, we do not collect or store personal payment details on this site.
      </p>

      <p className="mb-6" style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        Purpose: donations support the technical costs of running the site (hosting, domain, data access) and small ongoing development efforts. They are intended to keep resources available and the content independent.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
        {donations ? (
          Object.entries(donations).map(([currency, info]) => (
            <div key={currency} className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-background-secondary)', border: '1px solid var(--color-border)' }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-primary)' }}>{currency}</h3>
              <ul className="text-sm space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                {Object.entries(info as Record<string, any>).map(([k, v]) => {
                  const label = k === 'iban' ? 'IBAN' : k === 'accountNumber' ? 'Account number' : k === 'beneficiaryName' ? 'Beneficiary' : k === 'swift' ? 'SWIFT' : k === 'routingNumber' ? 'Routing number' : k
                  return (
                    <li key={k}><strong style={{ color: 'var(--color-text-primary)' }}>{label}</strong>: {v}</li>
                  )
                })}
              </ul>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-3">
            <p style={{ color: 'var(--color-text-secondary)' }}>Loading donation methods…</p>
          </div>
        )}
      </div>
    </div>
  )
}
