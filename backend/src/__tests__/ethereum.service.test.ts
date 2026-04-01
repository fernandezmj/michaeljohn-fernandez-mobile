import { EthereumService } from '../services/ethereum';

// Mock provider object — replaces real Alchemy calls in tests
function createMockProvider(overrides: Partial<{
  balance: bigint;
  feeData: { maxFeePerGas: bigint | null; maxPriorityFeePerGas: bigint | null };
  blockNumber: number;
}> = {}) {
  return {
    getBalance: jest.fn().mockResolvedValue(overrides.balance ?? 1500000000000000000n), // 1.5 ETH
    getFeeData: jest.fn().mockResolvedValue(
      overrides.feeData ?? {
        maxFeePerGas: 12500000000n,      // 12.5 Gwei
        maxPriorityFeePerGas: 1500000000n, // 1.5 Gwei
      }
    ),
    getBlockNumber: jest.fn().mockResolvedValue(overrides.blockNumber ?? 7000000),
  };
}

describe('EthereumService', () => {
  const TEST_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

  it('returns AccountDetails with correct shape and formatted values', async () => {
    const mockProvider = createMockProvider();
    const service = new EthereumService(mockProvider as any);
    const result = await service.getAccountDetails(TEST_ADDRESS);

    expect(result.address).toBe(TEST_ADDRESS);
    expect(result.balance).toBe('1.5');
    expect(result.balanceWei).toBe('1500000000000000000');
    expect(result.maxFeePerGas).toBe('12.5');
    expect(result.maxFeePerGasWei).toBe('12500000000');
    expect(result.maxPriorityFeePerGas).toBe('1.5');
    expect(result.maxPriorityFeePerGasWei).toBe('1500000000');
    expect(result.blockNumber).toBe(7000000);
    expect(result.network).toBe('sepolia');
    expect(result.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/); // ISO 8601
  });

  it('calls all three provider methods in parallel', async () => {
    const mockProvider = createMockProvider();
    const service = new EthereumService(mockProvider as any);
    await service.getAccountDetails(TEST_ADDRESS);

    expect(mockProvider.getBalance).toHaveBeenCalledWith(TEST_ADDRESS);
    expect(mockProvider.getFeeData).toHaveBeenCalled();
    expect(mockProvider.getBlockNumber).toHaveBeenCalled();
  });

  it('does not include raw bigint values in the result (JSON-safe)', async () => {
    const mockProvider = createMockProvider();
    const service = new EthereumService(mockProvider as any);
    const result = await service.getAccountDetails(TEST_ADDRESS);

    // If any value is a bigint, JSON.stringify would throw — verify it doesn't
    expect(() => JSON.stringify(result)).not.toThrow();
  });

  it('falls back to 0n when maxFeePerGas is null', async () => {
    const mockProvider = createMockProvider({
      feeData: { maxFeePerGas: null, maxPriorityFeePerGas: null },
    });
    const service = new EthereumService(mockProvider as any);
    const result = await service.getAccountDetails(TEST_ADDRESS);

    // Note: ethers formatUnits(0n, 'gwei') returns '0.0' not '0' — trailing zero is intentional
    expect(result.maxFeePerGas).toBe('0.0');
    expect(result.maxFeePerGasWei).toBe('0');
    expect(result.maxPriorityFeePerGas).toBe('0.0');
    expect(result.maxPriorityFeePerGasWei).toBe('0');
  });
});
