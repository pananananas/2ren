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
          <div className="flex flex-wrap justify-center gap-4 pb-5 md:justify-start md:gap-5">
            <span className=" flex w-full justify-center pb-3 pt-20 text-3xl font-bold md:w-full md:justify-start md:pb-5 md:pt-32">
              Dashboard
            </span>
            <ItemsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
