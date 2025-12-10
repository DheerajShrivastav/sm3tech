"use client";
import React from "react";
import { usePathname } from "next/navigation";
import AgencyDetails from "@/components/forms/agency-details";
import SideNav from "@/components/side-nav"; // If you plan to use SideNav, include it in your layout
import PlanApprovalForm from "@/components/forms/PlanApprovalForm";
const PlanApproval = () => {
  const pathname = usePathname(); // Get current path

  return (
    <div className=" min-h-screen w-full  font-sora bg-gray-100">

      <main className="">
        <div className="">
          <PlanApprovalForm />
        </div>
      </main>
    </div>
  );
};

export default PlanApproval;
