
import React, { useState } from 'react';
import Layout from '../components/Layout';
import AdBanner from '../components/AdBanner';
import CoursePromo from '../components/CoursePromo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, TrendingDown, Trophy } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  quantity: number;
  unit: string;
}

const CustoBeneficio = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: '', price: 0, weight: 0, quantity: 1, unit: 'kg' },
    { id: 2, name: '', price: 0, weight: 0, quantity: 1, unit: 'kg' },
  ]);

  const unidadesMedida = [
    { value: 'kg', label: 'Kg (quilograma)' },
    { value: 'g', label: 'g (grama)' },
    { value: 'l', label: 'L (litro)' },
    { value: 'ml', label: 'ml (mililitro)' },
    { value: 'un', label: 'Unidade' },
    { value: 'cx', label: 'Caixa' },
    { value: 'pct', label: 'Pacote' },
    { value: 'm', label: 'm (metro)' },
    { value: 'cm', label: 'cm (centímetro)' },
  ];

  const addProduct = () => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { id: newId, name: '', price: 0, weight: 0, quantity: 1, unit: 'kg' }]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 2) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: number, field: string, value: number | string) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, [field]: typeof value === 'number' ? Number(value) : value } : p
    ));
  };

  const convertToBaseUnit = (weight: number, unit: string): number => {
    switch (unit) {
      case 'g': return weight / 1000; // converter para kg
      case 'ml': return weight / 1000; // converter para litros
      case 'cm': return weight / 100; // converter para metros
      case 'kg':
      case 'l':
      case 'm':
      case 'un':
      case 'cx':
      case 'pct':
      default:
        return weight;
    }
  };

  const getUnitLabel = (unit: string): string => {
    const unitMap: { [key: string]: string } = {
      'kg': 'kg',
      'g': 'kg',
      'l': 'L',
      'ml': 'L',
      'un': 'unidade',
      'cx': 'caixa',
      'pct': 'pacote',
      'm': 'm',
      'cm': 'm'
    };
    return unitMap[unit] || unit;
  };

  const calculateCostBenefit = (product: Product) => {
    if (product.weight > 0 && product.price > 0 && product.quantity > 0) {
      const baseWeight = convertToBaseUnit(product.weight, product.unit);
      return (product.price / (baseWeight * product.quantity));
    }
    return 0;
  };

  const productsWithCost = products
    .filter(p => p.price > 0 && p.weight > 0)
    .map(p => ({ ...p, costPerUnit: calculateCostBenefit(p) }))
    .sort((a, b) => a.costPerUnit - b.costPerUnit);

  const bestOption = productsWithCost[0];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              🏆 Calculadora de Custo-Benefício
            </h1>
            <p className="text-xl text-gray-600">
              Compare produtos e encontre a melhor opção pelo menor preço por unidade
            </p>
          </div>

          <AdBanner size="large" className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Compare os Produtos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {products.map((product, index) => (
                    <div key={product.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">Produto {index + 1}</h3>
                        {products.length > 2 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          placeholder="Nome do produto"
                          value={product.name}
                          onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                        />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Preço (R$)"
                          value={product.price || ''}
                          onChange={(e) => updateProduct(product.id, 'price', Number(e.target.value))}
                        />
                        <div className="flex gap-2">
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="Peso/Volume"
                            value={product.weight || ''}
                            onChange={(e) => updateProduct(product.id, 'weight', Number(e.target.value))}
                            className="flex-1"
                          />
                          <Select
                            value={product.unit}
                            onValueChange={(value) => updateProduct(product.id, 'unit', value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {unidadesMedida.map((unidade) => (
                                <SelectItem key={unidade.value} value={unidade.value}>
                                  {unidade.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Input
                          type="number"
                          placeholder="Quantidade"
                          value={product.quantity}
                          onChange={(e) => updateProduct(product.id, 'quantity', Number(e.target.value))}
                        />
                      </div>
                      
                      {product.price > 0 && product.weight > 0 && (
                        <div className="mt-3 text-center">
                          <span className="text-lg font-bold text-blue-600">
                            R$ {calculateCostBenefit(product).toFixed(2)} por {getUnitLabel(product.unit)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}

                  <Button onClick={addProduct} variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </CardContent>
              </Card>

              {bestOption && (
                <Card className="mt-6 border-2 border-green-500">
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Trophy className="h-6 w-6" />
                      Melhor Opção!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        {bestOption.name || `Produto ${bestOption.id}`}
                      </h3>
                      <p className="text-3xl font-bold text-green-600 mb-2">
                        R$ {bestOption.costPerUnit.toFixed(2)} por {getUnitLabel(bestOption.unit)}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Preço total: R$ {bestOption.price.toFixed(2)} para {(convertToBaseUnit(bestOption.weight, bestOption.unit) * bestOption.quantity).toFixed(2)} {getUnitLabel(bestOption.unit)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {productsWithCost.length > 1 && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Ranking Completo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {productsWithCost.map((product, index) => (
                        <div key={product.id} className={`flex justify-between items-center p-3 rounded-lg ${
                          index === 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                        }`}>
                          <div>
                            <span className="font-semibold">
                              {index + 1}º - {product.name || `Produto ${product.id}`}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className={`font-bold ${
                              index === 0 ? 'text-green-600' : 'text-gray-600'
                            }`}>
                              R$ {product.costPerUnit.toFixed(2)}/{getUnitLabel(product.unit)}
                            </span>
                          </div>
                        </div>
                      ))}
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
                  <CardTitle className="text-lg">💡 Dicas de Compra</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Compare Sempre</h4>
                      <p className="text-xs text-gray-600">Calcule o preço por unidade de medida</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Trophy className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm">Qualidade Importa</h4>
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
