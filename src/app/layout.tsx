import { GeistSans } from "geist/font/sans";
import AppProvider from "../components/layots/AppProvider";
import Nav from "@/components/Nav";
import { ToastContainer } from "react-toastify";
import { Metadata } from "next";
import "@/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

export const metadata: Metadata = {
  title: " TODO-IT",
  description: "A basic supabase and next.js sample with tanstack query",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Nav />
        <AppProvider>{children}</AppProvider>
        <ToastContainer toastStyle={{ backgroundColor: "#131b26" }} />
      </body>
    </html>
  );
}
