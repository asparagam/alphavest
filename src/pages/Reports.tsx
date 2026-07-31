import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNotifications } from '../context/NotificationContext';
import { FileText, Download, ShieldCheck } from 'lucide-react';

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
    <div className="space-y-8" role="region" aria-label="Financial Reports & Audited Statements">
      {/* Hero Panel Header */}
      <div className="hero-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}>
              Audited Reporting
            </Badge>
            <span className="type-caption font-mono font-medium">SOC2 Type II Certified</span>
          </div>
          <h1 className="type-display-l text-slate-900 dark:text-white">Financial Reports & Tax Statements</h1>
          <p className="type-body-l text-slate-700 dark:text-slate-300 mt-1">
            Download institutional audit statements, 1099-B tax harvesting logs, and ESG compliance reports.
          </p>
        </div>
      </div>

      {/* Responsive Report Cards Grid with standardized 12px gap (gap-3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {reportsList.map((rep) => (
          <Card
            key={rep.id}
            variant="glass"
            className="p-6 flex flex-col justify-between h-full border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-card shadow-card-light dark:shadow-card-elevated"
          >
            {/* Upper Content Section */}
            <div>
              {/* Document Icon (16px spacing below -> mb-4) */}
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mb-4">
                <FileText className="w-5 h-5" aria-hidden="true" />
              </div>

              {/* Report Title (12px spacing below -> mb-3, line-height 1.3) */}
              <h3 className="type-heading-m font-extrabold text-slate-900 dark:text-white leading-snug mb-3 line-clamp-2">
                {rep.title}
              </h3>

              {/* Category Badge (12px spacing below -> mb-3) */}
              <div className="mb-3">
                <Badge variant="neutral" size="sm">{rep.category}</Badge>
              </div>

              {/* Date Metadata (24px spacing below -> mb-6) */}
              <div className="mb-6">
                <span className="type-caption text-slate-700 dark:text-slate-400 font-mono font-medium">
                  {rep.date}
                </span>
              </div>
            </div>

            {/* Lower Download Actions Baseline Section (Divider + 20px top padding -> pt-5) */}
            <div className="pt-5 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="type-caption text-slate-700 dark:text-slate-400 font-mono font-extrabold flex-shrink-0">
                {rep.size}
              </span>

              {/* PDF & CSV Download Buttons Group */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleDownload(rep.title, 'PDF')}
                  leftIcon={<Download className="w-3.5 h-3.5" aria-hidden="true" />}
                  aria-label={`Download ${rep.title} as PDF`}
                >
                  PDF
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => handleDownload(rep.title, 'CSV')}
                  leftIcon={<Download className="w-3.5 h-3.5" aria-hidden="true" />}
                  aria-label={`Download ${rep.title} as CSV`}
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
