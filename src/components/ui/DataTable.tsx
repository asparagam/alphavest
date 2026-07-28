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
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  searchKey?: (row: T) => string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  searchPlaceholder = 'Search records...',
  searchKey,
  pageSize = 8,
  onRowClick,
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
    <div className={`space-y-3 ${className}`}>
      {/* Table Action Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {searchKey && (
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="glass-input w-full pl-10 pr-4 py-2 text-xs"
            />
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setIsCompact(!isCompact)}
            className="px-2.5 py-1.5 rounded-xl border border-dark-border bg-dark-card text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer dark:bg-dark-card dark:border-dark-border light:bg-slate-100 light:border-slate-200 light:text-slate-700"
            title="Toggle compact density mode"
          >
            {isCompact ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            <span className="text-[11px]">{isCompact ? 'Comfortable' : 'Compact'}</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-dark-border/80 bg-dark-card overflow-x-auto shadow-card-elevated dark:bg-dark-card dark:border-dark-border/80 light:bg-white light:border-light-border light:shadow-card-light">
        <table className="w-full text-left border-collapse">
          {/* Sticky Header */}
          <thead className="bg-dark-surface/90 border-b border-dark-border/80 sticky top-0 z-10 backdrop-blur-md dark:bg-dark-surface/90 dark:border-dark-border/80 light:bg-slate-50 light:border-slate-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`type-overline px-4 py-3.5 font-bold select-none ${
                    col.sortable ? 'cursor-pointer hover:text-white dark:hover:text-white light:hover:text-slate-900' : ''
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
                            <ChevronUp className="w-3.5 h-3.5 text-brand-400" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-brand-400" />
                          )
                        ) : (
                          <ChevronsUpDown className="w-3.5 h-3.5" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-dark-border/40 dark:divide-dark-border/40 light:divide-slate-100">
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
                      isCompact ? 'py-2' : 'py-3.5'
                    } ${
                      isSelected
                        ? 'bg-brand-500/10 dark:bg-brand-500/10 light:bg-emerald-50/80'
                        : 'hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-slate-50'
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`px-4 text-xs type-body ${
                          isCompact ? 'py-2.5' : 'py-3.5'
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
                <td colSpan={columns.length} className="px-4 py-8 text-center type-caption text-slate-400">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-400 px-2">
          <span>
            Showing <strong className="text-slate-200">{Math.min(filteredData.length, (currentPage - 1) * pageSize + 1)}</strong> to{' '}
            <strong className="text-slate-200">{Math.min(filteredData.length, currentPage * pageSize)}</strong> of{' '}
            <strong className="text-slate-200">{filteredData.length}</strong> results
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-dark-border bg-dark-card disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors cursor-pointer dark:bg-dark-card dark:border-dark-border light:bg-white light:border-slate-200 light:hover:bg-slate-100"
            >
              Previous
            </button>
            <span className="px-2 font-mono font-bold text-slate-200">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-dark-border bg-dark-card disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors cursor-pointer dark:bg-dark-card dark:border-dark-border light:bg-white light:border-slate-200 light:hover:bg-slate-100"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
