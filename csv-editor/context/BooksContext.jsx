"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]);
  const [editedCells, setEditedCells] = useState(new Set());

  return (
    <BooksContext.Provider value={{ books, setBooks, originalBooks, setOriginalBooks, editedCells, setEditedCells }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);