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

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { isLoaded, isSignedIn } = useUser();
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);
  // console.log("isLoaded", isLoaded);

  useEffect(() => {
    if (isLoaded) {
      setVisible(true);
    }
  }, [isLoaded]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      // console.log("direction", direction, "current", current);

      if (direction < 0 && current > -0.5) {
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
          y: visible ? 0 : -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed inset-x-0 bottom-2 z-[50] mx-auto flex h-14 max-w-fit items-center justify-center space-x-4 rounded-full  bg-[rgba(255,255,255,0.95)] py-2 pl-4 pr-2 shadow-md  sm:top-4",
          className,
        )}
      >
        {navItems.map((navItem, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 ",
            )}
          >
            <span className="hidden">{navItem.icon}</span>
            <span className="block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <div className="flex gap-2">
          {!isSignedIn && (
            <SignInButton>
              <Button className="relative rounded-full border border-neutral-200 bg-transparent px-4 py-2 text-sm font-medium text-black hover:bg-emerald-50 ">
                Sign in
                <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-emerald-800  to-transparent" />
              </Button>
            </SignInButton>
          )}
          {!!isSignedIn && (
            <SignOutButton>
              <Button className="relative rounded-full border border-neutral-200 bg-transparent px-4 py-2 text-sm font-medium text-black hover:bg-emerald-50 ">
                Sign out
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
          {!!isSignedIn && <ItemCreateForm variant="rounded"/>}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
