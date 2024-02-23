
import { MobileTopNavbar } from "~/components/navbar/mobile-top-navbar";
import { Toaster } from "~/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps} >
      <Component {...pageProps} />
      <MobileTopNavbar />
      <Toaster position="top-center" />

    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
