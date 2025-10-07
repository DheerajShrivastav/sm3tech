'use client'
import { FileIcon, X, Upload } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing'

type Props = {
  apiEndpoint: 'imageUploader' | 'pdfUploader'
  onChange: (url?: string) => void
  value?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const type = value?.split('.').pop()

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <button 
          onClick={() => onChange('')} 
          type="button"
          className="mt-2 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-4 w-4" />
          Remove File
        </button>
      </div>
    )
  }
  return (
    <div className="w-full bg-white">
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
          console.log(error)
        }}
        className="ut-button:bg-blue-600 ut-button:ut-readying:bg-blue-600/50 
                   ut-label:text-lg ut-label:text-gray-700 ut-label:font-medium
                   ut-allowed-content:ut-uploading:text-red-300
                   ut-button:ut-uploading:bg-blue-600/50 ut-button:ut-uploading:after:bg-blue-400
                   border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
        content={{
          label: () => (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {apiEndpoint === 'imageUploader' ? 'Upload Image' : 'Upload PDF'}
              </span>
              <span className="text-xs text-gray-500">
                {apiEndpoint === 'imageUploader' 
                  ? 'PNG, JPG, JPEG up to 4MB' 
                  : 'PDF up to 16MB'
                }
              </span>
            </div>
          ),
          allowedContent: () => '',
          button: ({ ready, isUploading }) => {
            if (isUploading) return 'Uploading...';
            if (ready) return 'Choose File';
            return 'Getting Ready...';
          }
        }}
      />
    </div>
  )
}

export default FileUpload
