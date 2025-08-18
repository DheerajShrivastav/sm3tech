import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import FileUpload from "../file-upload";
import { FileText, Download, UploadCloud } from "lucide-react";

const AUDIT_REPORT_URL = "/docs/Audit reports_Ultimate.docx"; // Place your docx file in public/docs/

const SafetyAuditReport = () => {
    const [uploadedFile, setUploadedFile] = useState<string>("");

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
            {/* Decorative elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
            </div>

            <Card className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

                <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center space-x-3">
                        <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold font-sora text-gray-900">
                                Safety Audit Report
                            </CardTitle>
                            <p className="text-gray-600 text-sm mt-1">
                                Download, review, and re-upload your completed safety audit report.
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col items-center gap-6 py-6">
                        {/* Download Button */}
                        <a
                            href={AUDIT_REPORT_URL}
                            download
                            className="w-full"
                        >
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 font-semibold rounded-lg shadow transition-all"
                            >
                                <Download className="h-5 w-5" />
                                Download Audit Report Template
                            </Button>
                        </a>

                        {/* Divider */}
                        <div className="w-full border-t border-blue-100 my-4"></div>

                        {/* Re-upload Section */}
                        <div className="w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <UploadCloud className="h-5 w-5 text-blue-600" />
                                <span className="font-medium text-gray-800">Re-upload Completed Audit Report</span>
                            </div>
                            <FileUpload
                                apiEndpoint="pdfUploader"
                                onChange={(url?: string) => setUploadedFile(url ?? "")}
                                value={uploadedFile}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SafetyAuditReport;