import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { usePortfolio } from '../context/PortfolioContext';
import { Bot, Send, ShieldCheck } from 'lucide-react';

export const AICopilot: React.FC = () => {
  const { totalPortfolioValue } = usePortfolio();
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `Welcome to the Dedicated AlphaVest AI Workspace. I have performed a continuous neural audit on your $${totalPortfolioValue.toLocaleString()} portfolio.\n\nCurrent Diagnostic Summary:\n• Overall Risk Score: 68/100 (Aggressive Growth)\n• Recommended Action: Consider executing Tax-Loss Harvesting on BND bond holdings ($2,210 unrealized loss).`,
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: String(Date.now()), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      const aiReply = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: `Analysis for "${input}":\n\nYour portfolio positions are robustly shielded against near-term macro volatility. Tech sector momentum remains high, while cash reserves yielding 4.95% provide liquidity.`,
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 border-ai-500/40 bg-gradient-to-r from-ai-950/40 via-dark-card to-accent-950/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-ai-600/20 border border-ai-500/40 text-ai-400 flex items-center justify-center">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-display text-slate-100">AI Wealth Intelligence Desk</h1>
            <p className="text-xs text-slate-400 mt-0.5">Autonomous portfolio optimization and tax strategy assistant</p>
          </div>
        </div>
      </div>

      <Card variant="glass" className="p-6 h-[500px] flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-500 text-white rounded-tr-xs shadow-emerald-glow'
                    : 'bg-dark-card border border-dark-border text-slate-200 rounded-tl-xs'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                {m.sender === 'ai' && (
                  <div className="mt-3 pt-2 border-t border-dark-border/40 flex items-center gap-1.5 text-[10px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Educational Purposes Only — Not Financial Advice</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex items-center gap-2 border-t border-dark-border">
          <input
            type="text"
            placeholder="Ask AI Copilot..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 glass-input px-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 rounded-xl"
          />
          <Button variant="ai" size="md" onClick={handleSend} leftIcon={<Send className="w-4 h-4" />}>
            Ask Copilot
          </Button>
        </div>
      </Card>
    </div>
  );
};
