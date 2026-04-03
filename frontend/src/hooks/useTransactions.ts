import { useState, useEffect, useCallback } from 'react'
import type { Transaction } from '../types'
import { getTransactions } from '../services/etherscan'

const DEMO_TRANSACTIONS: Transaction[] = [
  {
    hash: '0xabc1000000000000000000000000000000000000000000000000000000000001',
    from: '0x18a2D1F5D8E8a4C3b7F9E6D2A0B3C5E7F8A9B1C3',
    to: '0x3fA6E31204E24D8a9B5C7D1E0F2A4B6C8D9E0F12',
    value: '20000000000000000',
    timeStamp: '1741910400',
    gasUsed: '21000',
    gasPrice: '1500000000',
    isError: '0',
    blockNumber: '10498210',
    functionName: '',
  },
  {
    hash: '0xabc2000000000000000000000000000000000000000000000000000000000002',
    from: '0x9bC3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1',
    to: '0x18a2D1F5D8E8a4C3b7F9E6D2A0B3C5E7F8A9B1C3',
    value: '150000000000000000',
    timeStamp: '1741824000',
    gasUsed: '21000',
    gasPrice: '1200000000',
    isError: '0',
    blockNumber: '10491050',
    functionName: '',
  },
  {
    hash: '0xabc3000000000000000000000000000000000000000000000000000000000003',
    from: '0x18a2D1F5D8E8a4C3b7F9E6D2A0B3C5E7F8A9B1C3',
    to: '0xDeF1234567890AbCdEf1234567890AbCdEf12345',
    value: '500000000000000000',
    timeStamp: '1741737600',
    gasUsed: '21000',
    gasPrice: '2000000000',
    isError: '1',
    blockNumber: '10483890',
    functionName: '',
  },
  {
    hash: '0xabc4000000000000000000000000000000000000000000000000000000000004',
    from: '0x18a2D1F5D8E8a4C3b7F9E6D2A0B3C5E7F8A9B1C3',
    to: '0x7aB2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0',
    value: '10000000000000000',
    timeStamp: '1741651200',
    gasUsed: '21000',
    gasPrice: '1800000000',
    isError: '0',
    blockNumber: '10476730',
    functionName: '',
  },
  {
    hash: '0xabc5000000000000000000000000000000000000000000000000000000000005',
    from: '0x5cD4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2',
    to: '0x18a2D1F5D8E8a4C3b7F9E6D2A0B3C5E7F8A9B1C3',
    value: '75000000000000000',
    timeStamp: '1741564800',
    gasUsed: '21000',
    gasPrice: '1100000000',
    isError: '0',
    blockNumber: '10469570',
    functionName: '',
  },
  {
    hash: '0xabc6000000000000000000000000000000000000000000000000000000000006',
    from: '0x18a2D1F5D8E8a4C3b7F9E6D2A0B3C5E7F8A9B1C3',
    to: '0x2eF3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F1',
    value: '250000000000000000',
    timeStamp: '1741478400',
    gasUsed: '21000',
    gasPrice: '1600000000',
    isError: '0',
    blockNumber: '10462410',
    functionName: '',
  },
  {
    hash: '0xabc7000000000000000000000000000000000000000000000000000000000007',
    from: '0x18a2D1F5D8E8a4C3b7F9E6D2A0B3C5E7F8A9B1C3',
    to: '0x8fA0B1C2D3E4F5A6B7C8D9E0F1A2B3C4D5E6F7A8',
    value: '5000000000000000',
    timeStamp: '1741392000',
    gasUsed: '21000',
    gasPrice: '1300000000',
    isError: '1',
    blockNumber: '10455250',
    functionName: '',
  },
  {
    hash: '0xabc8000000000000000000000000000000000000000000000000000000000008',
    from: '0x1bB2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0',
    to: '0x18a2D1F5D8E8a4C3b7F9E6D2A0B3C5E7F8A9B1C3',
    value: '1000000000000000000',
    timeStamp: '1741305600',
    gasUsed: '21000',
    gasPrice: '1400000000',
    isError: '0',
    blockNumber: '10448090',
    functionName: '',
  },
  {
    hash: '0xabc9000000000000000000000000000000000000000000000000000000000009',
    from: '0x18a2D1F5D8E8a4C3b7F9E6D2A0B3C5E7F8A9B1C3',
    to: '0x6cC7D8E9F0A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5',
    value: '30000000000000000',
    timeStamp: '1741219200',
    gasUsed: '21000',
    gasPrice: '1700000000',
    isError: '0',
    blockNumber: '10440930',
    functionName: '',
  },
]

interface UseTransactionsReturn {
  transactions: Transaction[]
  loading: boolean
  error: string | null
  refresh: () => void
}

export function useTransactions(address: string | null): UseTransactionsReturn {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    if (!address) return
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const txs = await getTransactions(address, 1, 10)
        if (!cancelled) setTransactions([...txs, ...DEMO_TRANSACTIONS])
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch transactions')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [address, refreshCount])

  const refresh = useCallback(() => setRefreshCount((c) => c + 1), [])
  return { transactions, loading, error, refresh }
}
