"use client";
import React from "react";
import Nav from "../Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col gap-20 p-5 max-w-screen-xl mx-auto">
        {children}
      </main>
    </QueryClientProvider>
  );
}
