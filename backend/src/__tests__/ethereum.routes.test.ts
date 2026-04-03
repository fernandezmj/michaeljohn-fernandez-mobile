import request from 'supertest';

// Mock the EthereumService BEFORE importing app.
// Jest hoists jest.mock() calls to the top of the file automatically,
// so this runs before the import statements even though it appears after them syntactically.
jest.mock('../services/ethereum', () => ({
  EthereumService: jest.fn().mockImplementation(() => ({
    getAccountDetails: jest.fn(),
  })),
}));

import { EthereumService } from '../services/ethereum';
import app from '../app';

// getMock() retrieves the getAccountDetails mock from the EthereumService instance
// that was created when routes/ethereum.ts was first imported (at module load time).
// Must be called inside test bodies, not at module scope, because the instance
// only exists after the module has been evaluated.
//
// Implementation note: we use mock.results[0].value (the object returned by the
// factory implementation) rather than mock.instances[0] (the constructor's `this`).
// When a constructor returns a non-null object, `new` returns that object — not `this`.
// mock.instances tracks `this`, so mock.instances[0].getAccountDetails is always
// undefined. mock.results[0].value is the correct returned instance.
//
// The instance reference is captured once at module scope (after imports resolve,
// before any clearAllMocks() call) so it survives jest.clearAllMocks() in beforeEach.
// clearAllMocks() empties mock.results/mock.instances arrays, but the JS object itself
// (and its getAccountDetails mock fn) stays alive via this reference.
const _ethServiceInstance = (EthereumService as jest.Mock).mock.results[0].value as any;
function getMock() {
  return _ethServiceInstance.getAccountDetails as jest.Mock;
}

const VALID_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const MOCK_ACCOUNT_DETAILS = {
  address: VALID_ADDRESS,
  balance: '1.5',
  balanceWei: '1500000000000000000',
  maxFeePerGas: '12.5',
  maxFeePerGasWei: '12500000000',
  maxPriorityFeePerGas: '1.5',
  maxPriorityFeePerGasWei: '1500000000',
  blockNumber: 7000000,
  network: 'sepolia',
  timestamp: '2026-03-24T10:00:00.000Z',
};

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('GET /api/ethereum/:address', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 200 with account details for a valid address', async () => {
    getMock().mockResolvedValue(MOCK_ACCOUNT_DETAILS);

    const res = await request(app).get(`/api/ethereum/${VALID_ADDRESS}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ success: true, data: MOCK_ACCOUNT_DETAILS });
  });

  it('returns 400 for an invalid address', async () => {
    const res = await request(app).get('/api/ethereum/not-an-address');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      success: false,
      error: 'Invalid Ethereum address format',
    });
  });

  it('returns 400 for the zero address', async () => {
    const res = await request(app).get(
      '/api/ethereum/0x0000000000000000000000000000000000000000'
    );
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 503 when the service throws a network error', async () => {
    getMock().mockRejectedValue(new Error('network connection failed'));

    const res = await request(app).get(`/api/ethereum/${VALID_ADDRESS}`);
    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
  });

  it('returns 500 when the service throws a generic error', async () => {
    getMock().mockRejectedValue(new Error('unexpected failure'));

    const res = await request(app).get(`/api/ethereum/${VALID_ADDRESS}`);
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });
});
