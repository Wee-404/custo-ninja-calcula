
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Início' },
    { path: '/utilitarios-financeiros', label: 'Utilitários' },
    { path: '/custo-beneficio', label: 'Custo-Benefício' },
    { path: '/divisao-conta', label: 'Divisão de Conta' },
    { path: '/investimentos', label: 'Investimentos' },
    { path: '/blog-financas', label: 'Blog' },
    { path: '/educacao-financeira', label: 'Educação Financeira' },
    { path: '/empreendedorismo-local', label: 'Empreendedorismo' },
  ];

  const quickAccessItems = [
    { path: '/blog-financas', label: 'Blog' },
    { path: '/educacao-financeira', label: 'Diagnóstico Financeiro' },
    { path: '/divisao-conta', label: 'Divisão de Contas' },
    { path: '/contador-cervejas', label: 'Contador de Cerveja' },
    { path: '/empreendedorismo-local', label: 'Empreendedorismo' },
    { path: '/investimentos', label: 'Investimentos' },
    { path: '/planejamento-aposentadoria', label: 'Cálculo de Aposentadoria' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <span className="font-bold text-xl text-gray-800">Custo Ninja</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            {menuItems.slice(0, -2).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Menu Rápido */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
                    Menu Rápido
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {quickAccessItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.label}</div>
                        </Link>
                      ))}
                      <div className="col-span-2 mt-2 pt-2 border-t">
                        <Link
                          to="#newsletter"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">📧 Newsletter</div>
                          <div className="text-xs text-muted-foreground">Inscreva-se para receber dicas</div>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden pb-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="px-3 text-sm font-semibold text-gray-500 uppercase tracking-wider">Menu Rápido</h3>
              {quickAccessItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
