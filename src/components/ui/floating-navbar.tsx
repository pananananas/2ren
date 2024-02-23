import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/utils/cn";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ItemCreateForm } from "../item-manipulation/item-create-form";
import { useMediaQuery } from "usehooks-ts";
import { Search } from "../navbar/search";
// import Image from "next/image";

export const FloatingNav = ({ className }: { className?: string }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { isLoaded, isSignedIn, user } = useUser();
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);
  // console.log("isLoaded", isLoaded);
  let direction = 1;
  if (isMobile) direction = -1;

  useEffect(() => {
    if (isLoaded) {
      setVisible(true);
      console.log(user?.imageUrl, "user");
    }
  }, [isLoaded, user?.imageUrl]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (false)
      if (typeof current === "number") {
        // Check if current is not undefined and is a number
        const direction = current - scrollYProgress.getPrevious()!;
        // console.log("direction", direction, "current", current);

        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: visible ? 0 : -100 * direction,
        }}
        animate={{
          y: visible ? 0 : -100 * direction,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 bottom-2 z-[50] mx-auto flex h-14 max-w-fit items-center justify-center space-x-4 rounded-full  bg-[rgba(255,255,255,0.95)] px-2 py-2 shadow-md sm:top-4 ",
          className,
        )}
      >
        {/* {user && (
          <Image
            src={user.profileImageUrl}
            alt="profile image"
            className="h-10 w-10 rounded-full"
            width={50}
            height={50}
          />
        )} */}

        <Link
          href="/"
          className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 "
        >
          {/* <Button className="aspect-square rounded-full bg-teal-900 hover:bg-teal-800" /> */}
          <span className="block pl-4 text-sm">Home</span>
        </Link>
        {!isSignedIn && (
          <Link
            href="/about"
            className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 "
          >
            <span className="block text-sm">About</span>
          </Link>
        )}

        {!!isSignedIn && (
          <Link
            href="/dashboard"
            className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 "
          >
            <span className="block text-sm">Dashboard</span>
          </Link>
        )}

        {!isMobile && !!isSignedIn && (
          <Link
            href="/contact"
            className="relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 "
          >
            <span className="block text-sm">Contact</span>
          </Link>
        )}

        <div className="flex gap-2 pl-0 md:pl-20 lg:pl-40">
          {!isMobile && <Search />}
          {!isSignedIn && (
            <SignInButton>
              <Button className="relative rounded-full border border-neutral-200 bg-transparent px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 ">
                Sign in
                {/* <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-emerald-800  to-transparent" /> */}
              </Button>
            </SignInButton>
          )}
          {!!isSignedIn && (
            <SignOutButton>
              <Button className="font-large relative rounded-full border border-neutral-200 bg-transparent px-4 py-2 text-sm text-black hover:bg-gray-50 ">
                Log out
                {/* <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-emerald-800  to-transparent" /> */}
              </Button>
            </SignOutButton>
          )}
          {!isSignedIn && (
            <Link href="/contact">
              <Button className="relative rounded-full  border-neutral-200 px-4 py-2 text-sm font-medium">
                Contact
              </Button>
            </Link>
          )}
          {!!isSignedIn && <ItemCreateForm variant="rounded" />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
