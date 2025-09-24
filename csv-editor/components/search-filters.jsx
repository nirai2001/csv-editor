"use client";
import React, { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";

export const SearchAndFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  genreFilter, 
  setGenreFilter, 
  uniqueGenres 
}) => {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  // debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 300); // wait 300ms after user stops typing

    return () => {
      clearTimeout(handler);
    };
  }, [localSearch, setSearchTerm]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 flex-1">
      {/* Search input */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search books..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="pl-10 pr-4 py-3 border border-gray-200 bg-white rounded-xl focus:ring-red-800 focus:border-red-800 w-full sm:w-80"
        />
      </div>
      
      {/* Genre filter */}
      <div className="relative">
        <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <select
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
          className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-red-800 focus:border-red-800 w-full sm:w-48 appearance-none bg-white"
        >
          <option value="">All Genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
