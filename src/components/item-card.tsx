import Image from "next/image";
import { api } from "~/utils/api";
import { Button } from "./ui/button";
import { Badge } from "~/components/ui/badge";
import { LoadingPage } from "~/components/loading";
import { Card, CardDescription, CardTitle } from "./ui/card";

export default function ItemCard() {
  const { data: itemData, isLoading: dataLoading } =
    api.items.getAll.useQuery();
  const { data: imagesData, isLoading: imagesLoading } =
    api.itemImages.getAll.useQuery();

  if (dataLoading) return <LoadingPage />;
  if (!itemData) return <div>No data</div>;
  if (imagesLoading) return <LoadingPage />;
  if (!imagesData) return <div>No images data</div>;

  return (
    <div className="flex">
      {itemData.map(({ item }) => {
        if (!item.display) return null; // Render item only if item.display is true
        const itemImages = imagesData.filter(
          // Filter images for this specific item
          (image) => image.itemId === item.id,
        );
        return (
          <div key={item.id} className="">
            <Card className="w-[170px] p-2.5">
              {/* Display the first image for this item, if available */}
              {itemImages.length > 0 && (
                <div className="h-[130px] w-[150px] rounded-[5px]">
                  <Image
                    src={
                      itemImages[0]?.imageUrl ?? "/path/to/default/image.png"
                    } // Use optional chaining and provide a fallback src
                    alt={item.name}
                    width={150}
                    height={130}
                    className="h-[130px] w-[150px] rounded-[5px] object-cover"
                  />
                </div>
              )}

              <div className="flex gap-1">
                {item.price && <Badge>{item.price}zł/kg</Badge>}
                {item.amount && <Badge>{item.amount}kg</Badge>}
              </div>
              <div className="p-[5px]">
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription>{item.category}</CardDescription>
              </div>
              <Button className="h-6 w-full text-sm" size={null}>
                More info
              </Button>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
