// components/TableRow.jsx
import React from 'react';
import { EditableCell } from './editable-cell';

export const TableRow = ({ 
  book, 
  index, 
  columns, 
  editingCell,
  editValue,
  setEditValue,
  editedCells,
  onCellClick,
  onCellSave,
  onCellCancel
}) => {
  return (
    <tr 
      key={book.id}
      className={`border-b border-gray-100 hover:bg-blue-50/50 transition-colors ${
        index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'
      }`}
    >
      {columns.map(field => (
        <td 
          key={`${book.id}-${field}`}
          className={`px-4 py-3 hover:bg-blue-100/50 transition-colors relative ${
            editedCells.has(`${book.id}-${field}`) ? 'bg-red-100 border-l-4 border-red-400' : ''
          }`}
        >
          <EditableCell
            book={book}
            field={field}
            isEditing={editingCell?.rowId === book.id && editingCell?.field === field}
            editValue={editValue}
            setEditValue={setEditValue}
            onCellClick={onCellClick}
            onCellSave={onCellSave}
            onCellCancel={onCellCancel}
            isEdited={editedCells.has(`${book.id}-${field}`)}
          />
        </td>
      ))}
    </tr>
  );
};
