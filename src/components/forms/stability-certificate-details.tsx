import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import {
    FileText,
    ClipboardCheck,
    FileCheck,
    Building2,
    Users,
    Home,
    Image as ImageIcon,
    FileSignature,
    FileSearch,
    User,
    FileBadge,
    Files,
} from 'lucide-react'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import FileUpload from '../file-upload'

const stabilityCertificateSchema = z.object({
    stabilityCertificate: z.string().min(1, 'Required'),
    structuralDesign: z.string().min(1, 'Required'),
    approvedDrawings: z.string().min(1, 'Required'),
    materialCertificates: z.string().min(1, 'Required'),
    inspectionReport: z.string().min(1, 'Required'),
    selfDeclaration: z.string().min(1, 'Required'),
    photographs: z.string().min(1, 'Required'),
    factoryLicenseProof: z.string().min(1, 'Required'),
    directorsList: z.string().min(1, 'Required'),
    ownershipProof: z.string().min(1, 'Required'),
})

type StabilityCertificateForm = z.infer<typeof stabilityCertificateSchema>

const getIconForDocument = (name: keyof StabilityCertificateForm) => {
    const icons = {
        stabilityCertificate: FileSignature,
        structuralDesign: FileText,
        approvedDrawings: Building2,
        materialCertificates: FileCheck,
        inspectionReport: FileSearch,
        selfDeclaration: User,
        photographs: ImageIcon,
        factoryLicenseProof: FileBadge,
        directorsList: Users,
        ownershipProof: Home,
    }
    return icons[name] || FileText
}

const documentFields: {
    name: keyof StabilityCertificateForm
    label: string
}[] = [
        {
            name: 'stabilityCertificate',
            label: 'Stability Certificate (Form 1A)',
        },
        {
            name: 'structuralDesign',
            label: 'Structural Design & Load Calculations',
        },
        {
            name: 'approvedDrawings',
            label: 'Approved Building Drawings/Layout Plan',
        },
        {
            name: 'materialCertificates',
            label: 'Material Testing/Quality Certificates',
        },
        {
            name: 'inspectionReport',
            label: "Engineer's Inspection/Site Assessment Report",
        },
        {
            name: 'selfDeclaration',
            label: "Owner/Competent Person's Self-Declaration",
        },
        {
            name: 'photographs',
            label: 'Recent Color Photographs of Structural Elements',
        },
        {
            name: 'factoryLicenseProof',
            label: 'Proof of Factory License Application/Renewal',
        },
        {
            name: 'directorsList',
            label: 'List of Directors/Occupiers',
        },
        {
            name: 'ownershipProof',
            label: 'Legal Proof of Building Ownership/Tenancy',
        },
    ]

const StabilityCertificateDetails = () => {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<StabilityCertificateForm>({
        resolver: zodResolver(stabilityCertificateSchema),
    })

    const handleSubmit = async (values: StabilityCertificateForm) => {
        toast({ title: 'Submitted!', description: 'Stability Certificate documents uploaded.' })
        // router.push('/somewhere')
    }

    const renderFileUploadField = (
        name: keyof StabilityCertificateForm,
        label: string,
        required: boolean = true
    ) => {
        const Icon = getIconForDocument(name)
        return (
            <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                <FormField
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                        <FormItem>
                            <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm h-full hover:shadow-md transition-all duration-200">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <Icon className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <h3 className="font-sora font-semibold text-gray-900 text-sm">
                                        {label} {!required && <span className="text-gray-500 text-xs">(Optional)</span>}
                                    </h3>
                                </div>
                                <div className="rounded-lg p-3 transition-colors hover:border-blue-400">
                                    <FileUpload
                                        apiEndpoint="imageUploader"
                                        onChange={field.onChange}
                                        value={field.value || ''}
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
            {/* Decorative elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
            </div>

            <Card className="w-full bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

                <CardHeader className="space-y-4 pb-8">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <ClipboardCheck className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                                Structural Stability Certificate Documents
                            </CardTitle>
                            <p className="text-gray-600 text-sm mt-1">
                                Please upload the following documents for structural stability certification
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                                <div className="flex flex-wrap -mx-2">
                                    {documentFields.map((doc) =>
                                        renderFileUploadField(doc.name, doc.label)
                                    )}
                                </div>
                            </div>
                            <div className="pt-8 flex justify-end">
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                                >
                                    Save Stability Certificate Documents
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default StabilityCertificateDetails