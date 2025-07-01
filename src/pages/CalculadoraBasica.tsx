
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CalculadoraBasica = () => {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  const inputNumber = (number: string) => {
    if (waitingForNewValue) {
      setDisplay(number);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? number : display + number);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handlePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
    setWaitingForNewValue(true);
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const buttons = [
    [
      { label: 'C', type: 'clear', action: clear },
      { label: '±', type: 'function', action: handlePlusMinus },
      { label: '%', type: 'function', action: handlePercentage },
      { label: '÷', type: 'operator', action: () => performOperation('÷') }
    ],
    [
      { label: '7', type: 'number', action: () => inputNumber('7') },
      { label: '8', type: 'number', action: () => inputNumber('8') },
      { label: '9', type: 'number', action: () => inputNumber('9') },
      { label: '×', type: 'operator', action: () => performOperation('×') }
    ],
    [
      { label: '4', type: 'number', action: () => inputNumber('4') },
      { label: '5', type: 'number', action: () => inputNumber('5') },
      { label: '6', type: 'number', action: () => inputNumber('6') },
      { label: '-', type: 'operator', action: () => performOperation('-') }
    ],
    [
      { label: '1', type: 'number', action: () => inputNumber('1') },
      { label: '2', type: 'number', action: () => inputNumber('2') },
      { label: '3', type: 'number', action: () => inputNumber('3') },
      { label: '+', type: 'operator', action: () => performOperation('+') }
    ],
    [
      { label: '0', type: 'number', action: () => inputNumber('0'), span: 2 },
      { label: '.', type: 'function', action: inputDecimal },
      { label: '=', type: 'equals', action: handleEquals }
    ]
  ];

  const getButtonClass = (type: string, isActive?: boolean) => {
    const baseClass = "h-16 text-xl font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95";
    
    switch (type) {
      case 'clear':
        return `${baseClass} bg-red-500 hover:bg-red-600 text-white`;
      case 'function':
        return `${baseClass} bg-gray-400 hover:bg-gray-500 text-white`;
      case 'operator':
        return `${baseClass} ${isActive ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`;
      case 'equals':
        return `${baseClass} bg-green-600 hover:bg-green-700 text-white`;
      default:
        return `${baseClass} bg-gray-200 hover:bg-gray-300 text-gray-800`;
    }
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-gray-600 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Calculator className="h-16 w-16 text-gray-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Calculadora Básica
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Calculadora tradicional para suas operações matemáticas do dia a dia. 
              Simples, rápida e confiável.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="bg-gray-900 text-white shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-gray-300">Calculadora</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Display */}
                <div className="bg-black rounded-lg p-4 mb-6">
                  <div className="text-right text-4xl font-mono text-green-400 min-h-[3rem] flex items-center justify-end break-all">
                    {display.length > 12 ? parseFloat(display).toExponential(5) : display}
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  {buttons.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-4 gap-3">
                      {row.map((button, buttonIndex) => (
                        <Button
                          key={buttonIndex}
                          onClick={button.action}
                          className={`${getButtonClass(button.type, operation === button.label)} ${
                            button.span === 2 ? 'col-span-2' : ''
                          }`}
                        >
                          {button.label}
                        </Button>
                      ))}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Recursos da Calculadora</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">⚡ Operações Básicas</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Adição (+)</li>
                  <li>• Subtração (-)</li>
                  <li>• Multiplicação (×)</li>
                  <li>• Divisão (÷)</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">🔧 Funções Especiais</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Porcentagem (%)</li>
                  <li>• Mudança de sinal (±)</li>
                  <li>• Números decimais</li>
                  <li>• Limpar (C)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-800 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">🎯 Dicas de Uso</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-semibold mr-2 text-blue-400">•</span>
                  Use o botão C para limpar tudo e começar um novo cálculo
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 text-blue-400">•</span>
                  O botão ± muda o sinal do número atual (positivo/negativo)
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 text-blue-400">•</span>
                  Use % para calcular porcentagens rapidamente
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2 text-blue-400">•</span>
                  A calculadora funciona perfeitamente em celulares e tablets
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CalculadoraBasica;
