
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { GraduationCap, PieChart, TrendingUp, PiggyBank, Calculator, Target } from 'lucide-react';

const EducacaoFinanceira = () => {
  const [salario, setSalario] = useState('');
  const [gastos, setGastos] = useState({
    moradia: '',
    alimentacao: '',
    transporte: '',
    outros: ''
  });

  const [resultado, setResultado] = useState<any>(null);

  const calcularOrcamento = () => {
    const salarioLiquido = parseFloat(salario) || 0;
    const totalGastos = Object.values(gastos).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    const sobra = salarioLiquido - totalGastos;

    // Regra 50-30-20
    const necessidades = salarioLiquido * 0.5;
    const desejos = salarioLiquido * 0.3;
    const investimentos = salarioLiquido * 0.2;

    setResultado({
      salarioLiquido,
      totalGastos,
      sobra,
      necessidades,
      desejos,
      investimentos,
      situacao: sobra >= investimentos ? 'excelente' : sobra >= 0 ? 'boa' : 'critica'
    });
  };

  const handleGastoChange = (categoria: string, valor: string) => {
    setGastos(prev => ({ ...prev, [categoria]: valor }));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <GraduationCap className="h-10 w-10 text-blue-600" />
              Educação Financeira
            </h1>
            <p className="text-xl text-gray-600">
              Organize suas finanças e aprenda a dividir sua renda
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-6 w-6" />
                    Seu Orçamento Mensal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      💰 Salário Líquido Mensal (R$)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="3500.00"
                      value={salario}
                      onChange={(e) => setSalario(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        🏠 Moradia (aluguel, contas)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="1200.00"
                        value={gastos.moradia}
                        onChange={(e) => handleGastoChange('moradia', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        🍽️ Alimentação
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="600.00"
                        value={gastos.alimentacao}
                        onChange={(e) => handleGastoChange('alimentacao', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        🚗 Transporte
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="300.00"
                        value={gastos.transporte}
                        onChange={(e) => handleGastoChange('transporte', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        💳 Outros gastos
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="400.00"
                        value={gastos.outros}
                        onChange={(e) => handleGastoChange('outros', e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={calcularOrcamento} className="w-full" size="lg">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Analisar Meu Orçamento
                  </Button>
                </CardContent>
              </Card>

              {resultado && (
                <div className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className={`${
                        resultado.situacao === 'excelente' ? 'text-green-600' :
                        resultado.situacao === 'boa' ? 'text-blue-600' : 'text-red-600'
                      }`}>
                        {resultado.situacao === 'excelente' ? '🎉 Parabéns! Situação Excelente' :
                         resultado.situacao === 'boa' ? '👍 Situação Boa' : '⚠️ Atenção Necessária'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <h3 className="font-semibold text-blue-800 mb-1">Renda</h3>
                          <p className="text-2xl font-bold text-blue-600">
                            R$ {resultado.salarioLiquido.toFixed(2)}
                          </p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg text-center">
                          <h3 className="font-semibold text-red-800 mb-1">Gastos</h3>
                          <p className="text-2xl font-bold text-red-600">
                            R$ {resultado.totalGastos.toFixed(2)}
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg text-center ${
                          resultado.sobra >= 0 ? 'bg-green-50' : 'bg-red-50'
                        }`}>
                          <h3 className={`font-semibold mb-1 ${
                            resultado.sobra >= 0 ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {resultado.sobra >= 0 ? 'Sobra' : 'Déficit'}
                          </h3>
                          <p className={`text-2xl font-bold ${
                            resultado.sobra >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            R$ {Math.abs(resultado.sobra).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>📊 Regra 50-30-20 (Ideal)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl mb-2">🏠</div>
                          <h4 className="font-semibold text-gray-700">Necessidades (50%)</h4>
                          <p className="text-lg font-bold text-blue-600">
                            R$ {resultado.necessidades.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">Moradia, comida, transporte</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl mb-2">🎯</div>
                          <h4 className="font-semibold text-gray-700">Desejos (30%)</h4>
                          <p className="text-lg font-bold text-purple-600">
                            R$ {resultado.desejos.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">Lazer, hobbies, extras</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl mb-2">💰</div>
                          <h4 className="font-semibold text-gray-700">Investimentos (20%)</h4>
                          <p className="text-lg font-bold text-green-600">
                            R$ {resultado.investimentos.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">Poupança, investimentos</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>🔗 Próximos Passos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link to="/planejamento-aposentadoria">
                          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                            <PiggyBank className="h-6 w-6 mb-1" />
                            <span className="text-sm">Planejar Aposentadoria</span>
                          </Button>
                        </Link>
                        <Link to="/investimentos">
                          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                            <TrendingUp className="h-6 w-6 mb-1" />
                            <span className="text-sm">Simular Investimentos</span>
                          </Button>
                        </Link>
                        <Link to="/custo-beneficio">
                          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                            <Calculator className="h-6 w-6 mb-1" />
                            <span className="text-sm">Economizar Compras</span>
                          </Button>
                        </Link>
                        <Link to="/empreendedorismo-local">
                          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                            <Target className="h-6 w-6 mb-1" />
                            <span className="text-sm">Empreender</span>
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <CoursePromo />
              <AdBanner size="medium" />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💡 Dicas Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p><strong>📊 Regra 50-30-20:</strong> A base para organizar suas finanças</p>
                  <p><strong>🚨 Reserva de Emergência:</strong> 3-6 meses de gastos guardados</p>
                  <p><strong>📈 Invista Sempre:</strong> Mesmo pequenos valores fazem diferença</p>
                  <p><strong>📝 Controle Gastos:</strong> Anote tudo e revise mensalmente</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EducacaoFinanceira;
