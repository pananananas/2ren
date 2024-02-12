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
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div>
          {!user.isSignedIn && <SignInButton />}
          {!!user.isSignedIn && <SignOutButton />}
        </div>
        <div>{data?.map((item) => <div key={item.id}> {item.name} </div>)}</div>
      </main>
    </>
  );
}
