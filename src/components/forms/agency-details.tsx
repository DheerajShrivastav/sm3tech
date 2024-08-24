'use client'

import React, { useEffect } from 'react'
import FileUpload from '@/components/file-upload'
import { initUser } from '@/lib/queries'
import { connectDB } from '@/lib/db'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertDialog } from '../ui/alert-dialog'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { IAgency } from '@/models/agency.model'
import { Input } from '../ui/input'
type Props= {
  data?: Partial<IAgency>
}
const FormSchema = z.object({
    photo: z.string().min(1),
    // signature: z.string().min(1),
    // applicantsIdProof: z.string().min(1),
    // previousFactoryLicense: z.string().min(1),
    // planApprovalLetter: z.string().min(1),
    // privateLimitedCompany: z.object({
    //   license: z.string().min(1),
    //   directorsInfo: z.object({
    //     directorsNames: z.string().min(1),
    //     directorsAddress: z.string().min(1)
    //   }),
    // }),
    // moa: z.string(),
    // boardResolutionNominee: z.string(),
    // form32: z.string(),

    name: z
      .string()
      .min(2, { message: 'Agency name must be atleast 2 chars.' }),
    addharcard: z.string().min(1),
  })

const AgencyDetails = ({data}:Props) => {
  // await connectDB()
  // await initUser({})
  
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: data?.name,
      photo: data?.logo
    },
  })
   const isLoading = form.formState.isSubmitting
  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data])
const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
  try {
    let newUserData
    let custId
    if(!data?.id){
      const bodyData ={
        name: values.name,
        photo: values.photo,
        addharcard: values.addharcard
      }
    
    const customerResponse = await fetch('/api/create-customer',{
      method: 'POST',
      headers:{
        'content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    })
    const customerData: {customerId: string} = await customerResponse.json()
    custId = customerData.customerId
  }
  newUserData = await initUser({})
  if(!data?.owner && custId) return 
  } catch (error) {
    
  }
}
  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agency Information</CardTitle>
          <CardDescription>
            Lets create an agency for you business. You can edit agency settings
            later from the agency settings tab.
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
                  disabled={isLoading}
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo</FormLabel>
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
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="addharcard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Addhar Card</FormLabel>
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
            </form>
          </Form>
        </CardContent>
      </Card>
      <FileUpload apiEndpoint="pdfUploader" onChange={() => {}} />
    </AlertDialog>
  )
}

export default AgencyDetails
