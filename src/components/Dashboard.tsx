"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, CircleUser, Menu, Home, Sidebar, Users, Shield, User as UserIcon, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { SIDENAV_ITEMS } from "@/constants";

interface DatabaseUser {
  _id: string
  clerkId: string
  name: string
  email: string
  role: 'Admin' | 'User'
  createdAt: string
}

// Define the structure of the MenuItem object
interface MenuItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
  submenu?: boolean;
  subMenuItems?: MenuItemProps[];
}

export function Dashboard() {
  const pathname = usePathname();
  const { user } = useUser();
  const { toast } = useToast();
  const [users, setUsers] = useState<DatabaseUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState<'Admin' | 'User' | null>(null);
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateRole, setUpdateRole] = useState<'Admin' | 'User'>('User');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      syncCurrentUser();
      fetchUsers();
    }
  }, [user]);

  const syncCurrentUser = async () => {
    try {
      const response = await fetch('/api/user/sync', {
        method: 'POST',
      });
      
      if (response.ok) {
        const data = await response.json();
        setCurrentUserRole(data.user.role);
      }
    } catch (error) {
      console.error('Error syncing user:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async () => {
    if (!updateEmail) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive'
      });
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: updateEmail,
          role: updateRole,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'User role updated successfully',
        });
        setUpdateEmail('');
        fetchUsers();
      } else {
        const error = await response.json();
        toast({
          title: 'Error',
          description: error.error || 'Failed to update user role',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive'
      });
    } finally {
      setUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access the dashboard</h2>
          <Button asChild>
            <Link href="/agency/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 font-sora">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant={currentUserRole === 'Admin' ? 'default' : 'secondary'} className="text-sm">
              {currentUserRole === 'Admin' ? (
                <>
                  <Shield className="w-4 h-4 mr-1" />
                  Admin Access
                </>
              ) : (
                <>
                  <UserIcon className="w-4 h-4 mr-1" />
                  User Access
                </>
              )}
            </Badge>
            <span className="text-gray-600">Welcome, {user.firstName}!</span>
          </div>
        </div>

        {/* User Access - Available to all users */}
        <Card className="bg-white/80 backdrop-blur-lg shadow-xl border border-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserIcon className="h-6 w-6 text-blue-600" />
              <span>User Dashboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Factory Act Services</h3>
                <p className="text-gray-600 text-sm">Access factory license, plan approval, and safety audit services</p>
                <Button className="mt-4 w-full" variant="outline" asChild>
                  <Link href="/services/factory-act">View Services</Link>
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">MPCB Services</h3>
                <p className="text-gray-600 text-sm">Consent to establish, operate, and compliance reports</p>
                <Button className="mt-4 w-full" variant="outline" asChild>
                  <Link href="/services/mpcb">View Services</Link>
                </Button>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Document Status</h3>
                <p className="text-gray-600 text-sm">Track your document submissions and approvals</p>
                <Button className="mt-4 w-full" variant="outline">
                  View Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Access - Only visible to admins */}
        {currentUserRole === 'Admin' && (
          <>
            {/* Role Management */}
            <Card className="bg-white/80 backdrop-blur-lg shadow-xl border border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-purple-600" />
                  <span>Admin Panel - Role Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Update User Role</h3>
                    <div className="flex flex-col md:flex-row gap-4">
                      <Input
                        placeholder="Enter user email"
                        value={updateEmail}
                        onChange={(e) => setUpdateEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Select value={updateRole} onValueChange={(value: 'Admin' | 'User') => setUpdateRole(value)}>
                        <SelectTrigger className="w-full md:w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="User">User</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button 
                        onClick={updateUserRole}
                        disabled={updating}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {updating ? 'Updating...' : 'Update Role'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users List */}
            <Card className="bg-white/80 backdrop-blur-lg shadow-xl border border-indigo-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6 text-indigo-600" />
                  <span>Users Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((dbUser) => (
                    <div key={dbUser._id} className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{dbUser.name}</div>
                        <div className="text-gray-600 text-sm">{dbUser.email}</div>
                        <div className="text-gray-500 text-xs">
                          Joined: {new Date(dbUser.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant={dbUser.role === 'Admin' ? 'default' : 'secondary'}>
                        {dbUser.role}
                      </Badge>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No users found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Access Information */}
        <Card className="bg-white/80 backdrop-blur-lg shadow-xl border border-gray-100">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-gray-600" />
              <span>Access Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Your Account Details</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div><strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}</div>
                  <div><strong>Role:</strong> {currentUserRole}</div>
                  <div><strong>Access Level:</strong> {currentUserRole === 'Admin' ? 'Full Admin Access' : 'Standard User Access'}</div>
                </div>
              </div>
              
              {currentUserRole !== 'Admin' && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Need Admin Access?</h4>
                  <p className="text-blue-700 text-sm">
                    Contact your system administrator to request admin privileges. 
                    Admin roles are assigned manually in the database for security.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



export default Dashboard;
