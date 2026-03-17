import axios from 'axios';
import type { Transaction } from '../types';
import { ETHERSCAN_API_KEY } from '../config/constants';

const BASE_URL = 'https://api.etherscan.io/v2/api';

const BASE_PARAMS = {
  chainid: 11155111,
  startblock: 0,
  endblock: 99999999,
  sort: 'desc',
  apikey: ETHERSCAN_API_KEY,
};

async function fetchTxList(address: string, page: number, offset: number): Promise<Transaction[]> {
  const response = await axios.get(BASE_URL, {
    params: { ...BASE_PARAMS, module: 'account', action: 'txlist', address, page, offset },
  });
  if (response.data.status === '1') return response.data.result;
  if (response.data.message === 'No transactions found') return [];
  throw new Error(response.data.message || 'Etherscan API error');
}

async function fetchInternalTxList(address: string, page: number, offset: number): Promise<Transaction[]> {
  const response = await axios.get(BASE_URL, {
    params: { ...BASE_PARAMS, module: 'account', action: 'txlistinternal', address, page, offset },
  });
  if (response.data.status === '1') {
    return response.data.result.map((tx: Transaction) => ({
      ...tx,
      gasPrice: tx.gasPrice ?? '0',
      functionName: tx.functionName ?? '',
      isInternal: true,
    }));
  }
  return [];
}

export async function getTransactions(
  address: string,
  page = 1,
  offset = 10,
): Promise<Transaction[]> {
  try {
    const [normal, internal] = await Promise.allSettled([
      fetchTxList(address, page, offset),
      fetchInternalTxList(address, page, offset),
    ]);

    const normalTxs = normal.status === 'fulfilled' ? normal.value : [];
    const internalTxs = internal.status === 'fulfilled' ? internal.value : [];

    const seen = new Set<string>();
    const merged: Transaction[] = [];

    for (const tx of [...normalTxs, ...internalTxs]) {
      const key = `${tx.hash}-${tx.isInternal ? 'i' : 'n'}`;
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(tx);
      }
    }

    return merged.sort((a, b) => Number(b.timeStamp) - Number(a.timeStamp)).slice(0, offset);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Network error: ${error.message}`);
    }
    throw error;
  }
}
