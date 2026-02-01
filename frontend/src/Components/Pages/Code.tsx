import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CodeEmbed from '../Elements/CodeEmbed'

interface Code {
  title: string
 url: string
  description: string
  video?: string
  platform: string
  category: 'Expert' | 'Indicator' | 'Library'
}

export default function Code() {
  const [codes, setCodes] = useState<Code[]>([])
  const [filteredCodes, setFilteredCodes] = useState<Code[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(['Expert', 'Indicator', 'Library'])
  )

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        setLoading(true)
        
        // Determine platform from URL path
        let platform = 'ALL'
        if (location.pathname.includes('/MT5')) {
          platform = 'MT5'
        } else if (location.pathname.includes('/MT4')) {
          platform = 'MT4'
        }
        
        // Fetch static codes JSON from the frontend `mql5` folder
        const response = await fetch(`/mql5/codes.json`)

        if (!response.ok) {
          throw new Error(`Failed to fetch codes: ${response.statusText}`)
        }

        const data = await response.json()
        const publications = data && data.publications ? data.publications : []
        const filtered = platform === 'ALL'
          ? publications
          : publications.filter((p: Code) => (p.platform && p.platform.toUpperCase() === platform) || (p.title && p.title.includes(platform)))
        setCodes(filtered)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch codes')
        setCodes([])
      } finally {
        setLoading(false)
      }
    }

    fetchCodes()
  }, [location.pathname])

  useEffect(() => {
    // Filter codes based on selected categories
    const filtered = codes.filter(code => selectedCategories.has(code.category))
    setFilteredCodes(filtered)
  }, [codes, selectedCategories])

  const toggleCategory = (category: string) => {
    const newSelected = new Set(selectedCategories)
    if (newSelected.has(category)) {
      newSelected.delete(category)
    } else {
      newSelected.add(category)
    }
    setSelectedCategories(newSelected)
  }

  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: 'var(--color-primary)' }}>Code Publications</h1>

        {/* Category Filter Buttons */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {['Expert', 'Indicator', 'Library'].map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className="px-6 py-2 rounded-lg font-semibold transition-all duration-200"
              style={{
                backgroundColor: selectedCategories.has(category) 
                  ? 'var(--color-primary)' 
                  : 'var(--color-background-secondary)',
                color: selectedCategories.has(category)
                  ? 'var(--color-background)'
                  : 'var(--color-text-primary)',
                opacity: selectedCategories.has(category) ? 1 : 0.6,
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>
            <p className="text-lg">Loading codes...</p>
          </div>
        )}

        {error && (
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-background-secondary)', color: '#ef4444' }}>
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && filteredCodes.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>
            <p className="text-lg">No codes found</p>
          </div>
        )}

        {!loading && !error && filteredCodes.length > 0 && (
          <div className="space-y-4">
            {filteredCodes.map((code, index) => (
              <CodeEmbed
                key={index}
                title={code.title}
                description={code.description}
                url={code.url}
                video={code.video}
                platform={code.platform}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
