// components/ActionButtons.jsx
import React from 'react';
import { RotateCcw, Download } from 'lucide-react';

export const ActionButtons = ({ onReset, onDownload, editedCellsCount }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 font-bold bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300"
        disabled={editedCellsCount === 0}
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
      
      <button
        onClick={onDownload}
        className="flex items-center gap-2 px-4 py-2 font-bold bg-gradient-to-r from-green-700 to-green-800 text-white rounded-xl hover:from-green-900 hover:to-emerald-900 transition-all duration-300"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  );
};