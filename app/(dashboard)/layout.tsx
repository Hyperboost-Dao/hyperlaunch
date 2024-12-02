"use client";
import React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "@/lib/wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import Navbar from "@/components/navbar";

const queryClient = new QueryClient();

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider theme="midnight">
            <Navbar />
            {children}
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
