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

export const MobileRadioSwitch = () => {
  return (
    <div className=" w-60 h-1">
      <div />
    </div>
  );
};
