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
import { initUser, getUser, upsertConsentToEstablish } from '@/lib/queries'
import {
  FileText,
  Factory,
  Map,
  ListChecks,
  Droplets,
  Wind,
  Trash2,
  Shield,
  FileCheck2,
  Flame,
  Award,
  BookOpen,
  FileBarChart,
  Building2,
} from 'lucide-react'

// Validation Schema
const FormSchema = z.object({
  applicationForm: z.string().min(1, 'Application Form is required'),
  projectReport: z.string().min(1, 'Project/DPR Report is required'),
  siteLayout: z.string().min(1, 'Site Layout & Plant Layout Plan is required'),
  productionDetails: z.string().min(1, 'Production Process Details  is required'),
  rawMaterialsList: z.string().min(1, 'List of Raw Materials & Chemicals is required'),
  waterRequirement: z.string().min(1, 'Water Requirement & Source Details is required'),
  effluentDetails: z.string().min(1, 'Wastewater/Effluent Generation &Treatment Plan is required'),
  airEmissions: z.string().min(1, 'Air Emissions Details & Control Measures is required'),
  solidWaste: z.string().min(1, 'Solid/Hazardous Waste Management Plan is required'),
  onlineMonitoring: z.string().min(1, 'Online Monitoring System (OCEMS) Proposal is required'),
  environmentalImpact: z.string().min(1, 'Environmental Impact Assessment (if required) is required'),
  landOwnership: z.string().min(1, 'Proof of Land Ownership/Lease Agreement is required'),
  naRegCertificate: z.string().min(1, 'No Objection from Local Authority is required'),
  investmentDetails: z.string().min(1, 'Details of Capital Investment in Pollution Control is required'),
  hazardousAuth: z.string().optional(),
  fireSafety: z.string().optional(),
  membershipCerts: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface ConsentToEstablishFormProps {
  data?: any
}

const getIconForDocument = (name: string) => {
  const icons = {
    applicationForm: FileText,
    projectReport: FileBarChart,
    siteLayout: Map,
    productionDetails: Factory,
    rawMaterialsList: ListChecks,
    waterRequirement: Droplets,
    effluentDetails: Droplets,
    airEmissions: Wind,
    solidWaste: Trash2,
    onlineMonitoring: Building2,
    environmentalImpact: Shield,
    landOwnership: FileText,
    naRegCertificate: FileCheck2,
    investmentDetails: FileText,
    hazardousAuth: Shield,
    fireSafety: Flame,
    membershipCerts: Award,
    default: FileText,
  }
  return icons[name as keyof typeof icons] || icons.default
}

const ConsentToEstablishForm: React.FC<ConsentToEstablishFormProps> = ({ data }) => {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applicationForm: data?.applicationForm || '',
      projectReport: data?.projectReport || '',
      siteLayout: data?.siteLayout || '',
      productionDetails: data?.productionDetails || '',
      rawMaterialsList: data?.rawMaterialsList || '',
      waterRequirement: data?.waterRequirement || '',
      effluentDetails: data?.effluentDetails || '',
      airEmissions: data?.airEmissions || '',
      solidWaste: data?.solidWaste || '',
      onlineMonitoring: data?.onlineMonitoring || '',
      environmentalImpact: data?.environmentalImpact || '',
      landOwnership: data?.landOwnership || '',
      naRegCertificate: data?.naRegCertificate || '',
      investmentDetails: data?.investmentDetails || '',
      hazardousAuth: data?.hazardousAuth || '',
      fireSafety: data?.fireSafety || '',
      membershipCerts: data?.membershipCerts || '',
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

      const consentToEstablishData: any = {
        user: currentUser._id,
        applicationForm: values.applicationForm,
        projectReport: values.projectReport,
        siteLayout: values.siteLayout,
        productionDetails: values.productionDetails,
        rawMaterialsList: values.rawMaterialsList,
        waterRequirement: values.waterRequirement,
        effluentDetails: values.effluentDetails,
        airEmissions: values.airEmissions,
        solidWaste: values.solidWaste,
        onlineMonitoring: values.onlineMonitoring,
        environmentalImpact: values.environmentalImpact,
        landOwnership: values.landOwnership,
        naRegCertificate: values.naRegCertificate,
        investmentDetails: values.investmentDetails,
        hazardousAuth: values.hazardousAuth,
        fireSafety: values.fireSafety,
        membershipCerts: values.membershipCerts,
      }

      if (data?._id) {
        consentToEstablishData._id = data._id
      }

      const response = await upsertConsentToEstablish(consentToEstablishData)
      console.log('Consent To Establish saved:', response)

      toast({
        title: 'Success',
        description: 'Consent To Establish saved successfully!',
      })

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
                <Factory className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                  Consent To Establish Documents
                </CardTitle>
                <p className="text-gray-600 text-sm mt-1">
                  Upload all required consent to establish documents
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
                    {renderFileUploadField('applicationForm', 'Application Form (for CTE)')}
                    {renderFileUploadField('projectReport', 'Project/DPR Report')}
                    {renderFileUploadField('siteLayout', 'Site Layout & Plant Layout Plan')}
                    {renderFileUploadField('productionDetails', 'Production Process Details')}
                    {renderFileUploadField('rawMaterialsList', 'List of Raw Materials & Chemicals')}
                    {renderFileUploadField('waterRequirement', 'Water Requirement & Source Details')}
                    {renderFileUploadField('effluentDetails', 'Wastewater/Effluent Generation & Treatment Plan')}
                    {renderFileUploadField('airEmissions', 'Air Emissions Details & Control Measures')}
                    {renderFileUploadField('solidWaste', 'Solid/Hazardous Waste Management Plan')}
                    {renderFileUploadField('onlineMonitoring', 'Online Monitoring System (OCEMS) Proposal')}
                    {renderFileUploadField('environmentalImpact', 'Environmental Impact Assessment (if required)')}
                    {renderFileUploadField('landOwnership', 'Proof of Land Ownership/Lease Agreement')}
                    {renderFileUploadField('naRegCertificate', 'No Objection from Local Authority')}
                    {renderFileUploadField('investmentDetails', 'Details of Capital Investment in Pollution Control')}
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
                    {renderFileUploadField('hazardousAuth', 'Authorization for Handling Hazardous Waste (if any)', false)}
                    {renderFileUploadField('fireSafety', 'Fire Safety Certificate & Plan (if available)', false)}
                    {renderFileUploadField('membershipCerts', 'Membership Certificates (CETP/CHWTSDF, if applicable)', false)}
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Save Consent To Establish Information
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

export default ConsentToEstablishForm