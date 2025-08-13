import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Coffee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const CalculadoraGorjeta = () => {
  const [bill, setBill] = useState<number>(0);
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [people, setPeople] = useState<number>(1);

  const tipAmount = bill * (tipPercent / 100);
  const total = bill + tipAmount;
  const perPerson = people > 0 ? total / people : 0;

  return (
    <Layout>
      <section className="bg-gradient-to-br from-amber-600 to-amber-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Coffee className="h-16 w-16 mx-auto mb-6 text-amber-200" />
          <h1 className="text-4xl font-bold mb-4">Calculadora de Gorjeta</h1>
          <p className="text-xl text-amber-100">
            Calcule facilmente a gorjeta e o valor por pessoa.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Informe os valores</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Valor da conta</label>
                <Input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(parseFloat(e.target.value) || 0)}
                  placeholder="R$"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Porcentagem da gorjeta (%)</label>
                <Input
                  type="number"
                  value={tipPercent}
                  onChange={(e) => setTipPercent(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Número de pessoas</label>
                <Input
                  type="number"
                  min={1}
                  value={people}
                  onChange={(e) => setPeople(parseInt(e.target.value) || 1)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resultado</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Gorjeta:</span>
                <span>R$ {tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total com gorjeta:</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Valor por pessoa:</span>
                <span>R$ {perPerson.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default CalculadoraGorjeta;

