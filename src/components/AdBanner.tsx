
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
      <div className="text-center text-gray-500 p-4">
        <p className="text-sm font-medium">📢 Espaço para Google AdSense</p>
        <p className="text-xs mb-2">Banner {size}</p>
        <div className="bg-white p-2 rounded border text-xs">
          <p className="font-medium text-gray-700">Para ativar:</p>
          <p>1. Substitua por &lt;GoogleAdSense /&gt;</p>
          <p>2. Configure seu Publisher ID</p>
          <p>3. Adicione os Ad Slots corretos</p>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
