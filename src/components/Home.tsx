"use client";
import React from 'react';
import { 
  FileText, 
  Upload, 
  Users, 
  Box, 
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  HelpCircle
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk } from '@clerk/clerk-react';
import Image from 'next/image';
import SideNav from './side-nav';
import Header from './header';

const DashboardHome = () => {
  const { user, signOut } = useClerk();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50/50 lg:pl-[288px]">
     <Header/>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-sora text-2xl font-bold text-gray-900">Welcome Back, {user?.firstName || "User"}! 👋</h1>
          <p className="mt-1 text-gray-500">Here&apos;s what&apos;s happening with your projects today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 font-sora">Documents</p>
                  <p className="text-3xl font-bold mt-2">1,482</p>
                </div>
                <div className="bg-blue-400/30 p-3 rounded-lg">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-blue-100 text-sm">
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 font-sora">Storage Used</p>
                  <p className="text-3xl font-bold mt-2">684 GB</p>
                </div>
                <div className="bg-purple-400/30 p-3 rounded-lg">
                  <Box className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-purple-100 text-sm">
                85% of total space
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 font-sora">Team Members</p>
                  <p className="text-3xl font-bold mt-2">32</p>
                </div>
                <div className="bg-green-400/30 p-3 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-green-100 text-sm">
                +3 new this week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 font-sora">Projects</p>
                  <p className="text-3xl font-bold mt-2">12</p>
                </div>
                <div className="bg-orange-400/30 p-3 rounded-lg">
                  <Upload className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-orange-100 text-sm">
                4 due this week
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mb-8 bg-slate-50 text-gray-950">
          <CardContent className="p-6">
            <h2 className="font-sora text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sora text-sm font-medium">Project Documentation Updated</p>
                    <p className="text-sm text-gray-500">Modified by David Chen • 2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  <Card className="bg-blue-50">
    <CardContent className="flex items-center p-6">
      <Upload className="h-8 w-8 text-blue-600" />
      <div className="ml-4">
        <h3 className="font-sora text-lg font-semibold text-gray-950">Upload File</h3> {/* Changed text color */}
        <p className="text-sm text-gray-950">Quickly upload documents to your account.</p> {/* Changed text color */}
      </div>
    </CardContent>
  </Card>

  <Card className="bg-purple-50">
    <CardContent className="flex items-center p-6">
      <Users className="h-8 w-8 text-purple-600" />
      <div className="ml-4">
        <h3 className="font-sora text-lg font-bold text-gray-950">Manage Team</h3> {/* Changed text color */}
        <p className="text-sm text-gray-950">Add or remove team members easily.</p> {/* Changed text color */}
      </div>
    </CardContent>
  </Card>

  <Card className="bg-green-50">
    <CardContent className="flex items-center p-6">
      <Settings className="h-8 w-8 text-green-600" />
      <div className="ml-4">
        <h3 className="font-sora text-lg font-semibold text-gray-950">Account Settings</h3> {/* Changed text color */}
        <p className="text-sm text-gray-950">Update your account preferences.</p> {/* Changed text color */}
      </div>
    </CardContent>
  </Card>
</div>



        
      </main>

     
    </div>
  );
};

export default DashboardHome;
