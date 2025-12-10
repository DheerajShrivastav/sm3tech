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
import { initUser, getUser, upsertComplianceReport } from '@/lib/queries'
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
              <div className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg shadow-md">
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
    <Card className="w-full max-w-7xl mx-auto p-6 md:p-8 bg-white shadow-xl rounded-2xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
            <ClipboardCheck className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Compliance Report Submission
          </h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base ml-14">
          Upload all required compliance documents for regulatory review
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Required Documents Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <FileCheck2 className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Required Documents
                <span className="text-sm font-normal text-gray-500 ml-2">(12 mandatory fields)</span>
              </h3>
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
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <Shield className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">Optional Documents</h3>
            </div>
            <div className="flex flex-wrap -mx-2">
              {renderFileUploadField('hazardousWasteAuth', 'Authorization for Handling Hazardous Waste', false)}
              {renderFileUploadField('fireSafety', 'Fire Safety Certificate & Plan', false)}
              {renderFileUploadField('membershipCETP', 'Membership Certificate of CETP/CHWTSDF (if applicable)', false)}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save Compliance Report'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default ComplianceReport
