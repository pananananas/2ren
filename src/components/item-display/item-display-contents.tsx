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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export const ItemDisplayContents = ({ item, itemImages }: ItemCardProps) => {
  return (
    <div className="mx-auto w-full max-w-sm">
      {itemImages.length > 0 && (
        <div className=" flex w-full justify-center items-center p-2 pt-6">
          <Carousel className="w-3/4 rounded-[5px]">
            <CarouselContent className="rounded-[5px]  items-center">
              {itemImages.map((image, index) => (
                <CarouselItem key={index} >
                  <Image
                    src={image.imageUrl ?? "/path/to/default/image.png"} // Use optional chaining and provide a fallback src
                    alt={item.name}
                    width={384}
                    height={130}
                    className="mx-auto rounded-[5px] object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {itemImages.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
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
