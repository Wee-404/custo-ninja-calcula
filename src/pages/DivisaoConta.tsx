
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Users, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Person {
  id: number;
  name: string;
  consumption: number;
}

const DivisaoConta = () => {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: '', consumption: 0 }
  ]);
  const [serviceRate, setServiceRate] = useState<number>(10);
  const [totalBill, setTotalBill] = useState<number>(0);

  const addPerson = () => {
    const newId = Math.max(...people.map(p => p.id)) + 1;
    setPeople([...people, { id: newId, name: '', consumption: 0 }]);
  };

  const removePerson = (id: number) => {
    if (people.length > 1) {
      setPeople(people.filter(p => p.id !== id));
    }
  };

  const updatePerson = (id: number, field: keyof Person, value: string | number) => {
    setPeople(people.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const totalConsumption = people.reduce((sum, person) => sum + person.consumption, 0);
  const serviceAmount = totalConsumption * (serviceRate / 100);
  const finalTotal = totalConsumption + serviceAmount;

  const calculatePersonShare = (person: Person) => {
    const baseShare = person.consumption;
    const serviceShare = baseShare * (serviceRate / 100);
    return baseShare + serviceShare;
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Users className="h-16 w-16 text-green-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Calculadora de Divisão de Conta
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Divida contas entre amigos de forma justa, considerando o consumo individual de cada pessoa e a taxa de serviço.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Service Rate Configuration */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taxa de Serviço (%)
                    </label>
                    <Input
                      type="number"
                      step="0.5"
                      value={serviceRate}
                      onChange={(e) => setServiceRate(parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Geralmente 10% do valor total
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total da Conta (opcional)
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="R$ 0,00"
                      value={totalBill || ''}
                      onChange={(e) => setTotalBill(parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Para verificação (opcional)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* People and Consumption */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-green-600" />
                  Pessoas e Consumo Individual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {people.map((person, index) => (
                  <div key={person.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome da Pessoa {index + 1}
                      </label>
                      <Input
                        placeholder="Digite o nome"
                        value={person.name}
                        onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Consumo Individual (R$)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0,00"
                        value={person.consumption || ''}
                        onChange={(e) => updatePerson(person.id, 'consumption', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removePerson(person.id)}
                        disabled={people.length === 1}
                        className="w-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button onClick={addPerson} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Pessoa
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {totalConsumption > 0 && (
              <div className="space-y-6">
                {/* Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo da Conta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          R$ {totalConsumption.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Total Consumido</div>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                          R$ {serviceAmount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Taxa de Serviço ({serviceRate}%)</div>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          R$ {finalTotal.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Total Final</div>
                      </div>
                    </div>
                    
                    {totalBill > 0 && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span>Valor informado da conta:</span>
                          <span className="font-semibold">R$ {totalBill.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Diferença:</span>
                          <span className={`font-semibold ${Math.abs(totalBill - finalTotal) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
                            R$ {Math.abs(totalBill - finalTotal).toFixed(2)}
                            {totalBill !== finalTotal && (totalBill > finalTotal ? ' a menos' : ' a mais')}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Individual Shares */}
                <Card>
                  <CardHeader>
                    <CardTitle>Valor a Pagar por Pessoa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {people.filter(p => p.consumption > 0).map((person) => {
                        const personTotal = calculatePersonShare(person);
                        const serviceShare = person.consumption * (serviceRate / 100);
                        
                        return (
                          <div key={person.id} className="bg-white border-2 border-gray-200 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {person.name || `Pessoa ${person.id}`}
                                </h3>
                                <div className="text-sm text-gray-600 space-y-1">
                                  <div>Consumo: R$ {person.consumption.toFixed(2)}</div>
                                  <div>Taxa de serviço: R$ {serviceShare.toFixed(2)}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">
                                  R$ {personTotal.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-500">Total a pagar</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Como Usar o Divisor de Contas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-green-600">1. Configure a Taxa</h3>
                <p className="text-gray-600">
                  Defina a taxa de serviço (geralmente 10%) que será aplicada sobre o consumo individual de cada pessoa.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-green-600">2. Adicione as Pessoas</h3>
                <p className="text-gray-600">
                  Insira o nome de cada pessoa e o valor que ela consumiu individualmente durante o evento.
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-green-800">💰 Dicas para Dividir Contas</h3>
              <ul className="space-y-3 text-green-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Anote o consumo individual durante o evento para evitar confusões
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  A taxa de serviço padrão no Brasil é 10%, mas pode variar
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Considere dividir itens compartilhados (entrada, sobremesa) igualmente
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Use apps de pagamento para facilitar as transferências
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DivisaoConta;
