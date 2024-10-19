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
      <div className="flex flex-col justify-center items-center space-y-2">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40 border border-gray-300 rounded-md overflow-hidden shadow-md">
            <Image
              src={value}
              alt="uploaded image"
              className="object-cover"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-white border border-gray-300 shadow-md">
            <FileIcon className="text-gray-700" />
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm text-blue-600 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button onClick={handleRemove} variant="ghost" type="button" className="flex items-center space-x-2">
          <X className="h-4 w-4 text-gray-700" />
          <span className="text-gray-700">Remove</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full p-4 border border-dashed border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition duration-200">
      <UploadDropzone
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url)
          setLoading(false)
        }}
        onUploadError={(error: Error) => {
          console.error(error)
          setLoading(false)
        }}
        onUploadStart={() => setLoading(true)}
      />
      {loading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
    </div>
  )
}

export default FileUpload
