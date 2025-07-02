
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChefHat, Cake, Wrench, Calculator, TrendingUp, Target } from 'lucide-react';

const EmpreendedorismoLocal = () => {
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [custos, setCustos] = useState({
    materiais: '',
    maoDeObra: '',
    fixos: '',
    impostos: '',
    outros: ''
  });
  const [margemLucro, setMargemLucro] = useState('40');
  const [quantidadeMensal, setQuantidadeMensal] = useState('100');
  const [resultado, setResultado] = useState<any>(null);

  const tiposNegocio = [
    { 
      id: 'alimentacao', 
      nome: 'Alimentação', 
      icon: ChefHat, 
      exemplos: ['Marmitas', 'Salgados', 'Bolos', 'Lanches'],
      custosMedios: { materiais: 8, maoDeObra: 5, fixos: 2 }
    },
    { 
      id: 'doces', 
      nome: 'Confeitaria', 
      icon: Cake, 
      exemplos: ['Brigadeiros', 'Tortas', 'Cupcakes', 'Docinhos'],
      custosMedios: { materiais: 3, maoDeObra: 4, fixos: 1 }
    },
    { 
      id: 'servicos', 
      nome: 'Serviços', 
      icon: Wrench, 
      exemplos: ['Consertos', 'Limpeza', 'Aulas', 'Consultoria'],
      custosMedios: { materiais: 5, maoDeObra: 15, fixos: 3 }
    }
  ];

  const calcularPrecificacao = () => {
    const totalCustos = Object.values(custos).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    const margem = parseFloat(margemLucro) / 100;
    const precoVenda = totalCustos / (1 - margem);
    const lucroUnitario = precoVenda - totalCustos;
    const quantidade = parseInt(quantidadeMensal) || 1;
    
    const faturamentoMensal = precoVenda * quantidade;
    const custoMensal = totalCustos * quantidade;
    const lucroMensal = lucroUnitario * quantidade;

    setResultado({
      totalCustos,
      precoVenda,
      lucroUnitario,
      margemLucro: margem * 100,
      faturamentoMensal,
      custoMensal,
      lucroMensal,
      quantidade
    });
  };

  const preencherExemplo = () => {
    const negocio = tiposNegocio.find(n => n.id === tipoNegocio);
    if (!negocio) return;

    setCustos({
      materiais: negocio.custosMedios.materiais.toString(),
      maoDeObra: negocio.custosMedios.maoDeObra.toString(),
      fixos: negocio.custosMedios.fixos.toString(),
      impostos: '2',
      outros: '1'
    });
  };

  const resetForm = () => {
    setCustos({
      materiais: '',
      maoDeObra: '',
      fixos: '',
      impostos: '',
      outros: ''
    });
    setResultado(null);
  };

  const negocioSelecionado = tiposNegocio.find(n => n.id === tipoNegocio);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🚀 Empreendedorismo & Precificação
            </h1>
            <p className="text-xl text-gray-600">
              Calcule preços justos e lucrativos para seu negócio local
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!tipoNegocio ? (
                <Card>
                  <CardHeader>
                    <CardTitle>🎯 Escolha seu Segmento</CardTitle>
                    <p className="text-gray-600">Selecione o tipo de negócio para cálculos mais precisos</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {tiposNegocio.map((tipo) => {
                        const IconComponent = tipo.icon;
                        return (
                          <Button
                            key={tipo.id}
                            variant="outline"
                            className="h-40 flex flex-col items-center justify-center space-y-3 hover:border-blue-500"
                            onClick={() => setTipoNegocio(tipo.id)}
                          >
                            <IconComponent className="h-10 w-10 text-blue-600" />
                            <div className="text-center">
                              <span className="font-semibold block">{tipo.nome}</span>
                              <span className="text-xs text-gray-500">
                                {tipo.exemplos.slice(0, 2).join(', ')}...
                              </span>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                          {negocioSelecionado && <negocioSelecionado.icon className="h-6 w-6" />}
                          Calculadora - {negocioSelecionado?.nome}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={preencherExemplo}>
                            Exemplo
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setTipoNegocio('')}>
                            Trocar
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Exemplos: {negocioSelecionado?.exemplos.join(', ')}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            🛍️ Materiais/Ingredientes (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="15.00"
                            value={custos.materiais}
                            onChange={(e) => setCustos({...custos, materiais: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            👷 Mão de Obra (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="20.00"
                            value={custos.maoDeObra}
                            onChange={(e) => setCustos({...custos, maoDeObra: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            🏠 Custos Fixos (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="5.00"
                            value={custos.fixos}
                            onChange={(e) => setCustos({...custos, fixos: e.target.value})}
                          />
                          <p className="text-xs text-gray-500 mt-1">Aluguel, energia, gás rateados</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            📋 Impostos/Taxas (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="2.00"
                            value={custos.impostos}
                            onChange={(e) => setCustos({...custos, impostos: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            ➕ Outros Custos (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="3.00"
                            value={custos.outros}
                            onChange={(e) => setCustos({...custos, outros: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            📈 Margem de Lucro (%)
                          </label>
                          <Input
                            type="number"
                            step="1"
                            value={margemLucro}
                            onChange={(e) => setMargemLucro(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          📊 Quantidade Mensal Estimada
                        </label>
                        <Input
                          type="number"
                          value={quantidadeMensal}
                          onChange={(e) => setQuantidadeMensal(e.target.value)}
                          placeholder="100"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button onClick={calcularPrecificacao} className="flex-1">
                          <Calculator className="h-4 w-4 mr-2" />
                          Calcular Preço
                        </Button>
                        <Button onClick={resetForm} variant="outline">
                          Limpar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {resultado && (
                    <Card className="mt-6 border-2 border-green-500">
                      <CardHeader className="bg-green-50">
                        <CardTitle className="text-green-800 flex items-center gap-2">
                          <Target className="h-6 w-6" />
                          Análise de Precificação
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-4 bg-red-50 rounded-lg">
                            <h3 className="font-semibold text-red-800 mb-1">Custo Total</h3>
                            <p className="text-xl font-bold text-red-600">
                              R$ {resultado.totalCustos.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-1">Lucro Unitário</h3>
                            <p className="text-xl font-bold text-blue-600">
                              R$ {resultado.lucroUnitario.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <h3 className="font-semibold text-green-800 mb-1">Preço de Venda</h3>
                            <p className="text-2xl font-bold text-green-600">
                              R$ {resultado.precoVenda.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <h3 className="font-semibold text-purple-800 mb-1">Lucro Mensal</h3>
                            <p className="text-xl font-bold text-purple-600">
                              R$ {resultado.lucroMensal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                              <TrendingUp className="h-5 w-5" />
                              📊 Projeção Mensal
                            </h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Faturamento:</span>
                                <span className="font-semibold">R$ {resultado.faturamentoMensal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Custos totais:</span>
                                <span className="font-semibold text-red-600">R$ {resultado.custoMensal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between border-t pt-2">
                                <span>Lucro líquido:</span>
                                <span className="font-bold text-green-600">R$ {resultado.lucroMensal.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                            <h3 className="font-semibold text-gray-800 mb-3">🎯 Recomendações</h3>
                            <div className="space-y-2 text-sm">
                              {resultado.margemLucro < 30 && (
                                <p className="text-amber-600">⚠️ Margem baixa. Considere aumentar para 30-50%</p>
                              )}
                              {resultado.margemLucro >= 30 && resultado.margemLucro <= 50 && (
                                <p className="text-green-600">✅ Margem adequada para negócios locais</p>
                              )}
                              {resultado.margemLucro > 50 && (
                                <p className="text-blue-600">💡 Margem alta. Verifique competitividade</p>
                              )}
                              <p className="text-gray-600">
                                💰 Break-even: {Math.ceil(resultado.custoMensal / resultado.lucroUnitario)} unidades/mês
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>

            <div className="space-y-6">
              <CoursePromo />
              <AdBanner size="medium" />
              
              {negocioSelecionado && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">💡 Dicas - {negocioSelecionado.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold text-gray-800">📋 Custos Essenciais:</h4>
                      <ul className="space-y-1 text-gray-600 ml-2">
                        <li>• Matéria-prima de qualidade</li>
                        <li>• Embalagens adequadas</li>
                        <li>• Tempo de produção realista</li>
                        <li>• Custos fixos rateados</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">🎯 Estratégias:</h4>
                      <ul className="space-y-1 text-gray-600 ml-2">
                        <li>• Pesquise a concorrência local</li>
                        <li>• Teste preços gradualmente</li>
                        <li>• Ofereça combos e promoções</li>
                        <li>• Fidelize clientes com qualidade</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmpreendedorismoLocal;
