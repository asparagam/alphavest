import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { usePortfolio } from '../context/PortfolioContext';
import { Send, Sparkles, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actionableBtn?: { label: string; action: () => void };
}

export const AICopilot: React.FC = () => {
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

    setMessages((prev) => [...prev, userMsg]);
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

      setMessages((prev) => [...prev, responseMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 sm:space-y-8" role="region" aria-label="AI Copilot Workspace">
      {/* Hero Panel */}
      <div className="hero-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="ai" size="sm">GPT-4o Wealth Intelligence</Badge>
            <span className="type-caption font-mono font-medium">Real-Time Context-Aware Feed</span>
          </div>
          <h1 className="type-display-l text-slate-900 dark:text-white">AI Copilot Strategic Assistant</h1>
          <p className="type-body-l text-slate-700 dark:text-slate-300 mt-1">
            Natural language interface for portfolio rebalancing, tax-loss harvesting, and risk scenario modeling.
          </p>
        </div>
      </div>

      <Card variant="glass" className="p-4 sm:p-6 bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 shadow-card-light dark:shadow-card-elevated">
        <div className="flex flex-col h-[calc(100vh-280px)] min-h-[480px] max-h-[640px]">
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2.5 sm:gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-purple-100 border border-purple-300 text-purple-700 dark:bg-purple-600/20 dark:border-purple-500/40 dark:text-purple-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                  </div>
                )}
                <div
                  className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-3.5 sm:p-4 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-purple-100 border border-purple-200 text-purple-950 dark:bg-brand-500 dark:text-slate-950 font-bold rounded-tr-xs shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-900 dark:bg-dark-surface2 dark:border-white/10 dark:text-slate-200 rounded-tl-xs shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line type-body">{m.text}</p>

                  {m.actionableBtn && (
                    <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10">
                      <Button
                        variant="ai"
                        size="sm"
                        onClick={m.actionableBtn.action}
                        leftIcon={<RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />}
                        aria-label={m.actionableBtn.label}
                      >
                        {m.actionableBtn.label}
                      </Button>
                    </div>
                  )}

                  {m.sender === 'ai' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-white/10 flex items-center gap-1.5 text-[10px] font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 p-2 rounded-xl border border-amber-200 dark:border-amber-500/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" aria-hidden="true" />
                      <span>Educational Purposes Only — Not Financial Advice</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center text-slate-700 dark:text-slate-400 text-xs py-2 font-medium">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-600/20 dark:text-purple-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 animate-spin" aria-hidden="true" />
                </div>
                <span>Neural Copilot is analyzing live market signals...</span>
              </div>
            )}
          </div>

          {/* Quick Action Prompt Chips */}
          <div className="py-3 flex gap-2 overflow-x-auto scroll-hide border-t border-slate-200 dark:border-white/10">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp.query)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-purple-400 hover:bg-slate-50 text-xs text-slate-800 font-bold dark:bg-dark-surface1 dark:border-white/10 dark:text-slate-300 dark:hover:text-white whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer min-h-[44px] sm:min-h-[36px]"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                {qp.label}
              </button>
            ))}
          </div>

          {/* Message Composer & Input Bar */}
          <div className="pt-3 flex items-center gap-2 sticky bottom-0 bg-slate-100 dark:bg-dark-surface1/95 border border-slate-300 dark:border-white/10 p-1.5 rounded-2xl">
            <input
              type="text"
              placeholder="Ask AI Copilot..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 dark:bg-dark-surface2 dark:border-white/10 dark:text-slate-100 dark:placeholder-slate-400 px-4 py-3 text-xs rounded-xl focus-visible:ring-2 focus-visible:ring-purple-500 font-medium"
              aria-label="Ask AI Copilot prompt input"
            />
            <Button
              variant="ai"
              size="md"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              leftIcon={<Send className="w-4 h-4" aria-hidden="true" />}
              aria-label="Send prompt to AI Copilot"
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
