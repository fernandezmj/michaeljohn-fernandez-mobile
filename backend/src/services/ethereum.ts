import { formatEther, formatUnits } from 'ethers';
import { provider } from '../provider';
import { AccountDetails } from '../types';

// Structural type (TypeScript duck typing): any object with these three methods satisfies it.
// This allows the test suite to pass a mock object as `any` without needing to fake the
// entire JsonRpcProvider. The real provider singleton satisfies it at runtime.
type EthProvider = Pick<typeof provider, 'getBalance' | 'getFeeData' | 'getBlockNumber'>;

export class EthereumService {
  // Accept a provider via constructor — defaults to singleton, injectable in tests
  constructor(private _provider: EthProvider = provider) {}

  async getAccountDetails(address: string): Promise<AccountDetails> {
    const [balanceWei, feeData, blockNumber] = await Promise.all([
      this._provider.getBalance(address),
      this._provider.getFeeData(),
      this._provider.getBlockNumber(),
    ]);

    // Sepolia is EIP-1559 — gasPrice is null; use maxFeePerGas
    const maxFee = feeData.maxFeePerGas ?? 0n;
    const maxPriorityFee = feeData.maxPriorityFeePerGas ?? 0n;

    return {
      address,
      balance: formatEther(balanceWei),
      balanceWei: balanceWei.toString(),
      maxFeePerGas: formatUnits(maxFee, 'gwei'),
      maxFeePerGasWei: maxFee.toString(),
      maxPriorityFeePerGas: formatUnits(maxPriorityFee, 'gwei'),
      maxPriorityFeePerGasWei: maxPriorityFee.toString(),
      blockNumber,
      network: 'sepolia',
      timestamp: new Date().toISOString(),
    };
  }
}
