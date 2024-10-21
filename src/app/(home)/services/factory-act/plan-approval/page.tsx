"use client";
import React from "react";
import { usePathname } from "next/navigation";
import AgencyDetails from "@/components/forms/agency-details";
import SideNav from "@/components/side-nav";

export function PlanApproval() {
  const pathname = usePathname(); // Get current path

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[35px_1fr] font-sora bg-gray-100">
      {/* Sidebar */}
      <div className="bg-white shadow-md">
        <SideNav />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="p-4 lg:p-6 border-b bg-white shadow-sm">
          <h1 className="text-lg lg:text-3xl font-semibold text-blue-950">
            Welcome To Your Dashboard
          </h1>
        </header>

        <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50"> {/* Adjusted padding */}
          <div className="bg-white p-6 rounded-md shadow-md">
            <AgencyDetails />
          </div>
        </main>
      </div>
    </div>
  );
}

export default PlanApproval;
