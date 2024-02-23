import ItemsTable from "~/components/dashboard-table/items-data-table";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { LoadingPage } from "~/components/loading";
import { Button } from "~/components/ui/button";
import { api } from "~/utils/api";
import router from "next/router";

export default function Dashboard() {
  api.items.getAll.useQuery();
  api.itemImages.getAll.useQuery();

  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) return <LoadingPage />;

  if (!isSignedIn)
    void router.push({
      pathname: "/",
    });

  return (
    <div className="flex h-screen justify-center">
      <div className="flex h-full w-full flex-col gap-2  p-4 lg:w-2/3">
        <div className="absolute left-0 top-0 p-[5px] ">
          {!isSignedIn && (
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          )}
          {!!isSignedIn && (
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          )}
        </div>

        {!!isSignedIn && <ItemsTable />}
      </div>
    </div>
  );
}
