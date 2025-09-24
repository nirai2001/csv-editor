"use client";
import React, { useState } from "react";
import { useBooks } from "../../context/booksContext";
import { Controls } from "../../components/controls";
import { DataTable } from "../../components/data-table";
import { Pagination } from "../../components/pagination";
import { useFiltering } from "../../hooks/UseFiltering";
import { useRouter } from "next/navigation";
import * as Papa from "papaparse";
import { ArrowLeft } from "lucide-react";

export default function EditorPage() {
  const router = useRouter();
  const { books, setBooks, originalBooks, setEditedCells, editedCells } =
    useBooks();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { filteredAndSortedBooks, uniqueGenres } = useFiltering(
    books,
    searchTerm,
    genreFilter,
    sortConfig
  );

  const columns = ["Title", "Author", "Genre", "PublishedYear", "ISBN"];
  const totalPages = Math.ceil(filteredAndSortedBooks.length / itemsPerPage);
  const paginatedBooks = filteredAndSortedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetAllEdits = () => {
    setBooks([...originalBooks]);
    setEditedCells(new Set());
    setGenreFilter("");
    setSearchTerm("");
    setCurrentPage(1);
    setSortConfig({ key: null, direction: "asc" });
  };

  const downloadCSV = () => {
    const csvContent = Papa.unparse(books.map(({ id, ...book }) => book));
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "edited_books.csv";
    link.click();
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleCellClick = (rowId, field, value) => {
    setEditingCell({ rowId, field });
    setEditValue(String(value));
  };

  const handleCellSave = () => {
    if (!editingCell) return;
    const { rowId, field } = editingCell;
    setBooks((prev) =>
      prev.map((book) =>
        book.id === rowId ? { ...book, [field]: editValue } : book
      )
    );
    setEditedCells((prev) => new Set(prev).add(`${rowId}-${field}`));
    setEditingCell(null);
    setEditValue("");
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  if (books.length === 0) {
    return (
      <div className="w-full min-h-screen space-y-6 p-20 bg-gradient-to-br from-gray-500 via-red-100 to-gray-50 flex justify-center flex-col items-center">
        <div className="text-center mt-10 font-bold">
          No books loaded. Please upload a CSV first.
        </div>
        <button
          onClick={() => router.push("/")}
          className="flex gap-2 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-bold text-gray-600"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen space-y-6 p-30 bg-gradient-to-br from-gray-500 via-red-100 to-gray-50">
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition font-bold text-gray-600"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <Controls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        uniqueGenres={uniqueGenres}
        onReset={resetAllEdits}
        onDownload={downloadCSV}
        totalBooks={books.length}
        filteredBooks={filteredAndSortedBooks.length}
        editedCellsCount={editedCells.size}
        currentPage={currentPage}
        totalPages={totalPages}
      />

      <DataTable
        books={paginatedBooks}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        editingCell={editingCell}
        editValue={editValue}
        setEditValue={setEditValue}
        editedCells={editedCells}
        onCellClick={handleCellClick}
        onCellSave={handleCellSave}
        onCellCancel={handleCellCancel}
        isLoading={isLoading}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
}
