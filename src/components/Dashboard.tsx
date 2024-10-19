"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Bell, CircleUser, Menu, Home, Sidebar } from "lucide-react"; // Import Home icon
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/constants"; // Ensure SIDENAV_ITEMS contains your sidebar items
import AgencyDetails from "./forms/agency-details";
import SideNav from "./side-nav";

// Define the structure of the MenuItem object
interface MenuItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
  submenu?: boolean;
  subMenuItems?: MenuItemProps[];
}

export function Dashboard() {
  const pathname = usePathname(); // Get current path

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] font-sora bg-white">
      <div className="hidden border-r bg-white md:block">
        <SideNav/>
      </div>
      <div className="flex flex-col">
       
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-white">
          <div className="flex items-center">
            <h1 className="text-3xl text-blue-800 font-semibold ">Welcome To Your Dashboard</h1>
          </div>
          <div className="">
            <AgencyDetails />
          </div>
        </main>
      </div>
    </div>
  );
}



export default Dashboard;
