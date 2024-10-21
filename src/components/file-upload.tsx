'use client'
import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { UploadDropzone } from '@/lib/uploadthing'

type Props = {
  apiEndpoint: 'imageUploader' | 'pdfUploader'
  onChange: (url?: string) => void
  value?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const [loading, setLoading] = useState(false)
  const type = value?.split('.').pop()

  const handleRemove = () => {
    onChange('')
  }

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center space-y-1">
        {type !== 'pdf' ? (
          <div className="relative w-24 h-24 border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <Image
              src={value}
              alt="uploaded image"
              className="object-cover"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-1 rounded-md bg-white border border-gray-300 shadow-sm">
            <FileIcon className="text-gray-700" />
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-sm text-blue-600 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button
          onClick={handleRemove}
          variant="ghost"
          type="button"
          className="flex items-center space-x-1 text-sm"
        >
          <X className="h-3 w-3 text-gray-700" />
          <span className="text-gray-700">Remove</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full p-2 border border-dashed border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition duration-200">
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          if (res && res.length > 0) {
            onChange(res[0].url)
          }
          setLoading(false)
        }}
        onUploadError={(error: Error) => {
          console.error(error)
          setLoading(false)
        }}
      />
      {loading && <p className="mt-1 text-xs text-gray-500">Uploading...</p>}
    </div>
  )
}

export default FileUpload
