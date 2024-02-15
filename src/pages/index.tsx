import Head from "next/head";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/loading";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import ItemsTable from "~/components/dashboard-table/items-data-table";
import { CreateItemForm } from "~/components/item-manipulation/create-item-form";
import { UploadButton } from "~/utils/uploadthing";

const Content = () => {
  const { data, isLoading } = api.items.getAll.useQuery();

  if (isLoading) return <LoadingPage />;
  if (!data) return <div>No data</div>;

  return (
    <div className="flex flex-col">
      {data.map(({ item, author }) => (
        <div key={item.id} className="">
          {item.name} {item.price} {item.amount} {item.display}{" "}
          {item.description} {author?.firstName} {author?.lastName}
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  api.items.getAll.useQuery(); // pre-fetch items immidiately

  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (!userLoaded) return <LoadingPage />;

  // console.log(user)
  return (
    <>
      <Head>
        <title>2REN App</title>
        <meta name="description" content="Your management system" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="stylesheet" href="https://use.typekit.net/tzu8wjs.css" />
      </Head>
      <main className="flex h-screen justify-center">
        <div className="flex h-full w-full flex-col gap-2  p-4 md:w-2/3">
          <div>
            {!isSignedIn && <SignInButton />}
            {!!isSignedIn && <SignOutButton />}
          </div>
          <span className="text-3xl font-bold">Available products</span>
          <Content />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />

          {/* <ModeToggle /> */}
          <ItemsTable />
          {!!isSignedIn && <CreateItemForm />}
        </div>
      </main>
    </>
  );
}
