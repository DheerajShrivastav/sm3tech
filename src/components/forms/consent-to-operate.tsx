import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ClipboardCheck, UploadCloud } from "lucide-react";
import FileUpload from "../file-upload";
import { Button } from "../ui/button";

const documentFields = [
    { name: "applicationForm", label: "Application Form (for CTO)", required: true },
    { name: "cteCopy", label: "Copy of Consent to Establish already granted", required: true },
    { name: "plantLayout", label: "Latest Plant Layout as Commissioned", required: true },
    { name: "productionDetails", label: "Details of Production Capacity, Products & By-products, and Raw Materials", required: true },
    { name: "envMonitoringReports", label: "Environmental Monitoring Reports (air, water, noise analysis)", required: true },
    { name: "cteComplianceReport", label: "Compliance Report to CTE Conditions", required: true },
    { name: "etpStpRecords", label: "ETP/STP Operation & Maintenance Records", required: true },
    { name: "wasteDisposal", label: "Hazardous and Non-hazardous Waste Disposal Arrangements", required: true },
    { name: "hazardousWasteAuth", label: "Authorization for Handling Hazardous Waste (if any)", required: false },
    { name: "waterBalance", label: "Water Balance and Wastewater Management Plan", required: true },
    { name: "airPollutionControl", label: "Details of Air Pollution Control Equipment", required: true },
    { name: "membershipCertificates", label: "Membership Certificates of CETP/CHWTSDF (if applicable)", required: false },
    { name: "storageDetails", label: "Details of Chemicals, Fuels, and Raw Materials Storage", required: true },
    { name: "fireSafety", label: "Fire Safety Certificate/Plan (if applicable)", required: false },
    { name: "renewalDocs", label: "Renewal Documents as per Last Consent (if renewal is sought)", required: false },
];

const ConsentToOperate = () => {
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

    const handleFileChange = (name: string, url?: string) => {
        setUploadedFiles((prev) => ({ ...prev, [name]: url || "" }));
    };

    const handleSave = () => {
        // Save logic here (API call, validation, etc.)
        alert("Documents saved successfully!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
            {/* Decorative elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

                <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <ClipboardCheck className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                                Consent to Operate (CTO) – Document Upload
                            </CardTitle>
                            <p className="text-gray-600 text-sm mt-1">
                                Please upload the following documents required for Consent to Operate (CTO) application.
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-6">
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm">
                            {documentFields.map((doc) => (
                                <li key={doc.name}>
                                    {doc.label} {doc.required ? "" : <span className="text-gray-500 text-xs">(Optional)</span>}
                                </li>
                            ))}
                        </ul>
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
                    <div className="pt-8 flex justify-end">
                        <Button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                            onClick={handleSave}
                        >
                            Save Documents
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ConsentToOperate;