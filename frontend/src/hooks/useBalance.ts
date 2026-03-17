import { useState, useEffect, useCallback } from 'react';
import { getBalance, getGasPrice, getBlockNumber } from '../services/ethereum';

interface UseBalanceReturn {
  eth: string | null;
  usdValue: string | null;
  gasPrice: string | null;
  blockNumber: number | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useBalance(address: string | null): UseBalanceReturn {
  const [eth, setEth] = useState<string | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    if (!address) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [bal, gas, block] = await Promise.all([
          getBalance(address),
          getGasPrice(),
          getBlockNumber(),
        ]);
        if (cancelled) return;
        setEth(parseFloat(bal).toFixed(6));
        setGasPrice(parseFloat(gas).toFixed(2));
        setBlockNumber(block);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch balance');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    const interval = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [address, refreshCount]);

  const refresh = useCallback(() => setRefreshCount((c) => c + 1), []);

  // USD value placeholder — Tier 4 can wire in a price API
  return { eth, usdValue: null, gasPrice, blockNumber, loading, error, refresh };
}
