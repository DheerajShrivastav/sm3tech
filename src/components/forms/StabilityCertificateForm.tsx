'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import FileUpload from '@/components/file-upload'
import { useToast } from '@/components/ui/use-toast'
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
  photographs: z.string().min(1, 'Recent Color Photographs of Structural Elements is required'),
  factoryLicenseProof: z.string().min(1, 'Proof of Factory License Application/Renewal is required'),
  directorsList: z.string().min(1, 'List of Directors/Occupiers is required'),
  ownershipProof: z.string().min(1, 'Legal Proof of Building Ownership/Tenancy is required'),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface StabilityCertificateFormProps {
  data?: any
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

  // Helper function to get icon for each document type
  const getIconForDocument = (fieldName: string) => {
    const iconMap: Record<string, any> = {
      stabilityCertificate: FileCheck2,
      structuralDesign: Building2,
      approvedDrawings: FileText,
      materialCertificates: ClipboardCheck,
      inspectionReport: ClipboardCheck,
      selfDeclaration: FileText,
      photographs: Camera,
      factoryLicenseProof: Shield,
      directorsList: Users,
      ownershipProof: FileText,
    }
    return iconMap[fieldName] || FileText
  }

  // Render file upload field
  const renderFileUploadField = (
    field: keyof FormSchemaType,
    label: string
  ) => {
    const Icon = getIconForDocument(field)

    return (
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2" key={field}>
        <FormField
          control={form.control}
          name={field}
          render={({ field: formField }) => (
            <FormItem>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                    {label}
                    <span className="text-red-500 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      apiEndpoint="pdfUploader"
                      onChange={formField.onChange}
                      value={formField.value || ''}
                    />
                  </FormControl>
                  <FormMessage className="text-xs mt-1" />
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
    )
  }

  // Form submission handler
  const handleSubmit = async (values: FormSchemaType) => {
    try {
      // Initialize user
      await initUser({})

      // Get current user
      const currentUser = await getUser()

      if (!currentUser) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'User not found. Please login again.',
        })
        return
      }

      // Prepare stability certificate data
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

      // Only add _id if updating existing document
      if (data?._id) {
        stabilityCertificateData._id = data._id
      }

      // Upsert to database
      const response = await upsertStabilityCertificate(stabilityCertificateData)

      console.log('Stability Certificate saved:', response)

      // Show success toast
      toast({
        title: 'Success',
        description: 'Stability Certificate saved successfully!',
      })

      // Redirect to inspection view
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
    <Card className="w-full max-w-7xl mx-auto p-6 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Stability Certificate Application
          </h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base ml-14">
          Upload all required documents for structural stability certification
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Required Documents Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <FileCheck2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Required Documents
                <span className="text-sm font-normal text-gray-500 ml-2">(All fields are mandatory)</span>
              </h3>
            </div>
            <div className="flex flex-wrap -mx-2">
              {renderFileUploadField('stabilityCertificate', 'Stability Certificate (Form 1A)')}
              {renderFileUploadField('structuralDesign', 'Structural Design & Load Calculations')}
              {renderFileUploadField('approvedDrawings', 'Approved Building Drawings/Layout Plan')}
              {renderFileUploadField('materialCertificates', 'Material Testing/Quality Certificates')}
              {renderFileUploadField('inspectionReport', "Engineer's Inspection/Site Assessment Report")}
              {renderFileUploadField('selfDeclaration', "Owner/Competent Person's Self-Declaration")}
              {renderFileUploadField('photographs', 'Recent Color Photographs of Structural Elements')}
              {renderFileUploadField('factoryLicenseProof', 'Proof of Factory License Application/Renewal')}
              {renderFileUploadField('directorsList', 'List of Directors/Occupiers')}
              {renderFileUploadField('ownershipProof', 'Legal Proof of Building Ownership/Tenancy')}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save Stability Certificate'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default StabilityCertificateForm
