"use client";
import React from "react";
import { usePathname } from "next/navigation";
import AgencyDetails from "@/components/forms/agency-details";
import SideNav from "@/components/side-nav"; // If you plan to use SideNav, include it in your layout

const PlanApproval = () => {
  const pathname = usePathname(); // Get current path

  return (
    <div className=" min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[35px_1fr] font-sora bg-gray-100">
      

      <main className="flex-1 px-4 lg:px-8 py-6 bg-gray-50"> {/* Adjusted padding */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <AgencyDetails />
        </div>
      </main>
    </div>
  );
};

export default PlanApproval;
