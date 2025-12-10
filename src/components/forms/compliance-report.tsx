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
import { initUser, getUser, upsertComplianceReport } from '@/lib/queries'
import {
  FileCheck2,
  FileText,
  Map,
  Wind,
  Droplets,
  Trash2,
  Shield,
  BarChart3,
  ClipboardCheck,
  Flame,
  Award,
} from 'lucide-react'

// Validation Schema - 12 required, 3 optional
const FormSchema = z.object({
  consentOperatingCopy: z.string().min(1, 'Copy of Consent to Operate is required'),
  consentEstablishCopy: z.string().min(1, 'Copy of Consent to Establish is required'),
  environmentalClearance: z.string().min(1, 'Environmental Clearance Certificate is required'),
  plantLayout: z.string().min(1, 'Latest Plant Layout is required'),
  airMonitoring: z.string().min(1, 'Air Quality Monitoring Reports are required'),
  waterMonitoring: z.string().min(1, 'Water/Wastewater Quality Monitoring Reports are required'),
  etpStpLogbook: z.string().min(1, 'ETP/STP Operation & Maintenance Logbooks are required'),
  hazardousWasteLogbook: z.string().min(1, 'Hazardous Waste Logbook is required'),
  cteComplianceReport: z.string().min(1, 'Compliance Report to CTE Conditions is required'),
  safetyAuditReport: z.string().min(1, 'Safety Audit Report is required'),
  environmentalAudit: z.string().min(1, 'Form V - Annual Environmental Audit Report is required'),
  annualReturns: z.string().min(1, 'Statutory Annual Returns Submission Proof is required'),
  hazardousWasteAuth: z.string().optional(),
  fireSafety: z.string().optional(),
  membershipCETP: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface ComplianceReportProps {
  data?: any
}

const getIconForDocument = (fieldName: string) => {
  const iconMap: Record<string, any> = {
    consentOperatingCopy: FileCheck2,
    consentEstablishCopy: FileText,
    environmentalClearance: Shield,
    plantLayout: Map,
    airMonitoring: Wind,
    waterMonitoring: Droplets,
    etpStpLogbook: Droplets,
    hazardousWasteLogbook: Trash2,
    cteComplianceReport: ClipboardCheck,
    safetyAuditReport: Shield,
    environmentalAudit: BarChart3,
    annualReturns: FileText,
    hazardousWasteAuth: Shield,
    fireSafety: Flame,
    membershipCETP: Award,
  }
  return iconMap[fieldName] || FileText
}

const ComplianceReport: React.FC<ComplianceReportProps> = ({ data }) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      consentOperatingCopy: data?.consentOperatingCopy || '',
      consentEstablishCopy: data?.consentEstablishCopy || '',
      environmentalClearance: data?.environmentalClearance || '',
      plantLayout: data?.plantLayout || '',
      airMonitoring: data?.airMonitoring || '',
      waterMonitoring: data?.waterMonitoring || '',
      etpStpLogbook: data?.etpStpLogbook || '',
      hazardousWasteLogbook: data?.hazardousWasteLogbook || '',
      cteComplianceReport: data?.cteComplianceReport || '',
      safetyAuditReport: data?.safetyAuditReport || '',
      environmentalAudit: data?.environmentalAudit || '',
      annualReturns: data?.annualReturns || '',
      hazardousWasteAuth: data?.hazardousWasteAuth || '',
      fireSafety: data?.fireSafety || '',
      membershipCETP: data?.membershipCETP || '',
    },
  })

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
                    apiEndpoint="pdfUploader"
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

      const complianceReportData: any = {
        user: currentUser._id,
        consentOperatingCopy: values.consentOperatingCopy,
        consentEstablishCopy: values.consentEstablishCopy,
        environmentalClearance: values.environmentalClearance,
        plantLayout: values.plantLayout,
        airMonitoring: values.airMonitoring,
        waterMonitoring: values.waterMonitoring,
        etpStpLogbook: values.etpStpLogbook,
        hazardousWasteLogbook: values.hazardousWasteLogbook,
        cteComplianceReport: values.cteComplianceReport,
        safetyAuditReport: values.safetyAuditReport,
        environmentalAudit: values.environmentalAudit,
        annualReturns: values.annualReturns,
        hazardousWasteAuth: values.hazardousWasteAuth,
        fireSafety: values.fireSafety,
        membershipCETP: values.membershipCETP,
      }

      if (data?._id) {
        complianceReportData._id = data._id
      }

      const response = await upsertComplianceReport(complianceReportData)
      console.log('Compliance Report saved:', response)

      toast({
        title: 'Success',
        description: 'Compliance Report saved successfully!',
      })

      router.push('/inspection-view')
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save Compliance Report. Please try again.',
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
                  Compliance Report Submission
                </CardTitle>
                <p className="text-gray-600 text-sm mt-1">
                  Upload all required compliance documents for regulatory review
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                {/* Required Documents Section */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileCheck2 className="h-5 w-5 text-blue-600" />
                    <FormLabel className="text-gray-900 font-sora font-semibold text-lg">
                      Required Documents
                    </FormLabel>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    {renderFileUploadField('consentOperatingCopy', 'Copy of Consent to Operate (CTO)')}
                    {renderFileUploadField('consentEstablishCopy', 'Copy of Consent to Establish (CTE)')}
                    {renderFileUploadField('environmentalClearance', 'Environmental Clearance Certificate')}
                    {renderFileUploadField('plantLayout', 'Latest Plant Layout (As Commissioned)')}
                    {renderFileUploadField('airMonitoring', 'Air Quality Monitoring Reports & Stack Emission Data')}
                    {renderFileUploadField('waterMonitoring', 'Water/Wastewater Quality Monitoring Reports')}
                    {renderFileUploadField('etpStpLogbook', 'ETP/STP Operation & Maintenance Logbooks')}
                    {renderFileUploadField('hazardousWasteLogbook', 'Hazardous Waste Generation & Disposal Logbook')}
                    {renderFileUploadField('cteComplianceReport', 'Compliance Report to CTE Conditions')}
                    {renderFileUploadField('safetyAuditReport', 'Safety Audit Report & Compliance Recommendations')}
                    {renderFileUploadField('environmentalAudit', 'Form V - Annual Environmental Audit Report')}
                    {renderFileUploadField('annualReturns', 'Statutory Annual Returns Submission Proof')}
                  </div>
                </div>

                {/* Optional Documents Section */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <FormLabel className="text-gray-900 font-sora font-semibold text-lg">
                      Optional Documents
                    </FormLabel>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    {renderFileUploadField('hazardousWasteAuth', 'Authorization for Handling Hazardous Waste', false)}
                    {renderFileUploadField('fireSafety', 'Fire Safety Certificate & Plan', false)}
                    {renderFileUploadField('membershipCETP', 'Membership Certificate of CETP/CHWTSDF (if applicable)', false)}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Saving...' : 'Save Compliance Report Information'}
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

export default ComplianceReport
