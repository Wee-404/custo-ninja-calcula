
import React from 'react';
import { BookOpen, Star } from 'lucide-react';

const CoursePromo = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <BookOpen className="h-8 w-8 mr-3" />
        <h3 className="text-xl font-bold">Aprenda Mais com Nossos Cursos</h3>
      </div>
      <p className="mb-4 text-purple-100">
        Transforme sua vida financeira com conhecimento especializado. 
        Cursos práticos para aplicar no seu dia a dia.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white/10 p-3 rounded">
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 text-yellow-300 mr-1" />
            <span className="text-sm font-semibold">Investimentos Inteligentes</span>
          </div>
          <p className="text-xs text-purple-100">R$ 197,00</p>
        </div>
        <div className="bg-white/10 p-3 rounded">
          <div className="flex items-center mb-2">
            <Star className="h-4 w-4 text-yellow-300 mr-1" />
            <span className="text-sm font-semibold">Planejamento Financeiro</span>
          </div>
          <p className="text-xs text-purple-100">R$ 147,00</p>
        </div>
      </div>
      <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors w-full">
        Ver Todos os Cursos
      </button>
    </div>
  );
};

export default CoursePromo;
