
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { TrendingUp, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  unit: string;
}

const CustoBeneficio = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '', price: 0, weight: 0, unit: 'kg' }
  ]);

  const addProduct = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { id: newId, name: '', price: 0, weight: 0, unit: 'kg' }]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: number, field: keyof Product, value: string | number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const calculateCostBenefit = (product: Product) => {
    if (product.weight === 0) return 0;
    return product.price / product.weight;
  };

  const getBestDeal = () => {
    const validProducts = products.filter(p => p.price > 0 && p.weight > 0);
    if (validProducts.length === 0) return null;
    
    return validProducts.reduce((best, current) => 
      calculateCostBenefit(current) < calculateCostBenefit(best) ? current : best
    );
  };

  const bestDeal = getBestDeal();

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <TrendingUp className="h-16 w-16 text-blue-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Calculadora de Custo-Benefício
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Compare produtos com diferentes pesos e preços para descobrir qual oferece o melhor valor por dinheiro investido.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  Compare Produtos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {products.map((product, index) => (
                  <div key={product.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Produto {index + 1}
                      </label>
                      <Input
                        placeholder="Nome do produto"
                        value={product.name}
                        onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
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
                        value={product.price || ''}
                        onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peso/Quantidade
                      </label>
                      <Input
                        type="number"
                        step="0.001"
                        placeholder="0"
                        value={product.weight || ''}
                        onChange={(e) => updateProduct(product.id, 'weight', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unidade
                      </label>
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={product.unit}
                        onChange={(e) => updateProduct(product.id, 'unit', e.target.value)}
                      >
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                        <option value="un">unidade</option>
                      </select>
                    </div>
                    
                    <div className="flex items-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeProduct(product.id)}
                        disabled={products.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button onClick={addProduct} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Produto
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {products.some(p => p.price > 0 && p.weight > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Resultados da Comparação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products
                      .filter(p => p.price > 0 && p.weight > 0)
                      .map((product) => {
                        const costPerUnit = calculateCostBenefit(product);
                        const isBest = bestDeal?.id === product.id;
                        
                        return (
                          <div
                            key={product.id}
                            className={`p-4 rounded-lg border-2 ${
                              isBest 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {product.name || `Produto ${product.id}`}
                                  {isBest && (
                                    <span className="ml-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                                      MELHOR CUSTO-BENEFÍCIO
                                    </span>
                                  )}
                                </h3>
                                <p className="text-gray-600">
                                  R$ {product.price.toFixed(2)} por {product.weight} {product.unit}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">
                                  R$ {costPerUnit.toFixed(2)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  por {product.unit}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Como Usar a Calculadora de Custo-Benefício</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">1. Adicione os Produtos</h3>
                <p className="text-gray-600">
                  Insira o nome, preço, peso/quantidade e unidade de medida de cada produto que deseja comparar.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">2. Compare os Resultados</h3>
                <p className="text-gray-600">
                  A calculadora mostra o preço por unidade de cada produto, destacando o melhor custo-benefício.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">💡 Dicas para Economizar</h3>
              <ul className="space-y-3 text-blue-700">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Sempre compare produtos similares da mesma categoria
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Considere a qualidade do produto, não apenas o preço
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Verifique datas de validade em produtos perecíveis
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  Produtos em embalagens maiores geralmente têm melhor custo-benefício
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CustoBeneficio;
