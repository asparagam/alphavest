import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNotifications } from '../context/NotificationContext';
import { FileText, Download } from 'lucide-react';

export const Reports: React.FC = () => {
  const { addToast } = useNotifications();

  const handleDownload = (title: string, format: string) => {
    addToast('Report Generation Started', `Preparing ${title} in ${format} format...`, 'info');
    setTimeout(() => {
      addToast('Download Complete', `${title} downloaded successfully.`, 'success');
    }, 1500);
  };

  const reportsList = [
    {
      id: 'rep-1',
      title: 'Q2 2024 Institutional Wealth Statement',
      category: 'Quarterly Audit',
      date: 'June 30, 2024',
      size: '2.4 MB',
      format: 'PDF',
    },
    {
      id: 'rep-2',
      title: '1099-B Tax Loss Harvesting Audit',
      category: 'Tax Filing',
      date: 'July 15, 2024',
      size: '840 KB',
      format: 'CSV',
    },
    {
      id: 'rep-3',
      title: 'ESG & Carbon Offset Exposure Audit',
      category: 'Sustainability',
      date: 'July 20, 2024',
      size: '1.8 MB',
      format: 'PDF',
    },
    {
      id: 'rep-4',
      title: 'AI Neural Rebalance Trade Log',
      category: 'Execution Log',
      date: 'July 28, 2024',
      size: '410 KB',
      format: 'CSV',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="glass-panel p-6 border-brand-500/30">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="brand" size="sm">Audited Reporting</Badge>
          <span className="type-caption font-mono">SOC2 Type II Certified</span>
        </div>
        <h1 className="type-heading-xl text-slate-100">Financial Reports & Tax Statements</h1>
        <p className="type-body text-slate-400 mt-1">
          Download institutional audit statements, 1099-B tax harvesting logs, and ESG compliance reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportsList.map((rep) => (
          <Card key={rep.id} variant="glass" className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/30 text-brand-400 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="type-heading-m font-bold text-slate-100">{rep.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="neutral" size="sm">{rep.category}</Badge>
                    <span className="type-caption text-slate-400 font-mono">{rep.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-dark-border/40 text-xs">
              <span className="type-caption text-slate-400 font-mono">File Size: {rep.size} ({rep.format})</span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(rep.title, 'PDF')}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                >
                  PDF
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDownload(rep.title, 'CSV')}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                >
                  CSV
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
