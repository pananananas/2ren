import Image from "next/image";
import * as React from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { type ItemCardProps } from "~/types/itemCardProps"; // Import the interface
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";

export const ItemDisplayContents = ({ item, itemImages }: ItemCardProps) => {
  console.log("itemId", item.id);
  return (
    <div className="mx-auto w-full max-w-sm">
      {itemImages.length > 0 && (
        <div className=" w-full rounded-[5px] p-2 pt-6">
          <Image
            src={itemImages[0]?.imageUrl ?? "/path/to/default/image.png"} // Use optional chaining and provide a fallback src
            alt={item.name}
            width={384}
            height={130}
            className="mx-auto w-4/5 rounded-[5px] object-cover"
          />
        </div>
      )}
      <DrawerHeader>
        <div className="relative w-full">
          <div>
            <DrawerTitle>{item.name}</DrawerTitle>
            <DrawerDescription>{item.category}.</DrawerDescription>
          </div>
          <div className="absolute right-0 top-0 z-10">
            <div className="flex gap-2">
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
  );
};
