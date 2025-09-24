"use client";
import React, { useRef, useState, useCallback } from "react";
import * as Papa from "papaparse";
import { useRouter } from "next/navigation";
import { useBooks } from "../context/booksContext";
import { Header } from "../components/header";
import { FileUpload } from "../components/file-upload";

export default function UploadPage() {
  const router = useRouter();
  const { setBooks, setOriginalBooks, setEditedCells } = useBooks();
  
  const fileInputRef = useRef(null);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const csvData = e.target.result;
        const results = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          transformHeader: (header) => header.trim()
        });

        const processedData = results.data.map((row, index) => ({
          id: index + 1,
          ...row
        }));

        setBooks(processedData);
        setOriginalBooks([...processedData]);
        setEditedCells(new Set());
        router.push("/editor");
      } catch (error) {
        console.error("Error parsing CSV:", error);
      }
    };

    reader.readAsText(file);
  }, [setBooks, setOriginalBooks, setEditedCells, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-red-100 to-gray-50 p-20 sm:p-20">
      <div className="max-w-7xl m-auto">
        <Header />
        <FileUpload onFileUpload={handleFileUpload} fileInputRef={fileInputRef} />
      </div>
    </div>
  );
}
