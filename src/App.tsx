import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DeviceManager from "./pages/DeviceManager";
import Inbox from "./pages/Inbox";
import BroadcastCampaign from "./pages/BroadcastCampaign";
import GroupManager from "./pages/GroupManager";
import ContactList from "./pages/ContactList";
import AutoReplyBot from "./pages/AutoReplyBot";
import AIAgent from "./pages/AIAgent";
import MessageTemplates from "./pages/MessageTemplates";
import RestApiWebhooks from "./pages/RestApiWebhooks";
import MessageLogs from "./pages/MessageLogs";
import ApplicationSettings from "./pages/ApplicationSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/device" element={<DeviceManager />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/broadcast" element={<BroadcastCampaign />} />
          <Route path="/groups" element={<GroupManager />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/auto-reply" element={<AutoReplyBot />} />
          <Route path="/ai-agent" element={<AIAgent />} />
          <Route path="/templates" element={<MessageTemplates />} />
          <Route path="/api" element={<RestApiWebhooks />} />
          <Route path="/logs" element={<MessageLogs />} />
          <Route path="/settings" element={<ApplicationSettings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
