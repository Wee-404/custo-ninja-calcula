import React from 'react';
import Layout from '../components/Layout';
import GoogleAdSense, { AdSenseHeader, AdSenseSidebar, AdSenseFooter, AdSenseInContent } from '../components/GoogleAdSense';
import CoursePromo from '../components/CoursePromo';
import { Settings, BookOpen, Megaphone } from 'lucide-react';

const AdsECursos = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📢 Gerenciar Ads e Cursos
          </h1>
          <p className="text-xl text-gray-600">
            Central de administração para anúncios e cursos afiliados
          </p>
        </div>

        {/* Seção de Ads */}
        <section className="mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <div className="flex items-center mb-6">
              <Megaphone className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Google AdSense</h2>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">📋 Instruções de Configuração</h3>
              <div className="space-y-2 text-blue-700">
                <p>1. Substitua "ca-pub-XXXXXXXXXXXXXXXXX" pelo seu Publisher ID real</p>
                <p>2. Configure os Ad Slots corretos para cada posição</p>
                <p>3. Adicione o script do AdSense no index.html</p>
                <p>4. Teste os anúncios em ambiente de produção</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AdSense Configurados */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Anúncios Configurados</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">Header Banner</h4>
                    <AdSenseHeader />
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">In-Content Banner</h4>
                    <AdSenseInContent />
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold">Footer Banner</h4>
                    <AdSenseFooter />
                  </div>
                </div>
              </div>

              {/* AdBanners para Teste */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Banners de Teste</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Banner Pequeno</h4>
                    <GoogleAdSense 
                      adSlot="1234567890"
                      adFormat="rectangle"
                      style={{ display: 'block', minHeight: '90px' }}
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Banner Médio</h4>
                    <GoogleAdSense 
                      adSlot="2345678901"
                      adFormat="rectangle"
                      style={{ display: 'block', minHeight: '120px' }}
                    />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Banner Grande</h4>
                    <GoogleAdSense 
                      adSlot="3456789012"
                      adFormat="auto"
                      style={{ display: 'block', minHeight: '180px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Cursos */}
        <section>
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Cursos Afiliados</h2>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">🔧 Como Editar os Cursos</h3>
              <div className="space-y-2 text-purple-700">
                <p>1. Abra o arquivo src/components/CoursePromo.tsx</p>
                <p>2. Edite o array 'courses' com seus cursos e links de afiliado</p>
                <p>3. Adicione seus links de afiliado reais nos campos 'affiliateLink'</p>
                <p>4. Customize preços, avaliações e descrições conforme necessário</p>
              </div>
            </div>

            <CoursePromo />
          </div>
        </section>

        {/* Sidebar AdSense */}
        <section className="mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Banner Lateral</h2>
            <div className="flex justify-center">
              <AdSenseSidebar />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AdsECursos;