import { http, createConfig } from 'wagmi'
import { morphSepolia, sepolia } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [morphSepolia,sepolia],
  connectors: [
    metaMask(),
  ],
  transports: {
    [morphSepolia.id]: http(),
    [sepolia.id]: http(),
  },
})