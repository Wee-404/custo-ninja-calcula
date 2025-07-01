
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, ChefHat, Cake, Wrench, TrendingUp, Target, Lightbulb } from 'lucide-react';

const EmpreendedorismoLocal = () => {
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [dados, setDados] = useState({
    // Custos gerais
    ingredientes: '',
    embalagens: '',
    gas: '',
    energia: '',
    agua: '',
    transporte: '',
    marketing: '',
    // Específicos por tipo
    quantidadeDiaria: '',
    diasSemana: '',
    precoVenda: '',
    horasTrabalho: '',
    custoHora: ''
  });

  const [resultado, setResultado] = useState<any>(null);

  const tiposNegocio = [
    { value: 'marmitas', label: 'Marmitas e Quentinhas', icon: '🍽️' },
    { value: 'doces', label: 'Doces e Confeitaria', icon: '🧁' },
    { value: 'autonomo', label: 'Serviços Autônomos', icon: '🔧' }
  ];

  const calcularPrecificacao = () => {
    const custoIngredientes = parseFloat(dados.ingredientes) || 0;
    const custoEmbalagens = parseFloat(dados.embalagens) || 0;
    const custoGas = parseFloat(dados.gas) || 0;
    const custoEnergia = parseFloat(dados.energia) || 0;
    const custoAgua = parseFloat(dados.agua) || 0;
    const custoTransporte = parseFloat(dados.transporte) || 0;
    const custoMarketing = parseFloat(dados.marketing) || 0;
    const quantidadeDiaria = parseFloat(dados.quantidadeDiaria) || 1;
    const diasSemana = parseFloat(dados.diasSemana) || 5;
    const precoVenda = parseFloat(dados.precoVenda) || 0;

    let analise = {};

    if (tipoNegocio === 'marmitas') {
      const custoFixoMensal = custoGas + custoEnergia + custoAgua + custoTransporte + custoMarketing;
      const custoVariavelPorUnidade = custoIngredientes + custoEmbalagens;
      const quantidadeMensal = quantidadeDiaria * diasSemana * 4;
      const custoFixoPorUnidade = custoFixoMensal / quantidadeMensal;
      const custoTotalPorUnidade = custoVariavelPorUnidade + custoFixoPorUnidade;
      
      const margemMinima = custoTotalPorUnidade * 1.5; // 50% de margem mínima
      const margemIdeal = custoTotalPorUnidade * 2; // 100% de margem ideal
      
      const receitaMensal = precoVenda * quantidadeMensal;
      const custoTotalMensal = custoTotalPorUnidade * quantidadeMensal;
      const lucroMensal = receitaMensal - custoTotalMensal;
      
      analise = {
        custoTotalPorUnidade,
        margemMinima,
        margemIdeal,
        quantidadeMensal,
        receitaMensal,
        custoTotalMensal,
        lucroMensal,
        margemLucro: precoVenda > 0 ? ((precoVenda - custoTotalPorUnidade) / precoVenda) * 100 : 0
      };
    } else if (tipoNegocio === 'doces') {
      const custoFixoMensal = custoGas + custoEnergia + custoAgua + custoTransporte + custoMarketing;
      const custoVariavelPorUnidade = custoIngredientes + custoEmbalagens;
      const quantidadeMensal = quantidadeDiaria * diasSemana * 4;
      const custoFixoPorUnidade = custoFixoMensal / quantidadeMensal;
      const custoTotalPorUnidade = custoVariavelPorUnidade + custoFixoPorUnidade;
      
      const margemMinima = custoTotalPorUnidade * 2; // 100% de margem mínima para doces
      const margemIdeal = custoTotalPorUnidade * 3; // 200% de margem ideal
      
      const receitaMensal = precoVenda * quantidadeMensal;
      const custoTotalMensal = custoTotalPorUnidade * quantidadeMensal;
      const lucroMensal = receitaMensal - custoTotalMensal;
      
      analise = {
        custoTotalPorUnidade,
        margemMinima,
        margemIdeal,
        quantidadeMensal,
        receitaMensal,
        custoTotalMensal,
        lucroMensal,
        margemLucro: precoVenda > 0 ? ((precoVenda - custoTotalPorUnidade) / precoVenda) * 100 : 0
      };
    } else if (tipoNegocio === 'autonomo') {
      const horasTrabalho = parseFloat(dados.horasTrabalho) || 160;
      const custoHora = parseFloat(dados.custoHora) || 25;
      const custoTotalMensal = custoTransporte + custoMarketing;
      const custoHoraMensal = custoTotalMensal / horasTrabalho;
      const valorHoraSugerido = (custoHora + custoHoraMensal) * 1.5; // 50% de margem
      
      const receitaMensal = valorHoraSugerido * horasTrabalho;
      const lucroMensal = receitaMensal - (custoHora * horasTrabalho) - custoTotalMensal;
      
      analise = {
        custoHoraMensal,
        valorHoraSugerido,
        horasTrabalho,
        receitaMensal,
        custoTotalMensal,
        lucroMensal
      };
    }

    setResultado({
      tipoNegocio,
      analise
    });
  };

  const handleInputChange = (campo: string, valor: string) => {
    setDados(prev => ({ ...prev, [campo]: valor }));
  };

  const renderCamposEspecificos = () => {
    if (tipoNegocio === 'marmitas') {
      return (
        <>
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-blue-800 mb-2">📋 Dicas para Marmitas</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Calcule ingredientes por porção</li>
              <li>• Considere sazonalidade dos ingredientes</li>
              <li>• Inclua custo de temperos e óleo</li>
              <li>• Margem ideal: 80-100%</li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade Diária de Marmitas
              </label>
              <Input
                type="number"
                placeholder="20"
                value={dados.quantidadeDiaria}
                onChange={(e) => handleInputChange('quantidadeDiaria', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dias por Semana
              </label>
              <Input
                type="number"
                placeholder="5"
                value={dados.diasSemana}
                onChange={(e) => handleInputChange('diasSemana', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço de Venda Atual (R$)
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="12.00"
                value={dados.precoVenda}
                onChange={(e) => handleInputChange('precoVenda', e.target.value)}
              />
            </div>
          </div>
        </>
      );
    } else if (tipoNegocio === 'doces') {
      return (
        <>
          <div className="bg-pink-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-pink-800 mb-2">🧁 Dicas para Doces</h3>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• Doces têm margem maior que salgados</li>
              <li>• Considere tempo de preparo</li>
              <li>• Inclua decoração e apresentação</li>
              <li>• Margem ideal: 150-200%</li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade Diária de Doces
              </label>
              <Input
                type="number"
                placeholder="30"
                value={dados.quantidadeDiaria}
                onChange={(e) => handleInputChange('quantidadeDiaria', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dias por Semana
              </label>
              <Input
                type="number"
                placeholder="6"
                value={dados.diasSemana}
                onChange={(e) => handleInputChange('diasSemana', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço de Venda Atual (R$)
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="8.00"
                value={dados.precoVenda}
                onChange={(e) => handleInputChange('precoVenda', e.target.value)}
              />
            </div>
          </div>
        </>
      );
    } else if (tipoNegocio === 'autonomo') {
      return (
        <>
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-green-800 mb-2">🔧 Dicas para Autônomos</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Valorize sua experiência</li>
              <li>• Inclua tempo de deslocamento</li>
              <li>• Considere desgaste de ferramentas</li>
              <li>• Margem ideal: 50-80%</li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horas de Trabalho/Mês
              </label>
              <Input
                type="number"
                placeholder="160"
                value={dados.horasTrabalho}
                onChange={(e) => handleInputChange('horasTrabalho', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custo Hora Desejado (R$)
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="25.00"
                value={dados.custoHora}
                onChange={(e) => handleInputChange('custoHora', e.target.value)}
              />
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <TrendingUp className="h-10 w-10 text-green-600" />
              Empreendedorismo Local
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transforme sua habilidade em negócio rentável. Calculadora especializada para marmitas, doces e serviços autônomos
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-6 w-6" />
                    Calculadora de Precificação Especializada
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Negócio
                    </label>
                    <Select onValueChange={setTipoNegocio}>
                      <SelectTrigger>
                        <SelectValue placeholder="Escolha seu tipo de negócio" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposNegocio.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.icon} {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {tipoNegocio && (
                    <>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">Custos do Negócio</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Custo Ingredientes/Materiais por unidade (R$)
                            </label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="3.50"
                              value={dados.ingredientes}
                              onChange={(e) => handleInputChange('ingredientes', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Embalagens por unidade (R$)
                            </label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.50"
                              value={dados.embalagens}
                              onChange={(e) => handleInputChange('embalagens', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Gás/Mês (R$)
                            </label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="80.00"
                              value={dados.gas}
                              onChange={(e) => handleInputChange('gas', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Energia/Mês (R$)
                            </label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="120.00"
                              value={dados.energia}
                              onChange={(e) => handleInputChange('energia', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Água/Mês (R$)
                            </label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="60.00"
                              value={dados.agua}
                              onChange={(e) => handleInputChange('agua', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Transporte/Mês (R$)
                            </label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="200.00"
                              value={dados.transporte}
                              onChange={(e) => handleInputChange('transporte', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Marketing/Mês (R$)
                            </label>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="100.00"
                              value={dados.marketing}
                              onChange={(e) => handleInputChange('marketing', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {renderCamposEspecificos()}

                      <Button onClick={calcularPrecificacao} className="w-full" size="lg">
                        <Calculator className="h-5 w-5 mr-2" />
                        Calcular Precificação
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {resultado && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-green-600">Análise do seu Negócio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {resultado.tipoNegocio === 'autonomo' ? (
                      <div className="space-y-4">
                        <div className="bg-green-50 p-6 rounded-lg text-center">
                          <h3 className="font-semibold text-green-800 mb-2">Valor Hora Sugerido</h3>
                          <p className="text-3xl font-bold text-green-600">
                            R$ {resultado.analise.valorHoraSugerido.toFixed(2)}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Receita mensal:</span>
                            <span className="font-semibold text-blue-600">R$ {resultado.analise.receitaMensal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Lucro mensal:</span>
                            <span className="font-semibold text-green-600">R$ {resultado.analise.lucroMensal.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <h3 className="font-semibold text-blue-800 mb-1">Custo por Unidade</h3>
                            <p className="text-xl font-bold text-blue-600">
                              R$ {resultado.analise.custoTotalPorUnidade.toFixed(2)}
                            </p>
                          </div>
                          <div className="bg-yellow-50 p-4 rounded-lg text-center">
                            <h3 className="font-semibold text-yellow-800 mb-1">Preço Mínimo</h3>
                            <p className="text-xl font-bold text-yellow-600">
                              R$ {resultado.analise.margemMinima.toFixed(2)}
                            </p>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg text-center">
                            <h3 className="font-semibold text-green-800 mb-1">Preço Ideal</h3>
                            <p className="text-xl font-bold text-green-600">
                              R$ {resultado.analise.margemIdeal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Receita mensal:</span>
                            <span className="font-semibold text-blue-600">R$ {resultado.analise.receitaMensal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Lucro mensal:</span>
                            <span className="font-semibold text-green-600">R$ {resultado.analise.lucroMensal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Margem atual:</span>
                            <span className="font-semibold">{resultado.analise.margemLucro.toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Quantidade mensal:</span>
                            <span className="font-semibold">{resultado.analise.quantidadeMensal}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <CoursePromo />
              <AdBanner size="medium" />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Dicas de Empreendedorismo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Comece Pequeno</h4>
                      <p className="text-xs text-gray-600">Teste o mercado antes de investir muito</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ChefHat className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Qualidade Sempre</h4>
                      <p className="text-xs text-gray-600">Cliente satisfeito sempre volta</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Controle Financeiro</h4>
                      <p className="text-xs text-gray-600">Registre todos os gastos e vendas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-blue-50">
                <CardContent className="p-4">
                  <h3 className="font-bold text-center mb-3">🚀 Acelere seu Negócio</h3>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Potencial de faturamento:</p>
                    <p className="text-2xl font-bold text-green-600">R$ 3.000+/mês</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Com dedicação e planejamento
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

export default EmpreendedorismoLocal;
