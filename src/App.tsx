
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustoBeneficio from "./pages/CustoBeneficio";
import DivisaoConta from "./pages/DivisaoConta";
import ContadorCervejas from "./pages/ContadorCervejas";
import Investimentos from "./pages/Investimentos";
import CalculadoraBasica from "./pages/CalculadoraBasica";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/custo-beneficio" element={<CustoBeneficio />} />
          <Route path="/divisao-conta" element={<DivisaoConta />} />
          <Route path="/contador-cervejas" element={<ContadorCervejas />} />
          <Route path="/investimentos" element={<Investimentos />} />
          <Route path="/calculadora-basica" element={<CalculadoraBasica />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
