import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../../Context/ThemeContext'
import { marked } from 'marked'

marked.setOptions({ mangle: false, headerIds: false })

type Broker = {
  slug: string
  name: string
  url?: string
  trustpilot_link?: string
  short_description?: string
  long_description?: string
  markdown?: string
  supported_platforms?: string[]
  regulation?: string[]
  eu_allowed?: boolean
  us_allowed?: boolean
  trading_cost?: string
  trustpilot_review?: number
}

function computeReliability(b: Broker) {
  const tier1 = new Set(['FCA (UK)', 'ASIC (Australia)', 'CFTC/NFA (USA)', 'MAS (Singapore)'])
  let score = 0
  const regs = b.regulation || []
  // boost for presence of a tier-1 regulator
  if (regs.some(r => [...tier1].some(t => r.includes(t.split(' ')[0])) || tier1.has(r))) {
    score += 2
  }
  // boost for EU or US availability
  if (b.eu_allowed) score += 1
  if (b.us_allowed) score += 1

  // penalty if only offshore regulators
  const offshore = ['Belize', 'Seychelles', 'Bahamas', 'Cayman']
  if (regs.length > 0 && regs.every(r => offshore.some(o => r.includes(o)))) {
    score -= 1
  }

  if (score >= 3) return 'Very High'
  if (score === 2) return 'High'
  if (score === 1) return 'Medium'
  return 'Low'
}

function computeCostLabel(cost?: string) {
  if (!cost) return 'Unknown'
  const c = cost.toLowerCase()
  if (c === 'low') return 'Low'
  if (c === 'medium') return 'Medium'
  if (c === 'high') return 'High'
  return cost
}

function computePlatformProfile(platforms?: string[]) {
  const p = platforms || []
  const hasMT = p.some(x => x.toLowerCase().includes('mt4') || x.toLowerCase().includes('mt5'))
  const hasTV = p.some(x => x.toLowerCase().includes('tradingview'))
  if (hasMT && hasTV) return 'EA-friendly + TradingView'
  if (hasMT) return 'EA-friendly'
  if (hasTV) return 'TradingView'
  // if none of the above, assume proprietary (xStation, web-only, etc.)
  if (p.length > 0) return 'Proprietary'
  return 'Unknown'
}

function computeTrustSignal(review?: number) {
  if (review === undefined || review === null) return 'Unclear'
  if (review >= 4.3) return 'Strong'
  if (review >= 3.8) return 'Mixed'
  return 'Weak'
}

export default function Brokers() {
  const { isDark } = useTheme()
  const [brokers, setBrokers] = useState<Broker[]>([])
  const [filterEU, setFilterEU] = useState(false)
  const [filterUS, setFilterUS] = useState(false)
  const [filterMT5, setFilterMT5] = useState(false)
  const [filterTV, setFilterTV] = useState(false)
  const [filterCTrader, setFilterCTrader] = useState(false)
  const [filterCost, setFilterCost] = useState<'any' | 'low' | 'medium' | 'high'>('any')
  const [sortBy, setSortBy] = useState<'none' | 'cost' | 'reliability' | 'trustpilot' | 'platforms'>('none')

  useEffect(() => {
    // Load static brokers list from frontend/mql5/brokers.json
    fetch('/mql5/brokers.json')
      .then(r => r.json())
      .then(d => {
        // brokers.json is an array
        if (Array.isArray(d)) setBrokers(d as Broker[])
        else if (d && Array.isArray((d as any).brokers)) setBrokers((d as any).brokers)
      })
      .catch(() => {})
  }, [])

  const processed = useMemo(() => {
    // apply toggles + dropdown filters

      const matches = brokers.filter(b => {
      if (filterEU && !b.eu_allowed) return false
      if (filterUS && !b.us_allowed) return false
      if (filterMT5 && !(Array.isArray(b.supported_platforms) && b.supported_platforms.some(p => p.toLowerCase().includes('mt5')))) return false
      if (filterTV && !(Array.isArray(b.supported_platforms) && b.supported_platforms.some(p => p.toLowerCase().includes('tradingview')))) return false
      if (filterCTrader && !(Array.isArray(b.supported_platforms) && b.supported_platforms.some(p => p.toLowerCase().includes('ctrader')))) return false
      if (filterCost !== 'any') {
        const cost = (b.trading_cost || '').toLowerCase()
        if (filterCost === 'low' && cost !== 'low') return false
        if (filterCost === 'medium' && cost !== 'medium') return false
        if (filterCost === 'high' && cost !== 'high') return false
      }
      
      return true
    })

    // enrich with computed metrics for sorting
    const enriched = matches.map(b => {
      const reliabilityLabel = computeReliability(b)
      const reliabilityScore = reliabilityLabel === 'Very High' ? 4 : reliabilityLabel === 'High' ? 3 : reliabilityLabel === 'Medium' ? 2 : 1
      const costScore = (b.trading_cost || '').toLowerCase() === 'low' ? 1 : (b.trading_cost || '').toLowerCase() === 'medium' ? 2 : (b.trading_cost || '').toLowerCase() === 'high' ? 3 : 0
      const trustScore = typeof b.trustpilot_review === 'number' ? b.trustpilot_review : 0
      const platformsCount = Array.isArray(b.supported_platforms) ? b.supported_platforms.length : 0
      return { b, reliabilityScore, costScore, trustScore, platformsCount }
    })

    if (sortBy !== 'none') {
      enriched.sort((a, c) => {
        let v = 0
        if (sortBy === 'cost') v = a.costScore - c.costScore
        if (sortBy === 'reliability') v = a.reliabilityScore - c.reliabilityScore
        if (sortBy === 'trustpilot') v = a.trustScore - c.trustScore
        if (sortBy === 'platforms') v = a.platformsCount - c.platformsCount
        // default: descending order (best first)
        return -v
      })
    }

    return enriched.map(x => x.b)
  }, [brokers, filterEU, filterUS, filterMT5, filterTV, filterCTrader, filterCost, sortBy])

  return (
    <div>
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>Brokers comparison</h1>
        
        <div className="mt-6 mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>How to read this table</h2>
          <p className="mt-2">This comparison is intended as a high-level overview of commonly used retail brokers, focusing on regulation, platform support, and typical trading costs.</p>
          <p className="mt-1">Ratings are approximate and based on publicly available information and practical experience.</p>
          <p className="mt-1">Availability, conditions, and legal protections depend on your jurisdiction and the specific broker entity.</p>
        </div>

        {/* Controls */}
        <div className="mt-4 mb-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterEU(v => !v)}
                className="px-3 py-2 rounded font-medium"
                style={filterEU ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background)' }}
              >
                EU
              </button>
              <button
                onClick={() => setFilterUS(v => !v)}
                className="px-3 py-2 rounded font-medium"
                style={filterUS ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background)' }}
              >
                US
              </button>
              <button
                onClick={() => setFilterMT5(v => !v)}
                className="px-3 py-2 rounded font-medium"
                style={filterMT5 ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background)' }}
              >
                MT5
              </button>
              <button
                onClick={() => setFilterTV(v => !v)}
                className="px-3 py-2 rounded font-medium"
                style={filterTV ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background)' }}
              >
                TradingView
              </button>
              <button
                onClick={() => setFilterCTrader(v => !v)}
                className="px-3 py-2 rounded font-medium"
                style={filterCTrader ? { backgroundColor: 'var(--color-primary)', color: 'white' } : { border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-background)' }}
              >
                cTrader
              </button>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filterCost}
                onChange={e => setFilterCost(e.target.value as any)}
                className="px-2 py-2 rounded"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              >
                <option value="any">Cost: Any</option>
                <option value="low">Cost: Low</option>
                <option value="medium">Cost: Medium</option>
                <option value="high">Cost: High</option>
              </select>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="px-2 py-2 rounded"
                style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              >
                <option value="none">Sort: None</option>
                <option value="cost">Sort: Cost</option>
                <option value="reliability">Sort: Reliability</option>
                <option value="trustpilot">Sort: Trustpilot</option>
                <option value="platforms">Sort: Platforms count</option>
              </select>
            </div>
          </div>

          
        </div>

        <div className="mt-8 overflow-auto rounded-lg" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left" style={{ color: 'var(--color-text-primary)' }}>
                <th className="px-4 py-3">Broker</th>
                <th className="px-4 py-3">Reliability</th>
                <th className="px-4 py-3">Cost</th>
                <th className="px-4 py-3">Platforms</th>
                <th className="px-4 py-3">Trustpilot</th>
                <th className="px-4 py-3">Regions</th>
              </tr>
            </thead>
            <tbody>
              {processed.map(b => {
                const reliability = computeReliability(b)
                const cost = computeCostLabel(b.trading_cost)
                const platforms = computePlatformProfile(b.supported_platforms)
                const trust = computeTrustSignal(b.trustpilot_review)
                const regions = [] as string[]
                if (b.eu_allowed) regions.push('EU')
                if (b.us_allowed) regions.push('US')
                return (
                  <tr key={b.slug} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="px-4 py-4 align-top" style={{ width: '18%' }}>
                      {b.url ? (
                        <a href={b.url} target="_blank" rel="noopener noreferrer" className="font-semibold" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                          {b.name}
                        </a>
                      ) : (
                        <Link to={`/brokers/${b.slug}`} className="font-semibold" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                          {b.name}
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="font-medium">{reliability}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div>{cost}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="text-sm">{platforms}</div>
                      {Array.isArray(b.supported_platforms) && <div className="mt-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{b.supported_platforms.join(', ')}</div>}
                    </td>
                    <td className="px-4 py-4 align-top">
                      {typeof b.trustpilot_review === 'number' ? (
                        <a
                          href={b.trustpilot_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none' }}
                        >
                          <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{b.trustpilot_review} / 5</div>
                          <div className="mt-1 text-sm" aria-hidden>
                            {(() => {
                              const rating = Math.round(b.trustpilot_review || 0)
                              const stars: React.ReactNode[] = []
                              for (let i = 0; i < 5; i++) {
                                stars.push(
                                  <span key={i} style={{ color: isDark ? '#f6c84c' : 'var(--color-text-primary)' }}>
                                    {i < rating ? '★' : '☆'}
                                  </span>
                                )
                              }
                              return stars
                            })()}
                          </div>
                        </a>
                      ) : (
                        <div className="font-medium">{trust}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="flex gap-2">
                        {b.eu_allowed ? <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>EU</span> : null}
                        {b.us_allowed ? <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)' }}>US</span> : null}
                        {!b.eu_allowed && !b.us_allowed ? <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Offshore</span> : null}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
