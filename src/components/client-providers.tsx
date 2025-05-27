"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";

import { ClosestSectionProvider } from "./navbar/closest-section-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ClosestSectionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClosestSectionProvider>
  );
}
