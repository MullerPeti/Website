import React, { useState } from 'react'

interface CodeEmbedProps {
  title: string
  description: string
  url: string
  video?: string
  platform: string
}

export default function CodeEmbed({ title, description, url, video, platform }: CodeEmbedProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Extract YouTube video ID from URL
  const getYoutubeId = (youtubeUrl?: string) => {
    if (!youtubeUrl) return null
    const match = youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  const youtubeId = getYoutubeId(video)

  return (
    <div
      className="rounded-lg transition-all duration-300 overflow-hidden cursor-pointer"
      style={{ backgroundColor: 'var(--color-background-secondary)' }}
    >
      {/* Header - Always Visible */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 hover:opacity-80 transition-opacity flex justify-between items-center"
      >
        <div className="flex-1">
          <p className="font-semibold text-lg" style={{ color: 'var(--color-text-primary)' }}>
            {title}
          </p>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            Platform: <span className="font-medium">{platform}</span>
          </p>
        </div>
        <span
          className={`text-2xl transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          style={{ color: 'var(--color-primary)' }}
        >
          ▼
        </span>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t p-6" style={{ borderColor: 'var(--color-border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side - Description and Button */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--color-primary)' }}>
                Description
              </h3>
              <p className="mb-6 grow" style={{ color: 'var(--color-text-secondary)' }}>
                {description}
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-lg font-semibold hover:opacity-80 transition-opacity w-full text-center"
                style={{ backgroundColor: 'var(--color-primary)', color: 'white', textDecoration: 'none' }}
              >
                View Publication
              </a>
            </div>

            {/* Right Side - Video */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-lg mb-3" style={{ color: 'var(--color-primary)' }}>
                Video
              </h3>
              {youtubeId ? (
                <div className="w-full rounded-lg overflow-hidden grow">
                  <iframe
                    width="100%"
                    height="300"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              ) : (
                <div
                  className="w-full h-full rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-background)', minHeight: '300px' }}
                >
                  <p style={{ color: 'var(--color-text-secondary)' }}>No video available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
