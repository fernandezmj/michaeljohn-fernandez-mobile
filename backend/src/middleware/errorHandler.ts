import { Request, Response, NextFunction } from 'express';

interface EthersError extends Error {
  code?: string;
}

export function errorHandler(
  err: EthersError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('API Error:', err.message);

  const isNetworkError =
    err.code === 'NETWORK_ERROR' ||
    err.message.toLowerCase().includes('network') ||
    err.message.includes('ECONNREFUSED') ||
    err.message.toLowerCase().includes('timeout');

  if (isNetworkError) {
    res.status(503).json({
      success: false,
      error: 'Ethereum network unavailable. Please try again later.',
    });
    return;
  }

  res.status(500).json({ success: false, error: 'Internal server error' });
}
