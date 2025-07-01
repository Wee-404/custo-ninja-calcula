import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Calculator, TrendingDown } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  quantity: number;
}

const CustoBeneficio = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '', price: 0, weight: 0, quantity: 1 },
  ]);

  const addProduct = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { id: newId, name: '', price: 0, weight: 0, quantity: 1 }]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: number, field: string, value: number | string) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, [field]: typeof value === 'number' ? Number(value) : value } : p
    ));
  };

  const calculateCostBenefit = (product: Product) => {
    if (product.weight > 0 && product.price > 0 && product.quantity > 0) {
      return (product.price / (product.weight * product.quantity));
    }
    return 0;
  };

  const bestOption = products.reduce((prev, current) => {
    const prevCostBenefit = calculateCostBenefit(prev);
    const currentCostBenefit = calculateCostBenefit(current);
    return prevCostBenefit < currentCostBenefit ? prev : current;
  }, products[0]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Calculator className="h-10 w-10 text-blue-600" />
              Calculadora de Custo-Benefício
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Compare diferentes produtos considerando peso, quantidade e preço para encontrar a melhor opção
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-6 w-6 text-blue-600" />
                    Comparar Produtos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {products.map((product, index) => (
                    <div key={product.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Produto {index + 1}
                        </label>
                        <Input
                          type="text"
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
                          placeholder="0.00"
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, 'price', Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Peso (kg)
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={product.weight}
                          onChange={(e) => updateProduct(product.id, 'weight', Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantidade
                        </label>
                        <Input
                          type="number"
                          placeholder="1"
                          value={product.quantity}
                          onChange={(e) => updateProduct(product.id, 'quantity', Number(e.target.value))}
                        />
                      </div>
                      <div className="md:col-start-4 flex items-end">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeProduct(product.id)}
                          disabled={products.length === 1}
                          className="w-full"
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

              {products.length > 0 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Melhor Opção</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bestOption.name && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">
                          {bestOption.name} é a melhor opção!
                        </h3>
                        <p className="text-sm text-gray-600">
                          Custo por kg: R$ {calculateCostBenefit(bestOption).toFixed(2)}
                        </p>
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
                  <CardTitle className="text-lg">Dicas de Compra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Compare por Unidade</h4>
                      <p className="text-xs text-gray-600">Sempre calcule o preço por kg, litro ou unidade</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calculator className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Considere a Qualidade</h4>
                      <p className="text-xs text-gray-600">O mais barato nem sempre é a melhor opção</p>
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

export default CustoBeneficio;
