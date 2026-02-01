import React from 'react';
import { Link } from 'react-router-dom';

interface ProductEmbedProps {
  title: string;
  link: string;
  image: string;
  platform: string;
  price: string;
  category?: string;
  license_type?: string;
  rating?: number;
  widget_link?: string;
}

const ProductEmbed: React.FC<ProductEmbedProps> = ({ title, link, image, platform, price, category, license_type, rating, widget_link }) => {
  const productPath = `/product/${encodeURIComponent(title)}`;

  return (
    <div className="rounded-xl overflow-hidden shadow-md transition-transform duration-150 hover:scale-105 p-4 flex flex-col items-center text-center" style={{ backgroundColor: 'var(--color-background-secondary)', minWidth: 180 }}>
      <Link to={productPath} className="w-full">
        <h3 className="font-bold text-xl mb-3" style={{ color: 'var(--color-primary)' }}>{title}</h3>
        <div className="w-full flex items-center justify-center mb-3" style={{ height: 120 }}>
          <img src={image} alt={title} className="object-contain max-h-full max-w-full" loading="lazy" />
        </div>
      </Link>

      <div className="flex flex-wrap justify-center gap-2 mb-3 w-full">
        <span className="text-xs px-2 py-1 rounded font-semibold" style={{ backgroundColor: '#e0e7ff', color: '#3730a3' }}>{platform}</span>
        {license_type && <span className="text-xs px-2 py-1 rounded font-semibold" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>{license_type}</span>}
        {category && <span className="text-xs px-2 py-1 rounded font-semibold" style={{ backgroundColor: '#fef9c3', color: '#b45309' }}>{category}</span>}
      </div>

      <div className="flex items-center justify-center gap-2 mb-2">
        {typeof rating === 'number' && (
          <>
            <span className="text-yellow-400">★</span>
            <span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>{rating.toFixed(2)}</span>
          </>
        )}
      </div>

      <div className="text-center">
        <span className="font-bold text-lg text-blue-500">{price === '0$' || (price && price.toLowerCase && price.toLowerCase() === 'free') ? 'Free' : price}</span>
      </div>
    </div>
  );
};

export default ProductEmbed;
