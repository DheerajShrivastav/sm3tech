'use client'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { IAgency } from '@/models/agency.model'
import { useRouter } from 'next/navigation'
import { AlertDialog } from '../ui/alert-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
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

import * as z from 'zod'
import FileUpload from '../file-upload'
import { Input } from '../ui/input'
import { initUser, upsertAgency } from '@/lib/queries'
import { Button } from '../ui/button'
import { UploadButton } from '@/lib/uploadthing'

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

const AgencyDetails = ({ data }: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log('first')
    try {
      console.log(values)
      let newUserData
      let custId
      if (data?.id) {
        const bodyData = {
          occupierDocuments: values.occupierDocuments,
          applicantIdProof: values.applicantIdProof,
          previousFactoryLicense: values.previousFactoryLicense,
          privateLimitedCompany: values.privateLimitedCompany,
          listOfRawMaterials: values.listOfRawMaterials,
          ownershipDocuments: values.ownershipDocuments,
          localAuthorityNoC: values.localAuthorityNoC,
          mpcbConsent: values.mpcbConsent,
          sketchFactory: values.sketchFactory,
          electricityBill: values.electricityBill,
          acceptanceLetter: values.acceptanceLetter,
          flowChart: values.flowChart,
        }
      }

      newUserData = await initUser({})
      // if (!data?.id) return
      console.log('here is the ')
      const response = await upsertAgency({
        id: data?.id ? data.id : v4(),
        occupierDocuments: values.occupierDocuments,
        applicantIdProof: values.applicantIdProof,
        previousFactoryLicense: values.previousFactoryLicense,
        privateLimitedCompany: values.privateLimitedCompany,
        listOfRawMaterials: values.listOfRawMaterials,
        ownershipDocuments: values.ownershipDocuments,
        localAuthorityNoC: values.localAuthorityNoC,
        mpcbConsent: values.mpcbConsent,
        sketchFactory: values.sketchFactory,
        electricityBill: values.electricityBill,
        acceptanceLetter: values.acceptanceLetter,
        flowChart: values.flowChart,
      })
      toast({
        title: 'Created Agency',
      })
      console.log("after and before the response")
      if (data?.id) return router.push('/sample')
      if (response) {
        return router.push('/sample')
      }
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Oppse!',
        description: 'could not create your agency',
      })
    }
  }
  return (
    <div className='w-full'>
      <Card className="w-full bg-white shadow-lg ">
        <CardHeader>
          <CardTitle className="text-blue-800">Agency Information</CardTitle>
          <CardDescription className="text-blue-600">
            Lets create an agency for your business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="occupierDocuments.name"
                render={({ field }) => (
                  <FormItem className="flex flex-col md:flex-row md:gap-4">
                    <FormLabel className="text-blue-800">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
  
              {/* Occupier Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="occupierDocuments.photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800">Occupier Photo</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupierDocuments.signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800">Occupier Signature</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.electionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800">Election ID</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.drivingLicense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800">Driving License</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
  
              {/* ID Proof */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="applicantIdProof.aadharCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800">Aadhar Card</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.passport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800">Passport</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.panCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800">Pan Card</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousFactoryLicense.previousFactoryLicense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-800">Previous Factory License</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
  
              {/* Submit Button */}
              <Button className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700">
                Create Agency
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
  
  
  
  
}

export default AgencyDetails

