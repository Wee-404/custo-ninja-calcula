
import React, { useState } from 'react';
import Layout from '../components/Layout';
import GoogleAdSense from '../components/GoogleAdSense';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, DollarSign, Clock, Users, TrendingUp } from 'lucide-react';

const PrecificacaoServicos = () => {
  const [tipoNegocio, setTipoNegocio] = useState('');
  const [dados, setDados] = useState({
    custosFixos: '',
    custosVariaveis: '',
    horasTrabalho: '',
    margemLucro: '',
    impostos: '',
    valorHora: '',
    quantidadeProdutos: '',
    custoProduto: ''
  });

  const [resultado, setResultado] = useState<any>(null);

  const tiposNegocio = [
    { value: 'consultoria', label: 'Consultoria/Assessoria' },
    { value: 'design', label: 'Design Gráfico' },
    { value: 'desenvolvimento', label: 'Desenvolvimento Web' },
    { value: 'marketing', label: 'Marketing Digital' },
    { value: 'fisioterapia', label: 'Fisioterapia' },
    { value: 'advocacia', label: 'Advocacia' },
    { value: 'produtos', label: 'Venda de Produtos' },
    { value: 'servicos-gerais', label: 'Serviços Gerais' }
  ];

  const calcularPrecificacao = () => {
    const custosFixos = parseFloat(dados.custosFixos) || 0;
    const custosVariaveis = parseFloat(dados.custosVariaveis) || 0;
    const horasTrabalho = parseFloat(dados.horasTrabalho) || 160; // 160h/mês padrão
    const margemLucro = parseFloat(dados.margemLucro) || 30;
    const impostos = parseFloat(dados.impostos) || 20;

    let precoSugerido = 0;
    let analise = {};

    if (tipoNegocio === 'produtos') {
      const custoProduto = parseFloat(dados.custoProduto) || 0;
      const quantidadeProdutos = parseFloat(dados.quantidadeProdutos) || 1;
      
      const custoTotal = custoProduto + (custosFixos / quantidadeProdutos) + custosVariaveis;
      const custoComImpostos = custoTotal * (1 + impostos / 100);
      precoSugerido = custoComImpostos * (1 + margemLucro / 100);
      
      analise = {
        custoPorUnidade: custoTotal,
        margemBruta: precoSugerido - custoTotal,
        margemLiquida: precoSugerido - custoComImpostos,
        breakeven: quantidadeProdutos
      };
    } else {
      // Serviços
      const valorHora = parseFloat(dados.valorHora) || 50;
      const custoHora = (custosFixos + custosVariaveis) / horasTrabalho;
      const custoComImpostos = custoHora * (1 + impostos / 100);
      precoSugerido = custoComImpostos * (1 + margemLucro / 100);
      
      analise = {
        custoHora: custoHora,
        valorHoraSugerido: precoSugerido,
        receitaMensal: precoSugerido * horasTrabalho,
        lucroMensal: (precoSugerido - custoComImpostos) * horasTrabalho
      };
    }

    setResultado({
      precoSugerido,
      analise,
      tipo: tipoNegocio
    });
  };

  const handleInputChange = (campo: string, valor: string) => {
    setDados(prev => ({ ...prev, [campo]: valor }));
  };

  const renderCamposEspecificos = () => {
    if (tipoNegocio === 'produtos') {
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custo por Produto (R$)
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="15.00"
                value={dados.custoProduto}
                onChange={(e) => handleInputChange('custoProduto', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade Mensal
              </label>
              <Input
                type="number"
                placeholder="100"
                value={dados.quantidadeProdutos}
                onChange={(e) => handleInputChange('quantidadeProdutos', e.target.value)}
              />
            </div>
          </div>
        </>
      );
    } else {
      return (
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
              Valor/Hora Atual (R$)
            </label>
            <Input
              type="number"
              step="0.01"
              placeholder="50.00"
              value={dados.valorHora}
              onChange={(e) => handleInputChange('valorHora', e.target.value)}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Calculator className="h-10 w-10 text-blue-600" />
              Precificação para Autônomos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calcule o preço ideal para seus produtos ou serviços considerando todos os custos e margem de lucro
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
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-6 w-6" />
                    Dados para Precificação
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Negócio
                    </label>
                    <Select onValueChange={setTipoNegocio}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione seu tipo de negócio" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposNegocio.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {tipoNegocio && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Custos Fixos Mensais (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="2000.00"
                            value={dados.custosFixos}
                            onChange={(e) => handleInputChange('custosFixos', e.target.value)}
                          />
                          <p className="text-xs text-gray-500 mt-1">Aluguel, internet, telefone, etc.</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Custos Variáveis Mensais (R$)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="500.00"
                            value={dados.custosVariaveis}
                            onChange={(e) => handleInputChange('custosVariaveis', e.target.value)}
                          />
                          <p className="text-xs text-gray-500 mt-1">Material, transporte, etc.</p>
                        </div>
                      </div>

                      {renderCamposEspecificos()}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Margem de Lucro (%)
                          </label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="30"
                            value={dados.margemLucro}
                            onChange={(e) => handleInputChange('margemLucro', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Impostos/Taxas (%)
                          </label>
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="20"
                            value={dados.impostos}
                            onChange={(e) => handleInputChange('impostos', e.target.value)}
                          />
                        </div>
                      </div>

                      <Button onClick={calcularPrecificacao} className="w-full" size="lg">
                        <Calculator className="h-5 w-5 mr-2" />
                        Calcular Preço Ideal
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>

              {resultado && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-green-600">Resultado da Precificação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-green-50 p-6 rounded-lg text-center">
                          <h3 className="font-semibold text-green-800 mb-2">
                            {resultado.tipo === 'produtos' ? 'Preço por Produto' : 'Valor por Hora'}
                          </h3>
                          <p className="text-3xl font-bold text-green-600">
                            R$ {resultado.precoSugerido.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {resultado.tipo === 'produtos' ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Custo por unidade:</span>
                              <span className="font-semibold">R$ {resultado.analise.custoPorUnidade.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Margem bruta:</span>
                              <span className="font-semibold text-green-600">R$ {resultado.analise.margemBruta.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Margem líquida:</span>
                              <span className="font-semibold text-green-600">R$ {resultado.analise.margemLiquida.toFixed(2)}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Custo por hora:</span>
                              <span className="font-semibold">R$ {resultado.analise.custoHora.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Receita mensal:</span>
                              <span className="font-semibold text-blue-600">R$ {resultado.analise.receitaMensal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Lucro mensal:</span>
                              <span className="font-semibold text-green-600">R$ {resultado.analise.lucroMensal.toFixed(2)}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Dica:</strong> Este é um valor base. Considere também a concorrência, 
                        posicionamento no mercado e valor percebido pelos clientes.
                      </p>
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
                  <CardTitle className="text-lg">Dicas de Precificação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Valorize seu Tempo</h4>
                      <p className="text-xs text-gray-600">Inclua tempo de planejamento e execução</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Conheça o Mercado</h4>
                      <p className="text-xs text-gray-600">Pesquise preços da concorrência</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Revise Regularmente</h4>
                      <p className="text-xs text-gray-600">Ajuste preços conforme experiência</p>
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

export default PrecificacaoServicos;
