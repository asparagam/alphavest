import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNotifications } from '../context/NotificationContext';
import { FileText, Download } from 'lucide-react';

export const Reports: React.FC = () => {
  const { addToast } = useNotifications();

  const handleDownload = (reportTitle: string, format: 'PDF' | 'CSV') => {
    addToast('Report Exported', `${reportTitle} has been downloaded in ${format} format.`, 'success');
  };

  const reportCards = [
    {
      id: 'REP-01',
      title: 'Q2 2026 Comprehensive Wealth Performance Statement',
      category: 'QUARTERLY_STATEMENT',
      date: 'July 1, 2026',
      size: '2.4 MB',
      description: 'Complete quarterly breakdown of capital returns, dividends, benchmarks, and fee statements.',
    },
    {
      id: 'REP-02',
      title: 'Tax-Loss Harvesting & 1099-B Tax Summary',
      category: 'TAX_REPORT',
      date: 'July 15, 2026',
      size: '1.1 MB',
      description: 'Audit-ready tax documentation summarizing $2,210 of harvested capital losses for IRS filing.',
    },
    {
      id: 'REP-03',
      title: 'ESG & Sustainability Impact Audit',
      category: 'ESG_AUDIT',
      date: 'June 30, 2026',
      size: '3.8 MB',
      description: 'Evaluation of portfolio carbon footprint, corporate governance ratings, and clean energy allocation.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 border-brand-500/30">
        <h1 className="text-2xl font-bold font-display text-slate-100">Financial Reports & Statements</h1>
        <p className="text-xs text-slate-400 mt-1">
          Download institutional-grade performance audits, tax summaries, and quarterly statements.
        </p>
      </div>

      <div className="space-y-4">
        {reportCards.map((r) => (
          <Card key={r.id} variant="glass" className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-400 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-100 text-sm">{r.title}</h3>
                    <Badge variant="brand" size="sm">{r.category}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{r.description}</p>
                  <div className="text-[11px] text-slate-500 font-mono mt-2">
                    Generated: {r.date} • File Size: {r.size}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(r.title, 'CSV')}
                >
                  CSV
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleDownload(r.title, 'PDF')}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download PDF
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
