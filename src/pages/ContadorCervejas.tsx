
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Beer, Plus, Minus, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BeerType {
  id: number;
  name: string;
  price: number;
  count: number;
}

const ContadorCervejas = () => {
  const [beerTypes, setBeerTypes] = useState<BeerType[]>([
    { id: 1, name: 'Cerveja Comum', price: 8.00, count: 0 },
    { id: 2, name: 'Cerveja Premium', price: 12.00, count: 0 },
    { id: 3, name: 'Cerveja Artesanal', price: 15.00, count: 0 }
  ]);

  const updateBeerType = (id: number, field: keyof BeerType, value: string | number) => {
    setBeerTypes(beerTypes.map(beer => 
      beer.id === id ? { ...beer, [field]: value } : beer
    ));
  };

  const incrementCount = (id: number) => {
    setBeerTypes(beerTypes.map(beer => 
      beer.id === id ? { ...beer, count: beer.count + 1 } : beer
    ));
  };

  const decrementCount = (id: number) => {
    setBeerTypes(beerTypes.map(beer => 
      beer.id === id ? { ...beer, count: Math.max(0, beer.count - 1) } : beer
    ));
  };

  const resetAllCounts = () => {
    setBeerTypes(beerTypes.map(beer => ({ ...beer, count: 0 })));
  };

  const addBeerType = () => {
    const newId = Math.max(...beerTypes.map(b => b.id)) + 1;
    setBeerTypes([...beerTypes, { id: newId, name: '', price: 0, count: 0 }]);
  };

  const totalBeers = beerTypes.reduce((sum, beer) => sum + beer.count, 0);
  const totalValue = beerTypes.reduce((sum, beer) => sum + (beer.price * beer.count), 0);

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-amber-600 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Beer className="h-16 w-16 text-amber-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contador de Cervejas no Bar
            </h1>
            <p className="text-xl text-amber-100 mb-8">
              Controle quantas cervejas foram consumidas e calcule o valor total da conta de forma prática e organizada.
            </p>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-amber-600">{totalBeers}</div>
                  <div className="text-gray-600">Total de Cervejas</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600">R$ {totalValue.toFixed(2)}</div>
                  <div className="text-gray-600">Valor Total</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <Button 
                    onClick={resetAllCounts}
                    variant="outline"
                    className="w-full"
                    disabled={totalBeers === 0}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Contador
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Beer Counters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beer className="h-6 w-6 text-amber-600" />
                  Tipos de Cerveja
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {beerTypes.map((beer) => (
                  <div key={beer.id} className="bg-gray-50 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome da Cerveja
                        </label>
                        <Input
                          placeholder="Ex: Skol, Brahma..."
                          value={beer.name}
                          onChange={(e) => updateBeerType(beer.id, 'name', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preço (R$)
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          value={beer.price || ''}
                          onChange={(e) => updateBeerType(beer.id, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantidade
                        </label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => decrementCount(beer.id)}
                            disabled={beer.count === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <div className="text-2xl font-bold text-center min-w-[60px]">
                            {beer.count}
                          </div>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => incrementCount(beer.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Subtotal</div>
                        <div className="text-xl font-bold text-green-600">
                          R$ {(beer.price * beer.count).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button onClick={addBeerType} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Tipo de Cerveja
                </Button>
              </CardContent>
            </Card>

            {/* Detailed Summary */}
            {totalBeers > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Resumo Detalhado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {beerTypes.filter(beer => beer.count > 0).map((beer) => (
                      <div key={beer.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold">{beer.name || `Cerveja ${beer.id}`}</div>
                          <div className="text-sm text-gray-600">
                            {beer.count} × R$ {beer.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          R$ {(beer.price * beer.count).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-t-2 border-gray-300 pt-4">
                      <div className="flex justify-between items-center text-xl">
                        <div className="font-bold">Total Geral:</div>
                        <div className="font-bold text-green-600">
                          R$ {totalValue.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-gray-600 text-center mt-2">
                        {totalBeers} cerveja{totalBeers !== 1 ? 's' : ''} consumida{totalBeers !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Dicas para Usar o Contador</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-amber-600">🍺 Durante o Consumo</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Incremente o contador a cada cerveja pedida</li>
                  <li>• Mantenha o celular sempre à mão</li>
                  <li>• Atualize em tempo real para não esquecer</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-amber-600">💰 Controle de Gastos</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Defina um orçamento antes de sair</li>
                  <li>• Acompanhe o valor total em tempo real</li>
                  <li>• Use o reset para começar nova sessão</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-amber-800">🚨 Beba com Responsabilidade</h3>
              <ul className="space-y-3 text-amber-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Conheça seus limites e respeite-os sempre
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Alternar com água e comida durante o consumo
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Nunca dirija após consumir bebidas alcoólicas
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Use aplicativos de transporte ou transporte público
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContadorCervejas;
