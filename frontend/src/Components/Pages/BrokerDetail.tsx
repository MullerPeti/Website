import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

marked.setOptions({ mangle: false, headerIds: false })

interface Broker {
  name: string
  slug?: string
  short_description?: string
  markdown?: string
  long_description?: string
  website?: string
}

export default function BrokerDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [broker, setBroker] = useState<Broker | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBroker = async () => {
      if (!slug) return
      setLoading(true)
      setError(null)
      try {
        // Load brokers.json and find the broker by slug
        const res = await fetch('/mql5/brokers.json')
        if (!res.ok) throw new Error('Failed to load brokers list')
        const list = await res.json()
        const decoded = decodeURIComponent(slug)
        const found = (list || []).find((b: any) => b.slug === decoded || encodeURIComponent(b.slug) === slug || (b.name && encodeURIComponent(b.name) === slug))
        if (!found) throw new Error('Broker not found')
        // If a description_file is provided, try to load that markdown
        if (found.description_file) {
          try {
            const mdRes = await fetch(`/mql5/${found.description_file}`)
            if (mdRes.ok) {
              found.long_description = await mdRes.text()
            }
          } catch {
            // ignore markdown fetch errors
          }
        }
        setBroker(found)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setBroker(null)
      } finally {
        setLoading(false)
      }
    }

    fetchBroker()
  }, [slug])

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading broker...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p style={{ color: '#ef4444' }}>Error: {error}</p>
        <div className="mt-4">
          <Link to="/brokers" className="underline">Back to brokers</Link>
        </div>
      </div>
    )
  }

  if (!broker) {
    return (
      <div className="py-12 text-center">
        <p style={{ color: 'var(--color-text-secondary)' }}>Broker not found.</p>
        <div className="mt-4">
          <Link to="/brokers" className="underline">Back to brokers</Link>
        </div>
      </div>
    )
  }

  const rawMarkdown = broker.long_description || broker.markdown || ''
  const rawHtml = marked.parse(rawMarkdown)
  const sanitizedHtml = DOMPurify.sanitize(rawHtml)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/brokers" className="text-sm underline">← Back to brokers</Link>
      </div>

      {rawMarkdown ? (
        <div className="prose" style={{ color: 'var(--color-text-secondary)' }}>
          <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </div>
      ) : (
        <p style={{ color: 'var(--color-text-secondary)' }}>No detailed description available.</p>
      )}
    </div>
  )
}
