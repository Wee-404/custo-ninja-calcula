
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NewsletterSubscription from './NewsletterSubscription';

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
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Layout;
