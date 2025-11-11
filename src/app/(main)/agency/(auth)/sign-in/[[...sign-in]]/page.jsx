'use client'
import { SignIn } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Shield, FileText, Users, Menu, X, Building2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic';

const SignInPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);

  return (
    <div className="min-h-screen bg-white w-full font-['Inter',sans-serif] antialiased">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">3SM Tech</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-all duration-200">Features</a>
              <a href="#security" className="text-gray-600 hover:text-gray-900 transition-all duration-200">Security</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-all duration-200">How it Works</a>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/agency/sign-up" className="text-gray-600 hover:text-gray-900 transition-all duration-200 font-medium">
                Sign Up
              </Link>
              <button 
                onClick={() => setShowSignInForm(true)}
                className="bg-lime-400 text-gray-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-lime-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Log In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-all duration-200">Features</a>
                <a href="#security" className="text-gray-600 hover:text-gray-900 transition-all duration-200">Security</a>
                <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-all duration-200">How it Works</a>
                <Link href="/agency/sign-up" className="text-gray-600 hover:text-gray-900 transition-all duration-200 font-medium">
                  Sign Up
                </Link>
                <button 
                  onClick={() => setShowSignInForm(true)}
                  className="bg-lime-400 text-gray-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-lime-300 transition-all duration-200"
                >
                  Log In
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        {/* Subtle Abstract Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome back to your workspace
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Continue managing your industrial compliance documentation with ease and security.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setShowSignInForm(true)}
              className="bg-lime-400 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-lime-300 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
            <Link href="/agency/sign-up">
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                Create Account
              </button>
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="mt-16">
            <Image 
              src="https://placehold.co/1000x600/E0E7FF/3730A3?text=3SM+Tech+Dashboard&font=roboto" 
              alt="Dashboard Screenshot"
              className="rounded-2xl shadow-2xl w-full"
              width={1000}
              height={600}
              priority
            />
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 uppercase tracking-wide font-semibold mb-8">
            Trusted by the world&apos;s most innovative teams
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[1,2,3,4,5,6].map(i => (
              <Image 
                key={i}
                src={`https://placehold.co/150x50/F0F0F0/AAA?text=Company+${i}`}
                alt={`Company ${i}`}
                className="h-10 grayscale opacity-60 hover:opacity-100 transition-all duration-200"
                width={150}
                height={50}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Feature Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything you need, right at your fingertips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Access</h3>
              <p className="text-gray-600 text-sm">Bank-level security protection</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Smart Documents</h3>
              <p className="text-gray-600 text-sm">Intelligent organization system</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Team Collaboration</h3>
              <p className="text-gray-600 text-sm">Work together seamlessly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-all duration-200">Features</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Security</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-all duration-200">About</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-all duration-200">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-all duration-200">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">3SM Tech</span>
            </div>
            <p className="text-sm">© 2025 3SM Tech Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sign In Modal */}
      {showSignInForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                <button 
                  onClick={() => setShowSignInForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-all duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <SignIn
                forceRedirectUrl="/"
                signUpUrl="/agency/sign-up"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-transparent shadow-none border-none p-0",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    formFieldLabel: "text-gray-700 font-semibold text-sm mb-2",
                    formFieldInput: "w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                    formButtonPrimary: "w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200",
                    socialButtonsBlockButton: "w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 font-medium shadow-sm hover:shadow-md transition-all duration-200",
                    footerActionLink: "text-blue-600 hover:text-blue-700 font-semibold",
                    formFieldAction: "text-blue-600 hover:text-blue-700 font-medium",
                    footer: "hidden",
                    footerAction: "hidden",
                    footerActionText: "hidden"
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default SignInPage;
