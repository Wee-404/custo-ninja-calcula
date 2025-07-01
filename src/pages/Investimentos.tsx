
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { PiggyBank, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Investimentos = () => {
  const [initialAmount, setInitialAmount] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [annualRate, setAnnualRate] = useState<number>(12);
  const [timeInMonths, setTimeInMonths] = useState<number>(12);

  const calculateInvestment = () => {
    const monthlyRate = annualRate / 100 / 12;
    const data = [];
    
    let compoundBalance = initialAmount;
    let simpleBalance = initialAmount;
    let totalContributions = initialAmount;

    for (let month = 0; month <= timeInMonths; month++) {
      if (month > 0) {
        // Juros Compostos
        compoundBalance = (compoundBalance + monthlyContribution) * (1 + monthlyRate);
        
        // Juros Simples
        simpleBalance += monthlyContribution + (totalContributions * monthlyRate);
        
        totalContributions += monthlyContribution;
      }

      data.push({
        month,
        'Juros Compostos': Math.round(compoundBalance),
        'Juros Simples': Math.round(simpleBalance),
        'Total Investido': totalContributions,
      });
    }

    return data;
  };

  const investmentData = calculateInvestment();
  const finalData = investmentData[investmentData.length - 1];
  const compoundInterest = finalData['Juros Compostos'] - finalData['Total Investido'];
  const simpleInterest = finalData['Juros Simples'] - finalData['Total Investido'];

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <PiggyBank className="h-16 w-16 text-purple-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Calculadora de Investimentos
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Simule a rentabilidade dos seus investimentos com juros compostos e simples. 
              Visualize o crescimento do seu dinheiro ao longo do tempo.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PiggyBank className="h-6 w-6 text-purple-600" />
                      Parâmetros do Investimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Valor Inicial (R$)
                      </label>
                      <Input
                        type="number"
                        step="1"
                        value={initialAmount}
                        onChange={(e) => setInitialAmount(parseFloat(e.target.value) || 0)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Quanto você vai investir inicialmente
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Aporte Mensal (R$)
                      </label>
                      <Input
                        type="number"
                        step="1"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(parseFloat(e.target.value) || 0)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Valor que você vai investir todo mês
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Taxa de Juros Anual (%)
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={annualRate}
                        onChange={(e) => setAnnualRate(parseFloat(e.target.value) || 0)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Taxa de rentabilidade anual esperada
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Período (meses)
                      </label>
                      <Input
                        type="number"
                        step="1"
                        value={timeInMonths}
                        onChange={(e) => setTimeInMonths(parseInt(e.target.value) || 1)}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Por quanto tempo você vai investir
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Results Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo dos Resultados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Investido</div>
                        <div className="text-2xl font-bold text-blue-600">
                          R$ {finalData['Total Investido'].toLocaleString('pt-BR')}
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Juros Compostos</div>
                        <div className="text-2xl font-bold text-green-600">
                          R$ {finalData['Juros Compostos'].toLocaleString('pt-BR')}
                        </div>
                        <div className="text-sm text-green-500">
                          Rendimento: R$ {compoundInterest.toLocaleString('pt-BR')}
                        </div>
                      </div>

                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Juros Simples</div>
                        <div className="text-2xl font-bold text-yellow-600">
                          R$ {finalData['Juros Simples'].toLocaleString('pt-BR')}
                        </div>
                        <div className="text-sm text-yellow-500">
                          Rendimento: R$ {simpleInterest.toLocaleString('pt-BR')}
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Diferença (Compostos vs Simples)</div>
                        <div className="text-2xl font-bold text-purple-600">
                          R$ {(compoundInterest - simpleInterest).toLocaleString('pt-BR')}
                        </div>
                        <div className="text-sm text-purple-500">
                          {(((compoundInterest - simpleInterest) / simpleInterest) * 100).toFixed(1)}% a mais
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              <div>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                      Evolução do Investimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={investmentData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="month" 
                            label={{ value: 'Meses', position: 'insideBottom', offset: -5 }}
                          />
                          <YAxis 
                            label={{ value: 'Valor (R$)', angle: -90, position: 'insideLeft' }}
                            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                          />
                          <Tooltip 
                            formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                            labelFormatter={(label) => `Mês ${label}`}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="Total Investido" 
                            stroke="#64748b" 
                            strokeWidth={2}
                            dot={false}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="Juros Simples" 
                            stroke="#eab308" 
                            strokeWidth={2}
                            dot={false}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="Juros Compostos" 
                            stroke="#22c55e" 
                            strokeWidth={3}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Entenda os Juros Compostos</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-green-600">🚀 Juros Compostos</h3>
                <p className="text-gray-600 mb-4">
                  Os juros são calculados sobre o valor principal MAIS os juros acumulados dos períodos anteriores.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Crescimento exponencial</li>
                  <li>• "Juros sobre juros"</li>
                  <li>• Mais vantajoso no longo prazo</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-yellow-600">📈 Juros Simples</h3>
                <p className="text-gray-600 mb-4">
                  Os juros são calculados sempre sobre o valor principal inicial.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Crescimento linear</li>
                  <li>• Juros sempre iguais</li>
                  <li>• Menos vantajoso no longo prazo</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-purple-800">💡 Dicas para Investir</h3>
              <ul className="space-y-3 text-purple-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Comece cedo: o tempo é seu maior aliado nos investimentos
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Seja constante: aportes regulares potencializam os resultados
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Diversifique: não coloque todos os ovos na mesma cesta
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Estude: conhecimento é fundamental para bons investimentos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Investimentos;
