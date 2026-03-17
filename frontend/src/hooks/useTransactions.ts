import { useState, useEffect, useCallback } from 'react';
import type { Transaction } from '../types';
import { getTransactions } from '../services/etherscan';

interface UseTransactionsReturn {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useTransactions(address: string | null): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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
        const txs = await getTransactions(address, 1, 10);
        if (!cancelled) setTransactions(txs);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [address, refreshCount]);

  const refresh = useCallback(() => setRefreshCount((c) => c + 1), []);
  return { transactions, loading, error, refresh };
}
