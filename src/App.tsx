import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PGymProjectPage from "./pages/PGymProjectPage";
import TaskCafeProjectPage from "./pages/TaskCafeProjectPage";
import CognisextProjectPage from "./pages/CognisextProjectPage";
import ETAMobileProjectPage from "./pages/ETAMobileProjectPage";
import SharmaFabricationProjectPage from "./pages/SharmaFabricationProjectPage";
import PritamCinematicProjectPage from "./pages/PritamCinematicProjectPage";
import AjmeraTrendsProjectPage from "./pages/AjmeraTrendsProjectPage";
import CafeCoffeeDayProjectPage from "./pages/CafeCoffeeDayProjectPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/p-gym" element={<PGymProjectPage />} />
            <Route path="/projects/taskcafe" element={<TaskCafeProjectPage />} />
            <Route path="/projects/cognitext" element={<CognisextProjectPage />} />
            <Route path="/projects/eta-mobile" element={<ETAMobileProjectPage />} />
            <Route path="/projects/sharma-fabrication" element={<SharmaFabricationProjectPage />} />
            <Route path="/projects/pritam-cinematic" element={<PritamCinematicProjectPage />} />
            <Route path="/projects/ajmera-trends" element={<AjmeraTrendsProjectPage />} />
            <Route path="/projects/cafe-coffee-day" element={<CafeCoffeeDayProjectPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
