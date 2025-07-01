import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Beer, Plus, Minus, RotateCcw, Calculator, AlertTriangle, Users } from 'lucide-react';

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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Beer className="h-10 w-10 text-amber-600" />
              Contador de Cervejas e Bebidas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Controle seu consumo e gastos no bar de forma inteligente
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
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

            <div className="space-y-6">
              <CoursePromo />
              <AdBanner size="medium" />
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Consumo Responsável</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Limite Diário</h4>
                      <p className="text-xs text-gray-600">Estabeleça um limite de bebidas por dia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calculator className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Controle de Gastos</h4>
                      <p className="text-xs text-gray-600">Monitore quanto está gastando</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Divisão de Conta</h4>
                      <p className="text-xs text-gray-600">Use nossa calculadora de divisão</p>
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

export default ContadorCervejas;
