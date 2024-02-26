import DataTableCard from "~/components/dashboard-table/data-table-card";
import { LoadingPage } from "~/components/loading";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import router from "next/router";
import Head from "next/head";

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
    <>
      <Head>
        <title>2REN Dashboard</title>
        <meta name="description" content="Your management system" />
      </Head>
      <div className="flex h-screen justify-center">
        <div className="flex h-full w-full flex-col gap-2  p-4 lg:w-3/4">
          <div className="flex flex-wrap justify-center gap-4 pb-5 md:justify-start md:gap-5">
            <span className=" flex w-full justify-start pb-3 pl-4 pt-20 text-3xl font-bold md:w-full md:pb-5 md:pl-2 md:pt-32">
              Dashboard
            </span>
            <DataTableCard />
            <div className="h-20 w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
