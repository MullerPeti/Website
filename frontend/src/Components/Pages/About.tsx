import React from 'react'

export default function About() {
  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--color-primary)' }}>About Traders Meta</h1>

        <div style={{ color: 'var(--color-text-secondary)' }} className="space-y-6">
          {/* Opening */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <p className="text-lg">
              Traders Meta was created to approach trading with transparency, rigor, and intellectual honesty — grounded in systematic testing rather than marketing claims            </p>
          </section>

          {/* Journey */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>The Journey</h2>
            <p className="mb-4">
              I started trading in <strong>2018</strong>, initially like most retail traders — by testing strategies, indicators, and ideas that were widely shared online. Over time, it became clear that many popular "guru" systems and widely promoted approaches fail when tested properly, under realistic assumptions and over meaningful time horizons.
            </p>
            <p className="mb-4">
              This realization fundamentally changed how I approach trading.
            </p>
            <p>
              In <strong>2020</strong>, I began coding trading strategies and analytical tools to remove subjectivity and replace opinion with data. My main product was the ManHedger EA, which is a semi automatic trading tool available on MetaTrader. Since then, my work has focused on systematic trading, quantitative analysis, and verifiable backtesting, primarily on MetaTrader.
            </p>
          </section>

          {/* Transparency First */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Transparency First</h2>
            <p className="mb-4">
              Transparency is the core principle behind Traders Meta.
            </p>
            <p className="mb-4">
              On this website, you will find:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Strategies that work under specific assumptions</li>
              <li>Strategies that do not work, and clear explanations why</li>
              <li>Code that reproduces popular trading ideas and tests them objectively</li>
            </ul>
            <p>
              Publishing failed or weak strategies is intentional. Understanding why something fails is often more valuable than showcasing rare success stories.
            </p>
          </section>

          {/* What We Are */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>What Traders Meta Is — and Is Not</h2>
            
            <h3 className="text-xl font-semibold mt-4 mb-3" style={{ color: 'var(--color-primary)' }}>Traders Meta is:</h3>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>A platform for research-driven trading analysis</li>
              <li>A place to share code, experiments, and systematic tests</li>
              <li>A record of what survives — and what does not survive — honest evaluation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-primary)' }}>Traders Meta is not:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>A signal service</li>
              <li>A promise of profits</li>
              <li>A marketing platform for untested or over-optimized strategies</li>
            </ul>
          </section>

          {/* Affiliate Partnerships */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Affiliate Partnerships</h2>
            <p>
              Some tools, brokers, or services referenced on this site are linked through affiliate partnerships. These relationships do not influence the analysis, conclusions, or results presented. See our <a href="/affiliate-disclosure" style={{ color: 'var(--color-primary)' }} className="hover:underline">Affiliate Disclosure</a> for full details.
            </p>
          </section>

          {/* Long-Term Vision */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Long-Term Vision</h2>
            <p className="mb-4">
              The long-term goal of Traders Meta is to build robust, platform-independent trading solutions, while maintaining a public record of experimentation, including failures.
            </p>
            <p>
              Markets are complex, adaptive systems. Any serious trading approach must acknowledge uncertainty, limitations, and the fact that most ideas do not work as advertised.
            </p>
          </section>

          {/* Core Rule */}
          <section className="p-6 rounded-lg transition-colors duration-200" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
            <h2 className="text-2xl font-semibold mb-4">The Rule</h2>
            <p className="text-lg">
              Everything published on Traders Meta follows one rule:
            </p>
            <p className="text-lg mt-4 font-semibold">
              Claims must be testable, assumptions must be stated, and results must be shown — whether they are positive or negative.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
