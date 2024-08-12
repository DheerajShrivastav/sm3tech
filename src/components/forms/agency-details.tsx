'use client'

import React from 'react'
import FileUpload from '@/components/file-upload'
import { initUser } from '@/lib/queries'
import { connectDB } from '@/lib/db'

const AgencyDetails = async () => {
  // await connectDB()
  // await initUser({})
  return (
    <div>
      <FileUpload apiEndpoint="pdfUploader" onChange={() => {}} />
    </div>
  )
}

export default AgencyDetails
