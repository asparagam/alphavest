import React, { useState } from 'react';
import { Bot, Send, Sparkles, ShieldCheck, RefreshCw } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';

export interface AICopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  category?: string;
  actionableBtn?: { label: string; action: () => void };
}

export const AICopilotModal: React.FC<AICopilotModalProps> = ({ isOpen, onClose }) => {
  const { totalPortfolioValue, todaysReturnPercent, executeRebalance } = usePortfolio();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello Alexandre. I am your AlphaVest Neural Copilot. I have completed a full portfolio diagnostics scan for your $${totalPortfolioValue.toLocaleString()} net worth.\n\nKey Insights:\n1. Your portfolio is up +${todaysReturnPercent.toFixed(2)}% today led by NVDA (+3.92%).\n2. AI detects a tax-loss harvesting opportunity in BND bond holdings ($2,210 unrealized loss).\n3. Rebalancing is recommended to keep Tech exposure within your 45% risk threshold.\n\nHow would you like to optimize today?`,
      timestamp: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: 'Rebalance Portfolio', query: 'Run an AI rebalancing analysis for my current allocation.' },
    { label: 'Tax Loss Harvesting', query: 'Explain my tax loss harvesting options for Q3.' },
    { label: 'Risk Analysis', query: 'What is my current drawdown risk exposure?' },
    { label: 'Market Summary', query: 'Summarize today macro market impact on tech equities.' },
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = '';
      let actionableBtn = undefined;

      const lower = query.toLowerCase();
      if (lower.includes('rebalance')) {
        aiText = `Based on your AGGRESSIVE risk profile, your target allocation should be 45% Tech, 20% Crypto, 15% Bonds, and 15% Broad Market.\n\nCurrent Drift:\n• Tech: 47.96% (+2.96% Overweight)\n• Digital Assets: 22.29% (+2.29% Overweight)\n• Bonds: 9.97% (-5.03% Underweight)\n\nRecommended Trade: Trim NVDA by $18,500 and deposit into BND & VTI.`;
        actionableBtn = {
          label: 'Execute Suggested Rebalance',
          action: () => executeRebalance(),
        };
      } else if (lower.includes('tax')) {
        aiText = `Tax-Loss Harvesting Diagnostics:\n\nYou have $2,210 of unrealized losses in Vanguard Total Bond ETF (BND). Swapping BND for iShares Core U.S. Aggregate Bond ETF (AGG) will maintain your exact duration profile while capturing the loss to offset NVDA capital gains.\n\nEstimated Tax Savings: $740.35 (assuming 33.5% effective capital gains rate).`;
      } else if (lower.includes('risk')) {
        aiText = `Sharpe Ratio: 2.14 (Top 5% Private Wealth Benchmark)\nBeta vs S&P 500: 1.28\nMax Drawdown (1Y): -8.40%\n\nRisk Assessment: High growth potential with manageable downside. Tech concentration is your primary volatility driver.`;
      } else {
        aiText = `Analysis Complete for "${query}":\n\nYour portfolio is well-positioned for near-term macroeconomic shifts. Tech earnings momentum remains robust, with strong cash reserves ($124,500 yielding 4.95% APY) providing high dry powder capability for market dips.`;
      }

      const responseMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionableBtn,
      };

      setMessages(prev => [...prev, responseMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="flex flex-col h-[550px]">
        <div className="flex items-center gap-3 pb-3 border-b border-dark-border/60">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-ai-600 to-accent-600 p-0.5 shadow-purple-glow">
            <div className="w-full h-full bg-dark-card rounded-[10px] flex items-center justify-center text-ai-400">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-slate-100">AlphaVest AI Copilot</h3>
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-md bg-ai-500/20 text-ai-400 border border-ai-500/30">
                GPT-4o Wealth Engine
              </span>
            </div>
            <p className="text-xs text-slate-400">Context-Aware Portfolio Intelligence & Strategy Engine</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-ai-600/20 border border-ai-500/40 text-ai-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-brand-500 text-white rounded-tr-xs shadow-emerald-glow font-medium'
                  : 'bg-dark-card/90 border border-dark-border/80 text-slate-200 rounded-tl-xs shadow-sm'
              }`}>
                <p className="whitespace-pre-line">{m.text}</p>

                {m.actionableBtn && (
                  <div className="mt-3 pt-3 border-t border-dark-border/60">
                    <Button
                      variant="ai"
                      size="sm"
                      onClick={() => {
                        m.actionableBtn?.action();
                        onClose();
                      }}
                      leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                    >
                      {m.actionableBtn.label}
                    </Button>
                  </div>
                )}

                {m.sender === 'ai' && (
                  <div className="mt-3 pt-2 border-t border-dark-border/40 flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Educational Purposes Only — Not Financial Advice</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-slate-400 text-xs py-2">
              <div className="w-7 h-7 rounded-lg bg-ai-600/20 text-ai-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <span>Neural Copilot is analyzing live market signals...</span>
            </div>
          )}
        </div>

        <div className="py-2 flex gap-2 overflow-x-auto scroll-hide border-t border-dark-border/60">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp.query)}
              className="px-3 py-1.5 rounded-lg bg-dark-card border border-dark-border hover:border-ai-500/40 text-xs text-slate-300 hover:text-white whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-ai-400" />
              {qp.label}
            </button>
          ))}
        </div>

        <div className="pt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask AI Copilot about portfolio, risk, taxes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 glass-input px-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 rounded-xl"
          />
          <Button
            variant="ai"
            size="md"
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </div>
      </div>
    </Modal>
  );
};
