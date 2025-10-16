import { SignIn } from '@clerk/nextjs'
import React from 'react'

export const dynamic = 'force-dynamic'; // Enforce dynamic rendering

const SignInPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* Left Panel - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/10 rounded-full"></div>
            <div className="absolute top-1/3 right-10 w-24 h-24 bg-white/10 rounded-lg transform rotate-45"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                3SM TECH
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Industrial Documentation Platform
              </p>
              <p className="text-lg text-blue-200 leading-relaxed">
                Streamline your industrial compliance and documentation processes with our comprehensive digital solution.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Secure Document Management</h3>
                  <p className="text-blue-200">Bank-level security for all your industrial documents</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm9-1a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Compliance Tracking</h3>
                  <p className="text-blue-200">Stay compliant with automated tracking and alerts</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Expert Support</h3>
                  <p className="text-blue-200">Get guidance from industrial compliance experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Authentication Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                3SM TECH
              </h1>
              <p className="text-gray-600">Industrial Documentation Platform</p>
            </div>
            
            {/* Form Container */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to access your dashboard</p>
                
                {/* Login Type Indicator */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Both admin and user accounts use the same login. 
                    Your access level is determined by your role in the system.
                  </p>
                </div>
                
                {/* Development Testing Link */}
                <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong>🧪 Development Mode:</strong> Testing admin features?
                  </p>
                  <a 
                    href="/test-admin" 
                    className="text-yellow-700 hover:text-yellow-900 underline text-sm font-medium"
                  >
                    → Go to Admin Test Page
                  </a>
                </div>
              </div>

              {/* Clerk Sign In Component */}
              <SignIn
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'bg-transparent shadow-none border-none p-0',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtonsBlockButton: 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all duration-200 rounded-xl py-3 font-medium shadow-sm hover:shadow-md',
                    socialButtonsBlockButtonText: 'text-gray-700 font-medium',
                    dividerLine: 'bg-gray-200',
                    dividerText: 'text-gray-500 font-medium',
                    formFieldLabel: 'text-gray-700 font-semibold text-sm',
                    formFieldInput: 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl py-3 px-4 transition-all duration-200',
                    formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
                    footerActionLink: 'text-blue-600 hover:text-blue-700 font-semibold transition-colors',
                    identityPreviewEditButton: 'text-blue-600 hover:text-blue-700',
                    formFieldAction: 'text-blue-600 hover:text-blue-700 font-medium',
                    otpCodeFieldInput: 'bg-gray-50 border border-gray-200 text-gray-900 rounded-lg',
                    formFieldWarningText: 'text-red-500',
                    alertClerkError: 'text-red-600 bg-red-50 border border-red-200 rounded-lg',
                    footer: 'hidden',
                    footerAction: 'hidden',
                    footerActionText: 'hidden'
                  }
                }}
              />
              
              {/* Footer */}
              <div className="mt-8 text-center space-y-2">
                <p className="text-gray-500 text-sm">
                  Powering Industrial Excellence
                </p>
                <p className="text-gray-400 text-xs">
                  © 2024 3SM Tech Solutions. All rights reserved.
                </p>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-8 flex justify-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SignInPage;
