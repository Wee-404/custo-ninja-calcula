
import React from 'react';

interface AdBannerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AdBanner = ({ size = 'medium', className = '' }: AdBannerProps) => {
  const sizeClasses = {
    small: 'h-24',
    medium: 'h-32',
    large: 'h-48'
  };

  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <div className="text-center text-gray-500">
        <p className="text-sm font-medium">Espaço para Anúncio</p>
        <p className="text-xs">Banner {size}</p>
      </div>
    </div>
  );
};

export default AdBanner;
