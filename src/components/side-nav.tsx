"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDENAV_ITEMS } from "@/constants";
import { SideNavItem } from "@/types";
import { Icon } from "@iconify/react";

const SideNav = () => {
  return (
    <div
      className={`md:w-72 w-20 fixed top-0 left-0 h-full font-sora bg-white border-r border-gray-200 shadow-lg z-50 overflow-y-auto transition-all text-black`}
    >
      <div className="flex flex-col space-y-6 w-full p-4">
        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-gray-300 h-12 w-full"
        >
          <span className="font-bold text-2xl text-black hidden md:flex">
            S23Tech
          </span>
        </Link>

        <div className="flex flex-col space-y-2 md:px-4">
          {SIDENAV_ITEMS.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center w-full p-2 rounded-lg hover:bg-[#dbeafe] transition-colors duration-200 justify-between ${
              pathname.includes(item.path) ? "bg-[#93c5fd] shadow-md" : "bg-[#f0f9ff]"
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-lg text-black hover:text-[#1d4ed8] flex">
                {item.title}
              </span>
            </div>
            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" color="#1d4ed8" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-4 flex flex-col space-y-2">
              {item.subMenuItems?.map((subItem, idx) => (
                <MenuItem key={idx} item={subItem} />
              ))}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-[#dbeafe] transition-colors duration-200 ${
            item.path === pathname ? "bg-[#93c5fd] shadow-md" : "bg-[#f0f9ff]"
          }`}
        >
          {item.icon}
          <span className="font-semibold text-lg text-black hover:text-[#1d4ed8] flex">
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};

export default SideNav;
