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
    <div className="flex flex-wrap place-content-center justify-start gap-4 md:gap-5">
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
          />
        );
      })}
    </div>
  );
}
