import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PiggyBank, TrendingUp, Target, Clock } from 'lucide-react';

const PlanejamentoAposentadoria = () => {
  const [idadeAtual, setIdadeAtual] = useState('');
  const [idadeAposentadoria, setIdadeAposentadoria] = useState('');
  const [rendaMensalAtual, setRendaMensalAtual] = useState('');
  const [despesasMensais, setDespesasMensais] = useState('');
  const [taxaRetornoInvestimento, setTaxaRetornoInvestimento] = useState('');
  const [inflacaoAnual, setInflacaoAnual] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcularAposentadoria = () => {
    const idadeAtualNum = parseFloat(idadeAtual) || 30;
    const idadeAposentadoriaNum = parseFloat(idadeAposentadoria) || 60;
    const rendaMensalAtualNum = parseFloat(rendaMensalAtual) || 3000;
    const despesasMensaisNum = parseFloat(despesasMensais) || 2000;
    const taxaRetornoInvestimentoNum = (parseFloat(taxaRetornoInvestimento) || 6) / 100;
    const inflacaoAnualNum = (parseFloat(inflacaoAnual) || 4) / 100;

    const anosParaAposentadoria = idadeAposentadoriaNum - idadeAtualNum;

    // Calcula a renda mensal desejada na aposentadoria, ajustada pela inflação
    let rendaMensalDesejada = despesasMensaisNum;
    for (let i = 0; i < anosParaAposentadoria; i++) {
      rendaMensalDesejada *= (1 + inflacaoAnualNum);
    }

    // Calcula o montante necessário para a aposentadoria
    const montanteNecessario = (rendaMensalDesejada * 12) / taxaRetornoInvestimentoNum;

    // Calcula o valor atual economizado (se houver)
    const valorAtualEconomizado = 0; // Assumindo que não há valor economizado inicialmente

    // Calcula o investimento mensal necessário
    let investimentoMensalNecessario = 0;
    if (taxaRetornoInvestimentoNum > 0) {
      investimentoMensalNecessario = (montanteNecessario - valorAtualEconomizado * Math.pow(1 + taxaRetornoInvestimentoNum, anosParaAposentadoria)) /
        ((Math.pow(1 + taxaRetornoInvestimentoNum, anosParaAposentadoria) - 1) / taxaRetornoInvestimentoNum);
    }

    setResultado({
      idadeAtual: idadeAtualNum,
      idadeAposentadoria: idadeAposentadoriaNum,
      rendaMensalDesejada: rendaMensalDesejada,
      montanteNecessario: montanteNecessario,
      investimentoMensalNecessario: investimentoMensalNecessario
    });
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
              Descubra quanto você precisa economizar para garantir uma aposentadoria tranquila
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    Simulador de Aposentadoria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idade Atual
                      </label>
                      <Input
                        type="number"
                        placeholder="30"
                        value={idadeAtual}
                        onChange={(e) => setIdadeAtual(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idade de Aposentadoria Desejada
                      </label>
                      <Input
                        type="number"
                        placeholder="60"
                        value={idadeAposentadoria}
                        onChange={(e) => setIdadeAposentadoria(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Renda Mensal Atual (R$)
                      </label>
                      <Input
                        type="number"
                        placeholder="3000.00"
                        value={rendaMensalAtual}
                        onChange={(e) => setRendaMensalAtual(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Despesas Mensais Atuais (R$)
                      </label>
                      <Input
                        type="number"
                        placeholder="2000.00"
                        value={despesasMensais}
                        onChange={(e) => setDespesasMensais(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Taxa de Retorno Anual do Investimento (%)
                      </label>
                      <Input
                        type="number"
                        placeholder="6"
                        value={taxaRetornoInvestimento}
                        onChange={(e) => setTaxaRetornoInvestimento(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Inflação Anual Estimada (%)
                      </label>
                      <Input
                        type="number"
                        placeholder="4"
                        value={inflacaoAnual}
                        onChange={(e) => setInflacaoAnual(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={calcularAposentadoria} className="w-full" size="lg">
                    <Calculator className="h-5 w-5 mr-2" />
                    Calcular Aposentadoria
                  </Button>
                </CardContent>
              </Card>

              {resultado && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-green-600">Resultado da Simulação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-6 rounded-lg text-center">
                        <h3 className="font-semibold text-green-800 mb-2">
                          Renda Mensal Desejada na Aposentadoria
                        </h3>
                        <p className="text-3xl font-bold text-green-600">
                          R$ {resultado.rendaMensalDesejada.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Montante Necessário:</span>
                        <span className="font-semibold">R$ {resultado.montanteNecessario.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Investimento Mensal Necessário:</span>
                        <span className="font-semibold text-blue-600">R$ {resultado.investimentoMensalNecessario.toFixed(2)}</span>
                      </div>
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
                  <CardTitle className="text-lg">Dicas de Planejamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Comece Cedo</h4>
                      <p className="text-xs text-gray-600">Quanto antes começar, menor o esforço mensal</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Defina Metas</h4>
                      <p className="text-xs text-gray-600">Tenha um objetivo claro de quanto quer acumular</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Invista Regularmente</h4>
                      <p className="text-xs text-gray-600">A consistência é fundamental para o sucesso</p>
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
