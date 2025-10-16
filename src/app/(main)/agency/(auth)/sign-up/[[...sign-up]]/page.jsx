import { SignUp } from '@clerk/nextjs'
import React from 'react'

export const dynamic = 'force-dynamic';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* Left Panel - Branding & Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 border border-white/10 rounded-full"></div>
            <div className="absolute top-1/3 left-10 w-24 h-24 bg-white/10 rounded-lg transform rotate-45"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center p-12 text-white">
            <div className="mb-12">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                3SM TECH
              </h1>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                Industrial Documentation Platform
              </p>
              <p className="text-lg text-purple-200 leading-relaxed">
                Join thousands of professionals who trust us with their industrial compliance and documentation needs.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-.257-.257A6 6 0 1118 8zM10 2a1 1 0 011 1v4a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Quick Setup</h3>
                  <p className="text-purple-200">Get started in minutes with our intuitive onboarding</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Real-time Collaboration</h3>
                  <p className="text-purple-200">Work seamlessly with your team and stakeholders</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Verified & Trusted</h3>
                  <p className="text-purple-200">ISO certified platform with enterprise-grade security</p>
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
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                3SM TECH
              </h1>
              <p className="text-gray-600">Industrial Documentation Platform</p>
            </div>
            
            {/* Form Container */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500"></div>
              
              {/* Form Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join us to streamline your documentation process</p>
                
                {/* Account Type Info */}
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>New users:</strong> You&apos;ll start with standard user access. 
                    Contact admin for elevated permissions if needed.
                  </p>
                </div>
              </div>

              {/* Clerk Sign Up Component */}
              <SignUp
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
                    formFieldInput: 'bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-xl py-3 px-4 transition-all duration-200',
                    formButtonPrimary: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
                    footerActionLink: 'text-purple-600 hover:text-purple-700 font-semibold transition-colors',
                    identityPreviewEditButton: 'text-purple-600 hover:text-purple-700',
                    formFieldAction: 'text-purple-600 hover:text-purple-700 font-medium',
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
                <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
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

export default SignUpPage;
