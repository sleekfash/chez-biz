import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

const Landing = lazy(() => import("./pages/Landing"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Press = lazy(() => import("./pages/Press"));
const Events = lazy(() => import("./pages/Events"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<main className="min-h-screen bg-background" aria-busy="true" aria-label="Loading page" />}>
          <Routes>
            {/* Public Artist Pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/press" element={<Press />} />
            <Route path="/events" element={<Events />} />
            
            {/* Auth */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Fan Dashboard (BeatRewards) */}
            <Route path="/app" element={<Dashboard />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
