
import React from 'react';
import { BookOpen, Star, ExternalLink } from 'lucide-react';

interface Course {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  affiliateLink: string; // Link de afiliado
  rating: number;
  students: string;
}

const CoursePromo = () => {
  // Facilite a edição dos cursos aqui
  const courses: Course[] = [
    {
      title: 'Investimentos Inteligentes',
      description: 'Aprenda a investir do zero ao avançado',
      price: 'R$ 197,00',
      originalPrice: 'R$ 297,00',
      affiliateLink: '#', // Adicione seu link de afiliado aqui
      rating: 4.8,
      students: '2.450',
    },
    {
      title: 'Planejamento Financeiro',
      description: 'Organize suas finanças pessoais',
      price: 'R$ 147,00',
      originalPrice: 'R$ 247,00',
      affiliateLink: '#', // Adicione seu link de afiliado aqui
      rating: 4.9,
      students: '1.890',
    },
    {
      title: 'Educação Financeira Completa',
      description: 'Transforme sua relação com o dinheiro',
      price: 'R$ 97,00',
      originalPrice: 'R$ 197,00',
      affiliateLink: '#', // Adicione seu link de afiliado aqui
      rating: 4.7,
      students: '3.200',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center mb-6">
        <BookOpen className="h-8 w-8 mr-3" />
        <div>
          <h3 className="text-2xl font-bold">Cursos Recomendados</h3>
          <p className="text-purple-100">Parceiros educacionais selecionados</p>
        </div>
      </div>
      
      <p className="mb-6 text-purple-100 text-lg">
        Transforme sua vida financeira com cursos especializados. 
        Conteúdo prático e resultados comprovados.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {courses.map((course, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-300 mr-1" />
                <span className="text-sm font-medium">{course.rating}</span>
                <span className="text-xs text-purple-200 ml-2">({course.students} alunos)</span>
              </div>
            </div>
            
            <h4 className="font-bold text-lg mb-2">{course.title}</h4>
            <p className="text-sm text-purple-100 mb-3">{course.description}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-xl font-bold text-yellow-300">{course.price}</span>
                {course.originalPrice && (
                  <span className="text-sm text-purple-200 line-through ml-2">{course.originalPrice}</span>
                )}
              </div>
            </div>
            
            <a
              href={course.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 text-sm w-full justify-center"
            >
              Ver Curso <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-purple-200 mb-3">
          🎯 Links afiliados - Apoie nosso trabalho sem custo extra para você
        </p>
        <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
          <p className="text-xs text-purple-100">
            💡 <strong>Dica:</strong> Para adicionar novos cursos, edite o array 'courses' no arquivo CoursePromo.tsx
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursePromo;
