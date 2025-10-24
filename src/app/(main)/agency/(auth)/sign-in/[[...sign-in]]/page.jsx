import { SignIn } from '@clerk/nextjs'
import React from 'react'
import { Building2, Shield, ArrowRight, CheckCircle, Users, FileCheck } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export const dynamic = 'force-dynamic';

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome Back to 3SM TECH
              </span>
            </h1>
            
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Sign in to access your industrial compliance dashboard
            </p>
          </div>

          {/* Main Content - Centered Card */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              
              {/* Center Sign In Form */}
              <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white">
                <CardContent className="p-6 md:p-8">
                    {/* Welcome Header */}
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
                      <p className="text-gray-600 text-sm">Access your compliance dashboard</p>
                    </div>

                    {/* Sign In Form */}
                    <SignIn 
                    appearance={{
                      elements: {
                        // Container & Layout
                        rootBox: "w-full",
                        card: "bg-transparent shadow-none border-none p-0  ",
                        
                        // Hide Default Headers
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        
                        // Social Login Buttons
                        socialButtons: "w-full mb-3",
                        socialButtonsBlockButton: `
                          w-full bg-white border border-gray-300 text-gray-700 
                          hover:bg-gray-50 rounded-xl py-2.5 px-4 font-medium 
                          shadow-sm hover:shadow-md transition-all duration-200 mb-2
                        `,
                        socialButtonsBlockButtonText: "font-medium text-gray-700",
                        
                        // Form Divider
                        dividerLine: "bg-gray-300",
                        dividerText: "text-gray-500 text-xs",
                        
                        // Form Fields
                        formFieldRow: "mb-3 flex flex-col items-center",
                        formFieldLabel: "text-center font-semibold text-sm mb-1.5 w-full",
                        formFieldInput: `
                          w-full bg-gray-50 border border-gray-300 rounded-xl
                          py-2.5 px-4 text-left text-gray-900 placeholder:text-gray-500
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition-all duration-200 text-sm
                        `,
                        
                        // Primary Submit Button
                        formButtonPrimary: `
                          w-full bg-gradient-to-r from-blue-600 to-indigo-600 
                          hover:from-blue-700 hover:to-indigo-700 text-white font-semibold 
                          py-2.5 px-6 rounded-xl shadow-lg hover:shadow-xl 
                          transition-all duration-300 mt-3
                        `,
                        
                        // Form Links & Actions
                        footerActionLink: "text-blue-600 hover:text-blue-700 font-medium text-sm",
                        formFieldAction: "text-blue-600 hover:text-blue-700 font-medium text-sm",
                        formResendCodeLink: "text-blue-600 hover:text-blue-700 text-sm",
                        
                        // Status Messages
                        formFieldSuccessText: "text-green-600 text-sm",
                        formFieldErrorText: "text-red-600 text-sm",
                        
                        // Hide Unwanted Elements
                        footer: "hidden",
                        footerAction: "hidden",
                        footerActionText: "hidden",
                        identityPreview: "hidden"
                      },
                      layout: {
                        socialButtonsPlacement: "top"
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feature Cards Below Form */}
          <div className="max-w-4xl mx-auto mt-10 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-xl w-fit mx-auto mb-3">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">Secure Access</h3>
                    <p className="text-gray-600 text-xs">Bank-level security for your documents</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-2.5 rounded-xl w-fit mx-auto mb-3">
                      <FileCheck className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">Compliance Tracking</h3>
                    <p className="text-gray-600 text-xs">Real-time monitoring and alerts</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all">
                  <CardContent className="p-4 text-center">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2.5 rounded-xl w-fit mx-auto mb-3">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">Expert Support</h3>
                    <p className="text-gray-600 text-xs">24/7 compliance guidance</p>
                  </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              © 2025 3SM Tech. Industrial Documentation Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
};

export default SignInPage;