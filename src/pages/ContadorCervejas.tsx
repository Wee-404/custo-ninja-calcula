
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Beer, Plus, Minus, RotateCcw, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Beer className="h-10 w-10 text-amber-600" />
              Contador de Cervejas
            </h1>
            <p className="text-xl text-gray-600">
              Controle seu consumo e gastos no bar
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-amber-600">{totalBeers}</div>
                    <div className="text-gray-600">Cervejas</div>
                  </CardContent>
                </Card>
                
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-green-600">R$ {totalValue.toFixed(2)}</div>
                    <div className="text-gray-600">Total</div>
                  </CardContent>
                </Card>
              </div>

              {/* Beer Counters */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Tipos de Cerveja</CardTitle>
                    <Button 
                      onClick={resetAllCounts}
                      variant="outline"
                      size="sm"
                      disabled={totalBeers === 0}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Zerar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {beerTypes.map((beer) => (
                    <div key={beer.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div>
                          <Input
                            placeholder="Nome da cerveja"
                            value={beer.name}
                            onChange={(e) => updateBeerType(beer.id, 'name', e.target.value)}
                          />
                        </div>
                        
                        <div>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Preço"
                            value={beer.price || ''}
                            onChange={(e) => updateBeerType(beer.id, 'price', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => decrementCount(beer.id)}
                            disabled={beer.count === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <div className="text-2xl font-bold min-w-[60px] text-center">
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
                      
                      {beer.count > 0 && (
                        <div className="text-center mt-3">
                          <span className="text-lg font-bold text-green-600">
                            Subtotal: R$ {(beer.price * beer.count).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <Button onClick={addBeerType} variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Tipo
                  </Button>
                </CardContent>
              </Card>

              {totalBeers > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Resumo Final</span>
                      <Link to="/divisao-conta">
                        <Button variant="outline" size="sm">
                          <Users className="h-4 w-4 mr-2" />
                          Dividir Conta
                        </Button>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {totalBeers} cerveja{totalBeers !== 1 ? 's' : ''} consumida{totalBeers !== 1 ? 's' : ''}
                        </h3>
                        <p className="text-3xl font-bold text-green-600">
                          Total: R$ {totalValue.toFixed(2)}
                        </p>
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
                  <CardTitle className="text-lg">🍺 Consumo Responsável</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    • Estabeleça um limite diário<br/>
                    • Monitore seus gastos<br/>
                    • Beba com moderação<br/>
                    • Use nossa calculadora de divisão
                  </p>
                  <Link to="/divisao-conta">
                    <Button className="w-full" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Dividir Conta Entre Amigos
                    </Button>
                  </Link>
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
