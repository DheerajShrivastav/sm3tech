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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Lets create an agency for you business.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="occupierDocuments.name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex  w-[60px] sm:[30px]   md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="occupierDocuments.photo"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Occupier Photo</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="occupierDocuments.signature"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Occupier Signature</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="applicantIdProof.electionId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Election ID</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.drivingLicense"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Driving License</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.aadharCard"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Aadhar Card</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.passport"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Passport</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicantIdProof.panCard"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Pan Card</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Previous Factory License */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="previousFactoryLicense.previousFactoryLicense"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Previous Factory License</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousFactoryLicense.planApprovalLetter"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Plan Approval Letter</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Private Limited Company */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="privateLimitedCompany.listOfDirectors"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>List of Directors</FormLabel>
                      <FormControl>
                        {/* todo: adding the proper list */}
                        <Input placeholder="Enter the Names" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privateLimitedCompany.moa"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>MOA</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privateLimitedCompany.boardResolution"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Board Resolution</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="privateLimitedCompany.form32"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Form 32</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* List of Raw Materials */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="listOfRawMaterials.listOfRawMaterials"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>List of Raw Materials</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Ownership Documents */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="ownershipDocuments.leaveAndLicenseAgreement"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Leave and License Agreement</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownershipDocuments.midcAllotmentLetter"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>MIDC Allotment Letter</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownershipDocuments.sevenTwelveExtract"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>7/12 Extract</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownershipDocuments.taxReceipt"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Tax Receipt</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Local Authority NOC */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="localAuthorityNoC.localAuthorityNoC"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Local Authority NOC</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localAuthorityNoC.corporationNoC"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Corporation NOC</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localAuthorityNoC.grampanchayatNoC"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Gram Panchayat NOC</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="localAuthorityNoC.midcNoC"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>MIDC NOC</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* MPCB Consent */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="mpcbConsent.mpcbConsent"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>MPCB Consent</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Sketch Factory */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="sketchFactory.sketch"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Sketch of Factory</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Electricity Bill */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="electricityBill.electricityBill"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Electricity Bill</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="electricityBill.loadSanctionletter"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Load Sanction Letter</FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Acceptance Letter */}
              <div className="flex md:flex-row gap-4 border-dashed border  rounded-lg border-zinc-500 ">
                <FormField
                  control={form.control}
                  name="acceptanceLetter.acceptanceLetter"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>
                        Acceptance Letter AS OCCUPIER BY THE NOMINATED DIRECTOR
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* Flow Chart */}
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="flowChart.flowChart"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>
                        FLOW CHART OF ALL MANUFACTURING PROCESSES
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          apiEndpoint="pdfUploader"
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">{"Save Agency Information"}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
}

export default AgencyDetails

