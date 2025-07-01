
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChefHat, Cake, Wrench, Calculator } from 'lucide-react';

const EmpreendedorismoLocal = () => {
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [custos, setCustos] = useState({
    ingredientes: '',
    embalagem: '',
    gas: '',
    tempo: '',
    outros: ''
  });
  const [margemLucro, setMargemLucro] = useState('30');
  const [resultado, setResultado] = useState<any>(null);

  const tiposNegocio = [
    { id: 'marmita', nome: 'Marmitas', icon: ChefHat, dicas: ['Calcule ingredientes por porção', 'Considere embalagem e gás', 'Defina raio de entrega'] },
    { id: 'doces', nome: 'Doces', icon: Cake, dicas: ['Precifique por unidade', 'Considere ingredientes especiais', 'Calcule tempo de preparo'] },
    { id: 'servicos', nome: 'Serviços Autônomos', icon: Wrench, dicas: ['Calcule hora trabalhada', 'Inclua deslocamento', 'Considere ferramentas/materiais'] }
  ];

  const calcularPrecificacao = () => {
    const totalCustos = Object.values(custos).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    const margem = parseFloat(margemLucro) / 100;
    const precoVenda = totalCustos * (1 + margem);
    const lucroUnitario = precoVenda - totalCustos;

    setResultado({
      totalCustos,
      precoVenda,
      lucroUnitario,
      margemLucro: margem * 100
    });
  };

  const resetForm = () => {
    setCustos({
      ingredientes: '',
      embalagem: '',
      gas: '',
      tempo: '',
      outros: ''
    });
    setResultado(null);
  };

  const negocioSelecionado = tiposNegocio.find(n => n.id === tipoNegocio);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🚀 Empreendedorismo Local
            </h1>
            <p className="text-xl text-gray-600">
              Precifique seus produtos e serviços de forma inteligente
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!tipoNegocio ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Escolha seu Tipo de Negócio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {tiposNegocio.map((tipo) => {
                        const IconComponent = tipo.icon;
                        return (
                          <Button
                            key={tipo.id}
                            variant="outline"
                            className="h-32 flex flex-col items-center justify-center space-y-2"
                            onClick={() => setTipoNegocio(tipo.id)}
                          >
                            <IconComponent className="h-8 w-8" />
                            <span className="font-semibold">{tipo.nome}</span>
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
                          Calculadora para {negocioSelecionado?.nome}
                        </CardTitle>
                        <Button variant="outline" size="sm" onClick={() => setTipoNegocio('')}>
                          Trocar
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            💰 {tipoNegocio === 'marmita' ? 'Ingredientes' : tipoNegocio === 'doces' ? 'Ingredientes' : 'Materiais'} (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="15.00"
                            value={custos.ingredientes}
                            onChange={(e) => setCustos({...custos, ingredientes: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            📦 {tipoNegocio === 'servicos' ? 'Ferramentas/Equipamentos' : 'Embalagem'} (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="2.00"
                            value={custos.embalagem}
                            onChange={(e) => setCustos({...custos, embalagem: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            ⚡ {tipoNegocio === 'servicos' ? 'Deslocamento' : 'Gás/Energia'} (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="3.00"
                            value={custos.gas}
                            onChange={(e) => setCustos({...custos, gas: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            ⏰ Tempo (valor/hora) (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="20.00"
                            value={custos.tempo}
                            onChange={(e) => setCustos({...custos, tempo: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            📋 Outros custos (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="5.00"
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
                        <CardTitle className="text-green-800">💰 Resultado da Precificação</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-red-50 rounded-lg">
                            <h3 className="font-semibold text-red-800 mb-1">Custo Total</h3>
                            <p className="text-2xl font-bold text-red-600">
                              R$ {resultado.totalCustos.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-1">Lucro</h3>
                            <p className="text-2xl font-bold text-blue-600">
                              R$ {resultado.lucroUnitario.toFixed(2)}
                            </p>
                          </div>
                          
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <h3 className="font-semibold text-green-800 mb-1">Preço de Venda</h3>
                            <p className="text-3xl font-bold text-green-600">
                              R$ {resultado.precoVenda.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                          <h3 className="font-semibold text-gray-800 mb-2">📊 Análise</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">Margem de lucro:</span>
                              <span className="font-semibold ml-2">{resultado.margemLucro.toFixed(1)}%</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Lucro por unidade:</span>
                              <span className="font-semibold ml-2">R$ {resultado.lucroUnitario.toFixed(2)}</span>
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
                    <CardTitle className="text-lg">💡 Dicas para {negocioSelecionado.nome}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {negocioSelecionado.dicas.map((dica, index) => (
                      <p key={index} className="text-sm text-gray-600">• {dica}</p>
                    ))}
                  </CardContent>
                </Card>
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🎯 Dicas Gerais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>📊 Pesquise o mercado:</strong> Veja preços da concorrência</p>
                  <p><strong>🎯 Conheça seu público:</strong> Adeque preços ao poder de compra</p>
                  <p><strong>📈 Teste preços:</strong> Comece conservador e ajuste</p>
                  <p><strong>💰 Controle custos:</strong> Revise periodicamente</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmpreendedorismoLocal;
