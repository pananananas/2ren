import { ItemCreateForm } from "../item-manipulation/item-create-form";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import { Search } from "../navbar/search";
import { cn } from "~/utils/cn";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const MobileRadioSwitch = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="w-60 pl-8">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="w-24"> open </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="">My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="pl-4">
            {!isSignedIn && (
              <SignInButton>
                Sign in
                {/* <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-emerald-800  to-transparent" /> */}
              </SignInButton>
            )}
            {!!isSignedIn && (
              <SignOutButton>
                Log out
                {/* <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-emerald-800  to-transparent" /> */}
              </SignOutButton>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem className="pl-4">Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="">Website</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="pl-4 hover:bg-green-400">
            <Link href="/" className="relative flex items-center space-x-1  ">
              <span className="block text-sm">Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="pl-4 hover:bg-green-400">
            <Link
              href="/dashboard"
              className="relative flex items-center space-x-1 "
            >
              <span className="block text-sm">Dashboard</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="pl-4 hover:bg-green-400">
            {!!isSignedIn && (
              <Link
                href="/contact"
                className="relative flex items-center space-x-1  "
              >
                <span className="block text-sm">Contact</span>
              </Link>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
