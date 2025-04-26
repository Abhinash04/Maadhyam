import { Toaster } from './components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

import NotFound from './pages/NotFound';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import CreateRequest from './pages/Requests/CreateRequest';
import RequestList from './pages/Requests/RequestList';
import MessagingCenter from './pages/Messages/MessagingCenter';

// Admin tabs
import Moderation from './pages/Admin/Moderation';
import Users from './pages/Admin/AdminUsers';
import Analytics from './pages/Admin/Analytics';
import Settings from './pages/Admin/AdminSettings';

// support tab
import SupportOffersPage from './pages/Support/supportoffers';
import RequestLibrary from './pages/Support/requestlibrary';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes that require authentication */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  
                  {/* Requester routes */}
                  <Route path="/requests" element={<RequestList />} />
                  <Route path="/create-request" element={<CreateRequest />} />
                  
                  {/* Shared routes */}
                  <Route path="/messages" element={<MessagingCenter />} />
                  <Route path="/admin/moderation" element={<Moderation />} />
                  <Route path="/admin/adminusers" element={<Users />} />
                  <Route path="/admin/analytics" element={<Analytics />} />
                  <Route path="/admin/adminsettings" element={<Settings />} />
                  <Route path="/support/offers" element={<SupportOffersPage />} />
                  <Route path="/support/request-library" element={<RequestLibrary />}/>
                </Route>
              </Route>
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;