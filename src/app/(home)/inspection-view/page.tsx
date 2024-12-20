"use client"

import React, { memo, useEffect, useState } from 'react';
import AdminView from '../../../components/forms/admin-view';
import UserView from '@/components/forms/user-view';
import { getUser } from '@/lib/queries';
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
        const fetchedUser = await getUser();
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Customize this loading state as needed
  }

  const role = user?.role; // TypeScript knows user can be null
  const userId = user?._id; // TypeScript knows user can be null
  return (
    <div className="">
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        {role === 'Admin' ? <AdminView /> : userId ? <UserView userId={userId} /> : <div>User ID not found</div>}
      </div>
    </div>
  )
});

// Set display name for the memoized component
Page.displayName = 'Page';

export default Page;
