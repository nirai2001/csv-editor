// hooks/useFiltering.js
import { useMemo } from 'react';

export const useFiltering = (books, searchTerm, genreFilter, sortConfig) => {
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = searchTerm === '' || 
        Object.values(book).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesGenre = genreFilter === '' || book.Genre === genreFilter;
      return matchesSearch && matchesGenre;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        
        if (typeof aVal === 'string') aVal = aVal.toLowerCase();
        if (typeof bVal === 'string') bVal = bVal.toLowerCase();
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [books, searchTerm, genreFilter, sortConfig]);

  const uniqueGenres = useMemo(() => {
    return [...new Set(books.map(book => book.Genre))].sort();
  }, [books]);

  return { filteredAndSortedBooks, uniqueGenres };
};