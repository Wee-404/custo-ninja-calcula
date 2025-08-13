
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NewsletterSubscription from './NewsletterSubscription';
import GoogleAdSense from './GoogleAdSense';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50" id="newsletter">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSubscription />
          </div>
          
          {/* Ad in Newsletter Section */}
          <div className="max-w-4xl mx-auto mt-12">
            <GoogleAdSense 
              adSlot="4567890123"
              adFormat="auto"
              style={{ display: 'block' }}
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Layout;
