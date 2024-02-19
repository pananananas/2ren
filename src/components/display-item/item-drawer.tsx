import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

export default function ItemDrawer({ itemId }: { itemId: number }) {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const openDrawer = (itemId: number) => {
    // Update the current URL without navigating away
    void router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, itemId: itemId },
      },
      undefined,
      { shallow: true },
    );
  };
  const closeDrawer = () => {
    void router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true },
    );
    setDrawerVisible(false);
  };

  console.log("itemId", itemId);
  return (
    <Drawer shouldScaleBackground={true}>
      <DrawerTrigger asChild>
        <Button
          className="w-full"
          size={"xsm"}
          onClick={() => openDrawer(itemId)}
        >
          More info
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{itemId}</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild onChange={() => closeDrawer()}>
              <Button variant="outline" onClick={() => closeDrawer()}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
