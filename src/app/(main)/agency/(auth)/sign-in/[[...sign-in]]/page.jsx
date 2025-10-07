import { SignIn } from '@clerk/nextjs';
import React from 'react';

export const dynamic = 'force-dynamic'; // Enforce dynamic rendering

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -left-10 top-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-10 bottom-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-100/20 rounded-full blur-2xl" />
      </div>

      {/* Main container */}
      <div className="w-full max-w-md relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-sora bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent mb-2">
            3SM TECH
          </h1>
          <p className="text-gray-600 text-lg font-medium">
            Secure Document Management Platform
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to access your industrial documentation
          </p>
        </div>

        {/* Sign-in component with custom styling */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8 relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-bl-full" />
          
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none bg-transparent border-none",
                headerTitle: "text-2xl font-sora font-bold text-gray-800",
                headerSubtitle: "text-gray-600",
                socialButtonsBlockButton: "bg-white border-gray-200 hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200",
                socialButtonsBlockButtonText: "font-medium",
                dividerLine: "bg-gray-200",
                dividerText: "text-gray-500 font-medium",
                formFieldInput: "border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg",
                formButtonPrimary: "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
                formFieldLabel: "text-gray-700 font-medium",
                identityPreviewText: "text-gray-600",
                identityPreviewEditButton: "text-blue-600 hover:text-blue-700",
                footerActionLink: "text-blue-600 hover:text-blue-700 font-medium"
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Powering Industrial Excellence</p>
          <p className="mt-1">© 2024 3SM Tech Solutions. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
