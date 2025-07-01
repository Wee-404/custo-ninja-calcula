
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, Truck, Bike, Search, Calendar, DollarSign } from 'lucide-react';

const ConsultaFipe = () => {
  const [tipoVeiculo, setTipoVeiculo] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Dados simulados para demonstração
  const marcas = {
    carros: ['Toyota', 'Honda', 'Volkswagen', 'Chevrolet', 'Ford', 'Fiat', 'Hyundai'],
    motos: ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW', 'Harley-Davidson'],
    caminhoes: ['Mercedes-Benz', 'Volvo', 'Scania', 'Iveco', 'Ford', 'Volkswagen']
  };

  const modelos = {
    'Toyota': ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Etios'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'Fit', 'HR-V'],
    'Volkswagen': ['Jetta', 'Golf', 'Polo', 'T-Cross', 'Tiguan']
  };

  const anos = Array.from({ length: 25 }, (_, i) => 2024 - i);

  const consultarFipe = async () => {
    setLoading(true);
    // Simulação de consulta à API FIPE
    setTimeout(() => {
      setResultado({
        veiculo: `${marca} ${modelo} ${ano}`,
        valor: Math.floor(Math.random() * 100000) + 20000,
        mesReferencia: 'Dezembro/2024',
        codigoFipe: '001001-1',
        combustivel: 'Gasolina',
        categoria: tipoVeiculo
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Car className="h-10 w-10 text-blue-600" />
              Consulta Tabela FIPE
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Consulte o valor atualizado do seu veículo na tabela FIPE de forma rápida e gratuita
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-6 w-6" />
                    Consultar Veículo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Veículo
                    </label>
                    <Select onValueChange={setTipoVeiculo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carros">
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4" />
                            Carros
                          </div>
                        </SelectItem>
                        <SelectItem value="motos">
                          <div className="flex items-center gap-2">
                            <Bike className="h-4 w-4" />
                            Motos
                          </div>
                        </SelectItem>
                        <SelectItem value="caminhoes">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            Caminhões
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {tipoVeiculo && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Marca
                      </label>
                      <Select onValueChange={setMarca}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a marca" />
                        </SelectTrigger>
                        <SelectContent>
                          {marcas[tipoVeiculo as keyof typeof marcas]?.map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {marca && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Modelo
                      </label>
                      <Select onValueChange={setModelo}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o modelo" />
                        </SelectTrigger>
                        <SelectContent>
                          {modelos[marca as keyof typeof modelos]?.map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          )) || <SelectItem value="modelo-generico">Modelo Genérico</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {modelo && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ano
                      </label>
                      <Select onValueChange={setAno}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o ano" />
                        </SelectTrigger>
                        <SelectContent>
                          {anos.map((a) => (
                            <SelectItem key={a} value={a.toString()}>{a}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {ano && (
                    <Button 
                      onClick={consultarFipe} 
                      className="w-full" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>Consultando...</>
                      ) : (
                        <>
                          <Search className="h-5 w-5 mr-2" />
                          Consultar FIPE
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {resultado && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-green-600">Resultado da Consulta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-blue-800 mb-2">Veículo</h3>
                          <p className="text-lg font-bold text-blue-600">{resultado.veiculo}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-green-800 mb-2">Valor FIPE</h3>
                          <p className="text-3xl font-bold text-green-600">
                            R$ {resultado.valor.toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-purple-800 mb-2">Detalhes</h3>
                          <div className="space-y-2 text-sm">
                            <p><strong>Código FIPE:</strong> {resultado.codigoFipe}</p>
                            <p><strong>Combustível:</strong> {resultado.combustivel}</p>
                            <p><strong>Mês Referência:</strong> {resultado.mesReferencia}</p>
                          </div>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <h3 className="font-semibold text-amber-800 mb-2">Observações</h3>
                          <p className="text-xs text-amber-700">
                            * Valor baseado na tabela FIPE mais recente disponível.
                            O preço pode variar conforme estado de conservação e região.
                          </p>
                        </div>
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
                  <CardTitle className="text-lg">Sobre a FIPE</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Atualização Mensal</h4>
                      <p className="text-xs text-gray-600">Os valores são atualizados mensalmente pela FIPE</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Referência de Mercado</h4>
                      <p className="text-xs text-gray-600">Base para negociações e financiamentos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Todos os Veículos</h4>
                      <p className="text-xs text-gray-600">Cobertura completa do mercado nacional</p>
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

export default ConsultaFipe;
