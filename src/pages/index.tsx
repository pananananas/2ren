import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const user = useUser();
  const { data } = api.items.getAll.useQuery();

  return (
    <>
      <Head>
        <title>2REN App</title>
        <meta name="description" content="Your management system" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="stylesheet" href="https://use.typekit.net/tzu8wjs.css" />
      </Head>
      <main className="flex h-screen justify-center ">
        <div className="flex h-full w-full flex-col  border-2 border-lime-900 md:w-2/3">
          <div>
            {!user.isSignedIn && <SignInButton />}
            {!!user.isSignedIn && <SignOutButton />}
          </div>
          <span className="text-3xl font-bold">Available products</span>
          <div>
            {data?.map((item) => <div key={item.id}> {item.name} </div>)}
          </div>
        </div>
      </main>
    </>
  );
}
