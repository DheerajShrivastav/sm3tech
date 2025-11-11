'use client'
import { SignUp } from '@clerk/nextjs'
import React, { useState } from 'react'
import { Shield, Search, Users, Menu, X, ArrowRight, CheckCircle, Zap, Lock, FileText, Building2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic';

const SignUpPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

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
              <Link href="/agency/sign-in" className="text-gray-600 hover:text-gray-900 transition-all duration-200 font-medium">
                Log In
              </Link>
              <button 
                onClick={() => setShowSignUpForm(true)}
                className="bg-lime-400 text-gray-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-lime-300 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Start for Free
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
                <Link href="/agency/sign-in" className="text-gray-600 hover:text-gray-900 transition-all duration-200 font-medium">
                  Log In
                </Link>
                <button 
                  onClick={() => setShowSignUpForm(true)}
                  className="bg-lime-400 text-gray-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-lime-300 transition-all duration-200"
                >
                  Start for Free
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
            Where your team&apos;s best work comes to life
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            3SM Tech is the intelligent, secure, and collaborative document store built for modern industrial teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setShowSignUpForm(true)}
              className="bg-lime-400 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-lime-300 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start for Free
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
              Book a Demo
            </button>
          </div>

          {/* Hero Visual */}
          <div className="mt-16">
            <Image 
              src="https://placehold.co/1000x600/E0E7FF/3730A3?text=3SM+Tech+Platform&font=roboto" 
              alt="Platform Screenshot"
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

      {/* Key Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for industrial compliance and documentation management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Search</h3>
              <p className="text-gray-600 leading-relaxed">
                Find any document instantly with intelligent search that understands context and meaning.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Work together seamlessly with your team on documents, forms, and compliance reports.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bank-Level Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Enterprise-grade encryption and compliance with industry standards to keep your data safe.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Optimized performance ensures instant loading and smooth interactions, no matter the file size.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="bg-teal-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Lock className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Role-Based Access</h3>
              <p className="text-gray-600 leading-relaxed">
                Control who sees what with granular permissions and admin controls for your organization.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Templates</h3>
              <p className="text-gray-600 leading-relaxed">
                Pre-built templates for factory licenses, MPCB compliance, and all your documentation needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Feature Block 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Organize with intelligence
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our AI automatically categorizes and tags your documents, making organization effortless. No more manual filing or lost documents.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-lime-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Automatic document classification</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-lime-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Smart folder suggestions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-lime-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom metadata extraction</span>
                </li>
              </ul>
            </div>
            <div>
              <Image 
                src="https://placehold.co/600x400/c4b5fd/3730a3?text=Smart+Organization&font=roboto" 
                alt="Organization Feature"
                className="rounded-2xl shadow-xl w-full"
                width={600}
                height={400}
              />
            </div>
          </div>

          {/* Feature Block 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Image 
                src="https://placehold.co/600x400/ddd6fe/5b21b6?text=Team+Collaboration&font=roboto" 
                alt="Collaboration Feature"
                className="rounded-2xl shadow-xl w-full"
                width={600}
                height={400}
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Collaborate in real-time
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Work together with your team on compliance reports, factory documentation, and more. See changes as they happen.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-lime-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Live editing and comments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-lime-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Version history tracking</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-lime-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Team notifications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-indigo-600" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Enterprise-grade security
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Your documents are protected with the same security standards used by banks and financial institutions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">256-bit</div>
              <div className="text-gray-600">AES Encryption</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-600">Security Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl">
            <div className="text-center mb-8">
              <Image 
                src="https://placehold.co/80x80/c4b5fd/3730a3?text=JD&font=sans" 
                alt="Jane Doe"
                className="w-20 h-20 rounded-full mx-auto mb-6"
                width={80}
                height={80}
              />
            </div>
            <blockquote className="text-2xl sm:text-3xl font-medium text-gray-900 text-center mb-8 leading-relaxed">
              &quot;3SM Tech has transformed how we manage our industrial compliance documentation. It&apos;s become our single source of truth.&quot;
            </blockquote>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Jane Doe</div>
              <div className="text-gray-600">Head of Compliance, IndustryCorp</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to build your single source of truth?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Get started for free. No credit card required.
          </p>
          <button 
            onClick={() => setShowSignUpForm(true)}
            className="bg-lime-400 text-gray-900 px-10 py-5 rounded-xl font-bold text-lg hover:bg-lime-300 transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center"
          >
            Start for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-all duration-200">Features</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Security</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-all duration-200">About</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-all duration-200">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Guides</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-all duration-200">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-200">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">3SM Tech</span>
            </div>
            <p className="text-sm">© 2025 3SM Tech Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sign Up Modal */}
      {showSignUpForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
                <button 
                  onClick={() => setShowSignUpForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-all duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-blue-900">New User Information</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  All new accounts start with User access. Admin privileges are granted by existing administrators.
                </p>
              </div>

              <SignUp
                forceRedirectUrl="/"
                signInUrl="/agency/sign-in"
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

export default SignUpPage;
