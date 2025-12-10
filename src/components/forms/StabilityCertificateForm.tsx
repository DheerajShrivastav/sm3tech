'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { AlertDialog } from '../ui/alert-dialog'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import FileUpload from '../file-upload'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { initUser, getUser, upsertStabilityCertificate } from '@/lib/queries'
import {
  FileCheck2,
  Building2,
  ClipboardCheck,
  Camera,
  FileText,
  Users,
  Shield,
} from 'lucide-react'

// Validation Schema - All 10 fields are required
const FormSchema = z.object({
  stabilityCertificate: z.string().min(1, 'Stability Certificate (Form 1A) is required'),
  structuralDesign: z.string().min(1, 'Structural Design & Load Calculations is required'),
  approvedDrawings: z.string().min(1, 'Approved Building Drawings/Layout Plan is required'),
  materialCertificates: z.string().min(1, 'Material Testing/Quality Certificates is required'),
  inspectionReport: z.string().min(1, "Engineer's Inspection/Site Assessment Report is required"),
  selfDeclaration: z.string().min(1, "Owner/Competent Person's Self-Declaration is required"),
  photographs: z.string().min(1, 'Recent Color Photographs ofStructural Elements is required'),
  factoryLicenseProof: z.string().min(1, 'Proof of Factory License Application/Renewal is required'),
  directorsList: z.string().min(1, 'List of Directors/Occupiers is required'),
  ownershipProof: z.string().min(1, 'Legal Proof of Building Ownership/Tenancy is required'),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface StabilityCertificateFormProps {
  data?: any
}

const getIconForDocument = (name: string) => {
  const icons = {
    stabilityCertificate: FileCheck2,
    structuralDesign: Building2,
    approvedDrawings: Building2,
    materialCertificates: ClipboardCheck,
    inspectionReport: Shield,
    selfDeclaration: FileText,
    photographs: Camera,
    factoryLicenseProof: FileText,
    directorsList: Users,
    ownershipProof: FileText,
    default: FileText,
  }
  return icons[name as keyof typeof icons] || icons.default
}

const StabilityCertificateForm: React.FC<StabilityCertificateFormProps> = ({ data }) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      stabilityCertificate: data?.stabilityCertificate || '',
      structuralDesign: data?.structuralDesign || '',
      approvedDrawings: data?.approvedDrawings || '',
      materialCertificates: data?.materialCertificates || '',
      inspectionReport: data?.inspectionReport || '',
      selfDeclaration: data?.selfDeclaration || '',
      photographs: data?.photographs || '',
      factoryLicenseProof: data?.factoryLicenseProof || '',
      directorsList: data?.directorsList || '',
      ownershipProof: data?.ownershipProof || '',
    },
  })

  const renderFileUploadField = (
    field: string,
    label: string,
    required = true,
    apiEndpoint = 'pdfUploader'
  ) => {
    const Icon = getIconForDocument(field)
    return (
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
        <FormField
          control={form.control}
          name={field as any}
          render={({ field: formField }) => (
            <FormItem>
              <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm h-full hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-sora font-semibold text-gray-900 text-sm">
                    {label}{' '}
                    {!required && (
                      <span className="text-gray-500 text-xs">(Optional)</span>
                    )}
                  </h3>
                </div>
                <div className="rounded-lg p-3 transition-colors hover:border-blue-400">
                  <FileUpload
                    apiEndpoint={apiEndpoint as 'pdfUploader' | 'imageUploader'}
                    onChange={formField.onChange}
                    value={formField.value || ''}
                  />
                </div>
                <FormMessage className="text-red-500 text-xs mt-1" />
              </div>
            </FormItem>
          )}
        />
      </div>
    )
  }

  const handleSubmit = async (values: FormSchemaType) => {
    try {
      await initUser({})
      const currentUser = await getUser()

      if (!currentUser) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'User not found. Please login again.',
        })
        return
      }

      const stabilityCertificateData: any = {
        user: currentUser._id,
        stabilityCertificate: values.stabilityCertificate,
        structuralDesign: values.structuralDesign,
        approvedDrawings: values.approvedDrawings,
        materialCertificates: values.materialCertificates,
        inspectionReport: values.inspectionReport,
        selfDeclaration: values.selfDeclaration,
        photographs: values.photographs,
        factoryLicenseProof: values.factoryLicenseProof,
        directorsList: values.directorsList,
        ownershipProof: values.ownershipProof,
      }

      if (data?._id) {
        stabilityCertificateData._id = data._id
      }

      const response = await upsertStabilityCertificate(stabilityCertificateData)
      console.log('Stability Certificate saved:', response)

      toast({
        title: 'Success',
        description: 'Stability Certificate saved successfully!',
      })

      router.push('/inspection-view')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save Stability Certificate. Please try again.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
      </div>

      <AlertDialog>
        <Card className="w-full bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

          <CardHeader className="space-y-4 pb-8">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileCheck2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                  Stability Certificate Documents
                </CardTitle>
                <p className="text-gray-600 text-sm mt-1">
                  Upload all required stability certificate documents
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                {/* Required Documents Section */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <FormLabel className="text-gray-900 font-sora font-semibold text-lg">
                      Required Documents
                    </FormLabel>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    {renderFileUploadField(
                      'stabilityCertificate',
                      'Stability Certificate (Form 1A)',
                      true
                    )}
                    {renderFileUploadField(
                      'structuralDesign',
                      'Structural Design & Load Calculations',
                      true
                    )}
                    {renderFileUploadField(
                      'approvedDrawings',
                      'Approved Building Drawings/Layout Plan',
                      true
                    )}
                    {renderFileUploadField(
                      'materialCertificates',
                      'Material Testing/Quality Certificates',
                      true
                    )}
                    {renderFileUploadField(
                      'inspectionReport',
                      "Engineer's Inspection/Site Assessment Report",
                      true
                    )}
                    {renderFileUploadField(
                      'selfDeclaration',
                      "Owner/Competent Person's Self-Declaration",
                      true
                    )}
                    {renderFileUploadField(
                      'photographs',
                      'Recent Color Photographs of Structural Elements',
                      true,
                      'imageUploader'
                    )}
                    {renderFileUploadField(
                      'factoryLicenseProof',
                      'Proof of Factory License Application/Renewal',
                      true
                    )}
                    {renderFileUploadField(
                      'directorsList',
                      'List of Directors/Occupiers',
                      true
                    )}
                    {renderFileUploadField(
                      'ownershipProof',
                      'Legal Proof of Building Ownership/Tenancy',
                      true
                    )}
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Save Stability Certificate Information
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </AlertDialog>
    </div>
  )
}

export default StabilityCertificateForm
