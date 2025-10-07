"use client";
import React from "react";
import { usePathname } from "next/navigation";
import PlanApprovalForm from "@/components/forms/plan-approval";

const PlanApproval = () => {
  const pathname = usePathname(); // Get current path

  return (
    <div className="min-h-screen w-full font-sora bg-gray-100">
      <main className="">
        <div className="">
          <PlanApprovalForm />
        </div>
      </main>
    </div>
  );
};

export default PlanApproval;
