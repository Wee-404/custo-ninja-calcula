
import React from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calculator, PiggyBank, TrendingUp, Users, Beer, GraduationCap, ChefHat } from 'lucide-react';

const UtilitariosFinanceiros = () => {
  const ferramentas = [
    {
      titulo: 'Planejamento de Aposentadoria',
      descricao: 'Calcule quanto precisa investir para se aposentar com tranquilidade',
      link: '/planejamento-aposentadoria',
      icon: PiggyBank,
      cor: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      titulo: 'Simulador de Investimentos',
      descricao: 'Veja como seus investimentos crescem com juros compostos',
      link: '/investimentos',
      icon: TrendingUp,
      cor: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      titulo: 'Educação Financeira',
      descricao: 'Organize seu orçamento pessoal e aprenda a dividir sua renda',
      link: '/educacao-financeira',
      icon: GraduationCap,
      cor: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      titulo: 'Divisão de Conta',
      descricao: 'Divida contas de restaurante e bar de forma justa entre amigos',
      link: '/divisao-conta',
      icon: Users,
      cor: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      titulo: 'Contador de Cervejas',
      descricao: 'Controle seu consumo e gastos no bar',
      link: '/contador-cervejas',
      icon: Beer,
      cor: 'bg-orange-50 text-orange-600 border-orange-200'
    },
    {
      titulo: 'Empreendedorismo Local',
      descricao: 'Precifique marmitas, doces e serviços autônomos',
      link: '/empreendedorismo-local',
      icon: ChefHat,
      cor: 'bg-rose-50 text-rose-600 border-rose-200'
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Calculator className="h-10 w-10 text-blue-600" />
              Central de Utilitários Financeiros
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Todas as ferramentas financeiras que você precisa em um só lugar. 
              Planeje, calcule e tome decisões inteligentes com seu dinheiro.
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ferramentas.map((ferramenta, index) => {
                  const IconComponent = ferramenta.icon;
                  return (
                    <Card key={index} className={`border-2 hover:shadow-lg transition-all duration-200 ${ferramenta.cor.split(' ')[2]}`}>
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 rounded-full ${ferramenta.cor.split(' ')[0]} flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className={`h-8 w-8 ${ferramenta.cor.split(' ')[1]}`} />
                        </div>
                        <CardTitle className="text-lg">{ferramenta.titulo}</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <p className="text-gray-600 mb-4">{ferramenta.descricao}</p>
                        <Link to={ferramenta.link}>
                          <Button className="w-full">
                            Usar Ferramenta
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>💰 Por que usar nossas ferramentas?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Planejamento Inteligente</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Cálculos precisos e atualizados</li>
                        <li>✓ Diferentes cenários de investimento</li>
                        <li>✓ Metas financeiras realistas</li>
                        <li>✓ Educação financeira prática</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Praticidade no Dia a Dia</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Divisão justa de contas</li>
                        <li>✓ Controle de gastos pessoais</li>
                        <li>✓ Precificação de produtos</li>
                        <li>✓ Análise de custo-benefício</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <CoursePromo />
              <AdBanner size="medium" />
              
              <Card className="bg-gradient-to-br from-blue-50 to-green-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-center mb-4">🎯 Dica do Dia</h3>
                  <p className="text-sm text-gray-700 text-center">
                    "O primeiro passo para a liberdade financeira é conhecer exatamente 
                    para onde vai cada centavo do seu dinheiro."
                  </p>
                  <div className="mt-4 text-center">
                    <Link to="/educacao-financeira">
                      <Button size="sm" className="w-full">
                        Organize suas Finanças
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📊 Ferramentas Mais Usadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Divisão de Conta</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Investimentos</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Educação Financeira</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '72%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UtilitariosFinanceiros;
