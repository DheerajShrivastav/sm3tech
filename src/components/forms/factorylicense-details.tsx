import React from 'react'
import { factoryLicenseDetailsSchema } from '@/types'
import { IFactoryLicenseDetails } from '@/models/factoryLicenseDetails.model'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Building2, FileImage, User, Waves } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import FileUpload from '../file-upload'
type Props = {
  data?: Partial<IFactoryLicenseDetails>
}

const factoryLicenseDetails = ({ data }: Props) => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof factoryLicenseDetailsSchema>>({
    resolver: zodResolver(factoryLicenseDetailsSchema),
  })
  const handleSubmit = async (
    values: z.infer<typeof factoryLicenseDetailsSchema>
  ) => {}
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
              Factory License Details
            </CardTitle>
          </div>
          <div className="flex items-center space-x-2 text-blue-600">
            <Waves className="h-4 w-4" />
            <p className="text-sm">Please fill in all the required documents</p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              {/* Name Section */}
              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                <FormField
                  control={form.control}
                  name="manufacturingProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-700">
                        Required Documents
                      </FormLabel>
                      <FormControl>
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100 shadow-sm">
                          <div className="flex items-center space-x-2 mb-4">
                            <FileImage className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-blue-800">
                              Manufacturing Process
                            </h3>
                          </div>

                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="manufacturingProcess"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-blue-700"></FormLabel>
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
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default factoryLicenseDetails
