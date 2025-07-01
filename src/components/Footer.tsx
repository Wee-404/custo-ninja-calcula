
import React from 'react';
import { Calculator } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">Custo Ninja</span>
            </div>
            <p className="text-gray-300 mb-4">
              Suas ferramentas de cálculo online gratuitas. Simplifique suas decisões financeiras 
              e do dia a dia com nossas calculadoras práticas e precisas.
            </p>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">💡 Dica do Dia</h3>
              <p className="text-sm">
                Sempre compare o custo-benefício antes de fazer compras! Use nossa calculadora 
                para tomar decisões mais inteligentes.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Calculadoras</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/custo-beneficio" className="hover:text-white transition-colors">Custo-Benefício</a></li>
              <li><a href="/divisao-conta" className="hover:text-white transition-colors">Divisão de Conta</a></li>
              <li><a href="/contador-cervejas" className="hover:text-white transition-colors">Contador Cervejas</a></li>
              <li><a href="/investimentos" className="hover:text-white transition-colors">Investimentos</a></li>
              <li><a href="/calculadora-basica" className="hover:text-white transition-colors">Calculadora Básica</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Recursos</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Cursos Online</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog Financeiro</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dicas de Economia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Custo Ninja. Todos os direitos reservados. Desenvolvido para simplificar sua vida financeira.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
