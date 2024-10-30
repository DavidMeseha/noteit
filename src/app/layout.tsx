import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import AppProvider from "../components/layots/AppProvider";
import Nav from "@/components/Nav";
import { ToastContainer } from "react-toastify";
import "@/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

// const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  // metadataBase: new URL(defaultUrl),
  title: " TODO-IT",
  description: "A basic supabase and next.js sample with tanstack query"
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
