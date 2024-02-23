import ItemGallery from "~/components/item-display/item-gallery";
import { Toaster } from "~/components/ui/sonner";
import { api } from "~/utils/api";
import Head from "next/head";
import { MobileTopNavbar } from "~/components/navbar/mobile-top-navbar";

export default function Home() {
  api.items.getAll.useQuery();
  api.itemImages.getAll.useQuery();

  return (
    <>
      <Head>
        <title>2REN App</title>
        <meta name="description" content="Your management system" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="stylesheet" href="https://use.typekit.net/tzu8wjs.css" />
      </Head>
      <main className="flex h-screen justify-center">
        <MobileTopNavbar />
        <div className="flex h-full w-full flex-col gap-2  p-4 lg:w-2/3">
          <ItemGallery />
        </div>
      </main>
      <Toaster position="top-center" />
    </>
  );
}
