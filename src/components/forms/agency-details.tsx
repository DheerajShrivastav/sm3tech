'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { v4 } from 'uuid'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialog } from '../ui/alert-dialog'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useToast } from '../ui/use-toast'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import FileUpload from '../file-upload'
import { useRouter } from 'next/navigation'
import {
  Building2,
  User,
  FileText,
  Files,
  Users,
  FileCheck,
} from 'lucide-react'
import * as z from 'zod'
import { getUser, initUser, upsertAgency } from '@/lib/queries'

// Form Schema Definition
const occupierDocumentsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  photo: z.string().min(1, 'Photo is required'),
  signature: z.string().min(1, 'Signature is required'),
})
const applicantIdProofSchema = z
  .object({
    electionId: z.string().optional(),
    drivingLicense: z.string().optional(),
    aadharCard: z.string().optional(),
    passport: z.string().optional(),
    panCard: z.string().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'At least one ID proof document is required',
  })
const previousFactoryLicenseSchema = z.object({
  previousFactoryLicense: z.string().optional(),
  planApprovalLetter: z.string().optional(),
})
const privateLimitedCompanySchema = z.object({
  listOfDirectors: z.string().optional(),
  moa: z.string().optional(),
  boardResolution: z.string().optional(),
  form32: z.string().optional(),
})
const listOfRawMaterialsSchema = z.object({
  listOfRawMaterials: z.string().optional(),
})
const ownershipDocumentsSchema = z
  .object({
    leaveAndLicenseAgreement: z.string().optional(),
    midcAllotmentLetter: z.string().optional(),
    sevenTwelveExtract: z.string().optional(),
    taxReceipt: z.string().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'At least one occupier document is required',
  })
const localAuthorityNoCSchema = z
  .object({
    localAuthorityNoC: z.string().optional(),
    corporationNoC: z.string().optional(),
    grampanchayatNoC: z.string().optional(),
    midcNoC: z.string().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'At least one occupier document is required',
  })
const mpcbConsentSchema = z.object({
  mpcbConsent: z.string(),
})
const sketchFactorySchema = z.object({
  sketch: z.string().optional(),
})

const electricityBillSchema = z
  .object({
    electricityBill: z.string().optional(),
    loadSanctionletter: z.string().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'At least one occupier document is required',
  })

const acceptanceLetterSchema = z.object({
  acceptanceLetter: z.string().optional(),
})

const flowChartSchema = z.object({
  flowChart: z.string().optional(),
})

const FormSchema = z.object({
  occupierDocuments: occupierDocumentsSchema,
  applicantIdProof: applicantIdProofSchema,
  previousFactoryLicense: previousFactoryLicenseSchema,
  privateLimitedCompany: privateLimitedCompanySchema,
  listOfRawMaterials: listOfRawMaterialsSchema,
  ownershipDocuments: ownershipDocumentsSchema,
  localAuthorityNoC: localAuthorityNoCSchema,
  mpcbConsent: mpcbConsentSchema,
  sketchFactory: sketchFactorySchema,
  electricityBill: electricityBillSchema,
  acceptanceLetter: acceptanceLetterSchema,
  flowChart: flowChartSchema,
})

type FormSchemaType = z.infer<typeof FormSchema>

interface AgencyDetailsProps {
  data?: any
}

const getIconForDocument = (name: string) => {
  const icons = {
    photo: User,
    signature: FileText,
    electionId: FileCheck,
    drivingLicense: FileCheck,
    aadharCard: FileCheck,
    passport: FileCheck,
    panCard: FileCheck,
    moa: Files,
    boardResolution: Users,
    default: FileText,
  }
  return icons[name as keyof typeof icons] || icons.default
}
const AgencyDetails: React.FC<AgencyDetailsProps> = ({ data }) => {
  const { toast } = useToast()
  const router = useRouter()
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      occupierDocuments: {
        name: data?.occupierDocuments?.name || '',
        photo: data?.occupierDocuments?.photo || '',
        signature: data?.occupierDocuments?.signature || '',
      },
    },
  })

  const renderFileUploadField = (
    section: string,
    field: string,
    label: string,
    required = true,
    apiEndpoint = 'pdfUploader'
  ) => {
    const Icon = getIconForDocument(field)
    return (
      <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        <FormField
          control={form.control}
          name={`${section}.${field}` as any}
          render={({ field: formField }) => (
            <FormItem>
              <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200">
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

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await upsertAgency({
        id: data?.id ? data.id : v4(),
        occupierDocuments: values.occupierDocuments,
      })
      setShowSuccessPopup(true)
      toast({ title: 'Success!', description: 'Agency created successfully.' })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not create the agency.',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-bold text-gray-900">
              Submission Successful!
            </h2>
            <p className="text-gray-600 mt-2">Your documents have been submitted.</p>
            <Button
              onClick={() => setShowSuccessPopup(false)}
              className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      <AlertDialog>
        <Card className="w-full bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100">
          <CardHeader className="space-y-4 pb-8">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Agency Information
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
          <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
              >
                {/* Basic Information Section */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <User className="h-5 w-5 text-blue-600" />
                    <FormLabel className="text-gray-900 font-sora font-semibold text-lg">
                      Basic Information
                    </FormLabel>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FormField
                      control={form.control}
                      name="occupierDocuments.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="bg-white text-black "
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="privateLimitedCompany.listOfDirectors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">
                            List of Directors
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter the Names"
                              {...field}
                              className="bg-white text-black "
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-wrap -mx-2">
                    {renderFileUploadField(
                      'occupierDocuments',
                      'photo',
                      'Occupier Photo',
                      true,
                      'imageUploader'
                    )}
                    {renderFileUploadField(
                      'occupierDocuments',
                      'signature',
                      'Occupier Signature',
                      true,
                      'imageUploader'
                    )}
                  </div>
                </div>

                {/* ID Proofs Section */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <FileCheck className="h-5 w-5 text-blue-600" />
                    <FormLabel className="text-gray-900 font-sora font-semibold text-lg">
                      ID Proofs
                    </FormLabel>
                  </div>
                  <div className="flex flex-wrap -mx-2">
                    {renderFileUploadField(
                      'applicantIdProof',
                      'electionId',
                      'Election ID'
                    )}
                    {renderFileUploadField(
                      'applicantIdProof',
                      'drivingLicense',
                      'Driving License'
                    )}
                    {renderFileUploadField(
                      'applicantIdProof',
                      'aadharCard',
                      'Aadhar Card'
                    )}
                    {renderFileUploadField(
                      'applicantIdProof',
                      'passport',
                      'Passport'
                    )}
                    {renderFileUploadField(
                      'applicantIdProof',
                      'panCard',
                      'PAN Card'
                    )}
                  </div>
                </div>

                {/* Documents Section */}
                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <Files className="h-5 w-5 text-blue-600" />
                    <FormLabel className="text-gray-900 font-sora font-semibold text-lg">
                      Required Documents
                    </FormLabel>
                  </div>
                  <div className="flex flex-wrap -mx-2 h-full">
                    {renderFileUploadField(
                      'previousFactoryLicense',
                      'previousFactoryLicense',
                      'Previous Factory License'
                    )}
                    {renderFileUploadField(
                      'previousFactoryLicense',
                      'planApprovalLetter',
                      'Plan Approval Letter'
                    )}
                    {renderFileUploadField(
                      'privateLimitedCompany',
                      'moa',
                      'MOA'
                    )}
                    {renderFileUploadField(
                      'privateLimitedCompany',
                      'boardResolution',
                      'Board Resolution'
                    )}
                    {renderFileUploadField(
                      'privateLimitedCompany',
                      'form32',
                      'Form 32'
                    )}

                    {renderFileUploadField(
                      'listOfRawMaterials',
                      'listOfRawMaterials',
                      'List of Raw Materials'
                    )}
                    {renderFileUploadField(
                      'ownershipDocuments',
                      'leaveAndLicenseAgreement',
                      'Leave and License Agreement'
                    )}
                    {renderFileUploadField(
                      'ownershipDocuments',
                      'midcAllotmentLetter',
                      'MIDC Allotment Letter'
                    )}
                    {renderFileUploadField(
                      'ownershipDocuments',
                      'sevenTwelveExtract',
                      '7/12 Extract'
                    )}

                    {renderFileUploadField(
                      'ownershipDocuments',
                      'taxReceipt',
                      'Tax Receipt'
                    )}
                    {renderFileUploadField(
                      'localAuthorityNoC',
                      'localAuthorityNoC',
                      'Local Authority NOC'
                    )}
                    {renderFileUploadField(
                      'localAuthorityNoC',
                      'corporationNoC',
                      'Corporation NOC'
                    )}
                    {renderFileUploadField(
                      'localAuthorityNoC',
                      'grampanchayatNoC',
                      'Gram Panchayat NOC'
                    )}

                    {renderFileUploadField(
                      'localAuthorityNoC',
                      'midcNoC',
                      'MIDC NOC'
                    )}
                    {renderFileUploadField(
                      'mpcbConsent',
                      'mpcbConsent',
                      'MPCB Consent'
                    )}
                    {renderFileUploadField(
                      'sketchFactory',
                      'sketch',
                      'Sketch of Factory'
                    )}
                    {renderFileUploadField(
                      'electricityBill',
                      'electricityBill',
                      'Electricity Bill'
                    )}

                    {renderFileUploadField(
                      'electricityBill',
                      'loadSanctionletter',
                      'Load Sanction Letter'
                    )}
                    {renderFileUploadField(
                      'acceptanceLetter',
                      'acceptanceLetter',
                      'Acceptance Letter as Occupier by the Nominated Director'
                    )}
                    {renderFileUploadField(
                      'flowChart',
                      'flowChart',
                      'Flow Chart of All Manufacturing Processes'
                    )}
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 text-sm text-white font-semibold p-6 rounded-xl shadow-lg hover:bg-blue-700 hover: "
                  >
                    Submit Documents
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

export default AgencyDetails
