import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider,
  useAccount,
  useWaitForTransactionReceipt,
  useReadContract,
  useWriteContract,
} from 'wagmi';
import { useEffect, useState } from "react";
import {
  mainnet,
  base,
  morphSepolia,
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Account } from '@/components/Account';
import { RainbowWallet} from '@/components/RainbowWallet';

const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: 'b0120b9465db2e40a4e23495eee8ccbd',
  chains: [mainnet, base, morphSepolia, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});



function ConnectWallet() {
  return <RainbowWallet/>
}

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
        <ConnectWallet />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};