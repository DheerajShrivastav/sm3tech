 import { SignUp } from '@clerk/nextjs'
import React from 'react'
import { Building2, Shield, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-white w-full">
      {/* Hero Section matching your homepage */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header matching your homepage */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center mb-6">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                3SM TECH
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-2">
              Industrial Documentation Platform
            </p>
            
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Create your account to access industrial compliance tools
            </p>
          </div>

          {/* Sign Up Form Container */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Welcome Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h2>
                <p className="text-gray-600">Create your account to access the platform</p>
              </div>

              {/* Access Information Card */}
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-900">New User Information</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  All new accounts start with User access. Admin privileges are granted by existing administrators.
                </p>
              </div>

              {/* Clerk Sign Up Component - Simple Styling */}
              <div className="clerk-signup-wrapper">
                <SignUp
                  forceRedirectUrl="/"
                  signInUrl="/agency/sign-in"
                  appearance={{
                    elements: {
                      // Basic container styling
                      rootBox: "w-full",
                      card: "bg-transparent shadow-none border-none p-0",
                      
                      // Hide default headers since we have our own
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      
                      // Style the form inputs to match our design
                      formFieldLabel: "text-gray-700 font-semibold text-sm mb-2",
                      formFieldInput: "w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                      
                      // Style the main sign-up button
                      formButtonPrimary: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200",
                      
                      // Style Google/social login buttons
                      socialButtonsBlockButton: "w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 font-medium shadow-sm hover:shadow-md transition-all duration-200",
                      
                      // Style links and small elements
                      footerActionLink: "text-blue-600 hover:text-blue-700 font-semibold",
                      formFieldAction: "text-blue-600 hover:text-blue-700 font-medium",
                      
                      // Hide footer elements we don't want
                      footer: "hidden",
                      footerAction: "hidden",
                      footerActionText: "hidden"
                    }
                  }}
                />
              </div>

              {/* Testing Link for Development */}
              <div className="mt-6 text-center">
                <a 
                  href="/test-admin" 
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Need to test admin features?
                  <ArrowRight className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-100">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600 text-sm">Bank-level security for your documents</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-100">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl w-fit mx-auto mb-4">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Compliant</h3>
              <p className="text-gray-600 text-sm">Stay compliant with regulations</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-100">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl w-fit mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Efficient</h3>
              <p className="text-gray-600 text-sm">Streamlined documentation process</p>
            </div>
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

export default SignUpPage;
