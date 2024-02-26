import { DataTable } from "./data-table";
import { LoadingPage } from "../loading";
import { columns } from "./columns";
import { api } from "~/utils/api";

export default function DataTableCard() {
  const { data, error, isLoading } = api.items.getAll.useQuery();
  // const { itemImages } = api.itemImages.getAll.useQuery();

  const items = data ? data.map((entry) => entry.item) : [];

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
