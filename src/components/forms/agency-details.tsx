'use client'
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { IAgency } from "@/models/agency.model";
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
} from '../ui/alert-dialog'
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

type Props = {
  data?: Partial<IAgency>
}

const FormSchema = z.object({
  name: z.string().min(2, { message: 'Agency name must be atleast 2 chars.' }),
  photo: z.string().min(1),
  email: z.string(),
  addharcard: z.string(),
})

const AgencyDetails = ({ data }: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  // const isLoading = form.formState.isSubmitting

 

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log('first')
    try {
      console.log(values)
      let newUserData
      let custId
      if (data?.id) {
        const bodyData = {
          name: values.name,
          photo: values.photo,
          email: values?.email,
          addharcard: values?.addharcard
        }
      }

      newUserData = await initUser({})
      // if (!data?.id) return
      console.log( "here is the ")
      const response = await upsertAgency({
        id: data?.id ? data.id : v4(),
        name: values?.name,
        photo: values?.photo,
        email: values?.email,
        addharcard: values?.addharcard,
      })
      toast({
        title: 'Created Agency',
      })
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
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Agency Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex md:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem className="flex-1">
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
                  control={form.control}
                  name="addharcard"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Addharcard</FormLabel>
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

              <Button type="submit">{'Save Agency Information'}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  )
}

export default AgencyDetails
