import { ItemDeleteAlertIcon } from "../item-manipulation/item-delete-alert";
import { ItemEditDataTable } from "../item-manipulation/item-edit-datatable";
import { ItemDisplayCarousel } from "./item-display-carousel";
import { type ItemCardProps } from "~/types/itemCardProps";
import { LoadingPage } from "~/components/loading";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { useUser } from "@clerk/nextjs";
import * as React from "react";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "~/components/ui/drawer";

export const ItemDisplayContents = ({
  item,
  itemImages,
  selectedItemId,
  isDesktop,
}: ItemCardProps) => {
  const { isLoaded: userLoaded, isSignedIn, user } = useUser();
  if (!userLoaded) return <LoadingPage />;

  return (
    <div className="mx-auto w-full max-w-sm">
      {!!isSignedIn && user.id === item.authorID && (
        <div className="flex justify-end gap-">
          <ItemEditDataTable
            key={item.id}
            item={item}
            itemImages={itemImages}
            selectedItemId={selectedItemId}
            isDesktop={isDesktop}
          />
          <ItemDeleteAlertIcon itemId={item.id} />
        </div>
      )}

      {itemImages.length > 0 && (
        <ItemDisplayCarousel
          key={item.id}
          item={item}
          itemImages={itemImages}
          selectedItemId={selectedItemId}
          isDesktop={isDesktop}
        />
      )}
      <DrawerHeader>
        <div className="relative w-full">
          <div>
            <DrawerTitle>{item.name}</DrawerTitle>
            <DrawerDescription>{item.category}</DrawerDescription>
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
