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

// Health check — registered before rate limiter so it is never blocked
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Rate limiting — 100 requests per 15 minutes per IP (scoped to /api only)
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: { success: false, error: 'Too many requests, please try again later.' },
}));

app.use(express.json());

// Routes
app.use('/api/ethereum', ethereumRouter);

// Error handler MUST be last
app.use(errorHandler);

export default app;
