import { LoadingPage } from "~/components/loading";
import { useUser } from "@clerk/nextjs";
import Head from "next/head";

const Dashboard: React.FC = () => {

  const { isLoaded: userLoaded, user } = useUser();

  if (!userLoaded) return <LoadingPage />;
  
  console.log(user);

  return (
    <>
      <Head>
        <title>2REN Contact</title>
        <meta name="description" content="Your management system" />
      </Head>
      <div className="flex h-screen justify-center">
        <div className="flex h-full w-full flex-col gap-2  p-4 lg:w-3/4">
          <div className="flex flex-wrap justify-center gap-4 pb-5 md:justify-start md:gap-5">
            <span className=" flex w-full justify-start pb-3 pl-4 pt-20 text-3xl font-bold md:w-full md:pb-5 md:pl-2 md:pt-32">
              Contact
            </span>
            
            <div className="h-20 w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
