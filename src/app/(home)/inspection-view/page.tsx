"use client"

import React, { memo, useEffect, useState } from 'react';
import AdminUsersView from '@/components/forms/admin-users-view';
import UserView from '@/components/forms/user-view';
import { getUser, initUser } from '@/lib/queries';
import SideNav from '@/components/side-nav';

// Define the User type
interface User {
  role: 'Admin' | 'User'; // Adjust based on your actual roles
  _id: string; // Add the _id property
  // Add any other properties that your user object may have
}

const Page = memo(() => {
  const [user, setUser] = useState<User | null>(null); // Use the User type
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user...')
        let fetchedUser = await getUser();
        console.log('User fetched:', fetchedUser)

        // If user is null, try to initialize it
        if (!fetchedUser) {
          console.log('User is null, initializing...')
          await initUser({})
          fetchedUser = await getUser()
          console.log('User after init:', fetchedUser)
        }

        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    // Timeout fallback
    const timeoutId = setTimeout(() => {
      console.log('User fetch timeout, stopping loading')
      setLoading(false)
    }, 3000)

    fetchUser().finally(() => {
      clearTimeout(timeoutId)
    });

    return () => clearTimeout(timeoutId)
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-sora text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  const role = user?.role; // TypeScript knows user can be null
  const userId = user?._id; // TypeScript knows user can be null

  return (
    <div>
      {user && user.role === 'Admin' ? (
        <AdminUsersView />
      ) : user && user.role === 'User' && user._id ? (
        <UserView userId={user._id} />
      ) : (
        <UserView userId={userId || 'guest'} />
      )}
    </div>
  )
});

// Set display name for the memoized component
Page.displayName = 'Page';

export default Page;
