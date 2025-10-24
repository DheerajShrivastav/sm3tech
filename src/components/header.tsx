'use client'

import React, { useEffect, useState } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { User, Settings, HelpCircle, LogOut, Shield, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useClerk } from "@clerk/nextjs";

const Header = () => {
  const scrolled = useScroll(5);
  const selectedLayout = useSelectedLayoutSegment();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [userRole, setUserRole] = useState<'Admin' | 'User' | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user role from database
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        console.log('Fetching user role...');
        const response = await fetch('/api/user/sync', { method: 'POST' });
        if (response.ok) {
          const data = await response.json();
          console.log('User role data:', data);
          setUserRole(data.user.role);
        } else {
          console.error('Failed to fetch user role:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserRole();
    }
  }, [user]);

  // Generate initials for avatar fallback
  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div
      className={cn(
        `fixed inset-x-0 top-0 z-30 lg:z-50 w-full transition-all`,
        {
          "bg-white/85 backdrop-blur-lg shadow-lg": scrolled,
          "bg-white/95 shadow-md": selectedLayout,
          "bg-white/50 backdrop-blur-sm shadow-sm": !scrolled && !selectedLayout,
        }
      )}
    >
      {/* Simplified background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute right-10 top-10 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl" />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo space */}
          <div className="flex-1" />

          {/* Centered Text with responsive design */}
          <div className="flex-1 flex justify-center">
            <span className="font-sora font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent 
              text-lg sm:text-xl md:text-2xl lg:text-2xl 
              hover:scale-105 transition-transform cursor-default">
              3SM TECH 
            </span>
          </div>

          {/* Right side menu items */}
          <div className="flex-1 flex items-center justify-end gap-4">
            

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 pl-4 outline-none">
                <div className="flex items-center gap-3 group">
                  <Avatar className="h-9 w-9 transition-all">
                    <AvatarImage 
                      src={user?.imageUrl} 
                      alt={user?.fullName || 'User'} 
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium">
                      {getInitials(user?.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="font-sora text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {user?.fullName || 'Guest User'}
                    </p>
                    <div className="flex items-center gap-2">
                      {user?.primaryEmailAddress?.emailAddress && (
                        <p className="text-xs text-gray-500 truncate max-w-[120px]">
                          {user.primaryEmailAddress.emailAddress}
                        </p>
                      )}
                      {!loading && userRole && (
                        <Badge 
                          variant={userRole === 'Admin' ? 'default' : 'secondary'}
                          className={`text-xs px-2 py-0.5 ${
                            userRole === 'Admin' 
                              ? 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' 
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          {userRole === 'Admin' ? <Shield className="h-3 w-3 mr-1" /> : <UserCircle className="h-3 w-3 mr-1" />}
                          {userRole}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel className="pb-3">
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-semibold">{user?.fullName || 'Guest User'}</span>
                    <span className="text-xs text-gray-500 truncate">
                      {user?.primaryEmailAddress?.emailAddress || 'No email provided'}
                    </span>
                    {/* Role Badge - More prominent */}
                    {!loading && userRole && (
                      <div className="pt-2">
                        <Badge 
                          variant={userRole === 'Admin' ? 'default' : 'secondary'}
                          className={`text-xs px-3 py-1 inline-flex items-center gap-1 ${
                            userRole === 'Admin' 
                              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {userRole === 'Admin' ? <Shield className="h-3 w-3" /> : <UserCircle className="h-3 w-3" />}
                          <span className="font-medium">{userRole}</span>
                        </Badge>
                      </div>
                    )}
                    {loading && (
                      <div className="pt-2">
                        <span className="text-xs text-gray-400">Loading role...</span>
                      </div>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => window.location.href = 'https://accounts.3sm.tech/user'}
                >
                  <User className="mr-2 h-4 w-4 text-gray-500" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => window.location.href = 'https://accounts.3sm.tech/user/settings'}
                >
                  <Settings className="mr-2 h-4 w-4 text-gray-500" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => window.location.href = 'https://clerk.com/support'}
                >
                  <HelpCircle className="mr-2 h-4 w-4 text-gray-500" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;