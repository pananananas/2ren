import ItemsTable from "~/components/dashboard-table/items-data-table";
import { useUser } from "@clerk/nextjs";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import router from "next/router";

const Dashboard: React.FC = () => {
  api.items.getAll.useQuery();
  api.itemImages.getAll.useQuery();

  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) return <LoadingPage />;

  if (!isSignedIn)
    void router.push({
      pathname: "/",
    });

  return (
    <div>
      <div className="flex h-screen justify-center">
        <div className="flex h-full w-full flex-col gap-2  p-4 lg:w-2/3">
          <ItemsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
