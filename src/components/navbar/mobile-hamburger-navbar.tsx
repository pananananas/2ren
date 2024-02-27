import { useRouter } from "next/router";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
// import { IconMenu } from "../icons/icon-menu";
import HamIcon from "../icons/icon-hamburger";
import { Button } from "../ui/button";
// import { IconMenu } from "../icons/icon-menu";

export const MobileHamburgerNavbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();
  const currentSite =
    router.pathname === "/"
      ? "Home"
      : router.pathname === "/dashboard"
        ? "Dashboard"
        : "Contact";

  const toggleClass = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="">
      <DropdownMenu onOpenChange={toggleClass}>
        <DropdownMenuTrigger className="flex h-[60px] w-60 items-center focus-visible:outline-none">
          <Button variant="ghost" className="p-0 pr-16 hover:bg-transparent">
            <HamIcon isActive={isActive} />
            <span className="text-xl">{currentSite}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 shadow-none">
          <DropdownMenuLabel className="">Navigation menu</DropdownMenuLabel>

          {/* <DropdownMenuLabel className="">Navigation</DropdownMenuLabel> */}
          <DropdownMenuSeparator />

          <DropdownMenuItem className="p-0  ">
            <Link
              href="/"
              className="relative flex h-full w-full  items-center space-x-1 p-2 pl-4"
            >
              <span className="block text-sm">Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {!!isSignedIn && (
            <>
              <DropdownMenuItem className="p-0  ">
                <Link
                  href="/dashboard"
                  className="relative flex h-full w-full items-center space-x-1 p-2 pl-4"
                >
                  <span className="block text-sm">Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem className="p-0">
            <Link
              href="/contact"
              className="relative flex h-full w-full  items-center space-x-1 p-2 pl-4"
            >
              <span className="block text-sm">Contact</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="h-full w-full p-0">
            <div className="w-full p-2 pl-4">
              {!isSignedIn && (
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="flex h-[20px] w-full justify-start p-0"
                  >
                    Sign in
                  </Button>
                </SignInButton>
              )}
              {!!isSignedIn && (
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex h-[20px] w-full justify-start p-0"
                  >
                    Log out
                  </Button>
                </SignOutButton>
              )}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
