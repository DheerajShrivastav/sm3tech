"use client";
import React from 'react';
import { FileText, Shield, FolderOpen, Zap, Users, ChartBar, Settings, Clock } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { useClerk } from '@clerk/clerk-react';
import Header from './header';

const DashboardHome = () => {
  const { user } = useClerk();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 lg:pl-[288px]">
      <Header/>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          {/* Welcome Text with Enhanced Styling */}
          <div className="mb-8 lg:mb-0 relative">
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <h1 className="font-sora text-5xl font-bold mb-6 relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-800 to-indigo-700">
                Welcome to
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                3SM Tech
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed relative z-10 
                          bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent">
              Your centralized platform for managing and storing factory documentation with ease and security.
              <span className="block mt-2 text-sm font-semibold text-blue-600">Powering The Industries</span>
            </p>
          </div>

          {/* Factory SVG Illustration */}
          <div className="w-full lg:w-1/2 h-64 lg:h-96 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full opacity-20 animate-pulse filter blur-3xl"></div>
            <svg className="w-full h-full relative z-10" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Factory Building Base */}
              <rect x="200" y="200" width="400" height="300" fill="#2563EB" opacity="0.1"/>
              
              {/* Chimneys */}
              <rect x="250" y="100" width="40" height="100" fill="#1D4ED8" opacity="0.2"/>
              <rect x="450" y="150" width="40" height="50" fill="#1D4ED8" opacity="0.2"/>
              
              {/* Smoke Animation */}
              <circle cx="270" cy="80" r="10" fill="#94A3B8" opacity="0.4">
                <animate attributeName="cy" values="80;40;80" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="470" cy="130" r="8" fill="#94A3B8" opacity="0.4">
                <animate attributeName="cy" values="130;100;130" dur="2.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/>
              </circle>

              {/* Windows with Glow Effect */}
              <rect x="250" y="250" width="50" height="50" fill="#60A5FA" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite"/>
              </rect>
              <rect x="350" y="250" width="50" height="50" fill="#60A5FA" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3.5s" repeatCount="indefinite"/>
              </rect>
              <rect x="450" y="250" width="50" height="50" fill="#60A5FA" opacity="0.3">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4.5s" repeatCount="indefinite"/>
              </rect>

              {/* Rotating Gears */}
              <path d="M650,300 A50,50 0 1,1 649.9,300" stroke="#3B82F6" strokeWidth="8" fill="none">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 650 300"
                  to="360 650 300"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 cursor-pointer border-none backdrop-blur-sm hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg shadow-md">
                  <FileText className="h-6 w-6 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sora text-lg font-semibold text-gray-900">Upload Documents</h3>
                  <p className="text-gray-600">Store documentation</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 cursor-pointer border-none backdrop-blur-sm hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg shadow-md">
                  <FolderOpen className="h-6 w-6 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sora text-lg font-semibold text-gray-900">View Archives</h3>
                  <p className="text-gray-600">Access files</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 cursor-pointer border-none backdrop-blur-sm hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg shadow-md">
                  <Users className="h-6 w-6 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sora text-lg font-semibold text-gray-900">Team Access</h3>
                  <p className="text-gray-600">Manage users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-xl transition-all duration-300 cursor-pointer border-none backdrop-blur-sm hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-lg shadow-md">
                  <ChartBar className="h-6 w-6 text-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sora text-lg font-semibold text-gray-900">Analytics</h3>
                  <p className="text-gray-600">View insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="bg-white/80 rounded-xl p-8 shadow-lg backdrop-blur-md border border-blue-100 mb-12">
          <h2 className="font-sora text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Why Choose 3smTech?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 hover:bg-blue-50/50 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="font-sora text-lg font-semibold text-gray-900 mb-2 text-center">Secure Storage</h3>
              <p className="text-gray-600 text-center">Your documents are encrypted and safely stored in our secure servers</p>
            </div>

            <div className="p-6 hover:bg-blue-50/50 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <FolderOpen className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="font-sora text-lg font-semibold text-gray-900 mb-2 text-center">Easy Organization</h3>
              <p className="text-gray-600 text-center">Efficiently organize and categorize your factory documentation</p>
            </div>

            <div className="p-6 hover:bg-blue-50/50 rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <Zap className="h-8 w-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="font-sora text-lg font-semibold text-gray-900 mb-2 text-center">Quick Access</h3>
              <p className="text-gray-600 text-center">Instantly access your documents whenever you need them</p>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl shadow-lg">
            <h3 className="font-sora text-2xl font-bold text-gray-900 mb-4">Real-time Collaboration</h3>
            <p className="text-gray-600 mb-6">Work together with your team in real-time. Share documents, leave comments, and track changes efficiently.</p>
            <div className="flex items-center text-blue-600">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-medium">Multiple team members</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl shadow-lg">
            <h3 className="font-sora text-2xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
            <p className="text-gray-600 mb-6">Get detailed insights into document usage, team activity, and storage patterns.</p>
            <div className="flex items-center text-green-600">
              <ChartBar className="h-5 w-5 mr-2" />
              <span className="font-medium">Data-driven decisions</span>
            </div>
          </div>
        </div>

        {/* System Status Section */}
        <div className="bg-white/80 rounded-xl p-8 shadow-lg backdrop-blur-md border border-blue-100">
          <h2 className="font-sora text-2xl font-bold text-gray-900 mb-6">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-green-500" />
              <span className="text-gray-600">100% Uptime</span>
            </div>
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-blue-500" />
              <span className="text-gray-600">Automated Backups</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-purple-500" />
              <span className="text-gray-600">Enterprise Security</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
