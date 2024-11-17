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
  name: z.string().min(1, "Name is required"),
  photo: z.string().min(1, "Photo is required"),
  signature: z.string().min(1, "Signature is required"),
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
      console.log("after and berofre the resposnce")
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
    <AlertDialog>
      <Card className="w-full bg-white text-black">
        <CardHeader>
          <CardTitle className="text-black">Agency Information</CardTitle>
          <CardDescription className="text-gray-600">
            Lets create an agency for you business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {/* Text inputs take full width */}
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="occupierDocuments.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className="bg-white text-black w-full" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="privateLimitedCompany.listOfDirectors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">List of Directors</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the Names" {...field} className="bg-white text-black w-full" />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              {/* File uploads in grid of 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="occupierDocuments.photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Occupier Photo</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupierDocuments.signature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Occupier Signature</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="applicantIdProof.electionId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Election ID</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.drivingLicense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Driving License</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.aadharCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Aadhar Card</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.passport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Passport</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="applicantIdProof.panCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Pan Card</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousFactoryLicense.previousFactoryLicense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Previous Factory License</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousFactoryLicense.planApprovalLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Plan Approval Letter</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privateLimitedCompany.moa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">MOA</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="privateLimitedCompany.boardResolution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Board Resolution</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privateLimitedCompany.form32"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Form 32</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="listOfRawMaterials.listOfRawMaterials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">List of Raw Materials</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownershipDocuments.leaveAndLicenseAgreement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Leave and License Agreement</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="ownershipDocuments.midcAllotmentLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">MIDC Allotment Letter</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownershipDocuments.sevenTwelveExtract"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">7/12 Extract</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownershipDocuments.taxReceipt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Tax Receipt</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localAuthorityNoC.localAuthorityNoC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Local Authority NOC</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="localAuthorityNoC.corporationNoC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Corporation NOC</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localAuthorityNoC.grampanchayatNoC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Gram Panchayat NOC</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localAuthorityNoC.midcNoC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">MIDC NOC</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mpcbConsent.mpcbConsent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">MPCB Consent</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="sketchFactory.sketch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Sketch of Factory</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="electricityBill.electricityBill"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Electricity Bill</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="electricityBill.loadSanctionletter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Load Sanction Letter</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
               
              </div>
              <FormField
                  control={form.control}
                  name="acceptanceLetter.acceptanceLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Acceptance Letter as Occupier by the Nominated Director
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

              <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                <FormField
                  control={form.control}
                  name="flowChart.flowChart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        FLOW CHART OF ALL MANUFACTURING PROCESSES
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="bg-blue-600 text-white w-full" type="submit">{"Save Agency Information"}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  )
}

export default AgencyDetails