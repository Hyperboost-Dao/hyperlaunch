import { http, createConfig } from 'wagmi'
import { avalancheFuji } from 'wagmi/chains'
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [ avalancheFuji],
    
    transports: {
      [avalancheFuji.id]: http(),
    },

    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    appName: "Tangelo DAO",
  }),
);