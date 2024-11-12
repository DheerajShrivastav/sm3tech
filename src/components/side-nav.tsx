"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/constants";
import { SideNavItem } from "@/types";
import { Menu, X, ChevronDown, Settings } from "lucide-react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-0 left-0 w-full h-16 md:hidden z-40">
        <div className="absolute top-0 left-0 p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl bg-white shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-screen bg-white shadow-xl z-50 transition-all duration-300 ease-in-out font-sora
        ${isOpen ? "w-72" : "w-0 md:w-72"} overflow-hidden`}
      >
        {/* Close button for mobile */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-xl bg-gray-50 hover:bg-gray-100 md:hidden transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div className="flex flex-col h-full">
          {/* Logo/Brand Section */}
          <div className="p-6 border-b border-gray-100 ">
            <span className="text-lg font-bold bg-white bg-clip-text text-transparent lg:bg-white">
              3SM TECH
            </span>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex flex-col space-y-1">
                {SIDENAV_ITEMS.map((item, idx) => (
                  <MenuItem key={idx} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <Link
              href="/settings"
              className="flex items-center p-3 rounded-xl hover:bg-white transition-all duration-200 group"
            >
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              <span className="ml-3 font-medium text-gray-600 group-hover:text-blue-600">Settings</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const isActive =
    pathname === item.path || (pathname !== "/" && item.path !== "/" && pathname.includes(item.path));

  const IconComponent = () => {
    if (React.isValidElement(item.icon)) {
      const icon = React.cloneElement(item.icon as React.ReactElement, {
        className: `w-5 h-5 ${
          isActive 
            ? "text-blue-600" 
            : "text-gray-500 group-hover:text-blue-600"
        }`,
      });
      return <>{icon}</>;
    }
    return null;
  };

  return (
    <div className="relative">
      {item.submenu ? (
        <>
          <button
            onClick={() => setSubMenuOpen(!subMenuOpen)}
            className={`w-full group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center">
              <div className="p-1 rounded-lg">
                <IconComponent />
              </div>
              <span
                className={`ml-3 font-medium ${
                  isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"
                }`}
              >
                {item.title}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-transform duration-200 ${
                subMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              subMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100">
              {item.subMenuItems?.map((subItem, idx) => (
                <MenuItem key={idx} item={subItem} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Link
          href={item.path}
          className={`group flex items-center p-3 rounded-xl transition-all duration-200 ${
            isActive
              ? "bg-blue-50"
              : "hover:bg-gray-50"
          }`}
        >
          <div className="p-1 rounded-lg">
            <IconComponent />
          </div>
          <span
            className={`ml-3 font-medium ${
              isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"
            }`}
          >
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};

export default SideNav;