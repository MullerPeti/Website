import React, { useState } from 'react'
import PageBottom from '../Layout/PageBottom'

const items = [
  {
    q: 'What is Error Code 4752 in MetaTrader?',
    a: `You need to allow algo trading.`,
  },
  {
    q: 'What is Traders Meta?',
    a: `Traders Meta is a platform focused on transparent trading research, tools, and source code. It publishes systematic tests, experiments, and educational content related to trading strategies, with an emphasis on realistic assumptions and clear limitations rather than marketing claims.`,
  },
  {
    q: 'Is Traders Meta a signal service?',
    a: `No. Traders Meta does not provide trading signals, trade recommendations, or copy trading services. All content is provided for educational and research purposes only.`,
  },
  {
    q: 'Who is behind Traders Meta?',
    a: `Traders Meta is operated by an independent trader and developer who started trading in 2018 and began coding trading tools and strategies in 2020, with a focus on systematic analysis and transparent testing.`,
  },
  {
    q: 'Are the tools and code free to use?',
    a: `Many tools, scripts, and examples published on Traders Meta are available for free. Some content may link to external platforms or marketplaces where separate terms apply. Availability and licensing details are always stated where relevant.`,
  },
  {
    q: 'Do the strategies published here work?',
    a: `Some strategies may work under specific assumptions and conditions, while many do not. Traders Meta intentionally publishes both successful and unsuccessful results to provide an honest and realistic view of strategy performance.`,
  },
  {
    q: 'Why do you publish failing strategies?',
    a: `Publishing failing strategies is an important part of the research process. Understanding why a strategy does not work often provides more insight than showcasing rare success cases and helps avoid repeating common mistakes.`,
  },
  {
    q: 'Are backtest results representative of live trading?',
    a: `Backtest and simulated results have inherent limitations and may not reflect real-world trading conditions. Factors such as slippage, spreads, execution quality, liquidity, and changing market behavior can significantly affect live performance.`,
  },
  {
    q: 'Is this investment or trading advice?',
    a: `No. The content on Traders Meta is not investment or trading advice and should not be interpreted as such. All trading decisions remain the sole responsibility of the user.`,
  },
  {
    q: 'Do you use affiliate links?',
    a: `Yes. Some links on the website are affiliate links, which means Traders Meta may receive compensation if a user chooses to use them. These relationships do not influence the research, analysis, or conclusions presented.`,
  },
  {
    q: 'What are donations used for?',
    a: `Donations are used to support the ongoing development, hosting, and maintenance of Traders Meta. Donations are entirely voluntary and do not grant access to products, services, or guarantees.`,
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>FAQ</h1>

        <section className="space-y-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="p-6 rounded-lg shadow-lg transition-colors duration-200 cursor-pointer w-full"
              style={{ backgroundColor: 'var(--color-background-secondary)' }}
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>{it.q}</h3>
                </div>
                <div className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>{open === i ? '−' : '+'}</div>
              </div>

              {open === i && (
                <div className="mt-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {it.a}
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  )
}
