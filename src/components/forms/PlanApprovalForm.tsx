'use client'
import React from 'react'
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
import { Button } from '../ui/button'
import FileUpload from '../file-upload'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Building2,
  CheckCircle2,
} from 'lucide-react'
import * as z from 'zod'
import { getUser, initUser, upsertPlanApproval } from '@/lib/queries'

// Form Schema Definition
const FormSchema = z.object({
  applicationForm: z.string().min(1, 'Application form is required'),
  siteLayout: z.string().min(1, 'Site layout is required'),
  buildingPlan: z.string().min(1, 'Building plan is required'),
  machineryLayout: z.string().min(1, 'Machinery layout is required'),
  structuralDrawings: z.string().min(1, 'Structural drawings are required'),
  ventilationPlan: z.string().min(1, 'Ventilation plan is required'),
  safetyMeasures: z.string().min(1, 'Safety measures plan is required'),
  landOwnership: z.string().min(1, 'Land ownership documents are required'),
  soilTest: z.string().optional(),
  environmentClearance: z.string().optional(),
  nabh1approval: z.string().optional(),
  otherDocuments: z.string().optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface PlanApprovalFormProps {
  data?: any
}

const getIconForDocument = (name: string) => {
  const icons = {
    applicationForm: FileText,
    siteLayout: Building2,
    buildingPlan: Building2,
    machineryLayout: Building2,
    default: FileText,
  }
  return icons[name as keyof typeof icons] || icons.default
}

const PlanApprovalForm: React.FC<PlanApprovalFormProps> = ({ data }) => {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      applicationForm: data?.applicationForm || '',
      siteLayout: data?.siteLayout || '',
      buildingPlan: data?.buildingPlan || '',
      machineryLayout: data?.machineryLayout || '',
      structuralDrawings: data?.structuralDrawings || '',
      ventilationPlan: data?.ventilationPlan || '',
      safetyMeasures: data?.safetyMeasures || '',
      landOwnership: data?.landOwnership || '',
      soilTest: data?.soilTest || '',
      environmentClearance: data?.environmentClearance || '',
      nabh1approval: data?.nabh1approval || '',
      otherDocuments: data?.otherDocuments || '',
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

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      console.log(values)

      // Initialize user if needed
      await initUser({})

      // Get current user
      const currentUser = await getUser()

      // Prepare plan approval data
      const response = await upsertPlanApproval({
        id: data?.id ? data.id : v4(),
        user: currentUser?._id,
        applicationForm: values.applicationForm,
        siteLayout: values.siteLayout,
        buildingPlan: values.buildingPlan,
        machineryLayout: values.machineryLayout,
        structuralDrawings: values.structuralDrawings,
        ventilationPlan: values.ventilationPlan,
        safetyMeasures: values.safetyMeasures,
        landOwnership: values.landOwnership,
        soilTest: values.soilTest,
        environmentClearance: values.environmentClearance,
        nabh1approval: values.nabh1approval,
        otherDocuments: values.otherDocuments,
      })

      toast({
        title: 'Plan Approval Saved',
        description: 'Your plan approval documents have been saved successfully.',
      })

      if (data?.id) return router.push('/inspection-view')
      if (response) {
        return router.push('/inspection-view')
      }
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Could not save your plan approval documents.',
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
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                  Plan Approval Documents
                </CardTitle>
                <p className="text-gray-600 text-sm mt-1">
                  Upload all required plan approval documents
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
                    {renderFileUploadField(
                      'applicationForm',
                      'Application Form for Plan Approval',
                      true
                    )}
                    {renderFileUploadField(
                      'siteLayout',
                      'Site Layout/Plant Layout Plan',
                      true
                    )}
                    {renderFileUploadField(
                      'buildingPlan',
                      'Building Construction Plan',
                      true
                    )}
                    {renderFileUploadField(
                      'machineryLayout',
                      'Machinery Layout Plan',
                      true
                    )}
                    {renderFileUploadField(
                      'structuralDrawings',
                      'Structural Drawings and Details',
                      true
                    )}
                    {renderFileUploadField(
                      'ventilationPlan',
                      'Ventilation and Lighting Plan',
                      true
                    )}
                    {renderFileUploadField(
                      'safetyMeasures',
                      'Safety Measures and Fire Protection Plan',
                      true
                    )}
                    {renderFileUploadField(
                      'landOwnership',
                      'Land Ownership Documents',
                      true
                    )}
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
                    {renderFileUploadField(
                      'soilTest',
                      'Soil Test Report',
                      false
                    )}
                    {renderFileUploadField(
                      'environmentClearance',
                      'Environmental Clearance (if applicable)',
                      false
                    )}
                    {renderFileUploadField(
                      'nabh1approval',
                      'NABH-1 Approval (if applicable)',
                      false
                    )}
                    {renderFileUploadField(
                      'otherDocuments',
                      'Other Supporting Documents',
                      false
                    )}
                  </div>
                </div>

                <div className="pt-8 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Save Plan Approval Information
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

export default PlanApprovalForm