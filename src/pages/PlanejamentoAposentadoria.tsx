
import React, { useState } from 'react';
import Layout from '../components/Layout';
import GoogleAdSense from '../components/GoogleAdSense';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiggyBank, TrendingUp, Target } from 'lucide-react';

const PlanejamentoAposentadoria = () => {
  const [dados, setDados] = useState({
    idadeAtual: '',
    idadeAposentadoria: '',
    rendaDesejada: '',
    patrimonioAtual: '',
    aportesMensais: '',
    taxaJuros: '12',
    inflacao: '4'
  });

  const [resultado, setResultado] = useState<any>(null);

  const calcularAposentadoria = () => {
    const idadeAtual = parseInt(dados.idadeAtual);
    const idadeAposentadoria = parseInt(dados.idadeAposentadoria);
    const rendaDesejada = parseFloat(dados.rendaDesejada);
    const patrimonioAtual = parseFloat(dados.patrimonioAtual) || 0;
    const aportesMensais = parseFloat(dados.aportesMensais) || 0;
    const taxaJuros = parseFloat(dados.taxaJuros) / 100;
    const inflacao = parseFloat(dados.inflacao) / 100;

    if (!idadeAtual || !idadeAposentadoria || !rendaDesejada) return;

    const anosParaAposentadoria = idadeAposentadoria - idadeAtual;
    const mesesParaAposentadoria = anosParaAposentadoria * 12;
    
    // Taxa real (descontando inflação)
    const taxaReal = (1 + taxaJuros/12) / (1 + inflacao/12) - 1;
    
    // Valor necessário na aposentadoria (considerando inflação)
    const valorNecessario = rendaDesejada * Math.pow(1 + inflacao, anosParaAposentadoria) / (taxaReal * 12);
    
    // Valor futuro do patrimônio atual
    const valorFuturoPatrimonio = patrimonioAtual * Math.pow(1 + taxaJuros/12, mesesParaAposentadoria);
    
    // Valor futuro dos aportes mensais
    const valorFuturoAportes = aportesMensais * (Math.pow(1 + taxaJuros/12, mesesParaAposentadoria) - 1) / (taxaJuros/12);
    
    const totalAcumulado = valorFuturoPatrimonio + valorFuturoAportes;
    const deficit = valorNecessario - totalAcumulado;
    
    setResultado({
      anosParaAposentadoria,
      valorNecessario,
      totalAcumulado,
      deficit,
      situacao: deficit <= 0 ? 'adequado' : 'insuficiente',
      aporteNecessario: deficit > 0 ? deficit / ((Math.pow(1 + taxaJuros/12, mesesParaAposentadoria) - 1) / (taxaJuros/12)) : 0
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <PiggyBank className="h-10 w-10 text-blue-600" />
              Planejamento de Aposentadoria
            </h1>
            <p className="text-xl text-gray-600">
              Calcule quanto precisa investir para ter a aposentadoria dos seus sonhos
            </p>
          </div>

          <GoogleAdSense 
            adSlot="1234567890"
            adFormat="auto"
            style={{ display: 'block', margin: '32px 0' }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Seus Dados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Idade Atual</label>
                      <Input
                        type="number"
                        placeholder="30"
                        value={dados.idadeAtual}
                        onChange={(e) => setDados({...dados, idadeAtual: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Idade para Aposentar</label>
                      <Input
                        type="number"
                        placeholder="65"
                        value={dados.idadeAposentadoria}
                        onChange={(e) => setDados({...dados, idadeAposentadoria: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Renda Mensal Desejada (hoje)</label>
                    <Input
                      type="number"
                      placeholder="5000"
                      value={dados.rendaDesejada}
                      onChange={(e) => setDados({...dados, rendaDesejada: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Patrimônio Atual</label>
                    <Input
                      type="number"
                      placeholder="50000"
                      value={dados.patrimonioAtual}
                      onChange={(e) => setDados({...dados, patrimonioAtual: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Aportes Mensais</label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={dados.aportesMensais}
                      onChange={(e) => setDados({...dados, aportesMensais: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Taxa de Juros Anual (%)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={dados.taxaJuros}
                        onChange={(e) => setDados({...dados, taxaJuros: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Inflação Anual (%)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={dados.inflacao}
                        onChange={(e) => setDados({...dados, inflacao: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button onClick={calcularAposentadoria} className="w-full" size="lg">
                    <Target className="h-5 w-5 mr-2" />
                    Calcular Aposentadoria
                  </Button>
                </CardContent>
              </Card>

              {resultado && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className={resultado.situacao === 'adequado' ? 'text-green-600' : 'text-red-600'}>
                      Resultado da Análise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-blue-800">Tempo para Aposentadoria</h3>
                          <p className="text-2xl font-bold text-blue-600">{resultado.anosParaAposentadoria} anos</p>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-purple-800">Valor Necessário</h3>
                          <p className="text-2xl font-bold text-purple-600">
                            R$ {resultado.valorNecessario.toLocaleString('pt-BR', {maximumFractionDigits: 0})}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-green-800">Total Acumulado</h3>
                          <p className="text-2xl font-bold text-green-600">
                            R$ {resultado.totalAcumulado.toLocaleString('pt-BR', {maximumFractionDigits: 0})}
                          </p>
                        </div>

                        {resultado.deficit > 0 ? (
                          <div className="bg-red-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-red-800">Déficit</h3>
                            <p className="text-2xl font-bold text-red-600">
                              R$ {resultado.deficit.toLocaleString('pt-BR', {maximumFractionDigits: 0})}
                            </p>
                            <p className="text-sm text-red-600 mt-2">
                              Aporte necessário: R$ {resultado.aporteNecessario.toLocaleString('pt-BR', {maximumFractionDigits: 0})}/mês
                            </p>
                          </div>
                        ) : (
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-green-800">✅ Meta Atingida!</h3>
                            <p className="text-sm text-green-600">Você está no caminho certo para sua aposentadoria</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <CoursePromo />
              <GoogleAdSense 
                adSlot="2345678901"
                adFormat="rectangle"
                style={{ display: 'block' }}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💡 Dicas Importantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Comece Cedo</h4>
                      <p className="text-xs text-gray-600">Quanto antes começar, menor o esforço necessário</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Diversifique</h4>
                      <p className="text-xs text-gray-600">Não coloque todos os ovos na mesma cesta</p>
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

export default PlanejamentoAposentadoria;
