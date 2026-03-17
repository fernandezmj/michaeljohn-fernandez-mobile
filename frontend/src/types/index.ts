export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timeStamp: string;
  gasUsed: string;
  gasPrice: string;
  isError: string;
  blockNumber: string;
  functionName: string;
  isInternal?: boolean;
}

export interface Balance {
  eth: string;
  wei: string;
  usdValue: string;
}

export interface NetworkStats {
  gasPrice: string;
  blockNumber: number;
}
