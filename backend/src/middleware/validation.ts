import { Request, Response, NextFunction } from 'express';
import { isAddress, getAddress } from 'ethers';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export function validateAddress(req: Request, res: Response, next: NextFunction): void {
  const { address } = req.params;

  if (!address) {
    res.status(400).json({ success: false, error: 'Address parameter is required' });
    return;
  }

  if (!isAddress(address) || getAddress(address) === ZERO_ADDRESS) {
    res.status(400).json({ success: false, error: 'Invalid Ethereum address format' });
    return;
  }

  // Normalize to EIP-55 checksum format
  req.params.address = getAddress(address);
  next();
}
