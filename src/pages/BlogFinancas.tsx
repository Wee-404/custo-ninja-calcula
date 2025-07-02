
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
      title: "Minha Jornada: Como Saí de R$ 15 mil em Dívidas em 18 Meses",
      excerpt: "A história real de Marina, de 28 anos, que conseguiu quitar todas as suas dívidas e ainda formar uma reserva de emergência. Spoiler: não foi fácil, mas foi possível!",
      category: "História Real",
      date: "2 de Janeiro, 2025",
      author: "Marina Santos",
      readTime: "12 min",
      image: "💪",
      likes: 847,
      comments: 156,
      content: `
        <div class="bg-blue-50 p-4 rounded-lg mb-6">
          <p><strong>📝 Nota da autora:</strong> Oi, pessoal! Sou a Marina, tenho 28 anos e trabalho como designer. Essa é minha história real de como consegui sair do vermelho. Espero que inspire vocês!</p>
        </div>

        <h3>🎯 Como tudo começou</h3>
        <p>Em 2023, eu estava com R$ 15.000 em dívidas divididas entre cartão de crédito, financiamento do carro e um empréstimo que fiz para uma emergência familiar. Dormia mal, vivia ansiosa e evitava olhar as notificações do banco.</p>
        
        <p><em>"O pior momento foi quando meu cartão foi negado no supermercado na frente de todo mundo. Ali eu decidi: chega!"</em></p>

        <h3>📊 Meu plano de ação (que você pode copiar)</h3>
        
        <h4>1. Mapeei tudo (mesmo com medo)</h4>
        <ul>
          <li>Cartão de crédito: R$ 8.500 (juros de 12% ao mês! 😱)</li>
          <li>Financiamento do carro: R$ 4.200</li>
          <li>Empréstimo pessoal: R$ 2.300</li>
        </ul>
        
        <h4>2. Priorei as dívidas mais caras</h4>
        <p>Foquei primeiro no cartão de crédito. Era a dívida que mais "comia" meu dinheiro todo mês.</p>
        
        <h4>3. Aumentei minha renda</h4>
        <p>Comecei a fazer freelances de design nos finais de semana. Não foi fácil abrir mão do descanso, mas era temporário.</p>
        
        <h4>4. Cortei gastos (mas sem neura)</h4>
        <p>Cancelei Netflix e Spotify por 6 meses, troquei academia por corrida no parque, e comecei a cozinhar mais em casa. Mas me permiti um cafézinho especial por semana - saúde mental também importa!</p>

        <h3>💝 O que aprendi no processo</h3>
        <p>O mais difícil não foi o dinheiro, foi o psicológico. Tive que aprender a perdoar meus erros passados e focar no futuro. E descobri que pequenas vitórias motivam muito!</p>
        
        <div class="bg-green-50 p-4 rounded-lg mt-6">
          <p><strong>✨ Resultado:</strong> Hoje tenho R$ 5.000 na poupança e durmo tranquila. Se eu consegui, você também consegue! 💚</p>
        </div>
      `
    },
    {
      id: 2,
      title: "Por Que Parei de Seguir Influencers de Investimento (E Você Deveria Considerar Também)",
      excerpt: "Reflexão honesta sobre a pressão das redes sociais para investir e como encontrei meu próprio caminho financeiro sem FOMO.",
      category: "Reflexão",
      date: "30 de Dezembro, 2024",
      author: "João Oliveira",
      readTime: "8 min",
      image: "🤔",
      likes: 523,
      comments: 89,
      content: `
        <p>Confesso: já fui viciado em stories de "gurus" financeiros. Todo dia via alguém mostrando os milhões que ganhou com cripto, ações ou sei lá o quê. E eu lá, com meus R$ 500 na poupança, me sentindo um fracasso.</p>

        <h3>🎭 A pressão das redes sociais</h3>
        <p>Sabe aquela sensação de que todo mundo está ficando rico menos você? Pois é. Eu vivia com FOMO (fear of missing out) financeiro. Resultado: fiz várias besteiras:</p>
        <ul>
          <li>Comprei criptomoedas que nem sabia o que eram</li>
          <li>Entrei em day trade sem conhecimento</li>
          <li>Perdi quase R$ 2.000 seguindo "dicas quentes"</li>
        </ul>

        <h3>💡 Minha mudança de mindset</h3>
        <p>O que me salvou foi entender que:</p>
        <ul>
          <li><strong>Cada pessoa tem sua realidade:</strong> O cara que ganha R$ 50k não vive a mesma vida que eu</li>
          <li><strong>Redes sociais mentem:</strong> Ninguém posta as perdas, só os ganhos</li>
          <li><strong>Devagar e sempre:</strong> Prefiro ganhar 10% ao ano com segurança que tentar 100% e perder tudo</li>
        </ul>

        <h3>🏗️ Minha estratégia atual (simples e funciona)</h3>
        <p>Hoje invisto assim:</p>
        <ul>
          <li>40% Tesouro Direto (segurança em primeiro lugar)</li>
          <li>30% Fundos de índice (diversificação automática)</li>
          <li>20% CDBs (liquidez para emergências)</li>
          <li>10% Ações individuais (só empresas que entendo)</li>
        </ul>

        <p><em>Não é glamouroso, não vou ficar rico do dia para a noite, mas durmo tranquilo. E isso não tem preço! 😴</em></p>
      `
    },
    {
      id: 3,
      title: "Orçamento Familiar com 3 Filhos: Como Sobrevivemos com R$ 4.500/mês",
      excerpt: "Dicas práticas de uma família real que consegue viver dignamente, pagar todas as contas e ainda guardar dinheiro para o futuro.",
      category: "Família",
      date: "28 de Dezembro, 2024",
      author: "Ana e Carlos Pereira",
      readTime: "15 min",
      image: "👨‍👩‍👧‍👦",
      likes: 1234,
      comments: 267,
      content: `
        <div class="bg-yellow-50 p-4 rounded-lg mb-6">
          <p><strong>👋 Oi! Somos Ana e Carlos</strong>, casados há 12 anos, pais da Sofia (9), do Miguel (6) e da pequena Laura (3). Vivemos em Curitiba e nossa renda familiar é de R$ 4.500. Sim, é apertado, mas dá sim!</p>
        </div>

        <h3>💰 Como dividimos nosso orçamento</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <ul>
            <li><strong>Moradia (R$ 1.350 - 30%):</strong> Aluguel, condomínio, água, luz</li>
            <li><strong>Alimentação (R$ 900 - 20%):</strong> Mercado, feira, gás</li>
            <li><strong>Transporte (R$ 450 - 10%):</strong> Ônibus, uber eventual</li>
            <li><strong>Crianças (R$ 675 - 15%):</strong> Escola, roupas, remédios</li>
            <li><strong>Reserva (R$ 450 - 10%):</strong> Emergência e sonhos</li>
            <li><strong>Pessoal (R$ 675 - 15%):</strong> Lazer, presentes, extras</li>
          </ul>
        </div>

        <h3>🛒 Nossas estratégias de economia</h3>
        
        <h4>No mercado:</h4>
        <ul>
          <li>Feira aos sábados (50% mais barato que supermercado)</li>
          <li>Lista de compras religiosa (zero impulso)</li>
          <li>Marca própria em produtos básicos</li>
          <li>Compras em atacado para não perecíveis</li>
        </ul>

        <h4>Com as crianças:</h4>
        <ul>
          <li>Roupas: brechós e promoções de fim de estação</li>
          <li>Brinquedos: aniversário e Natal (mas com limite)</li>
          <li>Diversão: parques públicos, biblioteca, praia</li>
        </ul>

        <h3>💡 Dicas que funcionam DE VERDADE</h3>
        <ol>
          <li><strong>Cozinhamos em casa:</strong> Economizamos R$ 600/mês vs delivery</li>
          <li><strong>Mesada familiar:</strong> Cada um tem R$ 50/mês para gastos bobos</li>
          <li><strong>Mês do "não gasto":</strong> Uma vez por trimestre, só o essencial</li>
          <li><strong>Planilha visual:</strong> Gráficos que as crianças entendem</li>
        </ol>

        <h3>🎯 Nossos sonhos e metas</h3>
        <p>Todo mundo precisa sonhar, né? Os nossos:</p>
        <ul>
          <li>2025: Financiar um carro usado</li>
          <li>2027: Entrada da casa própria</li>
          <li>2030: Faculdade das crianças garantida</li>
        </ul>

        <div class="bg-green-50 p-4 rounded-lg mt-6">
          <p><strong>💚 Mensagem final:</strong> Não é sobre quanto você ganha, é sobre como você usa o que tem. Com planejamento, carinho e muita conversa, nossa família é rica do jeito que importa! ✨</p>
        </div>
      `
    },
    {
      id: 4,
      title: "Aposentadoria aos 35: Sonho ou Realidade? Minha Experiência Real",
      excerpt: "Como um desenvolvedor conseguiu se aposentar aos 35 anos com planejamento, disciplina e algumas estratégias não convencionais.",
      category: "Aposentadoria",
      date: "25 de Dezembro, 2024",
      author: "Pedro Costa",
      readTime: "18 min",
      image: "🏖️",
      likes: 892,
      comments: 203,
      content: `
        <p>Oi pessoal! Me chamo Pedro, tenho 37 anos e oficialmente me "aposentei" aos 35. Spoiler: não sou herdeiro nem ganhei na loteria. Sou (era) desenvolvedor e planejei isso por 12 anos.</p>

        <h3>🎯 Minha estratégia FIRE (Financial Independence, Retire Early)</h3>
        <p>A ideia é simples: viver com muito menos do que ganha e investir a diferença até ter 25x seus gastos anuais investidos.</p>

        <h4>Meus números:</h4>
        <ul>
          <li>Gastos anuais: R$ 48.000 (R$ 4.000/mês)</li>
          <li>Meta de investimentos: R$ 1.200.000</li>
          <li>Tempo para atingir: 12 anos</li>
        </ul>

        <h3>💼 Como aumentei minha renda</h3>
        <ol>
          <li><strong>Carreira tech:</strong> Investi pesado em aprender programação</li>
          <li><strong>Freelances:</strong> Trabalhava nos finais de semana</li>
          <li><strong>Produtos digitais:</strong> Criei cursos online</li>
          <li><strong>Renda passiva:</strong> Aluguéis e dividendos</li>
        </ol>

        <h3>✂️ Como cortei gastos (sem virar um eremita)</h3>
        <ul>
          <li>Morei com roommates até os 30</li>
          <li>Carro usado e bem cuidado</li>
          <li>Viagens com milhas e promoções</li>
          <li>Cozinhava 90% das refeições</li>
          <li>Mas: nunca deixei de me divertir!</li>
        </ul>

        <h3>📈 Minha carteira de investimentos</h3>
        <ul>
          <li>60% Ações (FIIs + individuais + fundos)</li>
          <li>25% Renda fixa (Tesouro + CDBs)</li>
          <li>10% Internacional (ETFs americanos)</li>
          <li>5% Reserva de oportunidade</li>
        </ul>

        <h3>🤔 Aposentadoria aos 35: vale a pena?</h3>
        <p><strong>Prós:</strong></p>
        <ul>
          <li>Liberdade total de tempo</li>
          <li>Zero estresse com chefe</li>
          <li>Posso focar no que amo</li>
        </ul>

        <p><strong>Contras:</strong></p>
        <ul>
          <li>Sacrifiquei muito dos 23 aos 35</li>
          <li>Pressão social ("você não trabalha?")</li>
          <li>Disciplina extrema necessária</li>
        </ul>

        <div class="bg-blue-50 p-4 rounded-lg mt-6">
          <p><strong>🎯 Dica final:</strong> FIRE não é para todo mundo, mas os princípios sim: viver abaixo do que ganha, investir consistentemente e ter objetivos claros. Mesmo que não se aposente aos 35, você terá muito mais liberdade financeira! 💪</p>
        </div>
      `
    },
    {
      id: 5,
      title: "Meu Primeiro Ano Como MEI: Erros, Acertos e Quanto Realmente Lucrei",
      excerpt: "A jornada honesta de quem saiu do CLT para abrir o próprio negócio. Spoiler: não foi só alegria, mas valeu a pena!",
      category: "Empreendedorismo",
      date: "20 de Dezembro, 2024",
      author: "Carla Mendes",
      readTime: "14 min",
      image: "🚀",
      likes: 656,
      comments: 134,
      content: `
        <p>Oi, gente! Sou a Carla, tenho 31 anos e há um ano larguei meu emprego na área de marketing para virar MEI. Todo mundo me chamou de louca, mas... bom, vou contar como foi!</p>

        <h3>💼 Por que saí do CLT</h3>
        <p>Trabalhava numa empresa média, ganhava R$ 3.500 líquidos, mas estava infeliz. Sempre tive vontade de trabalhar por conta própria e a pandemia me fez repensar prioridades.</p>

        <h3>📊 Meus números do primeiro ano</h3>
        <div class="bg-gray-50 p-4 rounded-lg">
          <h4>Faturamento mensal (média):</h4>
          <ul>
            <li>Jan-Mar: R$ 1.800 (quase desisti!)</li>
            <li>Abr-Jun: R$ 2.800 (começou a decolar)</li>
            <li>Jul-Set: R$ 4.200 (melhor fase)</li>
            <li>Out-Dez: R$ 3.600 (estabilizou)</li>
          </ul>
          
          <h4>Gastos mensais (média): R$ 800</h4>
          <ul>
            <li>DAS MEI: R$ 67</li>
            <li>Contador: R$ 150</li>
            <li>Ferramentas: R$ 200</li>
            <li>Marketing: R$ 300</li>
            <li>Outros: R$ 83</li>
          </ul>
        </div>

        <h3>😅 Meus maiores erros</h3>
        <ol>
          <li><strong>Não separei pessoa física de jurídica:</strong> Bagunça total no começo</li>
          <li><strong>Precifiquei errado:</strong> Cobrava muito barato</li>
          <li><strong>Não tinha reserva:</strong> Os primeiros meses foram tensos</li>
          <li><strong>Misturei amizade com negócios:</strong> Aprendi da pior forma</li>
        </ol>

        <h3>✅ O que deu super certo</h3>
        <ul>
          <li>Networking: 70% dos clientes vieram de indicação</li>
          <li>Especialização: Foquei em redes sociais para dentistas</li>
          <li>Organização: Planilhas salvaram minha vida</li>
          <li>Capacitação: Investi em cursos todo mês</li>
        </ul>

        <h3>💰 Balanço financeiro real</h3>
        <p><strong>Lucro líquido médio mensal:</strong> R$ 2.800</p>
        <p>Parece menos que meu salário anterior, mas:</p>
        <ul>
          <li>Trabalho de casa (economizo transporte/almoço)</li>
          <li>Flexibilidade total de horários</li>
          <li>Potencial de crescimento muito maior</li>
          <li>Satisfação pessoal que não tem preço</li>
        </ul>

        <h3>🎯 Planos para 2025</h3>
        <ul>
          <li>Meta: R$ 6.000/mês de faturamento</li>
          <li>Contratar uma assistente</li>
          <li>Lançar um curso online</li>
          <li>Migrar para ME (se necessário)</li>
        </ul>

        <div class="bg-purple-50 p-4 rounded-lg mt-6">
          <p><strong>💜 Para quem está pensando em empreender:</strong> É assustador, é difícil, mas é libertador. Se você tem uma reserva de 6 meses e muita determinação, vale a tentativa. Só não romantize - é trabalho pra caramba! 😄</p>
        </div>
      `
    }
  ];

  const categories = [
    { name: "História Real", icon: Heart, count: 8, color: "text-red-600" },
    { name: "Reflexão", icon: Coffee, count: 6, color: "text-amber-600" },
    { name: "Família", icon: Users, count: 12, color: "text-green-600" },
    { name: "Aposentadoria", icon: Target, count: 4, color: "text-blue-600" },
    { name: "Empreendedorismo", icon: Briefcase, count: 10, color: "text-purple-600" },
    { name: "Investimentos", icon: TrendingUp, count: 15, color: "text-indigo-600" },
    { name: "Planejamento", icon: PiggyBank, count: 18, color: "text-emerald-600" },
    { name: "Dívidas", icon: CreditCard, count: 9, color: "text-orange-600" }
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
              📚 Blog de Finanças Pessoais
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais, experiências autênticas e conselhos práticos de pessoas como você que estão transformando sua vida financeira
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>Histórias Reais</span>
              </div>
              <div className="flex items-center gap-1">
                <Coffee className="h-4 w-4" />
                <span>Experiências Autênticas</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                <span>Dicas Práticas</span>
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
                              {selectedPost === post.id ? 'Fechar' : 'Ler História'}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                          
                          {selectedPost === post.id && (
                            <div className="mt-6 pt-6 border-t prose prose-sm max-w-none">
                              <div dangerouslySetInnerHTML={{ __html: post.content }} />
                              
                              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-800 mb-2">💬 Conte sua história também!</h4>
                                <p className="text-sm text-blue-700">
                                  Tem uma experiência financeira para compartilhar? Entre em contato conosco! 
                                  Adoramos histórias reais que podem inspirar outras pessoas.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      📝 Quer compartilhar sua história?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Sua experiência pode inspirar milhares de pessoas! Contamos histórias reais de pessoas que transformaram suas finanças.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Enviar Minha História
                    </Button>
                  </CardContent>
                </Card>
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
                  <CardTitle>💡 Dica da Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Regra dos 5 Minutos</h4>
                    <p className="text-sm text-green-700 mb-4">
                      Antes de fazer qualquer compra acima de R$ 100, espere 5 minutos e se pergunte: 
                      "Eu realmente preciso disso agora?" Funciona em 80% dos casos!
                    </p>
                  </div>
                  <Link to="/utilitarios-financeiros" className="mt-4 block">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Calculadoras Gratuitas
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>🔥 Mais Lidos da Semana</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-sm text-gray-800">Como economizar R$ 500/mês no supermercado</h4>
                    <p className="text-xs text-gray-600">Marina Santos • 15 min</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-sm text-gray-800">Meu primeiro milhão: história de um professor</h4>
                    <p className="text-xs text-gray-600">João Silva • 20 min</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-sm text-gray-800">Aposentadoria aos 40: é possível?</h4>
                    <p className="text-xs text-gray-600">Ana Costa • 12 min</p>
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
