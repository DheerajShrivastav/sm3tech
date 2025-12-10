'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import FileUpload from "../file-upload";
import { FileText, Download, UploadCloud } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { initUser, getUser, upsertSafetyAuditReport } from "@/lib/queries";

const AUDIT_REPORT_URL = "/docs/Audit reports_Ultimate.docx"; // Place your docx file in public/docs/

interface SafetyAuditReportProps {
  data?: any;
}

const SafetyAuditReport: React.FC<SafetyAuditReportProps> = ({ data }) => {
  const [uploadedFile, setUploadedFile] = useState<string>(data?.auditReport || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // Validation
      if (!uploadedFile) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: "Please upload the completed audit report PDF before submitting.",
        });
        return;
      }

      setIsSubmitting(true);

      // Initialize user
      await initUser({});

      // Get current user
      const currentUser = await getUser();

      if (!currentUser) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "User not found. Please login again.",
        });
        return;
      }

      // Prepare safety audit report data
      const safetyAuditReportData: any = {
        user: currentUser._id,
        auditReport: uploadedFile,
      };

      // Only add _id if updating existing document
      if (data?._id) {
        safetyAuditReportData._id = data._id;
      }

      // Upsert to database
      const response = await upsertSafetyAuditReport(safetyAuditReportData);

      console.log('Safety Audit Report saved:', response);

      // Show success toast
      toast({
        title: "Success",
        description: "Safety Audit Report saved successfully!",
      });

      // Redirect to inspection view
      router.push('/inspection-view');
    } catch (error) {
      console.error('Error submitting safety audit report:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save Safety Audit Report. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <span className="font-medium text-gray-800">
                  Re-upload Completed Audit Report
                  <span className="text-red-500 ml-1">*</span>
                </span>
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

      <div className="pt-8 flex justify-end max-w-2xl mx-auto">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !uploadedFile}
          className="bg-blue-600 hover:bg-blue-700 text-sm text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Safety Audit Report'}
        </Button>
      </div>
    </div>
  );
};

export default SafetyAuditReport;