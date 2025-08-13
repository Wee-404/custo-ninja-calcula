
import React from 'react';
import Layout from '../components/Layout';
import GoogleAdSense from '../components/GoogleAdSense';
import CoursePromo from '../components/CoursePromo';
import NewsletterSubscription from '../components/NewsletterSubscription';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calculator, PiggyBank, TrendingUp, Users, Beer, GraduationCap, Car, DollarSign } from 'lucide-react';

const UtilitariosFinanceiros = () => {
  const ferramentas = [
    {
      titulo: 'Educação Financeira',
      descricao: 'Organize seu orçamento com a regra 50-30-20 e conquiste suas metas',
      link: '/educacao-financeira',
      icon: GraduationCap,
      cor: 'bg-purple-50 text-purple-600 border-purple-200',
      categoria: 'Essencial'
    },
    {
      titulo: 'Custo-Benefício',
      descricao: 'Compare produtos com pesos e valores diferentes para economizar',
      link: '/custo-beneficio',
      icon: TrendingUp,
      cor: 'bg-blue-50 text-blue-600 border-blue-200',
      categoria: 'Popular'
    },
    {
      titulo: 'Divisão de Conta',
      descricao: 'Divida contas de restaurante entre amigos de forma justa',
      link: '/divisao-conta',
      icon: Users,
      cor: 'bg-green-50 text-green-600 border-green-200',
      categoria: 'Popular'
    },
    {
      titulo: 'Simulador de Investimentos',
      descricao: 'Calcule rendimentos com juros compostos e aportes mensais',
      link: '/investimentos',
      icon: PiggyBank,
      cor: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      categoria: 'Planejamento'
    },
    {
      titulo: 'Planejamento de Aposentadoria',
      descricao: 'Descubra quanto investir para se aposentar tranquilo',
      link: '/planejamento-aposentadoria',
      icon: PiggyBank,
      cor: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      categoria: 'Planejamento'
    },
    {
      titulo: 'Empreendedorismo & Precificação',
      descricao: 'Calcule preços justos para marmitas, doces e serviços',
      link: '/empreendedorismo-local',
      icon: DollarSign,
      cor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      categoria: 'Negócios'
    },
    {
      titulo: 'Consulta FIPE',
      descricao: 'Consulte o valor atualizado do seu veículo na tabela FIPE',
      link: '/consulta-fipe',
      icon: Car,
      cor: 'bg-red-50 text-red-600 border-red-200',
      categoria: 'Utilidade'
    },
    {
      titulo: 'Contador de Cervejas',
      descricao: 'Controle quantas cervejas foram consumidas no bar',
      link: '/contador-cervejas',
      icon: Beer,
      cor: 'bg-amber-50 text-amber-600 border-amber-200',
      categoria: 'Diversão'
    },
    {
      titulo: 'Calculadora Básica',
      descricao: 'Operações matemáticas tradicionais para uso geral',
      link: '/calculadora-basica',
      icon: Calculator,
      cor: 'bg-gray-50 text-gray-600 border-gray-200',
      categoria: 'Básico'
    }
  ];

  const categorias = ['Todas', 'Popular', 'Essencial', 'Planejamento', 'Negócios', 'Utilidade'];
  const [categoriaSelecionada, setCategoriaSelecioanda] = React.useState('Todas');

  const ferramentasFiltradas = categoriaSelecionada === 'Todas' 
    ? ferramentas 
    : ferramentas.filter(f => f.categoria === categoriaSelecionada);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Calculator className="h-10 w-10 text-blue-600" />
              Central de Utilitários Financeiros
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Todas as ferramentas que você precisa para tomar decisões financeiras inteligentes
            </p>
            
            {/* Filtros por categoria */}
            <div className="flex flex-wrap justify-center gap-2">
              {categorias.map((categoria) => (
                <Button
                  key={categoria}
                  variant={categoriaSelecionada === categoria ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoriaSelecioanda(categoria)}
                  className="text-xs"
                >
                  {categoria}
                </Button>
              ))}
            </div>
          </div>

          <GoogleAdSense 
            adSlot="1234567890"
            adFormat="auto"
            style={{ display: 'block', margin: '32px 0' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ferramentasFiltradas.map((ferramenta, index) => {
                  const IconComponent = ferramenta.icon;
                  return (
                    <Card key={index} className={`border-2 hover:shadow-lg transition-all duration-200 hover:scale-105 ${ferramenta.cor.split(' ')[2]}`}>
                      <CardHeader className="text-center pb-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className={`w-14 h-14 rounded-full ${ferramenta.cor.split(' ')[0]} flex items-center justify-center`}>
                            <IconComponent className={`h-7 w-7 ${ferramenta.cor.split(' ')[1]}`} />
                          </div>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {ferramenta.categoria}
                          </span>
                        </div>
                        <CardTitle className="text-lg text-left">{ferramenta.titulo}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-600 mb-4 text-sm text-left">{ferramenta.descricao}</p>
                        <Link to={ferramenta.link}>
                          <Button className="w-full">
                            Usar Agora
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>🎯 Vantagens das Nossas Ferramentas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">💡 Inteligência Financeira</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Cálculos precisos e confiáveis</li>
                        <li>✓ Simulações realistas do mercado</li>
                        <li>✓ Educação financeira aplicada</li>
                        <li>✓ Decisões baseadas em dados</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">🚀 Facilidade Total</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>✓ Interface simples e intuitiva</li>
                        <li>✓ Resultados instantâneos</li>
                        <li>✓ Funciona em qualquer dispositivo</li>
                        <li>✓ 100% gratuito sempre</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <NewsletterSubscription />
              <CoursePromo />
              <GoogleAdSense 
                adSlot="2345678901"
                adFormat="rectangle"
                style={{ display: 'block' }}
              />
              
              <Card className="bg-gradient-to-br from-blue-50 to-green-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-center mb-4">🎯 Dica do Especialista</h3>
                  <p className="text-sm text-gray-700 text-center mb-4">
                    "Comece organizando suas finanças pessoais, depois parta para investimentos e empreendedorismo!"
                  </p>
                  <div className="flex gap-2">
                    <Link to="/educacao-financeira" className="flex-1">
                      <Button size="sm" className="w-full">
                        Educação Financeira
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
                    <span className="text-sm">Educação Financeira</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Divisão de Conta</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '88%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Custo-Benefício</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '82%'}}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Investimentos</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{width: '75%'}}></div>
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
