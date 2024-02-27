import Image from "next/image";
import { useRouter } from "next/router";
import { useMediaQuery } from "usehooks-ts";
import { Badge } from "~/components/ui/badge";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { type ItemCardProps } from "~/types/itemCardProps"; // Import the interface
import { ItemDisplay } from "~/components/item-display/item-display";

export const ItemCard = ({
  item,
  itemImages,
  selectedItemId,
}: ItemCardProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const router = useRouter();
  const openItemDisplay = (itemId: number) => {
    if (isDesktop) return;
    selectedItemId = itemId
    void router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, itemId: itemId },
      },
      undefined,
      { shallow: true },
    );
  };
  return (
    <div key={item.id}>
      <Card
        className={`xs:w-[170px] w-[150px] p-[10px] lg:w-[180px]  ${
          selectedItemId === item.id ? "bg-gray-100" : ""
        }`}
        onClick={() => openItemDisplay(item.id)}
      >
        {/* Display the first image for this item, if available */}
        {itemImages.length > 0 && (
          <div className="relative h-[110px] xs:h-[130px] w-full rounded-[5px]">
            <Image
              src={itemImages[0]?.imageUrl ?? "/path/to/default/image.png"} // Use optional chaining and provide a fallback src
              alt={item.name}
              width={150}
              height={130}
              className="h-[110px] xs:h-[130px] w-[190px] rounded-[5px] object-cover"
            />
            <div className="absolute bottom-0 right-0 z-10 p-[5px]">
              <div className="flex gap-1">
                {item.price && (
                  <Badge variant={"transparent"}>
                    {item.price}
                    {item.currency}/kg
                  </Badge>
                )}
                {item.amount && (
                  <Badge variant={"transparent"}>{item.amount}kg</Badge>
                )}
              </div>
            </div>
          </div>
        )}
        {itemImages.length === 0 && (
          // <div className="mb-2 flex justify-end">
          <div className="relative h-[130px] w-full rounded-[5px] bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400">
            <div className="absolute bottom-0 right-0 z-10 p-[5px]">
              <div className="flex gap-1">
                {item.price && (
                  <Badge variant={"transparent"}>
                    {item.price}
                    {item.currency}/kg
                  </Badge>
                )}
                {item.amount && (
                  <Badge variant={"transparent"}>{item.amount}kg</Badge>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mb-1 w-full p-[5px]">
          <CardTitle className="text-base">{item.name}</CardTitle>
          <CardDescription>{item.category}</CardDescription>
        </div>
        <ItemDisplay
          key={item.id}
          item={item}
          itemImages={itemImages}
          selectedItemId={selectedItemId}
          isDesktop={isDesktop}
        />
      </Card>
    </div>
  );
};
