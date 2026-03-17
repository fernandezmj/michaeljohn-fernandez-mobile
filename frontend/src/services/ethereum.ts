import { ethers } from 'ethers';
import { ALCHEMY_API_KEY } from '../config/constants';

const RPC_URL = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`;

export function getProvider(): ethers.JsonRpcProvider {
  return new ethers.JsonRpcProvider(RPC_URL);
}

export async function getBalance(address: string): Promise<string> {
  const provider = getProvider();
  const balanceWei = await provider.getBalance(address);
  return ethers.formatEther(balanceWei);
}

export async function getGasPrice(): Promise<string> {
  const provider = getProvider();
  const feeData = await provider.getFeeData();
  return ethers.formatUnits(feeData.gasPrice ?? 0n, 'gwei');
}

export async function getBlockNumber(): Promise<number> {
  const provider = getProvider();
  return provider.getBlockNumber();
}
