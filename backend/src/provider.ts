import { JsonRpcProvider, Network } from 'ethers';

const SEPOLIA_CHAIN_ID = 11155111;
const network = Network.from(SEPOLIA_CHAIN_ID);

// Singleton provider shared across all requests.
// staticNetwork prevents ethers.js from calling eth_chainId on every RPC request,
// which would double Alchemy compute unit usage unnecessarily.
export const provider = new JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  network,
  { staticNetwork: network }
);
