
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Calculator, TrendingUp, Users, Beer, PiggyBank, CircleArrowDown, Car, DollarSign, GraduationCap } from 'lucide-react';

const Index = () => {
  const calculators = [
    {
      title: 'Custo-Benefício',
      description: 'Compare produtos com diferentes pesos, quantidades e valores para encontrar a melhor opção.',
      icon: <TrendingUp className="h-8 w-8" />,
      path: '/custo-beneficio',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Divisão de Conta',
      description: 'Divida contas entre amigos de forma justa, incluindo taxa de serviço e consumo individual.',
      icon: <Users className="h-8 w-8" />,
      path: '/divisao-conta',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Contador de Cervejas',
      description: 'Controle quantas cervejas foram consumidas e calcule o valor total no bar.',
      icon: <Beer className="h-8 w-8" />,
      path: '/contador-cervejas',
      color: 'from-amber-500 to-amber-600',
    },
    {
      title: 'Rentabilidade de Investimentos',
      description: 'Calcule rendimentos com juros compostos e simples, com aportes mensais e gráficos.',
      icon: <PiggyBank className="h-8 w-8" />,
      path: '/investimentos',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Calculadora Básica',
      description: 'Calculadora tradicional para operações matemáticas do dia a dia.',
      icon: <Calculator className="h-8 w-8" />,
      path: '/calculadora-basica',
      color: 'from-gray-500 to-gray-600',
    },
    {
      title: 'Planejamento de Aposentadoria',
      description: 'Calcule quanto economizar para ter a aposentadoria dos seus sonhos.',
      icon: <PiggyBank className="h-8 w-8" />,
      path: '/planejamento-aposentadoria',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      title: 'Consulta FIPE',
      description: 'Consulte o valor atualizado do seu veículo na tabela FIPE.',
      icon: <Car className="h-8 w-8" />,
      path: '/consulta-fipe',
      color: 'from-red-500 to-red-600',
    },
    {
      title: 'Precificação para Autônomos',
      description: 'Calcule o preço ideal para seus produtos ou serviços.',
      icon: <DollarSign className="h-8 w-8" />,
      path: '/precificacao-servicos',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      title: 'Educação Financeira',
      description: 'Organize suas finanças pessoais e aprenda a dividir sua renda.',
      icon: <GraduationCap className="h-8 w-8" />,
      path: '/educacao-financeira',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Custo Ninja
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Suas ferramentas de cálculo online gratuitas para decisões mais inteligentes
            </p>
            <p className="text-lg mb-12 text-blue-200">
              Simplifique sua vida financeira com nossas calculadoras práticas e precisas. 
              Desde comparar custo-benefício até planejar investimentos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/custo-beneficio"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Começar Agora
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Ver Todas as Calculadoras
              </button>
            </div>
          </div>
        </div>
      </section>

      <AdBanner size="large" className="mx-4 my-8" />

      {/* Calculators Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nossas Calculadoras
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ferramentas desenvolvidas para resolver problemas reais do seu dia a dia. 
              Todas gratuitas, fáceis de usar e com resultados precisos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {calculators.map((calc, index) => (
              <Link
                key={index}
                to={calc.path}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className={`bg-gradient-to-r ${calc.color} rounded-lg p-4 w-fit mb-6 text-white group-hover:scale-110 transition-transform`}>
                    {calc.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {calc.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <CoursePromo />
      </div>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Por que escolher o Custo Ninja?
              </h2>
              <p className="text-xl text-gray-600">
                Desenvolvido para ser sua primeira escolha em calculadoras online
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 rounded-full p-4 w-fit mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">100% Gratuito</h3>
                <p className="text-gray-600">
                  Todas as calculadoras são completamente gratuitas. Sem taxas ocultas ou assinaturas.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-green-100 rounded-full p-4 w-fit mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Resultados Precisos</h3>
                <p className="text-gray-600">
                  Algoritmos testados e validados para garantir cálculos sempre corretos e confiáveis.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-purple-100 rounded-full p-4 w-fit mx-auto mb-4">
                  <CircleArrowDown className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Fácil de Usar</h3>
                <p className="text-gray-600">
                  Interface intuitiva e responsiva. Funciona perfeitamente em celular, tablet e desktop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdBanner size="medium" className="mx-4 mb-8" />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pronto para tomar decisões mais inteligentes?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Comece agora mesmo a usar nossas calculadoras e veja a diferença
          </p>
          <Link
            to="/custo-beneficio"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
          >
            Experimentar Agora
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
