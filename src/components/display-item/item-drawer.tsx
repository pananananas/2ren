import Image from "next/image";
import * as React from "react";
// import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { useRouter } from "next/router";
import { Button } from "~/components/ui/button";
import { type ItemCardProps } from "~/types/itemCardProps"; // Import the interface
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

export const ItemDrawer = ({ item, itemImages }: ItemCardProps) => {
  const router = useRouter();
  // const [drawerVisible, setDrawerVisible] = useState(false);
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
  };

  console.log("itemId", item.id);
  return (
    <Drawer
      shouldScaleBackground={true}
      onClose={() => closeDrawer()}
      preventScrollRestoration={true}
      closeThreshold={20}
    >
      <DrawerTrigger asChild>
        <Button
          className="w-full"
          size={"xsm"}
          onClick={() => openDrawer(item.id)}
        >
          More info
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          {itemImages.length > 0 && (
            <div className=" w-4/5 pt-6 p-2 rounded-[5px]">
              <Image
                src={itemImages[0]?.imageUrl ?? "/path/to/default/image.png"} // Use optional chaining and provide a fallback src
                alt={item.name}
                width={384}
                height={130}
                className="rounded-[5px] object-cover"
              />
            </div>
          )}
          <DrawerHeader>
            <div className=" flex w-full justify-items-start">
              <div>
                <DrawerTitle>{item.name}</DrawerTitle>
                <DrawerDescription>{item.category}.</DrawerDescription>
              </div>
              <div className="right-0 top-0 z-10 justify-self-end">
                <div className="flex gap-1">
                  {item.price && (
                    <Badge>
                      {item.price}
                      {item.currency}/kg
                    </Badge>
                  )}
                  {item.amount && <Badge>{item.amount}kg</Badge>}
                </div>
              </div>
            </div>
            <DrawerDescription>{item.description}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex w-full gap-4">
              <DrawerClose asChild className="w-1/3">
                <Button variant="outline">Close</Button>
              </DrawerClose>
              <Button className="w-2/3">Contact</Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
