
import { Navbar } from "~/components/navbar/navbar";
import { Toaster } from "~/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps} >
      <link rel="stylesheet" href="https://use.typekit.net/tzu8wjs.css" />
      <Component {...pageProps} />
      <Navbar />
      <Toaster position="top-center" />

    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
