import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        onFileSelect(file);
      } else {
        alert("Per favore carica solo file PDF.");
      }
    }
  }, [onFileSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto"
    >
      <div 
        className="relative group cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-card ring-1 ring-white/10 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-6 min-h-[400px]">
          
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-full">
            <DocumentTextIcon className="w-16 h-16 text-indigo-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Carica il tuo PDF</h3>
            <p className="text-gray-400">Trascina il file qui o clicca per selezionarlo</p>
          </div>

          <label className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-indigo-500 rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-indigo-500 group-hover:translate-x-0 ease">
              <ArrowUpTrayIcon className="w-6 h-6" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-indigo-500 transition-all duration-300 transform group-hover:translate-x-full ease">Seleziona File</span>
            <span className="relative invisible">Seleziona File</span>
            <input 
              type="file" 
              accept="application/pdf" 
              className="hidden" 
              onChange={handleInputChange}
            />
          </label>
          
          <p className="text-xs text-gray-500 mt-4">Supporta PDF fino a 10MB</p>
        </div>
      </div>
    </motion.div>
  );
};

export default FileUpload;