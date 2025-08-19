import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Youtube, BookOpen, Image as ImageIcon, Link as LinkIcon, FileText, ClipboardCheck, UploadCloud } from "lucide-react";
import FileUpload from "../file-upload";

const trainingResources = [
    {
        type: "link",
        label: "Calibration Training PDF",
        url: "/docs/calibration-training.pdf",
        icon: <BookOpen className="h-5 w-5 text-blue-600" />,
    },
    {
        type: "link",
        label: "Equipment Manual",
        url: "/docs/equipment-manual.pdf",
        icon: <BookOpen className="h-5 w-5 text-blue-600" />,
    },
    {
        type: "image",
        label: "Calibration Setup Photo",
        url: "/images/calibration-setup.jpg",
        icon: <ImageIcon className="h-5 w-5 text-blue-600" />,
    },
    {
        type: "link",
        label: "External Resource",
        url: "https://www.iso.org/isoiec-17025-testing-and-calibration-laboratories.html",
        icon: <LinkIcon className="h-5 w-5 text-blue-600" />,
    },
];

const defaultVideo = "https://www.youtube.com/embed/6zAqF6QwO4g";

const documentFields = [
    {
        name: "calibrationCertificate",
        label: "Latest Calibration Certificate (issued by accredited lab)",
        required: true,
    },
    {
        name: "testReport",
        label: "Test Report (if applicable)",
        required: false,
    },
    {
        name: "traceabilityCertificate",
        label: "Traceability Certificate to standards",
        required: true,
    },
    {
        name: "inventoryRecord",
        label: "Inventory/Equipment Record",
        required: true,
    },
    {
        name: "maintenanceLog",
        label: "Equipment Maintenance Log",
        required: false,
    },
    {
        name: "sop",
        label: "SOPs for Testing and Calibration (optional)",
        required: false,
    },
    {
        name: "nonConformanceReport",
        label: "Non-conformance or Deviation Report (if any)",
        required: false,
    },
];

const TestingCalibration = () => {
    const [videoUrl] = useState(defaultVideo);
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

    const handleFileChange = (name: string, url?: string) => {
        setUploadedFiles((prev) => ({ ...prev, [name]: url || "" }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
            {/* Decorative elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden mb-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

                <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <ClipboardCheck className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                                Testing & Calibration: Document Upload
                            </CardTitle>
                            <p className="text-gray-600 text-sm mt-1">
                                Please upload the following documents for each piece of test and measurement equipment:
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-6">
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm">
                            <li>Latest Calibration Certificate (issued by accredited lab)</li>
                            <li>Test Report (if applicable)</li>
                            <li>Traceability Certificate to standards</li>
                            <li>Inventory/equipment record</li>
                            <li>Equipment maintenance log</li>
                            <li>SOPs for testing and calibration (optional)</li>
                            <li>Non-conformance or deviation report (if any)</li>
                        </ul>
                        <p className="mt-4 text-xs text-gray-500">
                            All certificates and reports must be signed, dated, and show clear traceability. Keep digital copies for each instrument for audit purposes.
                        </p>
                    </div>
                    <div className="flex flex-wrap -mx-2">
                        {documentFields.map((doc) => (
                            <div key={doc.name} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                                <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm h-full hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <UploadCloud className="h-4 w-4 text-blue-600" />
                                        <h3 className="font-sora font-semibold text-gray-900 text-sm">
                                            {doc.label} {!doc.required && <span className="text-gray-500 text-xs">(Optional)</span>}
                                        </h3>
                                    </div>
                                    <div className="rounded-lg p-3 transition-colors hover:border-blue-400">
                                        <FileUpload
                                            apiEndpoint="pdfUploader"
                                            onChange={(url?: string) => handleFileChange(doc.name, url)}
                                            value={uploadedFiles[doc.name] || ""}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

                <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Youtube className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                                Video Training & Resources
                            </CardTitle>
                            <p className="text-gray-600 text-sm mt-1">
                                Access training videos and resources for calibration procedures.
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Video Training Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center">
                            <div className="flex items-center space-x-2 mb-3">
                                <Youtube className="h-5 w-5 text-red-600" />
                                <span className="font-sora font-semibold text-gray-900 text-md">
                                    Video Training
                                </span>
                            </div>
                            <div className="w-full aspect-video rounded-lg overflow-hidden mb-2 border border-blue-200 shadow">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={videoUrl}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Training Resources Card */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex items-center space-x-2 mb-3">
                                <BookOpen className="h-5 w-5 text-green-600" />
                                <span className="font-sora font-semibold text-gray-900 text-md">
                                    Training Resources
                                </span>
                            </div>
                            <ul className="space-y-4">
                                {trainingResources.map((res, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        {res.icon}
                                        <a
                                            href={res.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 hover:underline font-medium"
                                        >
                                            {res.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TestingCalibration;