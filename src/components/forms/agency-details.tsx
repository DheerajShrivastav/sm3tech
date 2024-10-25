'use client'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { IAgency } from '@/models/agency.model'
import { useRouter } from 'next/navigation'
import { AlertDialog } from '../ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Building2,
  FileCheck,
  FileImage,
  FileText,
  ShieldCheck,
  Upload,
  User,
  Waves,
  Files,
  Factory,
  FileKey,
  FileSpreadsheet,
  Lightbulb,
  
} from 'lucide-react'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { useToast } from '../ui/use-toast'
import FileUpload from '../file-upload'
import { Input } from '../ui/input'
import { initUser, upsertAgency } from '@/lib/queries'
import { Button } from '../ui/button'

type Props = {
  data?: Partial<IAgency>
}

const occupierDocumentsSchema = z.object({
  name: z.string(),
  photo: z.string(),
  signature: z.string(),
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
    message: 'At least one occupier document is required',
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
    message: 'At least one ownership document is required',
  })

const localAuthorityNoCSchema = z
  .object({
    localAuthorityNoC: z.string().optional(),
    corporationNoC: z.string().optional(),
    grampanchayatNoC: z.string().optional(),
    midcNoC: z.string().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'At least one NoC is required',
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
    message: 'At least one electricity document is required',
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

const AgencyDetails = ({ data }: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      let newUserData = await initUser({})
      const response = await upsertAgency({
        id: data?.id ? data.id : v4(),
        ...values
      })
      
      toast({
        title: 'Agency Created Successfully',
        description: 'Your agency has been created and saved.',
        className: 'bg-blue-50 border-blue-200',
      })
      
      if (data?.id || response) {
        router.push('/sample')
      }
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not create your agency. Please try again.',
      })
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
      </div>

      <Card className="w-full bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />
        
        <CardHeader className="space-y-4 pb-8">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Agency Information
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2 text-blue-600">
            <Waves className="h-4 w-4" />
            <p className="text-sm">Please fill in all the required documents</p>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              {/* Name Section */}
              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Personal Details</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="occupierDocuments.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          className="bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-400 text-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Document Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Occupier Documents */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileImage className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">Occupier Documents</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="occupierDocuments.photo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700">Photo</FormLabel>
                          <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 transition-colors hover:border-blue-400">
                            <FileUpload
                              apiEndpoint="imageUploader"
                              onChange={field.onChange}
                              value={field.value}
                            />
                          </div>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* ID Proof Section */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">ID Proof</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="applicantIdProof.aadharCard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700">Aadhar Card</FormLabel>
                          <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 transition-colors hover:border-blue-400">
                            <FileUpload
                              apiEndpoint="imageUploader"
                              onChange={field.onChange}
                              value={field.value || ""}
                            />
                          </div>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* License Section */}
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
                  <div className="flex items-center space-x-2 mb-4">
                    <FileCheck className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">License Documents</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="previousFactoryLicense.previousFactoryLicense"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-700">Factory License</FormLabel>
                          <div className="border-2 border-dashed border-blue-200 rounded-lg p-4 transition-colors hover:border-blue-400">
                            <FileUpload
                              apiEndpoint="pdfUploader"
                              onChange={field.onChange}
                              value={field.value || ''}
                            />
                          </div>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-blue-200 flex items-center space-x-2"
                >
                  <Upload className="h-5 w-5" />
                  <span>Create Agency</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgencyDetails