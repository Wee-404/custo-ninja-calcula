import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { GraduationCap, PieChart, TrendingUp, AlertTriangle, Target, Lightbulb, PiggyBank, Calculator } from 'lucide-react';

const EducacaoFinanceira = () => {
  const [salario, setSalario] = useState('');
  const [gastos, setGastos] = useState({
    moradia: '',
    alimentacao: '',
    transporte: '',
    saude: '',
    educacao: '',
    lazer: '',
    outros: ''
  });

  const [resultado, setResultado] = useState<any>(null);

  const calcularOrcamento = () => {
    const salarioLiquido = parseFloat(salario) || 0;
    const totalGastos = Object.values(gastos).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
    const sobra = salarioLiquido - totalGastos;
    const percentualGasto = (totalGastos / salarioLiquido) * 100;

    // Regra 50-30-20
    const necessidades = salarioLiquido * 0.5;
    const desejos = salarioLiquido * 0.3;
    const investimentos = salarioLiquido * 0.2;

    // Análise por categoria
    const analiseGastos = {
      moradia: {
        valor: parseFloat(gastos.moradia) || 0,
        percentual: ((parseFloat(gastos.moradia) || 0) / salarioLiquido) * 100,
        ideal: salarioLiquido * 0.3,
        status: ((parseFloat(gastos.moradia) || 0) / salarioLiquido) <= 0.3 ? 'bom' : 'atencao'
      },
      alimentacao: {
        valor: parseFloat(gastos.alimentacao) || 0,
        percentual: ((parseFloat(gastos.alimentacao) || 0) / salarioLiquido) * 100,
        ideal: salarioLiquido * 0.15,
        status: ((parseFloat(gastos.alimentacao) || 0) / salarioLiquido) <= 0.15 ? 'bom' : 'atencao'
      },
      transporte: {
        valor: parseFloat(gastos.transporte) || 0,
        percentual: ((parseFloat(gastos.transporte) || 0) / salarioLiquido) * 100,
        ideal: salarioLiquido * 0.15,
        status: ((parseFloat(gastos.transporte) || 0) / salarioLiquido) <= 0.15 ? 'bom' : 'atencao'
      }
    };

    setResultado({
      salarioLiquido,
      totalGastos,
      sobra,
      percentualGasto,
      necessidades,
      desejos,
      investimentos,
      analiseGastos,
      situacao: sobra >= 0 ? (sobra >= investimentos ? 'excelente' : 'boa') : 'critica'
    });
  };

  const handleGastoChange = (categoria: string, valor: string) => {
    setGastos(prev => ({ ...prev, [categoria]: valor }));
  };

  const categoriasGasto = [
    { key: 'moradia', label: 'Moradia (aluguel, condomínio, IPTU)', icon: '🏠' },
    { key: 'alimentacao', label: 'Alimentação', icon: '🍽️' },
    { key: 'transporte', label: 'Transporte', icon: '🚗' },
    { key: 'saude', label: 'Saúde e Medicina', icon: '🏥' },
    { key: 'educacao', label: 'Educação', icon: '📚' },
    { key: 'lazer', label: 'Lazer e Entretenimento', icon: '🎬' },
    { key: 'outros', label: 'Outros Gastos', icon: '💳' }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <GraduationCap className="h-10 w-10 text-blue-600" />
              Educação Financeira
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organize suas finanças pessoais e aprenda a dividir sua renda de forma inteligente
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-6 w-6" />
                    Planejamento Orçamentário
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salário Líquido Mensal (R$)
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

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Seus Gastos Mensais</h3>
                    {categoriasGasto.map((categoria) => (
                      <div key={categoria.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {categoria.icon} {categoria.label}
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={gastos[categoria.key as keyof typeof gastos]}
                          onChange={(e) => handleGastoChange(categoria.key, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>

                  <Button onClick={calcularOrcamento} className="w-full" size="lg">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Analisar Orçamento
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
                        Análise do seu Orçamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                          <p className="text-xs text-red-500">
                            {resultado.percentualGasto.toFixed(1)}% da renda
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

                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-4">📊 Regra 50-30-20 (Recomendado)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="text-2xl mb-2">🏠</div>
                            <h4 className="font-semibold text-gray-700">Necessidades (50%)</h4>
                            <p className="text-lg font-bold text-blue-600">
                              R$ {resultado.necessidades.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">Moradia, comida, transporte</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl mb-2">🎯</div>
                            <h4 className="font-semibold text-gray-700">Desejos (30%)</h4>
                            <p className="text-lg font-bold text-purple-600">
                              R$ {resultado.desejos.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">Lazer, hobbies, extras</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl mb-2">💰</div>
                            <h4 className="font-semibold text-gray-700">Investimentos (20%)</h4>
                            <p className="text-lg font-bold text-green-600">
                              R$ {resultado.investimentos.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-500">Poupança, investimentos</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Análise Detalhada por Categoria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {Object.entries(resultado.analiseGastos).map(([categoria, dados]: [string, any]) => (
                          <div key={categoria} className="border-l-4 border-blue-500 pl-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold capitalize">{categoria}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                dados.status === 'bom' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {dados.status === 'bom' ? '✓ Bom' : '⚠️ Atenção'}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Gasto atual:</span>
                                <p className="font-semibold">R$ {dados.valor.toFixed(2)}</p>
                              </div>
                              <div>
                                <span className="text-gray-600">% da renda:</span>
                                <p className="font-semibold">{dados.percentual.toFixed(1)}%</p>
                              </div>
                              <div>
                                <span className="text-gray-600">Recomendado:</span>
                                <p className="font-semibold">R$ {dados.ideal.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>🔗 Ferramentas Relacionadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link to="/planejamento-aposentadoria">
                          <Button variant="outline" className="w-full h-16 flex flex-col items-center justify-center">
                            <PiggyBank className="h-6 w-6 mb-1" />
                            <span className="text-sm">Planeje sua Aposentadoria</span>
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
                            <span className="text-sm">Custo-Benefício</span>
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
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Dicas Financeiras
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Regra 50-30-20</h4>
                      <p className="text-xs text-gray-600">50% necessidades, 30% desejos, 20% investimentos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Reserva de Emergência</h4>
                      <p className="text-xs text-gray-600">Tenha 3-6 meses de gastos guardados</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Invista Sempre</h4>
                      <p className="text-xs text-gray-600">Mesmo valores pequenos fazem diferença</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PieChart className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Controle Gastos</h4>
                      <p className="text-xs text-gray-600">Anote tudo e revise mensalmente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-4">
                  <h3 className="font-bold text-center mb-3">📈 Meta Financeira</h3>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Liberdade financeira em:</p>
                    <p className="text-2xl font-bold text-blue-600">10 Anos</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Investindo 20% da renda mensalmente
                    </p>
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

export default EducacaoFinanceira;
