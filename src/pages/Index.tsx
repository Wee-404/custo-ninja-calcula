
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import NinjaGame from '../components/NinjaGame';
import NewsletterSubscription from '../components/NewsletterSubscription';
import { Calculator, TrendingUp, Users, Beer, PiggyBank, Car, DollarSign, GraduationCap, ArrowRight } from 'lucide-react';

const Index = () => {
  const ferramentasDestaque = [
    {
      title: 'Custo-Benefício',
      description: 'Compare produtos e encontre a melhor opção de compra',
      icon: <TrendingUp className="h-6 w-6" />,
      path: '/custo-beneficio',
      color: 'from-blue-500 to-blue-600',
      popular: true,
    },
    {
      title: 'Divisão de Conta',
      description: 'Divida contas de restaurante entre amigos facilmente',
      icon: <Users className="h-6 w-6" />,
      path: '/divisao-conta',
      color: 'from-green-500 to-green-600',
      popular: true,
    },
    {
      title: 'Educação Financeira',
      description: 'Organize suas finanças com a regra 50-30-20',
      icon: <GraduationCap className="h-6 w-6" />,
      path: '/educacao-financeira',
      color: 'from-purple-500 to-purple-600',
      popular: true,
    },
  ];

  const todasFerramentas = [
    {
      title: 'Investimentos',
      description: 'Simule rendimentos com juros compostos',
      icon: <PiggyBank className="h-6 w-6" />,
      path: '/investimentos',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'Empreendedorismo',
      description: 'Precifique produtos e serviços',
      icon: <DollarSign className="h-6 w-6" />,
      path: '/empreendedorismo-local',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Consulta FIPE',
      description: 'Valor atualizado de veículos',
      icon: <Car className="h-6 w-6" />,
      path: '/consulta-fipe',
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Contador de Cervejas',
      description: 'Controle o consumo no bar',
      icon: <Beer className="h-6 w-6" />,
      path: '/contador-cervejas',
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: 'Calculadora Básica',
      description: 'Operações matemáticas simples',
      icon: <Calculator className="h-6 w-6" />,
      path: '/calculadora-basica',
      color: 'from-gray-500 to-gray-600',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              🥷 Custo Ninja
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              Ferramentas financeiras gratuitas para decisões inteligentes
            </p>
            <p className="text-lg mb-8 text-blue-200">
              Simplifique cálculos do dia a dia: custo-benefício, divisão de contas, investimentos e muito mais
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/custo-beneficio"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                Começar Agora <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#ferramentas"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Ver Todas as Ferramentas
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-16 bg-gray-50" id="ferramentas">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🔥 Ferramentas Mais Usadas
            </h2>
            <p className="text-xl text-gray-600">
              Acesso rápido às calculadoras mais populares
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {ferramentasDestaque.map((ferramenta, index) => (
              <Link
                key={index}
                to={ferramenta.path}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-200"
              >
                <div className="p-8 text-center">
                  <div className={`bg-gradient-to-r ${ferramenta.color} rounded-full p-4 w-fit mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}>
                    {ferramenta.icon}
                  </div>
                  {ferramenta.popular && (
                    <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full mb-3 font-semibold">
                      POPULAR
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {ferramenta.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {ferramenta.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/utilitarios-financeiros"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Ver Todas as Ferramentas <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <AdBanner size="large" className="mx-4 my-8" />

      {/* Mini Game Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              🎮 Relaxe com o Ninja do Dinheiro
            </h2>
            <p className="text-lg text-gray-600">
              Descanse um pouco dos cálculos! Duplo clique para duplo salto.
            </p>
          </div>
          <NinjaGame />
        </div>
      </section>

      {/* All Tools Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🛠️ Todas as Ferramentas
            </h2>
            <p className="text-xl text-gray-600">
              Explore nossa coleção completa de calculadoras
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {todasFerramentas.map((ferramenta, index) => (
              <Link
                key={index}
                to={ferramenta.path}
                className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border hover:border-blue-200"
              >
                <div className={`bg-gradient-to-r ${ferramenta.color} rounded-lg p-3 w-fit mx-auto mb-4 text-white group-hover:scale-105 transition-transform`}>
                  {ferramenta.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {ferramenta.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {ferramenta.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <NewsletterSubscription />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <CoursePromo />
      </div>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                ⭐ Por que usar o Custo Ninja?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-fit mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">100% Gratuito</h3>
                <p className="text-gray-600">
                  Todas as ferramentas são gratuitas, sem taxas ocultas ou assinaturas.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-green-100 rounded-full p-4 w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Resultados Precisos</h3>
                <p className="text-gray-600">
                  Cálculos validados e testados para garantir resultados confiáveis.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-purple-100 rounded-full p-4 w-fit mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Fácil de Usar</h3>
                <p className="text-gray-600">
                  Interface intuitiva que funciona em qualquer dispositivo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdBanner size="medium" className="mx-4 mb-8" />
    </Layout>
  );
};

export default Index;
