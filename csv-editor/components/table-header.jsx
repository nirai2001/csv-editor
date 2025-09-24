// components/TableHeader.jsx
import React from 'react';
import { SortAsc, SortDesc } from 'lucide-react';

export const TableHeader = ({ columns, sortConfig, onSort }) => {
  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return <SortAsc className="w-4 h-4 opacity-50" />;
    return sortConfig.direction === 'asc' ? 
      <SortAsc className="w-4 h-4 text-red-600" /> : 
      <SortDesc className="w-4 h-4 text-red-600" />;
  };

  return (
    <thead className="bg-gradient-to-r from-gray-500 to-red-800 text-white sticky top-0 z-10">
      <tr>
        {columns.map(column => (
          <th 
            key={column}
            className="px-4 py-4 text-left font-semibold cursor-pointer hover:bg-white/10 transition-colors"
            onClick={() => onSort(column)}
          >
            <div className="flex items-center gap-2">
              {column}
              {getSortIcon(column)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};