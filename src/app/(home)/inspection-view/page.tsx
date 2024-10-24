"use client"

import React, { memo, useEffect, useState } from 'react';
import AdminView from '../../../components/forms/admin-view';
import UserView from '@/components/forms/user-view';
import { getUser } from '@/lib/queries';
import SideNav from '@/components/side-nav';

// Define the User type
interface User {
  role: 'Admin' | 'User'; // Adjust based on your actual roles
  // Add any other properties that your user object may have
}

const Page = memo(() => {
  const [user, setUser] = useState<User | null>(null); // Use the User type
  const [loading, setLoading] = useState(true);
  const id = '66ce17fb68cfe86ae916886b';

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

  return (
    <div className="">
    
      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
      {role === 'Admin' ? <AdminView /> : <UserView id={id} />}
      </div>
    </div>





  );
});

// Set display name for the memoized component
Page.displayName = 'Page';

export default Page;
