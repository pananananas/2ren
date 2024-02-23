import ItemGallery from "~/components/item-display/item-gallery";
import { api } from "~/utils/api";
import Head from "next/head";

export default function Home() {
  api.items.getAll.useQuery();
  api.itemImages.getAll.useQuery();

  return (
    <>
      <Head>
        <title>2REN App</title>
        <meta name="description" content="Your management system" />
        
      </Head>
      <main className="flex h-screen justify-center">
        <div className="flex h-full w-full flex-col gap-2  p-4 lg:w-2/3">
          <ItemGallery />
        </div>
      </main>
    </>
  );
}
