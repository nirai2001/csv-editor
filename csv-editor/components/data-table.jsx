// components/DataTable.jsx
import React from 'react';
import { TableHeader } from '../components/table-header';
import { TableRow } from '../components/table-row';

export const DataTable = ({ 
  books,
  columns,
  sortConfig,
  onSort,
  editingCell,
  editValue,
  setEditValue,
  editedCells,
  onCellClick,
  onCellSave,
  onCellCancel,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-auto mb-8">
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={onSort}
          />
          <tbody>
            {books.map((book, index) => (
              <TableRow
                key={book.id}
                book={book}
                index={index}
                columns={columns}
                editingCell={editingCell}
                editValue={editValue}
                setEditValue={setEditValue}
                editedCells={editedCells}
                onCellClick={onCellClick}
                onCellSave={onCellSave}
                onCellCancel={onCellCancel}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};