import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ThemeProvider } from './Context/ThemeContext'
import RiskDisclosure from './Components/Layout/RiskDisclosure'
import PageBottom from './Components/Layout/PageBottom'
import ThemeSwitcher from './Components/Layout/ThemeSwitcher'
import Imprint from './Components/Pages/Imprint'
import PrivacyPolicy from './Components/Pages/PrivacyPolicy'
import AffiliateDisclosure from './Components/Pages/AffiliateDisclosure'
import About from './Components/Pages/About'
import Donations from './Components/Pages/Donations'
import Code from './Components/Pages/Code'
import Products from './Components/Pages/Products'
import Product from './Components/Pages/Product'
import Brokers from './Components/Pages/Brokers'
import BrokerDetail from './Components/Pages/BrokerDetail'
import RiskDisclosurePage from './Components/Pages/RiskDisclosure'
import Faq from './Components/Pages/Faq'

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center py-20 px-4" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>
            Trading strategies, tools, and code — tested openly
          </h1>
          <p className="text-xl md:text-2xl mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Traders Meta publishes free trading tools, source code, and research focused on systematic testing rather than marketing claims.
          </p>
          <div className="flex flex-col gap-4 justify-center max-w-2xl mx-auto">
            <Link
              to="/products"
              className="w-full block px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg text-center"
              style={{ backgroundColor: 'var(--color-primary)', color: 'white', textDecoration: 'none' }}
            >
              Browse Products
            </Link>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/code"
                className="flex-1 px-8 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity text-center"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white', textDecoration: 'none' }}
              >
                Explore Code
              </Link>
              <a
                href="https://www.youtube.com/@TheMETATrader-ys5ng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-8 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity border-2 text-center"
                style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Use Today */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--color-primary)' }}>
            What You Can Use Today
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: MetaTrader Tools */}
            <div
              className="p-8 rounded-lg shadow-lg transition-colors duration-200 hover:shadow-xl hover:scale-105 transform"
              style={{ backgroundColor: 'var(--color-background-secondary)', cursor: 'pointer' }}
            >
              <div className="text-4xl mb-4">🛠</div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
                MetaTrader Tools & Code
              </h3>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>Expert Advisors and utilities</li>
                <li>Strategy implementations</li>
                <li>Backtesting and research code</li>
                <li>Reproductions of popular strategies tested objectively</li>
              </ul>
            </div>

            {/* Card 2: Research & Experiments */}
            <div
              className="p-8 rounded-lg shadow-lg transition-colors duration-200 hover:shadow-xl hover:scale-105 transform"
              style={{ backgroundColor: 'var(--color-background-secondary)', cursor: 'pointer' }}
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
                Research & Experiments
              </h3>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>Why common trading ideas fail</li>
                <li>Assumptions behind strategies</li>
                <li>Limits, risks, and trade-offs</li>
                <li>Honest evaluation of results</li>
              </ul>
            </div>

            {/* Card 3: Educational Content */}
            <div
              className="p-8 rounded-lg shadow-lg transition-colors duration-200 hover:shadow-xl hover:scale-105 transform"
              style={{ backgroundColor: 'var(--color-background-secondary)', cursor: 'pointer' }}
            >
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
                Educational Content
              </h3>
              <ul className="space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
                <li>YouTube videos explaining tests and results</li>
                <li>Platform-specific implementation details</li>
                <li>Step-by-step strategy walkthroughs</li>
                <li>No signals, no promises</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4" style={{ backgroundColor: 'var(--color-background-secondary)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8" style={{ color: 'var(--color-primary)' }}>
            Our Philosophy
          </h2>
          
          <div className="space-y-6" style={{ color: 'var(--color-text-secondary)' }}>
            <p className="text-lg">
              <strong style={{ color: 'var(--color-primary)' }}>Transparency is the core principle</strong> behind Traders Meta.
            </p>
            
            <p className="text-lg">
              Both successful and unsuccessful strategies are published, with assumptions and limitations clearly stated.
            </p>
            
            <p className="text-lg">
              We believe that understanding why something fails is often more valuable than showcasing rare success stories.
            </p>

            <div className="text-center mt-8">
              <Link
                to="/about"
                className="inline-block px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white', textDecoration: 'none' }}
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default function App() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [brokers, setBrokers] = useState<Array<any>>([])

  useEffect(() => {
    let mounted = true
    // Load static brokers list for the nav dropdown
    fetch('/mql5/brokers.json')
      .then(res => res.json())
      .then(data => {
        if (!mounted) return
        if (Array.isArray(data)) setBrokers(data)
        else if (data && Array.isArray((data as any).brokers)) setBrokers((data as any).brokers)
      })
      .catch(() => {})
    return () => { mounted = false }
  }, [])

  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
          {/* Header with Theme Switcher and Navigation */}
          <header className="border-b p-4 transition-colors duration-200 relative" style={{ backgroundColor: 'var(--color-background-secondary)', borderColor: 'var(--color-border)' }}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="text-2xl font-bold transition-opacity" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>
                Traders Meta
              </div>
              <nav className="flex items-center gap-6 relative h-fit">
                <Link
                  to="/"
                  className="font-medium hover:opacity-70 transition-opacity whitespace-nowrap"
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  Home
                </Link>

                {/* Code Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown('code')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to="/codes"
                    className="font-medium hover:opacity-70 transition-opacity flex items-center gap-1 px-3 py-2"
                    style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                  >
                    Code
                    <span className={`text-xs transition-transform ${openDropdown === 'code' ? 'rotate-180' : ''}`}>▼</span>
                  </Link>
                  
                  {openDropdown === 'code' && (
                    <div
                      className="absolute top-full left-0 mt-0 rounded-lg shadow-lg z-50 min-w-max"
                      style={{ backgroundColor: 'var(--color-background-secondary)', borderColor: 'var(--color-border)' }}
                    >
                      <Link
                        to="/codes/MT5"
                        className="block px-6 py-3 hover:opacity-80 transition-opacity first:rounded-t-lg text-base font-medium"
                        style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                      >
                        MQL5 Codes
                      </Link>
                      <Link
                        to="/codes/MT4"
                        className="block px-6 py-3 hover:opacity-80 transition-opacity last:rounded-b-lg border-t text-base font-medium"
                        style={{ color: 'var(--color-text-primary)', textDecoration: 'none', borderColor: 'var(--color-border)' }}
                      >
                        MQL4 Codes
                      </Link>
                    </div>
                  )}
                </div>

                {/* Products Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown('products')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to="/products"
                    className="font-medium hover:opacity-70 transition-opacity flex items-center gap-1 px-3 py-2"
                    style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                  >
                    Products
                    <span className={`text-xs transition-transform ${openDropdown === 'products' ? 'rotate-180' : ''}`}>▼</span>
                  </Link>

                  {openDropdown === 'products' && (
                    <div
                      className="absolute top-full left-0 mt-0 rounded-lg shadow-lg z-50 min-w-max"
                      style={{ backgroundColor: 'var(--color-background-secondary)', borderColor: 'var(--color-border)' }}
                    >
                      <Link
                        to="/products/MT5"
                        className="block px-6 py-3 hover:opacity-80 transition-opacity first:rounded-t-lg text-base font-medium"
                        style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                      >
                        Products MT5
                      </Link>
                      <Link
                        to="/products/MT4"
                        className="block px-6 py-3 hover:opacity-80 transition-opacity last:rounded-b-lg border-t text-base font-medium"
                        style={{ color: 'var(--color-text-primary)', textDecoration: 'none', borderColor: 'var(--color-border)' }}
                      >
                        Products MT4
                      </Link>
                    </div>
                  )}
                </div>

                {/* Brokers Dropdown */}
                <div
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown('brokers')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to="/brokers"
                    className="font-medium hover:opacity-70 transition-opacity flex items-center gap-1 px-3 py-2"
                    style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                  >
                    Brokers
                    <span className={`text-xs transition-transform ${openDropdown === 'brokers' ? 'rotate-180' : ''}`}>▼</span>
                  </Link>

                  {openDropdown === 'brokers' && (
                    <div
                      className="absolute top-full left-0 mt-0 rounded-lg shadow-lg z-50 min-w-max"
                      style={{ backgroundColor: 'var(--color-background-secondary)', borderColor: 'var(--color-border)' }}
                    >
                      <Link
                        to="/brokers"
                        className="block px-6 py-3 hover:opacity-80 transition-opacity first:rounded-t-lg text-base font-medium"
                        style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                      >
                        Brokers Overview
                      </Link>
                      {brokers.map((b: any) => (
                        <Link
                          key={b.slug}
                          to={`/brokers/${b.slug}`}
                          className="block px-6 py-3 hover:opacity-80 transition-opacity border-t text-base font-medium"
                          style={{ color: 'var(--color-text-primary)', textDecoration: 'none', borderColor: 'var(--color-border)' }}
                        >
                          {b.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                <Link
                  to="/about"
                  className="font-medium hover:opacity-70 transition-opacity whitespace-nowrap"
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  About
                </Link>

                <Link
                  to="/donations"
                  className="font-medium hover:opacity-70 transition-opacity whitespace-nowrap"
                  style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}
                >
                  Buy me a ☕
                </Link>
                <ThemeSwitcher />
              </nav>
            </div>
          </header>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<><Home /><PageBottom/></>} />
            <Route path="/codes" element={<><Code /><PageBottom/></>} />
            <Route path="/codes/MT5" element={<><Code /><PageBottom/></>} />
            <Route path="/codes/MT4" element={<><Code /><PageBottom/></>} />
            <Route path="/products" element={<><Products /><PageBottom/></>} />
            <Route path="/products/MT5" element={<><Products /><PageBottom/></>} />
            <Route path="/products/MT4" element={<><Products /><PageBottom/></>} />
            <Route path="/product/:slug" element={<><Product /><PageBottom/></>} />
            <Route path="/brokers" element={<><Brokers /><PageBottom/></>} />
            <Route path="/brokers/:slug" element={<><BrokerDetail /><PageBottom/></>} />
            <Route path="/imprint" element={<><Imprint /><PageBottom/></>} />
            <Route path="/risk-disclosure" element={<><RiskDisclosurePage /><PageBottom/></>} />
            <Route path="/faq" element={<><Faq /><PageBottom/></>} />
            <Route path="/privacy-policy" element={<><PrivacyPolicy /><PageBottom/></>} />
            <Route path="/affiliate-disclosure" element={<><AffiliateDisclosure /><PageBottom/></>} />
            <Route path="/donations" element={<><Donations /><PageBottom/></>} />
            <Route path="/about" element={<><About /><PageBottom/></>} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  )
}

