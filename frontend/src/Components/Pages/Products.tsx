
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductEmbed from '../Elements/ProductEmbed';

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
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        
        // Determine platform from URL path
        let platform = 'ALL'
        if (location.pathname.includes('/MT5')) {
          platform = 'MT5'
        } else if (location.pathname.includes('/MT4')) {
          platform = 'MT4'
        }
        
        // Fetch static products JSON from the frontend `mql5` folder
        const response = await fetch(`/mql5/products.json`)

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`)
        }

        const data = await response.json()
        // `products.json` in the repo is an array
        const allProducts = Array.isArray(data) ? data : (data.products || [])
        const filtered = platform === 'ALL'
          ? allProducts
          : allProducts.filter((p: Product) => (p.platform && p.platform.toUpperCase() === platform) || (p.title && p.title.includes(platform)))

        setProducts(filtered)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [location.pathname])

  return (
    <div className="min-h-screen transition-colors duration-200" style={{ backgroundColor: 'var(--color-background)', color: 'var(--color-text-primary)' }}>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: 'var(--color-primary)' }}>Products</h1>

        {loading && (
          <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>
            <p className="text-lg">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-background-secondary)', color: '#ef4444' }}>
            <p>Error: {error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12" style={{ color: 'var(--color-text-secondary)' }}>
            <p className="text-lg">No products found</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductEmbed key={index} {...product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
