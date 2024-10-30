import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Nav />
          <AppProvider>{children}</AppProvider>
        </ThemeProvider>
        <ToastContainer theme="dark" />
      </body>
    </html>
  );
}
