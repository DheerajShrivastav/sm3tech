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
import { initUser, getUser, upsertConsentToOperate } from '@/lib/queries'
import {
  FileCheck2,
  FileText,
  Map,
  BarChart3,
  Droplets,
  Trash2,
  Shield,
  Wind,
  ClipboardCheck,
  Flame,
  Award,
} from 'lucide-react'

// Validation Schema
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
  airPollutionControl: z.string().min(1, 'Air Pollution Control Details is required'),
  storageDetails: z.string().min(1, 'Storage Details are required'),
  hazardousWasteAuth: z.string().optional(),
  membershipCertificates: z.string().optional(),
  fireSafety: z.string().optional(),
  renewalDocs: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface ConsentToOperateFormProps {
  data?: any
}

const getIconForDocument = (name: string) => {
  const icons = {
    applicationForm: FileText,
    cteCopy: FileCheck2,
    plantLayout: Map,
    productionDetails: BarChart3,
    envMonitoringReports: ClipboardCheck,
    cteComplianceReport: ClipboardCheck,
    etpStpRecords: Droplets,
    wasteDisposal: Trash2,
    waterBalance: Droplets,
    airPollutionControl: Wind,
    storageDetails: FileText,
    hazardousWasteAuth: Shield,
    membershipCertificates: Award,
    fireSafety: Flame,
    renewalDocs: FileText,
    default: FileText,
  }
  return icons[name as keyof typeof icons] || icons.default
}

const ConsentToOperateForm: React.FC<ConsentToOperateFormProps> = ({ data }) => {
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

      if (data?._id) {
        consentToOperateData._id = data._id
      }

      const response = await upsertConsentToOperate(consentToOperateData)
      console.log('Consent To Operate saved:', response)

      toast({
        title: 'Success',
        description: 'Consent To Operate saved successfully!',
      })

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
                <ClipboardCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                  Consent To Operate Documents
                </CardTitle>
                <p className="text-gray-600 text-sm mt-1">
                  Upload all required consent to operate documents
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
                    {renderFileUploadField('applicationForm', 'Application Form (for CTO)')}
                    {renderFileUploadField('cteCopy', 'Copy of Consent to Establish')}
                    {renderFileUploadField('plantLayout', 'Latest Plant Layout (As Commissioned)')}
                    {renderFileUploadField('productionDetails', 'Production Details, Process & Capacity')}
                    {renderFileUploadField('envMonitoringReports', 'Environmental Monitoring Reports')}
                    {renderFileUploadField('cteComplianceReport', 'Compliance Report to CTE Conditions')}
                    {renderFileUploadField('etpStpRecords', 'ETP/STP Maintenance & Operation Records')}
                    {renderFileUploadField('wasteDisposal', 'Waste Disposal Arrangements & Proof')}
                    {renderFileUploadField('waterBalance', 'Water Balance Diagram & Analysis')}
                    {renderFileUploadField('airPollutionControl', 'Air Pollution Control Equipment Details')}
                    {renderFileUploadField('storageDetails', 'Storage Details for Raw Materials/Chemicals')}
                  </div>
                </div>

                {/* Optional Documents Section */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <FormLabel className="text-gray-900 font-sora font-semibold text-lg">
                      Optional Documents
                    </FormLabel>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    {renderFileUploadField('hazardousWasteAuth', 'Authorization for Handling Hazardous Waste', false)}
                    {renderFileUploadField('membershipCertificates', 'Membership Certificates (CETP/CHWTSDF)', false)}
                    {renderFileUploadField('fireSafety', 'Fire Safety Certificate & Plan', false)}
                    {renderFileUploadField('renewalDocs', 'Renewal Documents (if applicable)', false)}
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Save Consent To Operate Information
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

export default ConsentToOperateForm
