import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import Profile from "@/pages/Profile";
import AmbassadorForm from "@/pages/AmbassadorForm";
import AddInfluencer from "@/pages/AddInfluencer";
import InfluencerPerformance from "@/pages/InfluencerPerformance";
import InfluencerCodeDetails from "@/pages/InfluencerCodeDetails";
import AllInfluencers from "@/pages/AllInfluencers";
import Applications from "@/pages/Applications";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ui/ScrollToTop";
import EarningsHistory from "@/pages/EarningsHistory";
import AdminInvoices from "@/pages/AdminInvoices";
import InfluencerInvoiceDetails from "@/pages/InfluencerInvoiceDetails";
import InfluencerDetails from "@/pages/InfluencerDetails";
import CodeDetails from "@/pages/CodeDetails";
import ActiveCodes from "@/pages/ActiveCodes";
import EditInfluencer from "@/pages/EditInfluencer";
import WelcomeEmailTemplate from "@/pages/WelcomeEmailTemplate";
import "./App.css";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-influencer" element={<AddInfluencer />} />
          <Route
            path="/influencer-performance"
            element={<InfluencerPerformance />}
          />
          <Route
            path="/influencer-code-details/:influencerName"
            element={<InfluencerCodeDetails />}
          />
          <Route path="/all-influencers" element={<AllInfluencers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ambassador" element={<AmbassadorForm />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/earnings-history" element={<EarningsHistory />} />
          <Route path="/admin-invoices" element={<AdminInvoices />} />
          <Route
            path="/admin-invoices/:invoiceId"
            element={<InfluencerInvoiceDetails />}
          />
          <Route
            path="/influencer/:influencerId"
            element={<InfluencerDetails />}
          />
          <Route path="/code-details/:code" element={<CodeDetails />} />
          <Route path="/active-codes" element={<ActiveCodes />} />
          <Route path="/edit-influencer/:id" element={<EditInfluencer />} />
          <Route path="/welcome-email" element={<WelcomeEmailTemplate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </div>
  );
}

export default App;
