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
import { initUser, getUser, upsertConsentToOperate } from '@/lib/queries'
import {
  FileCheck2,
  FileText,
  Map,
  Factory,
  BarChart3,
  ClipboardCheck,
  Droplets,
  Trash2,
  Shield,
  Wind,
  Database,
  Award,
  Flame,
  RefreshCw,
} from 'lucide-react'

// Validation Schema - 11 required, 4 optional
const FormSchema = z.object({
  applicationForm: z.string().min(1, 'Application Form is required'),
  cteCopy: z.string().min(1, 'Copy of Consent to Establish is required'),
  plantLayout: z.string().min(1, 'Latest Plant Layout is required'),
  productionDetails: z.string().min(1, 'Production Details are required'),
  envMonitoringReports: z.string().min(1, 'Environmental Monitoring Reports are required'),
  cteComplianceReport: z.string().min(1, 'CTE Compliance Report is required'),
  etpStpRecords: z.string().min(1, 'ETP/STP Records are required'),
  wasteDisposal: z.string().min(1, 'Waste Disposal Arrangements are required'),
  waterBalance: z.string().min(1, 'Water Balance is required'),
  airPollutionControl: z.string().min(1, 'Air Pollution Control Details are required'),
  storageDetails: z.string().min(1, 'Storage Details are required'),
  hazardousWasteAuth: z.string().optional(),
  membershipCertificates: z.string().optional(),
  fireSafety: z.string().optional(),
  renewalDocs: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface ConsentToOperateProps {
  data?: any
}

const ConsentToOperate: React.FC<ConsentToOperateProps> = ({ data }) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applicationForm: data?.applicationForm || '',
      cteCopy: data?.cteCopy || '',
      plantLayout: data?.plantLayout || '',
      productionDetails: data?.productionDetails || '',
      envMonitoringReports: data?.envMonitoringReports || '',
      cteComplianceReport: data?.cteComplianceReport || '',
      etpStpRecords: data?.etpStpRecords || '',
      wasteDisposal: data?.wasteDisposal || '',
      waterBalance: data?.waterBalance || '',
      airPollutionControl: data?.airPollutionControl || '',
      storageDetails: data?.storageDetails || '',
      hazardousWasteAuth: data?.hazardousWasteAuth || '',
      membershipCertificates: data?.membershipCertificates || '',
      fireSafety: data?.fireSafety || '',
      renewalDocs: data?.renewalDocs || '',
    },
  })

  // Helper function to get icon for each document type
  const getIconForDocument = (fieldName: string) => {
    const iconMap: Record<string, any> = {
      applicationForm: FileCheck2,
      cteCopy: FileText,
      plantLayout: Map,
      productionDetails: Factory,
      envMonitoringReports: BarChart3,
      cteComplianceReport: ClipboardCheck,
      etpStpRecords: Droplets,
      wasteDisposal: Trash2,
      hazardousWasteAuth: Shield,
      waterBalance: Droplets,
      airPollutionControl: Wind,
      membershipCertificates: Award,
      storageDetails: Database,
      fireSafety: Flame,
      renewalDocs: RefreshCw,
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
              <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-md">
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

      // Prepare consent to operate data
      const consentToOperateData: any = {
        user: currentUser._id,
        applicationForm: values.applicationForm,
        cteCopy: values.cteCopy,
        plantLayout: values.plantLayout,
        productionDetails: values.productionDetails,
        envMonitoringReports: values.envMonitoringReports,
        cteComplianceReport: values.cteComplianceReport,
        etpStpRecords: values.etpStpRecords,
        wasteDisposal: values.wasteDisposal,
        waterBalance: values.waterBalance,
        airPollutionControl: values.airPollutionControl,
        storageDetails: values.storageDetails,
        hazardousWasteAuth: values.hazardousWasteAuth,
        membershipCertificates: values.membershipCertificates,
        fireSafety: values.fireSafety,
        renewalDocs: values.renewalDocs,
      }

      // Only add _id if updating existing document
      if (data?._id) {
        consentToOperateData._id = data._id
      }

      // Upsert to database
      const response = await upsertConsentToOperate(consentToOperateData)

      console.log('Consent To Operate saved:', response)

      // Show success toast
      toast({
        title: 'Success',
        description: 'Consent To Operate saved successfully!',
      })

      // Redirect to inspection view
      router.push('/inspection-view')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save Consent To Operate. Please try again.',
      })
    }
  }

  return (
    <Card className="w-full max-w-7xl mx-auto p-6 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <Factory className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Consent To Operate Application
          </h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base ml-14">
          Upload all required documents for MPCB Consent To Operate
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
                <span className="text-sm font-normal text-gray-500 ml-2">(11 mandatory fields)</span>
              </h3>
            </div>
            <div className="flex flex-wrap -mx-2">
              {renderFileUploadField('applicationForm', 'Application Form (for CTO)')}
              {renderFileUploadField('cteCopy', 'Copy of Consent to Establish already granted')}
              {renderFileUploadField('plantLayout', 'Latest Plant Layout as Commissioned')}
              {renderFileUploadField('productionDetails', 'Details of Production Capacity, Products & By-products, and Raw Materials')}
              {renderFileUploadField('envMonitoringReports', 'Environmental Monitoring Reports (air, water, noise analysis)')}
              {renderFileUploadField('cteComplianceReport', 'Compliance Report to CTE Conditions')}
              {renderFileUploadField('etpStpRecords', 'ETP/STP Operation & Maintenance Records')}
              {renderFileUploadField('wasteDisposal', 'Hazardous and Non-hazardous Waste Disposal Arrangements')}
              {renderFileUploadField('waterBalance', 'Water Balance and Wastewater Management Plan')}
              {renderFileUploadField('airPollutionControl', 'Details of Air Pollution Control Equipment')}
              {renderFileUploadField('storageDetails', 'Details of Chemicals, Fuels, and Raw Materials Storage')}
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
              {renderFileUploadField('hazardousWasteAuth', 'Authorization for Handling Hazardous Waste (if any)', false)}
              {renderFileUploadField('membershipCertificates', 'Membership Certificates of CETP/CHWTSDF (if applicable)', false)}
              {renderFileUploadField('fireSafety', 'Fire Safety Certificate/Plan (if applicable)', false)}
              {renderFileUploadField('renewalDocs', 'Renewal Documents as per Last Consent (if renewal is sought)', false)}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save Consent To Operate'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default ConsentToOperate
