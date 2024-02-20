import Head from "next/head";
import { api } from "~/utils/api";
import ItemGallery from "~/components/item-display/item-gallery";
import { LoadingPage } from "~/components/loading";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import ItemsTable from "~/components/dashboard-table/items-data-table";

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
            {!isSignedIn && <SignInButton />}
            {!!isSignedIn && <SignOutButton />}
          </div>
          <span className="pb-3 pt-20 text-3xl font-bold md:pb-5 md:pt-32">
            Available products
          </span>

          <ItemGallery />

          {!!isSignedIn && <ItemsTable />}
        </div>
      </main>
    </>
  );
}
