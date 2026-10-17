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
import AjmeraLuxuryProjectPage from "./pages/AjmeraLuxuryProjectPage";
import CafeCoffeeDayProjectPage from "./pages/CafeCoffeeDayProjectPage";
import CinematicLovProjectPage from "./pages/CinematicLovProjectPage";

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
            <Route path="/projects/cognisext" element={<CognisextProjectPage />} />
            <Route path="/projects/eta-mobile" element={<ETAMobileProjectPage />} />
            <Route path="/projects/ajmera-luxury" element={<AjmeraLuxuryProjectPage />} />
            <Route path="/projects/cafe-coffee-day" element={<CafeCoffeeDayProjectPage />} />
            <Route path="/projects/cinematic-lov" element={<CinematicLovProjectPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
