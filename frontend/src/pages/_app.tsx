import NotificationProvider from "@/context/ToasterContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <NotificationProvider>
        <Component {...pageProps} />
      </NotificationProvider>
    </SessionProvider>
  );
}
