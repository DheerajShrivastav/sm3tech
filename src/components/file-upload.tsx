import React, { FC, useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  apiEndpoint: string;
  onChange: (value: string) => void;
  value: string;
  accept?: string;
}

const FileUpload: FC<FileUploadProps> = ({
  apiEndpoint,
  onChange,
  value,
  accept = "image/*,application/pdf",
}) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  return (
    <div className="relative font-sora">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      <div
        onClick={onButtonClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full min-h-[120px] cursor-pointer rounded-lg transition-all duration-200 ease-in-out ${
          dragActive ? 'bg-blue-50 border-blue-400' : 'bg-white hover:bg-blue-50'
        } ${value ? 'border-blue-400' : 'border-dashed border-2 border-blue-200 hover:border-blue-400'}`}
      >
        {value ? (
          <div className="relative w-full h-full p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <File className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 truncate max-w-[200px]">
                  {value.split('/').pop()}
                </span>
              </div>
              <button
                onClick={clearFile}
                className="p-1 hover:bg-blue-100 rounded-full transition-colors"
              >
                <X className="h-4 w-4 text-blue-600" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <Upload className="h-8 w-8 text-blue-600 mb-2 " />
            <p className="text-sm font-medium text-blue-700">
              Drag & drop or <br /> Click to upload
            </p>
            <p className="text-xs text-blue-500 mt-1">
              Image(4MB)
            </p>
          </div>
        )}
      </div>
      
      <button
        onClick={onButtonClick}
        className="mt-4 w-full  py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors "
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
