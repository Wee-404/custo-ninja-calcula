
import React, { useEffect } from 'react';

interface GoogleAdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const GoogleAdSense = ({ 
  adSlot, 
  adFormat = 'auto', 
  style = { display: 'block' }, 
  className = '' 
}: GoogleAdSenseProps) => {
  useEffect(() => {
    try {
      // Inicializa o AdSense quando o componente é montado
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('Erro ao carregar AdSense:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Substitua pelo seu Publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default GoogleAdSense;

// Componentes pré-configurados para diferentes tipos de anúncios
export const AdSenseHeader = () => (
  <GoogleAdSense 
    adSlot="1234567890" // Substitua pelo seu ad slot
    adFormat="horizontal"
    className="my-4"
    style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
  />
);

export const AdSenseSidebar = () => (
  <GoogleAdSense 
    adSlot="0987654321" // Substitua pelo seu ad slot
    adFormat="vertical"
    className="my-4"
    style={{ display: 'block', width: '300px', minHeight: '250px' }}
  />
);

export const AdSenseFooter = () => (
  <GoogleAdSense 
    adSlot="1357924680" // Substitua pelo seu ad slot
    adFormat="horizontal"
    className="my-4"
    style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
  />
);

export const AdSenseInContent = () => (
  <GoogleAdSense 
    adSlot="2468013579" // Substitua pelo seu ad slot
    adFormat="rectangle"
    className="my-6 mx-auto"
    style={{ display: 'block', textAlign: 'center', minHeight: '280px' }}
  />
);
