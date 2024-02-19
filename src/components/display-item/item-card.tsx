// ItemCard.tsx
import Image from "next/image";
import { Badge } from "~/components/ui/badge";
import { Card, CardDescription, CardTitle } from "../ui/card";
import ItemDrawer from "~/components/display-item/item-drawer";

interface ItemCardProps {
  item: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    color: string;
    price: string;
    currency: string;
    amount: string;
    category: string;
    material: string;
    description: string;
    authorID: string;
    display: boolean;
  };
  itemImages: {
    id: number;
    key: string;
    imageUrl: string;
    itemId: number;
  }[];
  selectedItemId: number | null;
}

export const ItemCard = ({
  item,
  itemImages,
  selectedItemId,
}: ItemCardProps) => {
  return (
    <div key={item.id} className="gap-5">
      <Card className="w-[170px] p-[10px] lg:w-[180px]">
        {/* Display the first image for this item, if available */}
        {itemImages.length > 0 && (
          <div className="relative h-[130px] w-full rounded-[5px]">
            <Image
              src={itemImages[0]?.imageUrl ?? "/path/to/default/image.png"} // Use optional chaining and provide a fallback src
              alt={item.name}
              width={150}
              height={130}
              className="h-[130px] w-[190px] rounded-[5px] object-cover"
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
        <ItemDrawer itemId={item.id} />
      </Card>
    </div>
  );
};
