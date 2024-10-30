"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="mx-auto flex max-w-screen-xl flex-col gap-20 p-5">{children}</main>
    </QueryClientProvider>
  );
}
