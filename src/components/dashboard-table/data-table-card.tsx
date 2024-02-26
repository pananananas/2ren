import { api } from "~/utils/api";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { LoadingPage } from "../loading";

export default function DataTableCard() {
  const { data, error, isLoading } = api.items.getAll.useQuery();

  const items = data ? data.map((entry) => entry.item) : [];

  if (isLoading) return <LoadingPage />;
  if (error) return <div>An error has occurred: {error.message}</div>;

  const numOfVisibleItems = items.map((item) => item.display).filter((item) => item).length;
  return (
    <div className="flex w-full flex-col rounded-lg bg-white px-4 shadow-lg ">
      <span className="flex w-full flex-col px-4 pt-6 text-2xl">
        Items
        <span className="text-sm text-gray-500 pt-1"> Total {items.length} items on a website, {numOfVisibleItems} visible </span>
      </span>
      <div className="container py-4">
        <DataTable columns={columns} data={items} />
      </div>
    </div>
  );
}
