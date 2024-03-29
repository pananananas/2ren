import { api } from "~/utils/api";
import { ItemCard } from "./item-card";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingPage } from "~/components/loading";

export default function ItemGallery() {
  const router = useRouter();
  const { itemId } = router.query;
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedItemId(itemId ? Number(itemId) : null);
  }, [itemId]);
  // console.log("selectedItemId", selectedItemId);
  const { data: itemData, isLoading: dataLoading } =
    api.items.getAll.useQuery();
  const { data: imagesData, isLoading: imagesLoading } =
    api.itemImages.getAll.useQuery();

  if (dataLoading) return <LoadingPage />;
  if (!itemData) return <div>No data</div>;
  if (imagesLoading) return <LoadingPage />;
  if (!imagesData) return <div>No images data</div>;
  //   console.log("imagesData", imagesData);

  return (
    <div className="xs:gap-4 flex flex-wrap justify-center gap-3 pb-5 md:justify-start md:gap-5">
      <span className=" flex w-full justify-start pb-3 pl-4 pt-20 text-3xl font-bold md:w-full md:pb-5 md:pl-2 md:pt-32">
        Available products
      </span>
      {itemData.map(({ item }) => {
        if (!item.display) return null;
        const itemImages = imagesData.filter(
          // Filter images for this specific item
          (image) => image.itemId === item.id,
        );
        return (
          <ItemCard
            key={item.id}
            item={item}
            itemImages={itemImages}
            selectedItemId={selectedItemId}
            isDesktop={null}
          />
        );
      })}
      <div className="h-32 w-full" />
    </div>
  );
}
