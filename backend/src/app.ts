import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ethereumRouter } from './routes/ethereum';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Safety middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting — 100 requests per 15 minutes per IP
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100, // Note: express-rate-limit v7+ renamed `max` to `limit`
    message: { success: false, error: 'Too many requests, please try again later.' },
  })
);

// Routes
app.use('/api/ethereum', ethereumRouter);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Error handler MUST be last
app.use(errorHandler);

export default app;
