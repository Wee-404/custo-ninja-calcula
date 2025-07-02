
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useScrollToTop from "./hooks/useScrollToTop";
import Index from "./pages/Index";
import CustoBeneficio from "./pages/CustoBeneficio";
import DivisaoConta from "./pages/DivisaoConta";
import ContadorCervejas from "./pages/ContadorCervejas";
import Investimentos from "./pages/Investimentos";
import CalculadoraBasica from "./pages/CalculadoraBasica";
import PlanejamentoAposentadoria from "./pages/PlanejamentoAposentadoria";
import PrecificacaoServicos from "./pages/PrecificacaoServicos";
import EducacaoFinanceira from "./pages/EducacaoFinanceira";
import EmpreendedorismoLocal from "./pages/EmpreendedorismoLocal";
import UtilitariosFinanceiros from "./pages/UtilitariosFinanceiros";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppWrapper = () => {
  useScrollToTop();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/custo-beneficio" element={<CustoBeneficio />} />
      <Route path="/divisao-conta" element={<DivisaoConta />} />
      <Route path="/contador-cervejas" element={<ContadorCervejas />} />
      <Route path="/investimentos" element={<Investimentos />} />
      <Route path="/calculadora-basica" element={<CalculadoraBasica />} />
      <Route path="/planejamento-aposentadoria" element={<PlanejamentoAposentadoria />} />
      <Route path="/precificacao-servicos" element={<PrecificacaoServicos />} />
      <Route path="/educacao-financeira" element={<EducacaoFinanceira />} />
      <Route path="/empreendedorismo-local" element={<EmpreendedorismoLocal />} />
      <Route path="/utilitarios-financeiros" element={<UtilitariosFinanceiros />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
