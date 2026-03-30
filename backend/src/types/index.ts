export interface AccountDetails {
  address: string;
  balance: string;                 // ETH, human-readable (e.g. "1.234567")
  balanceWei: string;              // wei as decimal string (NOT bigint)
  maxFeePerGas: string;            // Gwei, human-readable — EIP-1559 total fee ceiling
  maxFeePerGasWei: string;         // wei as decimal string
  maxPriorityFeePerGas: string;    // Gwei, human-readable — miner tip
  maxPriorityFeePerGasWei: string; // wei as decimal string
  blockNumber: number;
  network: string;
  timestamp: string;               // ISO 8601
}
