import { DataTable } from "./data-table";
import { LoadingPage } from "../loading";
import { columns } from "./columns";
import { api } from "~/utils/api";

export default function DataTableCard() {
  const { data, error, isLoading } = api.items.getAll.useQuery();
  const { data: itemImages } = api.itemImages.getAll.useQuery();

  const images = itemImages ? itemImages : [];
  const items = data
    ? data.map((entry) => {
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
          Total {items.length} items on a website, {numOfVisibleItems} visible.{" "}
        </span>
      </span>
      <div className="container py-4">
        <DataTable columns={columns} data={items} />
      </div>
    </div>
  );
}
// items have this structure:
// const items: {
//   id: number;
//   name: string;
//   createdAt: Date;
//   updatedAt: Date;
//   color: string;
//   price: string;
//   currency: string;
//   amount: string;
//   category: string;
//   material: string;
//   description: string;
//   authorID: string;
//   display: boolean;



// but i want for each item to have an array of images corresponding to it, for reference images have this structure:
// const images: {
//   id: number;
//   key: string;
//   imageUrl: string;
//   itemId: number;
// }[]
