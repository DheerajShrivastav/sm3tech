import { SignIn } from '@clerk/nextjs';
import React from 'react';

export const dynamic = 'force-dynamic'; // Enforce dynamic rendering

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default SignInPage;
