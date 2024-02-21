import Head from "next/head";
import { Toaster } from "~/components/ui/sonner"

import { api } from "~/utils/api";
import ItemGallery from "~/components/item-display/item-gallery";
import { LoadingPage } from "~/components/loading";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import ItemsTable from "~/components/dashboard-table/items-data-table";
import { ItemCreateForm } from "~/components/item-manipulation/item-create-form";
import { Button } from "~/components/ui/button";

export default function Home() {
  api.items.getAll.useQuery();
  api.itemImages.getAll.useQuery();

  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) return <LoadingPage />;

  return (
    <>
      <Head>
        <title>2REN App</title>
        <meta name="description" content="Your management system" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="stylesheet" href="https://use.typekit.net/tzu8wjs.css" />
      </Head>
      <main className="flex h-screen justify-center">
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

          {!!isSignedIn && <ItemCreateForm />}

          <ItemGallery />

          {!!isSignedIn && <ItemsTable />}
        </div>
      </main>
      <Toaster />
    </>
  );
}
