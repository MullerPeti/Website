import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Disable deprecated marked behaviors to silence warnings and future-proof parsing
marked.setOptions({ mangle: false, headerIds: false })

interface Product {
  title: string;
  link: string;
  image: string;
  platform: string;
  price: string;
  last_updated?: string;
  category?: string;
  license_type?: string;
  long_description?: string;
  youtube_video?: string;
  screenshots?: string[];
  manual_link?: string;
  reviews_link?: string;
  rating?: number;
  widget_link?: string;
  description_path?: string;
}

export default function Product() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return
      setLoading(true)
      setError(null)
      try {
        // Load static products JSON and find the matching product by title/slug
        const res = await fetch('/mql5/products.json')
        if (!res.ok) throw new Error('Failed to load products.json')
        const products = await res.json()
        const decoded = decodeURIComponent(slug)
        let found = (products || []).find((p: any) => p.title === decoded || encodeURIComponent(p.title) === slug)
        if (!found) {
          // fallback: case-insensitive contains
          found = (products || []).find((p: any) => p.title && p.title.toLowerCase().includes(decoded.toLowerCase()))
        }
        if (!found) {
          throw new Error('Product not found')
        }

        // If a description_path exists, prefer fetching that markdown (overrides any included long_description)
        if (found.description_path) {
          try {
            const mdRes = await fetch(`/mql5/${found.description_path}`)
            if (mdRes.ok) {
              found.long_description = await mdRes.text()
            }
          } catch {
            // ignore markdown fetch errors and fall back to any existing long_description
          }
        }

        setProduct(found)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p style={{ color: 'var(--color-text-secondary)' }}>Loading product...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p style={{ color: '#ef4444' }}>Error: {error}</p>
        <div className="mt-4">
          <Link to="/products" className="underline">Back to products</Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="py-12 text-center">
        <p style={{ color: 'var(--color-text-secondary)' }}>Product not found.</p>
        <div className="mt-4">
          <Link to="/products" className="underline">Back to products</Link>
        </div>
      </div>
    )
  }

  // extract youtube id
  const getYoutubeId = (youtubeUrl?: string) => {
    if (!youtubeUrl) return null
    const match = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  const videoId = getYoutubeId(product.youtube_video)

  // Debug: log markdown and rendered HTML to help diagnose styling issues
  const rawMarkdown = product.long_description || ''
  console.log('product.long_description:', rawMarkdown)
  const rawHtml = marked.parse(rawMarkdown)
  console.log('rendered HTML:', rawHtml)
  const sanitizedHtml = DOMPurify.sanitize(rawHtml)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/products" className="text-sm underline">← Back to products</Link>
      </div>

      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>{product.title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex flex-col items-center">
          <img src={product.image} alt={product.title} className="object-contain w-full max-h-64 mb-4" />
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}>{product.platform}</span>
            {product.license_type && <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>{product.license_type}</span>}
            {product.category && <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#fef9c3', color: '#b45309' }}>{product.category}</span>}
          </div>

          {typeof product.rating === 'number' && (
            <div className="flex items-center gap-2 mb-2 text-lg">
              {product.reviews_link ? (
                <a href={product.reviews_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" title="View reviews">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{product.rating.toFixed(2)}</span>
                </a>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold" style={{ color: 'var(--color-primary)' }}>{product.rating.toFixed(2)}</span>
                </div>
              )}
            </div>
          )}

          <div className="text-xl font-bold text-blue-500">{product.price === '0$' || (product.price && product.price.toLowerCase && product.price.toLowerCase() === 'free') ? 'Free' : product.price}</div>

          <a href={product.widget_link || product.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block px-6 py-3 rounded-lg font-semibold text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
            View Product on MQL5
          </a>

          {product.title && product.title.toLowerCase().includes('manhedger') && (
            <a href={product.manual_link || product.widget_link || product.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block px-5 py-2 rounded-lg font-semibold text-white" style={{ backgroundColor: '#10b981' }}>
              Free Trial
            </a>
          )}
        </div>

        <div className="md:flex-1">
          {product.long_description && (
            <div className="prose mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
            </div>
          )}

          <div className="flex flex-wrap gap-4 mb-2">
            {product.manual_link && (
              <a href={product.manual_link} target="_blank" rel="noopener noreferrer" className="underline">Manual</a>
            )}
            {product.reviews_link && (
              <a href={product.reviews_link} target="_blank" rel="noopener noreferrer" className="underline">Reviews</a>
            )}
          </div>

          {videoId && (
            <div className="mt-6">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
                <iframe src={`https://www.youtube.com/embed/${videoId}`} title={product.title + ' Video'} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
