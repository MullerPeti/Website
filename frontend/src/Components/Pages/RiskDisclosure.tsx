import React from 'react'
import PageBottom from '../Layout/PageBottom'

export default function RiskDisclosurePage() {
  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>Risk Disclosure</h1>

        <section className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            Trading in financial markets involves a significant level of risk and may not be suitable for all investors. Trading leveraged products such as foreign exchange (Forex), CFDs, futures, options, or other derivatives can result in losses exceeding the initial investment. You should only trade with capital that you can afford to lose.
          </p>

          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            The content published on Traders Meta is provided for educational and informational purposes only and does not constitute investment advice, trading advice, or a recommendation to buy or sell any financial instrument. Any trading decisions you make are solely your responsibility and should be based on your own research, risk tolerance, and financial situation.
          </p>

          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            Past performance, backtest results, simulations, or hypothetical examples are not indicative of future results. Backtesting and simulated performance are subject to numerous limitations, including but not limited to assumptions regarding spreads, slippage, liquidity, execution speed, and market conditions. Real-world trading conditions may differ materially from simulated results.
          </p>

          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            Automated trading systems, expert advisors, and trading algorithms involve additional risks. These include software errors, incorrect assumptions, platform limitations, connectivity issues, broker execution differences, and unexpected market behavior. No automated system can guarantee profitability or protection against losses.
          </p>

          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            References to third-party platforms, brokers, tools, or services are provided for informational purposes only. Traders Meta does not control and is not responsible for the performance, pricing, execution, availability, or terms of any third-party service.
          </p>

          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
            You acknowledge that trading financial instruments carries inherent risk and that you are solely responsible for evaluating whether trading or using any tools, code, or information provided on this website is appropriate for you. If you are unsure, you should seek independent professional advice before engaging in trading activities.
          </p>
        </section>
      </main>
    </div>
  )
}
