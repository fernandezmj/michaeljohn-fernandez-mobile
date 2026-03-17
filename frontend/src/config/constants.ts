export const ALCHEMY_API_KEY = process.env.EXPO_PUBLIC_ALCHEMY_API_KEY ?? '';
export const ETHERSCAN_API_KEY = process.env.EXPO_PUBLIC_ETHERSCAN_API_KEY ?? '';

export const SEPOLIA_CHAIN = {
  id: 11155111,
  name: 'Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`] as readonly string[],
    },
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  chainNamespace: 'eip155' as const,
  caipNetworkId: 'eip155:11155111' as const,
  testnet: true,
};

export const CONTRACT_ADDRESS = process.env.EXPO_PUBLIC_CONTRACT_ADDRESS ?? '';
