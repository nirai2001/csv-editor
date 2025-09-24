// components/StatsDisplay.jsx
import React from 'react';

export const StatsDisplay = ({ 
  totalBooks, 
  filteredBooks, 
  editedCellsCount, 
  currentPage, 
  totalPages 
}) => {
  return (
    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600 font-semibold">
      <span>Total: {totalBooks} books</span>
      <span>Filtered: {filteredBooks} books</span>
      <span>Modified: {editedCellsCount} cells</span>
      <span>Page {currentPage} of {totalPages}</span>
    </div>
  );
};
