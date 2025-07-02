
import React from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, TrendingUp, PiggyBank, CreditCard, Briefcase, Heart, MessageCircle, Share2, Coffee, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogFinancas = () => {
  const featuredPosts = [
    {
      id: 1,
      title: "Regra 50-30-20: Como Organizar Seu Orçamento de Forma Simples",
      excerpt: "Aprenda a aplicar a regra mais famosa de organização financeira: 50% necessidades, 30% desejos e 20% poupança. Guia prático com exemplos.",
      category: "Planejamento",
      date: "2 de Janeiro, 2025",
      author: "Equipe Financeira",
      readTime: "8 min",
      image: "📊",
      likes: 234,
      comments: 45,
      content: `
        <h3>🎯 O que é a Regra 50-30-20?</h3>
        <p>A regra 50-30-20 é um método simples para dividir sua renda líquida (após impostos) em três categorias principais:</p>
        
        <ul>
          <li><strong>50% - Necessidades:</strong> Gastos essenciais como moradia, alimentação, transporte, contas básicas</li>
          <li><strong>30% - Desejos:</strong> Entretenimento, hobbies, restaurantes, compras não essenciais</li>
          <li><strong>20% - Poupança e Investimentos:</strong> Reserva de emergência, aposentadoria, objetivos financeiros</li>
        </ul>

        <h3>💰 Exemplo Prático</h3>
        <p>Para uma renda líquida de R$ 4.000:</p>
        <ul>
          <li>R$ 2.000 (50%) - Necessidades: aluguel, mercado, transporte, contas</li>
          <li>R$ 1.200 (30%) - Desejos: lazer, restaurantes, roupas</li>
          <li>R$ 800 (20%) - Poupança: reserva de emergência, investimentos</li>
        </ul>

        <h3>🔧 Como Implementar</h3>
        <ol>
          <li><strong>Calcule sua renda líquida mensal</strong></li>
          <li><strong>Liste todos os gastos essenciais</strong> (necessidades)</li>
          <li><strong>Defina um valor fixo para poupança</strong> (pague-se primeiro)</li>
          <li><strong>Use o restante para desejos</strong> de forma consciente</li>
        </ol>

        <h3>⚖️ Ajustes Necessários</h3>
        <p>A regra é um ponto de partida. Ajuste conforme sua realidade:</p>
        <ul>
          <li>Se os gastos essenciais passam de 50%, corte desejos temporariamente</li>
          <li>Se consegue poupar mais de 20%, acelere seus objetivos</li>
          <li>Para rendas baixas, comece com 60-30-10 e evolua gradualmente</li>
        </ul>
      `
    },
    {
      id: 2,
      title: "Tesouro Direto: Guia Completo para Iniciantes",
      excerpt: "Tudo que você precisa saber sobre o investimento mais seguro do Brasil: tipos de títulos, como investir e estratégias práticas.",
      category: "Investimentos",
      date: "30 de Dezembro, 2024",
      author: "Equipe Investimentos",
      readTime: "12 min",
      image: "🏛️",
      likes: 567,
      comments: 89,
      content: `
        <h3>🏛️ O que é o Tesouro Direto?</h3>
        <p>O Tesouro Direto é um programa do governo federal que permite pessoas físicas comprarem títulos públicos pela internet. É considerado o investimento mais seguro do país.</p>

        <h3>📈 Tipos de Títulos</h3>
        
        <h4>Tesouro Selic (LFT)</h4>
        <ul>
          <li><strong>Rendimento:</strong> Acompanha a taxa Selic</li>
          <li><strong>Vencimento:</strong> 2029</li>
          <li><strong>Ideal para:</strong> Reserva de emergência, liquidez</li>
          <li><strong>Risco:</strong> Baixíssimo</li>
        </ul>

        <h4>Tesouro Prefixado (LTN)</h4>
        <ul>
          <li><strong>Rendimento:</strong> Taxa fixa definida na compra</li>
          <li><strong>Vencimentos:</strong> 2027, 2031</li>
          <li><strong>Ideal para:</strong> Objetivos de médio prazo</li>
          <li><strong>Risco:</strong> Baixo a moderado</li>
        </ul>

        <h4>Tesouro IPCA+ (NTN-B)</h4>
        <ul>
          <li><strong>Rendimento:</strong> IPCA + taxa prefixada</li>
          <li><strong>Vencimentos:</strong> 2029, 2035, 2045</li>
          <li><strong>Ideal para:</strong> Aposentadoria, longo prazo</li>
          <li><strong>Risco:</strong> Baixo</li>
        </ul>

        <h3>💻 Como Investir</h3>
        <ol>
          <li><strong>Abra conta em uma corretora</strong> habilitada</li>
          <li><strong>Transfira dinheiro</strong> para a conta da corretora</li>
          <li><strong>Acesse a plataforma</strong> de investimentos</li>
          <li><strong>Escolha o título</strong> e o valor</li>
          <li><strong>Confirme a compra</strong></li>
        </ol>

        <h3>💡 Estratégias Práticas</h3>
        <ul>
          <li><strong>Escada de vencimentos:</strong> Compre títulos com datas diferentes</li>
          <li><strong>Reinvestimento:</strong> Reinvista os juros automaticamente</li>
          <li><strong>Diversificação:</strong> Combine diferentes tipos de títulos</li>
        </ul>

        <h3>⚠️ Custos e Tributação</h3>
        <ul>
          <li><strong>Taxa de custódia:</strong> 0,25% ao ano</li>
          <li><strong>IR:</strong> 22,5% até 6 meses, 15% acima de 2 anos</li>
          <li><strong>IOF:</strong> Aplicável apenas nos primeiros 30 dias</li>
        </ul>
      `
    },
    {
      id: 3,
      title: "Como Quitar Dívidas: Método Bola de Neve vs Avalanche",
      excerpt: "Duas estratégias comprovadas para sair das dívidas. Descubra qual método funciona melhor para seu perfil financeiro.",
      category: "Dívidas",
      date: "28 de Dezembro, 2024",
      author: "Especialista em Dívidas",
      readTime: "10 min",
      image: "❄️",
      likes: 432,
      comments: 67,
      content: `
        <h3>🎯 Método Bola de Neve</h3>
        <p><strong>Estratégia:</strong> Quite primeiro as dívidas de menor valor, independente dos juros.</p>
        
        <h4>Como funciona:</h4>
        <ol>
          <li>Liste todas as dívidas do menor para o maior valor</li>
          <li>Pague o mínimo de todas as dívidas</li>
          <li>Use todo dinheiro extra para quitar a menor dívida</li>
          <li>Quando quitada, use o valor dessa + extra para a próxima</li>
        </ol>

        <h4>Vantagens:</h4>
        <ul>
          <li>Motivação psicológica com vitórias rápidas</li>
          <li>Reduz o número de credores rapidamente</li>
          <li>Funciona bem para quem tem dificuldade de manter disciplina</li>
        </ul>

        <h3>🏔️ Método Avalanche</h3>
        <p><strong>Estratégia:</strong> Quite primeiro as dívidas com maiores juros.</p>
        
        <h4>Como funciona:</h4>
        <ol>
          <li>Liste todas as dívidas da maior para a menor taxa de juros</li>
          <li>Pague o mínimo de todas as dívidas</li>
          <li>Use todo dinheiro extra para quitar a dívida com maior juro</li>
          <li>Repita até quitar tudo</li>
        </ol>

        <h4>Vantagens:</h4>
        <ul>
          <li>Matematicamente mais eficiente</li>
          <li>Economiza mais dinheiro em juros</li>
          <li>Reduz o tempo total de pagamento</li>
        </ul>

        <h3>⚖️ Qual Escolher?</h3>
        
        <h4>Escolha Bola de Neve se:</h4>
        <ul>
          <li>Você precisa de motivação constante</li>
          <li>Tem muitas dívidas pequenas</li>
          <li>Já tentou outros métodos sem sucesso</li>
        </ul>

        <h4>Escolha Avalanche se:</h4>
        <ul>
          <li>Você é disciplinado financeiramente</li>
          <li>Quer economizar o máximo possível</li>
          <li>Tem poucas dívidas com juros altos</li>
        </ul>

        <h3>🔧 Dicas Para Ambos os Métodos</h3>
        <ul>
          <li><strong>Negocie:</strong> Sempre tente renegociar condições</li>
          <li><strong>Corte gastos:</strong> Temporariamente reduza despesas</li>
          <li><strong>Renda extra:</strong> Considere trabalhos extras</li>
          <li><strong>Não se endivide mais:</strong> Corte os cartões de crédito</li>
        </ul>
      `
    },
    {
      id: 4,
      title: "Reserva de Emergência: Quanto Guardar e Onde Investir",
      excerpt: "Guia completo sobre reserva de emergência: valor ideal, melhores investimentos e como construir sua segurança financeira.",
      category: "Planejamento",
      date: "25 de Dezembro, 2024",
      author: "Planejador Financeiro",
      readTime: "9 min",
      image: "🛡️",
      likes: 321,
      comments: 54,
      content: `
        <h3>🛡️ O que é Reserva de Emergência?</h3>
        <p>É um valor guardado para cobrir gastos imprevistos ou perda de renda, sem precisar se endividar ou vender investimentos no momento errado.</p>

        <h3>💰 Quanto Guardar?</h3>
        
        <h4>Para CLT (funcionários):</h4>
        <ul>
          <li><strong>Mínimo:</strong> 3 meses de gastos essenciais</li>
          <li><strong>Ideal:</strong> 6 meses de gastos totais</li>
          <li><strong>Conservador:</strong> 12 meses</li>
        </ul>

        <h4>Para autônomos/empresários:</h4>
        <ul>
          <li><strong>Mínimo:</strong> 6 meses de gastos</li>
          <li><strong>Ideal:</strong> 12 meses</li>
          <li><strong>Conservador:</strong> 18 meses</li>
        </ul>

        <h3>🏦 Onde Investir a Reserva?</h3>
        
        <h4>Características necessárias:</h4>
        <ul>
          <li>Liquidez diária</li>
          <li>Baixo risco</li>
          <li>Rentabilidade acima da poupança</li>
        </ul>

        <h4>Melhores opções:</h4>
        <ul>
          <li><strong>Tesouro Selic:</strong> Segurança máxima, liquidez diária</li>
          <li><strong>CDB com liquidez diária:</strong> Rentabilidade superior</li>
          <li><strong>Conta remunerada:</strong> Para valores menores</li>
          <li><strong>Fundos DI:</strong> Diversificação automática</li>
        </ul>

        <h3>🔨 Como Construir Sua Reserva</h3>
        
        <h4>Passo a passo:</h4>
        <ol>
          <li><strong>Calcule seus gastos mensais essenciais</strong></li>
          <li><strong>Defina sua meta</strong> (3-12 meses)</li>
          <li><strong>Estabeleça um valor mensal</strong> para guardar</li>
          <li><strong>Automatize o processo</strong> com transferência automática</li>
          <li><strong>Mantenha em investimento seguro</strong> e líquido</li>
        </ol>

        <h4>Estratégia acelerada:</h4>
        <ul>
          <li>Use 13º salário e férias</li>
          <li>Inclua restituição do IR</li>
          <li>Monetize itens não utilizados</li>
          <li>Renda extra temporária</li>
        </ul>

        <h3>⚠️ Quando NÃO Usar a Reserva</h3>
        <ul>
          <li>Compra de bens de consumo</li>
          <li>Viagens de lazer</li>
          <li>Investimentos especulativos</li>
          <li>Pagamento de dívidas antigas</li>
        </ul>

        <h3>✅ Quando Usar a Reserva</h3>
        <ul>
          <li>Perda de emprego</li>
          <li>Emergências médicas</li>
          <li>Reparos urgentes (casa, carro)</li>
          <li>Redução significativa de renda</li>
        </ul>
      `
    }
  ];

  const categories = [
    { name: "Planejamento", icon: Target, count: 15, color: "text-blue-600" },
    { name: "Investimentos", icon: TrendingUp, count: 12, color: "text-green-600" },
    { name: "Dívidas", icon: CreditCard, count: 8, color: "text-red-600" },
    { name: "Impostos", icon: Briefcase, count: 6, color: "text-purple-600" },
    { name: "Aposentadoria", icon: PiggyBank, count: 10, color: "text-amber-600" },
    { name: "Empreendedorismo", icon: Coffee, count: 7, color: "text-orange-600" }
  ];

  const [selectedPost, setSelectedPost] = React.useState<number | null>(null);
  const [likedPosts, setLikedPosts] = React.useState<Set<number>>(new Set());

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              📚 Blog de Educação Financeira
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conteúdo técnico e prático para organizar suas finanças pessoais, investir com segurança e alcançar seus objetivos financeiros
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>Conteúdo Técnico</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>Estratégias Práticas</span>
              </div>
              <div className="flex items-center gap-1">
                <PiggyBank className="h-4 w-4" />
                <span>Resultados Reais</span>
              </div>
            </div>
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
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.readTime} de leitura
                            </div>
                          </div>
                          <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer"
                              onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}>
                            {post.title}
                          </h2>
                          <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <button 
                                onClick={() => toggleLike(post.id)}
                                className={`flex items-center gap-1 text-sm transition-colors ${
                                  likedPosts.has(post.id) ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
                                }`}
                              >
                                <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                              </button>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <MessageCircle className="h-4 w-4" />
                                {post.comments}
                              </div>
                              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                <Share2 className="h-4 w-4" />
                                Compartilhar
                              </button>
                            </div>
                            <Button 
                              variant="outline" 
                              onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                              className="group"
                            >
                              {selectedPost === post.id ? 'Fechar' : 'Ler Artigo'}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                          
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
                  <CardTitle>📂 Categorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-3">
                          <category.icon className={`h-5 w-5 ${category.color} group-hover:scale-110 transition-transform`} />
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
                  <CardTitle>🎯 Calculadoras Gratuitas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link to="/investimentos" className="block p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <h4 className="font-semibold text-blue-800">Simulador de Investimentos</h4>
                      <p className="text-sm text-blue-600">Calcule rendimentos de CDB, Tesouro e Poupança</p>
                    </Link>
                    <Link to="/planejamento-aposentadoria" className="block p-3 rounded-lg hover:bg-green-50 transition-colors">
                      <h4 className="font-semibold text-green-800">Planejamento de Aposentadoria</h4>
                      <p className="text-sm text-green-600">Descubra quanto precisa para se aposentar</p>
                    </Link>
                  </div>
                  <Link to="/utilitarios-financeiros" className="mt-4 block">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Todas as Calculadoras
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>📈 Mais Lidos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-sm text-gray-800">Como declarar Tesouro Direto no IR</h4>
                    <p className="text-xs text-gray-600">Guia Completo • 10 min</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-sm text-gray-800">CDB vs LCI: Qual rende mais?</h4>
                    <p className="text-xs text-gray-600">Comparativo • 8 min</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-sm text-gray-800">Fundos Imobiliários para iniciantes</h4>
                    <p className="text-xs text-gray-600">Investimentos • 12 min</p>
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

export default BlogFinancas;
