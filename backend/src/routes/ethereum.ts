import { Router, Request, Response, NextFunction } from 'express';
import { EthereumService } from '../services/ethereum';
import { validateAddress } from '../middleware/validation';

export const ethereumRouter = Router();
const ethService = new EthereumService();

// GET /api/ethereum/:address
ethereumRouter.get(
  '/:address',
  validateAddress,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await ethService.getAccountDetails(req.params.address as string);
      res.json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
);
