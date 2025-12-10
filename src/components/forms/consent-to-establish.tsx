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
import { initUser, getUser, upsertConsentToEstablish } from '@/lib/queries'
import {
  FileCheck2,
  FileText,
  Map,
  MapPin,
  Factory,
  FileKey,
  Shield,
  Building2,
  Lightbulb,
  Leaf,
  Zap,
  Users,
  ScrollText,
} from 'lucide-react'

// Validation Schema - 14 required, 1 optional
const FormSchema = z.object({
  applicationForm: z.string().min(1, 'Application Form is required'),
  dpr: z.string().min(1, 'Detailed Project Report (DPR) is required'),
  sitePlan: z.string().min(1, 'Site Plan/Layout Plan/Plant Layout is required'),
  geoMap: z.string().min(1, 'Geographical Map/Location Details is required'),
  processDescription: z.string().min(1, 'Manufacturing Process Description with Flow Diagram is required'),
  landOwnership: z.string().min(1, 'Land Ownership Certificate or Rent/Lease Agreement is required'),
  localApproval: z.string().optional(), // Optional field
  capitalInvestmentProof: z.string().min(1, 'Capital Investment Proof is required'),
  nocFromAuthority: z.string().min(1, 'NOC from MIDC/Local Authority is required'),
  industryRegistration: z.string().min(1, 'Industry Registration is required'),
  pollutionControl: z.string().min(1, 'Proposed Pollution Control Measures is required'),
  emp: z.string().min(1, 'Environmental Management Plan is required'),
  powerWaterSanction: z.string().min(1, 'Power and Water Connection Sanction Letters is required'),
  boardResolution: z.string().min(1, 'Board Resolution or Authority Letter is required'),
  affidavit: z.string().min(1, 'Affidavit/Undertaking is required'),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface ConsentToEstablishProps {
  data?: any
}

const ConsentToEstablish: React.FC<ConsentToEstablishProps> = ({ data }) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applicationForm: data?.applicationForm || '',
      dpr: data?.dpr || '',
      sitePlan: data?.sitePlan || '',
      geoMap: data?.geoMap || '',
      processDescription: data?.processDescription || '',
      landOwnership: data?.landOwnership || '',
      localApproval: data?.localApproval || '',
      capitalInvestmentProof: data?.capitalInvestmentProof || '',
      nocFromAuthority: data?.nocFromAuthority || '',
      industryRegistration: data?.industryRegistration || '',
      pollutionControl: data?.pollutionControl || '',
      emp: data?.emp || '',
      powerWaterSanction: data?.powerWaterSanction || '',
      boardResolution: data?.boardResolution || '',
      affidavit: data?.affidavit || '',
    },
  })

  // Helper function to get icon for each document type
  const getIconForDocument = (fieldName: string) => {
    const iconMap: Record<string, any> = {
      applicationForm: FileCheck2,
      dpr: FileText,
      sitePlan: Map,
      geoMap: MapPin,
      processDescription: Factory,
      landOwnership: FileKey,
      localApproval: Shield,
      capitalInvestmentProof: Building2,
      nocFromAuthority: Shield,
      industryRegistration: FileCheck2,
      pollutionControl: Lightbulb,
      emp: Leaf,
      powerWaterSanction: Zap,
      boardResolution: Users,
      affidavit: ScrollText,
    }
    return iconMap[fieldName] || FileText
  }

  // Render file upload field
  const renderFileUploadField = (
    field: keyof FormSchemaType,
    label: string,
    required: boolean = true
  ) => {
    const Icon = getIconForDocument(field)

    return (
      <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2" key={field}>
        <FormField
          control={form.control}
          name={field}
          render={({ field: formField }) => (
            <FormItem>
              <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg shadow-md">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <FormLabel className="text-sm font-medium text-gray-700 block mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
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

      // Prepare consent to establish data
      const consentToEstablishData: any = {
        user: currentUser._id,
        applicationForm: values.applicationForm,
        dpr: values.dpr,
        sitePlan: values.sitePlan,
        geoMap: values.geoMap,
        processDescription: values.processDescription,
        landOwnership: values.landOwnership,
        localApproval: values.localApproval,
        capitalInvestmentProof: values.capitalInvestmentProof,
        nocFromAuthority: values.nocFromAuthority,
        industryRegistration: values.industryRegistration,
        pollutionControl: values.pollutionControl,
        emp: values.emp,
        powerWaterSanction: values.powerWaterSanction,
        boardResolution: values.boardResolution,
        affidavit: values.affidavit,
      }

      // Only add _id if updating existing document
      if (data?._id) {
        consentToEstablishData._id = data._id
      }

      // Upsert to database
      const response = await upsertConsentToEstablish(consentToEstablishData)

      console.log('Consent To Establish saved:', response)

      // Show success toast
      toast({
        title: 'Success',
        description: 'Consent To Establish saved successfully!',
      })

      // Redirect to inspection view
      router.push('/inspection-view')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save Consent To Establish. Please try again.',
      })
    }
  }

  return (
    <Card className="w-full max-w-7xl mx-auto p-6 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl shadow-lg">
            <FileCheck2 className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Consent To Establish Application
          </h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base ml-14">
          Upload all required documents for MPCB Consent To Establish
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Required Documents Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <FileCheck2 className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Required Documents
                <span className="text-sm font-normal text-gray-500 ml-2">(14 mandatory fields)</span>
              </h3>
            </div>
            <div className="flex flex-wrap -mx-2">
              {renderFileUploadField('applicationForm', 'Application Form (online or prescribed by MPCB)')}
              {renderFileUploadField('dpr', 'Detailed Project Report (DPR)')}
              {renderFileUploadField('sitePlan', 'Site Plan/Layout Plan/Plant Layout')}
              {renderFileUploadField('geoMap', 'Geographical Map/Location Details')}
              {renderFileUploadField('processDescription', 'Manufacturing Process Description with Flow Diagram')}
              {renderFileUploadField('landOwnership', 'Land Ownership Certificate or Rent/Lease Agreement')}
              {renderFileUploadField('capitalInvestmentProof', 'Capital Investment Proof (CA Certificate or Balance Sheet)')}
              {renderFileUploadField('nocFromAuthority', 'NOC from MIDC/Local Authority')}
              {renderFileUploadField('industryRegistration', 'Industry Registration (e.g. SSI/MSME Certificate)')}
              {renderFileUploadField('pollutionControl', 'Proposed Pollution Control Measures')}
              {renderFileUploadField('emp', 'Environmental Management Plan')}
              {renderFileUploadField('powerWaterSanction', 'Power and Water Connection Sanction Letters')}
              {renderFileUploadField('boardResolution', 'Board Resolution or Authority Letter for Authorized Person')}
              {renderFileUploadField('affidavit', 'Affidavit/Undertaking as required by MPCB')}
            </div>
          </div>

          {/* Optional Documents Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <Shield className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Optional Documents
              </h3>
            </div>
            <div className="flex flex-wrap -mx-2">
              {renderFileUploadField('localApproval', 'Approval from Local Bodies/Government (if applicable)', false)}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save Consent To Establish'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default ConsentToEstablish