import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ClipboardCheck, UploadCloud } from "lucide-react";
import FileUpload from "../file-upload";

const planApprovalFields = [
    {
        name: "applicationForm",
        label: "Application Form for Plan Approval",
        required: true,
    },
    {
        name: "siteLayout",
        label: "Site Layout/Plant Layout Plan",
        required: true,
    },
    {
        name: "buildingPlan", 
        label: "Building Construction Plan",
        required: true,
    },
    {
        name: "machineryLayout",
        label: "Machinery Layout Plan",
        required: true,
    },
    {
        name: "structuralDrawings",
        label: "Structural Drawings and Details", 
        required: true,
    },
    {
        name: "ventilationPlan",
        label: "Ventilation and Lighting Plan",
        required: true,
    },
    {
        name: "safetyMeasures",
        label: "Safety Measures and Fire Protection Plan",
        required: true,
    },
    {
        name: "landOwnership",
        label: "Land Ownership Documents",
        required: true,
    },
    {
        name: "soilTest",
        label: "Soil Test Report",
        required: false,
    },
    {
        name: "environmentClearance", 
        label: "Environmental Clearance (if applicable)",
        required: false,
    },
    {
        name: "nabh1approval",
        label: "NABH-1 Approval (if applicable)",
        required: false,
    },
    {
        name: "otherDocuments",
        label: "Other Supporting Documents",
        required: false,
    },
];

const PlanApprovalForm = () => {
    const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

    const handleFileChange = (name: string, url?: string) => {
        setUploadedFiles((prev) => ({ ...prev, [name]: url || "" }));
    };

    const handleSave = () => {
        // Save logic here (API call, validation, etc.)
        console.log("Plan Approval documents:", uploadedFiles);
        alert("Plan Approval documents saved successfully!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
            {/* Decorative elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

                <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <ClipboardCheck className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                                Plan Approval - Document Upload
                            </CardTitle>
                            <p className="text-gray-600 text-sm mt-1">
                                Please upload the following documents required for Factory Plan Approval under Factory Act
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Required Documents Checklist:</h3>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm">
                            {planApprovalFields.map((doc) => (
                                <li key={doc.name}>
                                    {doc.label}{" "}
                                    {doc.required ? (
                                        <span className="text-red-500 font-medium">(Required)</span>
                                    ) : (
                                        <span className="text-gray-500 text-xs">(Optional)</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-wrap -mx-2">
                        {planApprovalFields.map((doc) => (
                            <div key={doc.name} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                                <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 shadow-sm h-full hover:shadow-md transition-all duration-200">
                                    <div className="flex items-center space-x-2 mb-3">
                                        <UploadCloud className="h-4 w-4 text-blue-600" />
                                        <h3 className="font-sora font-semibold text-gray-900 text-sm">
                                            {doc.label}{" "}
                                            {!doc.required && (
                                                <span className="text-gray-500 text-xs">(Optional)</span>
                                            )}
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
                            Save Plan Approval Documents
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PlanApprovalForm;