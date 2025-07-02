
import React from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, TrendingUp, PiggyBank, CreditCard, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogFinancas = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Como Criar um Orçamento Pessoal Eficaz em 2025",
      excerpt: "Aprenda o passo a passo para organizar suas finanças e ter controle total sobre seus gastos mensais.",
      category: "Planejamento",
      date: "2 de Janeiro, 2025",
      author: "Equipe Custo Ninja",
      readTime: "8 min",
      image: "💰",
      content: `
        <h3>Por que ter um orçamento é fundamental?</h3>
        <p>Um orçamento pessoal é a base de uma vida financeira saudável. Ele permite que você:</p>
        <ul>
          <li>Tenha controle sobre onde seu dinheiro está sendo gasto</li>
          <li>Identifique gastos desnecessários</li>
          <li>Crie metas financeiras realistas</li>
          <li>Prepare-se para emergências</li>
        </ul>
        
        <h3>Passo a passo para criar seu orçamento</h3>
        <h4>1. Liste todas as suas receitas</h4>
        <p>Inclua salário, freelances, rendas extras, investimentos, etc.</p>
        
        <h4>2. Categorize seus gastos</h4>
        <p>Divida em gastos fixos (aluguel, financiamentos) e variáveis (alimentação, lazer).</p>
        
        <h4>3. Use a regra 50-30-20</h4>
        <ul>
          <li>50% para necessidades básicas</li>
          <li>30% para desejos pessoais</li>
          <li>20% para poupança e investimentos</li>
        </ul>
        
        <h4>4. Monitore mensalmente</h4>
        <p>Revise e ajuste seu orçamento todo mês para mantê-lo realista.</p>
      `
    },
    {
      id: 2,
      title: "Investimentos para Iniciantes: Por Onde Começar",
      excerpt: "Guia completo para quem quer começar a investir mas não sabe por onde começar. Dicas práticas e seguras.",
      category: "Investimentos",
      date: "28 de Dezembro, 2024",
      author: "Equipe Custo Ninja",
      readTime: "12 min",
      image: "📈",
      content: `
        <h3>Primeiros passos no mundo dos investimentos</h3>
        <p>Investir pode parecer complicado, mas com conhecimento básico você pode começar de forma segura.</p>
        
        <h3>Antes de investir, organize-se</h3>
        <ul>
          <li>Quite suas dívidas de juros altos</li>
          <li>Tenha uma reserva de emergência</li>
          <li>Defina seus objetivos financeiros</li>
        </ul>
        
        <h3>Tipos de investimento para iniciantes</h3>
        <h4>Tesouro Direto</h4>
        <p>Títulos do governo brasileiro, seguros e com baixo risco.</p>
        
        <h4>CDB (Certificado de Depósito Bancário)</h4>
        <p>Investimento de renda fixa oferecido pelos bancos.</p>
        
        <h4>Fundos de Investimento</h4>
        <p>Diversificação automática gerenciada por profissionais.</p>
        
        <h3>Dica importante</h3>
        <p>Comece sempre com valores pequenos e aumente gradualmente conforme ganha experiência.</p>
      `
    },
    {
      id: 3,
      title: "Como Sair das Dívidas: Estratégias Comprovadas",
      excerpt: "Métodos práticos para quitar suas dívidas e recuperar o controle financeiro da sua vida.",
      category: "Dívidas",
      date: "25 de Dezembro, 2024",
      author: "Equipe Custo Ninja",
      readTime: "10 min",
      image: "🏦",
      content: `
        <h3>Estratégias para sair das dívidas</h3>
        <p>Sair do vermelho exige planejamento e disciplina, mas é totalmente possível.</p>
        
        <h3>Método Bola de Neve</h3>
        <p>Quite primeiro as menores dívidas para ganhar motivação, depois parta para as maiores.</p>
        
        <h3>Método Avalanche</h3>
        <p>Priorize as dívidas com maiores juros para economizar dinheiro no longo prazo.</p>
        
        <h3>Dicas importantes</h3>
        <ul>
          <li>Negocie com os credores</li>
          <li>Considere renda extra</li>
          <li>Corte gastos supérfluos</li>
          <li>Mantenha o foco no objetivo</li>
        </ul>
        
        <h3>Evitando novas dívidas</h3>
        <p>Após quitar tudo, mantenha um orçamento rigoroso e uma reserva de emergência.</p>
      `
    }
  ];

  const categories = [
    { name: "Planejamento", icon: PiggyBank, count: 12 },
    { name: "Investimentos", icon: TrendingUp, count: 8 },
    { name: "Dívidas", icon: CreditCard, count: 6 },
    { name: "Empreendedorismo", icon: Briefcase, count: 10 }
  ];

  const [selectedPost, setSelectedPost] = React.useState<number | null>(null);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              📚 Blog de Finanças
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conteúdo prático e atualizado sobre educação financeira, investimentos e como melhorar sua relação com o dinheiro
            </p>
          </div>

          <AdBanner size="large" className="mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-8">
                          <span className="text-6xl">{post.image}</span>
                        </div>
                        <div className="md:w-3/4 p-6">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {post.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {post.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {post.author}
                            </div>
                            <span>{post.readTime} de leitura</span>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer"
                              onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}>
                            {post.title}
                          </h2>
                          <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                            className="group"
                          >
                            {selectedPost === post.id ? 'Fechar' : 'Ler Mais'}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                          
                          {selectedPost === post.id && (
                            <div className="mt-6 pt-6 border-t prose prose-sm max-w-none">
                              <div dangerouslySetInnerHTML={{ __html: post.content }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <CoursePromo />
              
              <Card>
                <CardHeader>
                  <CardTitle>Categorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                          <category.icon className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <AdBanner size="medium" />

              <Card>
                <CardHeader>
                  <CardTitle>💡 Dica da Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Reserve 10% da sua renda todo mês, mesmo que seja um valor pequeno. 
                    O hábito de poupar é mais importante que o valor poupado no início.
                  </p>
                  <Link to="/utilitarios-financeiros">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Calculadoras
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogFinancas;
