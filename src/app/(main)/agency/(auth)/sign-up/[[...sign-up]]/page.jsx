import { SignUp } from '@clerk/nextjs';
import React from 'react';

export const dynamic = 'force-dynamic'; // Enforce dynamic rendering

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4 md:p-8 font-sora">
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -left-4 top-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute right-10 bottom-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
      </div>

      {/* Center container with backdrop */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl border border-blue-100 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <div className="inline-block h-16 w-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-4">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold font-sora text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join 3SM Tech to get started
              </p>
            </div>

            <SignUp
              routing="path"
              path="/agency/sign-up"
              signInUrl="/agency/sign-in"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
