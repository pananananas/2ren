import { useRouter } from "next/router";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IconMenu } from "../icons/icon-menu";

export const MobileRadioSwitch = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const currentSite =
    router.pathname === "/"
      ? "Home"
      : router.pathname === "/dashboard"
        ? "Dashboard"
        : "Contact";

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-16 w-60 items-center gap-3 pl-6">
          <IconMenu className="h-7 w-7" />
          <span className="text-xl">{currentSite}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel className="">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0 pl-4 ">
            <div className="p-2 pl-4">
              {!isSignedIn && <SignInButton>Sign in</SignInButton>}
              {!!isSignedIn && <SignOutButton>Log out</SignOutButton>}
            </div>
          </DropdownMenuItem>

          <DropdownMenuLabel className="">Website</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="p-0 pl-4 ">
            <Link
              href="/"
              className="relative flex h-full w-full  items-center space-x-1 p-2 pl-4"
            >
              <span className="block text-sm">Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0 pl-4 ">
            {!!isSignedIn && (
              <Link
                href="/dashboard"
                className="relative flex h-full w-full items-center space-x-1 p-2 pl-4"
              >
                <span className="block text-sm">Dashboard</span>
              </Link>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0 pl-4 ">
            <Link
              href="/contact"
              className="relative flex h-full w-full  items-center space-x-1 p-2 pl-4"
            >
              <span className="block text-sm">Contact</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
