import Image from "next/image";
import * as React from "react";
import { type ItemCardProps } from "~/types/itemCardProps"; // Import the interface
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export const ItemDisplayCarousel = ({
  item,
  itemImages,
  isDesktop,
}: ItemCardProps) => {
  return (
    <div>
      <div className=" flex w-full items-center justify-center p-2">
        {isDesktop && (
          <Carousel className="w-full rounded-[5px]">
            <CarouselContent className="items-center  rounded-[5px]">
              {itemImages.map((image, index) => (
                <CarouselItem key={index}>
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
        )}
        {!isDesktop && (
          <Carousel className="w-3/4 rounded-[5px]">
            <CarouselContent className="items-center  rounded-[5px]">
              {itemImages.map((image, index) => (
                <CarouselItem key={index}>
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
        )}
      </div>
    </div>
  );
};
