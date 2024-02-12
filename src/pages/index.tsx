import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import Head from "next/head";
import { CreateItem } from "~/components/CreateItem";
import { ModeToggle } from "~/components/theme-provider";

export default function Home() {
  const user = useUser();
  const { data, isLoading } = api.items.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>2REN App</title>
        <meta name="description" content="Your management system" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="stylesheet" href="https://use.typekit.net/tzu8wjs.css" />
      </Head>
      <main className="flex h-screen justify-center ">
        <div className="flex h-full w-full flex-col p-4 md:w-2/3">
          <div>
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>
          <span className="text-3xl font-bold">Available products</span>
          <div>
            {data?.map((item) => <div key={item.id}> {item.name} </div>)}
          </div>

          {!!user.isSignedIn && <CreateItem />}

          <ModeToggle />
        </div>
      </main>
    </>
  );
}
