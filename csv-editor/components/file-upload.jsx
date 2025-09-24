import React from 'react';
import { Upload } from 'lucide-react';

export const FileUpload = ({ onFileUpload, fileInputRef }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const fakeEvent = { target: { files: [file] } };
        onFileUpload(fakeEvent);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
      <div 
        className="border-3 border-dashed border-red-700 rounded-2xl p-8 sm:p-12 text-center hover:border-red-700 transition-all duration-300 hover:bg-red-50/50 cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 text-red-800 mx-auto mb-4" />
        <p className="text-xl font-semibold text-gray-700 mb-2">
          Upload your CSV file or drag & drop
        </p>
        <p className="text-gray-500 mb-4 font-semibold">
          Supports CSV files with book data (Title, Author, Genre, PublishedYear, ISBN)
        </p>
        <button className="bg-gradient-to-r from-gray-500 to-red-800 text-white px-6 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-red-900 transition-all duration-300 transform hover:scale-105">
          Choose File
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={onFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};