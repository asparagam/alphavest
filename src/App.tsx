import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { Layout } from './components/layout/Layout';

import { Dashboard } from './pages/Dashboard';
import { Portfolio } from './pages/Portfolio';
import { AssetDetails } from './pages/AssetDetails';
import { Trading } from './pages/Trading';
import { Analytics } from './pages/Analytics';
import { Reports } from './pages/Reports';
import { AICopilot } from './pages/AICopilot';
import { Notifications } from './pages/Notifications';
import { Security } from './pages/Security';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <NotificationProvider>
          <PortfolioProvider>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/asset/:symbol" element={<AssetDetails />} />
                  <Route path="/asset" element={<AssetDetails />} />
                  <Route path="/trading" element={<Trading />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/copilot" element={<AICopilot />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </PortfolioProvider>
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
