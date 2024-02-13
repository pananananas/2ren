import { api } from "~/utils/api";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { LoadingPage } from "../loading";

export default function ItemsTable() {
  const { data, error, isLoading } = api.items.getAll.useQuery();

  const items = data ? data.map((entry) => entry.item) : [];

  if (isLoading) return <LoadingPage />;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="container py-4">
      <DataTable columns={columns} data={items} />
    </div>
  );
}
