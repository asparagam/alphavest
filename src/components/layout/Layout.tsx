import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNavigation } from './TopNavigation';
import { Footer } from './Footer';
import { ToastContainer } from '../ui/ToastContainer';
import { AICopilotModal } from '../copilot/AICopilotModal';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiCopilotOpen, setAiCopilotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-dark-base text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <div className="flex flex-1">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative z-10 w-64 bg-white dark:bg-dark-surface1 h-full shadow-2xl">
              <Sidebar onClose={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0 bg-[#F9FAFB] dark:bg-dark-base">
          <TopNavigation
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            onOpenAiCopilot={() => setAiCopilotOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>

          <Footer />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAiCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-gradient-to-r from-ai-600 to-accent-600 text-white shadow-purple-glow flex items-center gap-2 font-semibold text-xs border border-purple-400/40 cursor-pointer"
        aria-label="Open AI Copilot Assistant"
      >
        <Bot className="w-5 h-5 animate-pulse" />
        <span className="hidden sm:inline font-bold">Ask AI Copilot</span>
      </motion.button>

      <AICopilotModal isOpen={aiCopilotOpen} onClose={() => setAiCopilotOpen(false)} />
      <ToastContainer />
    </div>
  );
};
