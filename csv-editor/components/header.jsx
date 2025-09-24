import React from 'react';

export const Header = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold  text-center bg-gradient-to-r from-gray-600 to-red-600 bg-clip-text text-transparent mb-4">
        CSV Book Editor
      </h1>
      <p className="text-center text-gray-600 text-lg font-semibold">
        Upload, edit, and manage your book collection with ease
      </p>
    </div>
  );
};