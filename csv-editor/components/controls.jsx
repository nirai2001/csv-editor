// components/Controls.jsx
import React from 'react';
import { SearchAndFilters } from './search-filters';
import { ActionButtons } from './action-buttons';
import { StatsDisplay } from './stats-display';

export const Controls = ({ 
  searchTerm,
  setSearchTerm,
  genreFilter,
  setGenreFilter,
  uniqueGenres,
  onReset,
  onDownload,
  totalBooks,
  filteredBooks,
  editedCellsCount,
  currentPage,
  totalPages
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          uniqueGenres={uniqueGenres}
        />
        
        <ActionButtons
          onReset={onReset}
          onDownload={onDownload}
          editedCellsCount={editedCellsCount}
        />
      </div>

      <StatsDisplay
        totalBooks={totalBooks}
        filteredBooks={filteredBooks}
        editedCellsCount={editedCellsCount}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};