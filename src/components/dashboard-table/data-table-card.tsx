import { MobileDataTable } from "./mobile-data-table";
import { useMediaQuery } from "usehooks-ts";
import { DataTable } from "./data-table";
import { LoadingPage } from "../loading";
import { useUser } from "@clerk/nextjs";
import { columns } from "./columns";
import { api } from "~/utils/api";

export default function DataTableCard() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data, error, isLoading } = api.items.getAll.useQuery();
  const { data: itemImages } = api.itemImages.getAll.useQuery();
  const { user } = useUser();

  const userId = user?.id;
  const images = itemImages ? itemImages : [];
  const items = data
    ? data
        .filter((item) => item.author?.id === userId)
        .map((entry) => {
          const item = entry.item;
          const itemImages = images.filter((image) => image.itemId === item.id);
          return { ...item, images: itemImages };
        })
    : [];

  if (isLoading) return <LoadingPage />;
  if (error) return <div>An error has occurred: {error.message}</div>;

  const numOfVisibleItems = items
    .map((item) => item.display)
    .filter((item) => item).length;
  return (
    <div className="flex w-full flex-col rounded-[20px] bg-white shadow-lg ">
      <span className="flex w-full flex-col px-6 pt-6 text-2xl">
        Items
        <span className="pt-1 text-sm text-gray-500">
          {" "}
          You have {items.length} items on a website, {numOfVisibleItems} of them are visible on home page.{" "}
        </span>
      </span>
      {isDesktop && (
        <div className="container py-4">
          <DataTable columns={columns} data={items} />
        </div>
      )}
      {!isDesktop && (
        <div className="px-4 py-2">
          <MobileDataTable columns={columns} data={items} />
        </div>
      )}
    </div>
  );
}
