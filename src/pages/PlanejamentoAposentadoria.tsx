
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiggyBank, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const PlanejamentoAposentadoria = () => {
  const [valores, setValores] = useState({
    idadeAtual: '',
    idadeAposentadoria: '',
    rendaDesejada: '',
    valorAtual: '',
    aportesMensais: '',
    taxaJuros: '',
    inflacao: ''
  });

  const [resultado, setResultado] = useState<any>(null);

  const calcularAposentadoria = () => {
    const idadeAtual = parseFloat(valores.idadeAtual);
    const idadeAposentadoria = parseFloat(valores.idadeAposentadoria);
    const rendaDesejada = parseFloat(valores.rendaDesejada);
    const valorAtual = parseFloat(valores.valorAtual) || 0;
    const aportesMensais = parseFloat(valores.aportesMensais) || 0;
    const taxaJuros = parseFloat(valores.taxaJuros) / 100 / 12;
    const inflacao = parseFloat(valores.inflacao) / 100;

    const tempoContribuicao = (idadeAposentadoria - idadeAtual) * 12;
    
    // Valor futuro com aportes mensais
    const valorComAportes = valorAtual * Math.pow(1 + taxaJuros, tempoContribuicao) +
      aportesMensais * ((Math.pow(1 + taxaJuros, tempoContribuicao) - 1) / taxaJuros);

    // Renda ajustada pela inflação
    const rendaAjustada = rendaDesejada * Math.pow(1 + inflacao, idadeAposentadoria - idadeAtual);

    // Valor necessário para aposentadoria (regra dos 4%)
    const valorNecessario = rendaAjustada * 12 / 0.04;

    // Diferença
    const diferenca = valorComAportes - valorNecessario;

    setResultado({
      valorComAportes,
      valorNecessario,
      rendaAjustada,
      diferenca,
      tempoContribuicao: tempoContribuicao / 12
    });
  };

  const handleInputChange = (campo: string, valor: string) => {
    setValores(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <PiggyBank className="h-10 w-10 text-blue-600" />
              Planejamento de Aposentadoria
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calcule quanto você precisa economizar para ter a aposentadoria dos seus sonhos
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-6 w-6" />
                    Dados para Cálculo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Idade Atual
                      </label>
                      <Input
                        type="number"
                        placeholder="30"
                        value={valores.idadeAtual}
                        onChange={(e) => handleInputChange('idadeAtual', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Idade para Aposentadoria
                      </label>
                      <Input
                        type="number"
                        placeholder="65"
                        value={valores.idadeAposentadoria}
                        onChange={(e) => handleInputChange('idadeAposentadoria', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Renda Mensal Desejada (R$)
                      </label>
                      <Input
                        type="number"
                        placeholder="5000"
                        value={valores.rendaDesejada}
                        onChange={(e) => handleInputChange('rendaDesejada', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor Atual Investido (R$)
                      </label>
                      <Input
                        type="number"
                        placeholder="10000"
                        value={valores.valorAtual}
                        onChange={(e) => handleInputChange('valorAtual', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Aportes Mensais (R$)
                      </label>
                      <Input
                        type="number"
                        placeholder="500"
                        value={valores.aportesMensais}
                        onChange={(e) => handleInputChange('aportesMensais', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Taxa de Juros (% ao ano)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="10.5"
                        value={valores.taxaJuros}
                        onChange={(e) => handleInputChange('taxaJuros', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Inflação (% ao ano)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="4"
                        value={valores.inflacao}
                        onChange={(e) => handleInputChange('inflacao', e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={calcularAposentadoria} className="w-full" size="lg">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Calcular Planejamento
                  </Button>
                </CardContent>
              </Card>

              {resultado && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-green-600">Resultado do Planejamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-blue-800 mb-2">Valor Acumulado</h3>
                          <p className="text-2xl font-bold text-blue-600">
                            R$ {resultado.valorComAportes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-purple-800 mb-2">Valor Necessário</h3>
                          <p className="text-2xl font-bold text-purple-600">
                            R$ {resultado.valorNecessario.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-amber-800 mb-2">Renda Ajustada (Inflação)</h3>
                          <p className="text-2xl font-bold text-amber-600">
                            R$ {resultado.rendaAjustada.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg ${resultado.diferenca >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                          <h3 className={`font-semibold mb-2 ${resultado.diferenca >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                            {resultado.diferenca >= 0 ? 'Sobra' : 'Falta'}
                          </h3>
                          <p className={`text-2xl font-bold ${resultado.diferenca >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            R$ {Math.abs(resultado.diferenca).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <strong>Tempo de contribuição:</strong> {resultado.tempoContribuicao.toFixed(0)} anos
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        * Cálculo baseado na regra dos 4% para aposentadoria e considera inflação acumulada.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <CoursePromo />
              <AdBanner size="medium" />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dicas para Aposentadoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Comece Cedo</h4>
                      <p className="text-xs text-gray-600">O poder dos juros compostos funciona melhor com tempo</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Seja Consistente</h4>
                      <p className="text-xs text-gray-600">Aportes regulares são mais eficazes que valores altos esporádicos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
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
