"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    // {
    //   name: "Contact",
    //   link: "/contact",
    // },
  ];
  return (
    <div className="absolute  w-full">
      <FloatingNav navItems={navItems} className=""/>
    </div>
  );
}
