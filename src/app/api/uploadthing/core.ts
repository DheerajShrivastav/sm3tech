import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

const authinticaeduser = async () => {
  const user = auth()
  console.log(user)
  // const { userId }: { userId: string | null } = auth()

  if (!user ) throw new Error('unauthinticated user')
  return { user }
}

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(authinticaeduser)
    .onUploadComplete(() => {}),
  pdfUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(authinticaeduser)
    .onUploadComplete(() => {}),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
