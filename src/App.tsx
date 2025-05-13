
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ConsultationBooking from "./pages/ConsultationBooking";
import ServiceBooking from "./pages/ServiceBooking";
import ServiceConfirmation from "./pages/ServiceConfirmation";
import NotFound from "./pages/NotFound";
import { initializeAdmin } from "./utils/authUtils";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize admin account on app load
    initializeAdmin();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/consultation-booking" element={<ConsultationBooking />} />
            <Route path="/service-booking/:serviceId" element={<ServiceBooking />} />
            <Route path="/service-confirmation" element={<ServiceConfirmation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
