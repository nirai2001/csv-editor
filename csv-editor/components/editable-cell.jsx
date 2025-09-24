import { Edit3, Save, X } from "lucide-react";

export const EditableCell = ({ 
  book, 
  field, 
  isEditing, 
  editValue, 
  setEditValue,
  onCellClick,
  onCellSave,
  onCellCancel,
  isEdited
}) => {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="flex-1 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCellSave();
          }}
          className="p-1 text-green-600 hover:bg-green-100 rounded"
        >
          <Save className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onCellCancel();
          }}
          className="p-1 text-red-600 hover:bg-red-100 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center gap-2 group cursor-pointer"
      onClick={() => onCellClick(book.id, field, book[field])}
    >
      <span className="flex-1">{book[field]}</span>
      <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
