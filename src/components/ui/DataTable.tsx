import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  Maximize2,
  Minimize2,
} from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  priority?: 'high' | 'medium' | 'low';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: (row: T) => string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  renderMobileCard?: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchKey,
  pageSize = 8,
  onRowClick,
  renderMobileCard,
  className = '',
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCompact, setIsCompact] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | number | null>(null);

  const filteredData = React.useMemo(() => {
    if (!searchQuery || !searchKey) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((row) => searchKey(row).toLowerCase().includes(query));
  }, [data, searchQuery, searchKey]);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const col = columns.find((c) => c.key === sortKey);
      if (!col) return 0;
      const valA = col.accessor(a);
      const valB = col.accessor(b);

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [filteredData, sortKey, sortOrder, columns]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === 'asc') setSortOrder('desc');
      else {
        setSortKey(null);
        setSortOrder('asc');
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {searchKey && (
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none" aria-hidden="true" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="glass-input w-full pl-10 pr-4 py-2 text-xs font-medium"
              aria-label={searchPlaceholder}
            />
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsCompact(!isCompact)}
            className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 dark:bg-dark-card dark:border-white/10 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer min-h-[44px] sm:min-h-[36px]"
            title="Toggle compact density mode"
            aria-label="Toggle table density mode"
          >
            {isCompact ? <Maximize2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" aria-hidden="true" /> : <Minimize2 className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" aria-hidden="true" />}
            <span className="text-[11px] font-bold">{isCompact ? 'Comfortable' : 'Compact'}</span>
          </button>
        </div>
      </div>

      {/* Desktop / Tablet View: Sticky Full Data Table */}
      <div className="hidden sm:block rounded-2xl border border-slate-200 bg-white dark:bg-dark-card dark:border-white/10 overflow-x-auto shadow-card-light dark:shadow-card-elevated">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100 border-b border-slate-200 dark:bg-dark-surface1/90 dark:border-white/10 sticky top-0 z-10 backdrop-blur-md">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`type-overline px-4 py-3.5 font-extrabold text-slate-800 dark:text-slate-300 select-none ${
                    i === 0 ? 'sticky left-0 z-20 bg-slate-100 dark:bg-dark-surface1' : ''
                  } ${
                    col.sortable ? 'cursor-pointer hover:text-slate-950 dark:hover:text-white' : ''
                  } ${
                    col.align === 'right'
                      ? 'text-right'
                      : col.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 ${
                      col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'
                    }`}
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-slate-500">
                        {sortKey === col.key ? (
                          sortOrder === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3.5 h-3.5" aria-hidden="true" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-white/10">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, idx) => {
                const rowId = row.id ?? idx;
                const isSelected = selectedRowId === rowId;
                return (
                  <tr
                    key={rowId}
                    onClick={() => {
                      setSelectedRowId(rowId);
                      onRowClick?.(row);
                    }}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/80 dark:bg-brand-500/10 border-l-4 border-emerald-600'
                        : 'hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {columns.map((col, i) => (
                      <td
                        key={col.key}
                        className={`px-4 text-xs type-body ${
                          isCompact ? 'py-2.5' : 'py-3.5'
                        } ${
                          i === 0 ? 'sticky left-0 bg-white dark:bg-dark-card font-bold' : ''
                        } ${
                          col.align === 'right'
                            ? 'text-right font-mono-nums'
                            : col.align === 'center'
                            ? 'text-center'
                            : 'text-left'
                        }`}
                      >
                        {col.accessor(row)}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center type-caption text-slate-600 dark:text-slate-400 font-medium">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View (<768px): Responsive Cards List */}
      <div className="block sm:hidden space-y-3">
        {paginatedData.length > 0 ? (
          paginatedData.map((row, idx) => (
            <div
              key={row.id ?? idx}
              onClick={() => onRowClick?.(row)}
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card-light dark:bg-dark-surface2 dark:border-white/10 space-y-3 cursor-pointer active:scale-[0.99] transition-transform"
            >
              {renderMobileCard ? (
                renderMobileCard(row)
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{columns[0]?.accessor(row)}</span>
                    <span>{columns[columns.length - 1]?.accessor(row)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {columns.slice(1, -1).map((col) => (
                      <div key={col.key} className="space-y-0.5">
                        <span className="type-caption text-slate-600 dark:text-slate-400 block">{col.header}</span>
                        <span className="font-bold text-slate-900 dark:text-slate-200">{col.accessor(row)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-6 text-center type-caption text-slate-600 dark:text-slate-400 bg-white dark:bg-dark-surface2 rounded-2xl border border-slate-200 dark:border-white/10 font-medium">
            No matching records found.
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400 px-2 pt-2">
          <span>
            Showing <strong className="text-slate-900 dark:text-slate-200 font-bold">{Math.min(filteredData.length, (currentPage - 1) * pageSize + 1)}</strong> to{' '}
            <strong className="text-slate-900 dark:text-slate-200 font-bold">{Math.min(filteredData.length, currentPage * pageSize)}</strong> of{' '}
            <strong className="text-slate-900 dark:text-slate-200 font-bold">{filteredData.length}</strong> results
          </span>

          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2.5 sm:py-1.5 rounded-xl border border-slate-300 bg-slate-100 text-slate-900 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors cursor-pointer dark:bg-dark-card dark:border-white/10 dark:text-slate-200 min-h-[44px] sm:min-h-[36px]"
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="px-2 font-mono font-bold text-slate-900 dark:text-slate-200">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2.5 sm:py-1.5 rounded-xl border border-slate-300 bg-slate-100 text-slate-900 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors cursor-pointer dark:bg-dark-card dark:border-white/10 dark:text-slate-200 min-h-[44px] sm:min-h-[36px]"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
