import { SignIn } from '@clerk/nextjs'
import React from 'react'
import { Building2, Shield, ArrowRight, CheckCircle, Users, FileCheck } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export const dynamic = 'force-dynamic';

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section - Matching Homepage Design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Header - Matching Homepage Style */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center mb-8">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <Building2 className="h-10 w-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                3SM TECH
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Industrial Documentation Platform
            </p>
            
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Sign in to access your industrial compliance dashboard and manage your documentation with confidence.
            </p>
          </div>

          {/* Sign In Form Container - Matching Card Design */}
          <div className="max-w-md mx-auto mb-16">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-lg">
              <CardContent className="p-8">
                {/* Welcome Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to access your dashboard</p>
                </div>

                {/* Access Information Card - Matching Feature Card Style */}
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 mb-6">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl mr-3">
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="font-bold text-blue-900">Access Information</h3>
                    </div>
                    <p className="text-blue-700 text-sm mb-3">
                      Both admin and user accounts use the same login. Your access level is determined by your role in the system.
                    </p>
                    <ul className="space-y-1">
                      <li className="flex items-center text-blue-700">
                        <CheckCircle className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-xs">Secure authentication</span>
                      </li>
                      <li className="flex items-center text-blue-700">
                        <CheckCircle className="h-3 w-3 text-blue-500 mr-2 flex-shrink-0" />
                        <span className="text-xs">Role-based access</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Sign In Form - Simplified and Clean */}
                <SignIn 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-none p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      formFieldLabel: "text-gray-700 font-semibold text-sm mb-2",
                      formFieldInput: "w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200",
                      formButtonPrimary: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300",
                      socialButtonsBlockButton: "w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 font-medium shadow-sm hover:shadow-md transition-all duration-200",
                      footerActionLink: "text-blue-600 hover:text-blue-700 font-semibold",
                      formFieldAction: "text-blue-600 hover:text-blue-700 font-medium",
                      footer: "hidden",
                      footerAction: "hidden",
                      footerActionText: "hidden"
                    }
                  }}
                />

                {/* Testing Link */}
                <div className="mt-6 text-center">
                  <a 
                    href="/test-admin" 
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Need to test admin features?
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section - Matching Homepage Design Pattern */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for industrial compliance and documentation management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl w-fit mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Secure Document Management</h3>
                <p className="text-gray-600 mb-6">Bank-level security for all your industrial documents</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">End-to-end encryption</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Automated backups</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl w-fit mb-6">
                  <FileCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Compliance Tracking</h3>
                <p className="text-gray-600 mb-6">Stay compliant with automated tracking and alerts</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Real-time monitoring</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Compliance reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl w-fit mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Support</h3>
                <p className="text-gray-600 mb-6">Get guidance from industrial compliance experts</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">24/7 support</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">Expert consultation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500">
              © 2025 3SM Tech. Industrial Documentation Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
};

export default SignInPage;