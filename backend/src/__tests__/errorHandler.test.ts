import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../middleware/errorHandler';

function mockRes(): { status: jest.Mock; json: jest.Mock } {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
}

describe('errorHandler middleware', () => {
  const req = {} as Request;
  const next = jest.fn() as unknown as NextFunction;

  it('returns 503 when error message contains "network"', () => {
    const res = mockRes();
    const err = new Error('network connection failed');
    errorHandler(err, req, res as unknown as Response, next);
    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Ethereum network unavailable. Please try again later.',
    });
  });

  it('returns 503 when error message contains "ECONNREFUSED"', () => {
    const res = mockRes();
    const err = new Error('connect ECONNREFUSED 127.0.0.1:8545');
    errorHandler(err, req, res as unknown as Response, next);
    expect(res.status).toHaveBeenCalledWith(503);
  });

  it('returns 503 when error message contains "timeout"', () => {
    const res = mockRes();
    const err = new Error('request timeout');
    errorHandler(err, req, res as unknown as Response, next);
    expect(res.status).toHaveBeenCalledWith(503);
  });

  it('returns 503 when ethers error code is NETWORK_ERROR', () => {
    const res = mockRes();
    const err = Object.assign(new Error('provider error'), { code: 'NETWORK_ERROR' });
    errorHandler(err, req, res as unknown as Response, next);
    expect(res.status).toHaveBeenCalledWith(503);
  });

  it('returns 500 for a generic error', () => {
    const res = mockRes();
    const err = new Error('something unexpected');
    errorHandler(err, req, res as unknown as Response, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Internal server error',
    });
  });
});
