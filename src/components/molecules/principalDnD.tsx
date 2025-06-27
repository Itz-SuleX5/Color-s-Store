import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

export default function PrincipalDnD({onImageChange}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        setSelectedFile(file);
        createImagePreview(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      setSelectedFile(file);
      createImagePreview(file);
    }
  };

  const createImagePreview = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      if (onImageChange) {
    onImageChange(file);
  }
    };
    reader.readAsDataURL(file);
    
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isValidFile = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex bg-gray-50 p-4">
      <div 
        className={`
          relative w-full max-w-2xl py-4
          border-2 border-dashed border-purple-300 
          rounded-2xl 
          bg-white
          flex flex-col items-center justify-center
          transition-all duration-300
          overflow-hidden
          ${isDragOver ? 'border-purple-400 bg-purple-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imagePreview ? (
          // Image Preview Mode
          <div className="relative w-full h-full">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-full object-contain"
            />
            
            {/* Remove Button */}
            <button
              onClick={removeImage}
              className="
                absolute top-4 right-4
                bg-white hover:gray-100
                text-pink-300
                rounded-full
                p-2
                transition-colors duration-200
                shadow-lg hover:shadow-xl
                transform hover:scale-110
              "
            >
              <X size={20} />
            </button>

            {/* File Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black bg-opacity-70 backdrop-blur-sm rounded-lg p-3">
                <p className="text-white text-sm font-medium">
                  {selectedFile.name}
                </p>
                <p className="text-gray-300 text-xs">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Upload Mode
          <>
            {/* Upload Icon */}
            <div className="mb-6">
              <div className="relative">
                <Upload 
                  size={52} 
                  className="text-pink-300 stroke-2" 
                />
              </div>
            </div>

            {/* Main Text */}
            <h2 className="text-xl text-gray-600 mb-2 text-center">
              Arrastra y suelta tu imagen aquí o
            </h2>

            {/* Select File Button */}
            <button
              onClick={handleButtonClick}
              className="
                bg-gradient-to-r from-pink-300 to-purple-300
                hover:from-pink-400 hover:to-purple-400
                text-white 
                font-medium
                px-4 py-2
                rounded-full
                text-md
                transition-all duration-300
                transform hover:scale-105
              "
            >
              Seleccionar archivo
            </button>

            {/* File Format Info */}
            <p className="text-gray-400 text-lg mt-2 font-light">
              PNG, JPG (Máx. 2MB)
            </p>
          </>
        )}

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.gif"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}