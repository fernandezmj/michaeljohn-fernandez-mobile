import { Request, Response, NextFunction } from 'express';
import { validateAddress } from '../middleware/validation';

// Helpers to create mock Express objects
function mockReq(address?: string): Partial<Request> {
  return { params: address ? { address } : {} };
}

function mockRes(): { status: jest.Mock; json: jest.Mock } {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
}

describe('validateAddress middleware', () => {
  let next: jest.Mock;

  beforeEach(() => {
    next = jest.fn();
  });

  it('returns 400 when address param is missing', () => {
    const req = mockReq();
    const res = mockRes();
    validateAddress(req as Request, res as unknown as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Address parameter is required',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 400 for an invalid Ethereum address', () => {
    const req = mockReq('not-an-address');
    const res = mockRes();
    validateAddress(req as Request, res as unknown as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Invalid Ethereum address format',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 400 for the zero address', () => {
    const req = mockReq('0x0000000000000000000000000000000000000000');
    const res = mockRes();
    validateAddress(req as Request, res as unknown as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: 'Invalid Ethereum address format',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next() for a valid checksummed address', () => {
    const req = mockReq('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
    const res = mockRes();
    validateAddress(req as Request, res as unknown as Response, next as NextFunction);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('normalizes a lowercase address to checksum format', () => {
    const lower = '0xd8da6bf26964af9d7eed9e03e53415d37aa96045';
    const checksummed = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    const req = mockReq(lower) as Request;
    const res = mockRes();
    validateAddress(req, res as unknown as Response, next as NextFunction);
    expect(next).toHaveBeenCalled();
    expect(req.params.address).toBe(checksummed);
  });
});
