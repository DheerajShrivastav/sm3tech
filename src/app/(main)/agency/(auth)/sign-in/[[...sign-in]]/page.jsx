import { SignIn } from '@clerk/nextjs'
import React from 'react'
import { Building2, Shield, ArrowRight, CheckCircle, Users, FileCheck } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export const dynamic = 'force-dynamic';

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section - Compact Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header - Compact Style */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                3SM TECH
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-2">
              Industrial Documentation Platform
            </p>
            
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Sign in to access your industrial compliance dashboard
            </p>
          </div>

          {/* Main Content Grid - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Sign In Form Container */}
            <div className="max-w-md mx-auto lg:mx-0">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-lg">
              <CardContent className="p-6">
                {/* Welcome Header - Clean */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                  <p className="text-gray-600 text-sm">Sign in to access your dashboard</p>
                </div>

                {/* Access Information Card - Clean Design */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg flex-shrink-0">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-blue-900 text-sm mb-2">Access Information</h3>
                      <p className="text-blue-800 text-xs mb-3 leading-relaxed">
                        Both admin and user accounts use the same login. Your access level is determined by your role.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-blue-600 mr-1.5 flex-shrink-0" />
                          <span className="text-xs text-blue-700">Secure authentication</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-blue-600 mr-1.5 flex-shrink-0" />
                          <span className="text-xs text-blue-700">Role-based access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sign In Form - Clean Design */}
                <div className="space-y-4">
                  <SignIn 
                    appearance={{
                      elements: {
                        // Container & Layout
                        rootBox: "w-full",
                        card: "bg-transparent shadow-none border-none p-0",
                        
                        // Hide Default Headers
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                        
                        // Social Login Buttons
                        socialButtons: "w-full mb-4",
                        socialButtonsBlockButton: `
                          w-full bg-white border border-gray-300 text-gray-700 
                          hover:bg-gray-50 rounded-xl py-3 px-4 font-medium 
                          shadow-sm hover:shadow-md transition-all duration-200 mb-3
                        `,
                        socialButtonsBlockButtonText: "font-medium text-gray-700",
                        
                        // Form Divider
                        dividerLine: "bg-gray-300",
                        dividerText: "text-gray-500 text-sm",
                        
                        // Form Fields
                        formFieldRow: "mb-4 flex flex-col items-center",
                        formFieldLabel: "text-center  font-semibold text-sm mb-2 w-full",
                        formFieldInput: `
                          w-full bg-gray-50 border border-gray-300 rounded-xl
                          py-3 px-4 text-left text-gray-900 placeholder:text-gray-500
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          transition-all duration-200 text-sm
                        `,
                        
                        // Primary Submit Button
                        formButtonPrimary: `
                          w-full bg-gradient-to-r from-blue-600 to-indigo-600 
                          hover:from-blue-700 hover:to-indigo-700 text-white font-semibold 
                          py-3 px-6 rounded-xl shadow-lg hover:shadow-xl 
                          transition-all duration-300 mt-4
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
                </div>

                {/* Testing Link - Clean */}
                <div className="mt-4 pt-4 border-t border-gray-200 text-center">
                  <a 
                    href="/test-admin" 
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Need to test admin features?
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
            </div>

            {/* Features Section - Compact Grid */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Why Choose Our Platform?
                </h2>
                <p className="text-gray-600">
                  Built for industrial compliance and documentation
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Document Management</h3>
                        <p className="text-gray-600 text-sm mb-3">Bank-level security for all your industrial documents</p>
                        <ul className="space-y-1">
                          <li className="flex items-center text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">End-to-end encryption</span>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">Automated backups</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl">
                        <FileCheck className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Compliance Tracking</h3>
                        <p className="text-gray-600 text-sm mb-3">Stay compliant with automated tracking and alerts</p>
                        <ul className="space-y-1">
                          <li className="flex items-center text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">Real-time monitoring</span>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">Compliance reports</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Support</h3>
                        <p className="text-gray-600 text-sm mb-3">Get guidance from industrial compliance experts</p>
                        <ul className="space-y-1">
                          <li className="flex items-center text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">24/7 support</span>
                          </li>
                          <li className="flex items-center text-gray-600">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-xs">Expert consultation</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2025 3SM Tech. Industrial Documentation Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
};

export default SignInPage;