"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import { IconHome } from "../icons/icon-home";
import { IconDashboard } from "../icons/icon-dashboard";

export function MobileTopNavbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: <IconDashboard className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];
  return (
    <div className="absolute  w-full">
      <FloatingNav navItems={navItems}/>
    </div>
  );
}
