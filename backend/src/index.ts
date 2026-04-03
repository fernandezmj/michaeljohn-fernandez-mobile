import dotenv from 'dotenv';

// MUST be called before importing app.
// When Node.js evaluates `import app from './app'`, it also evaluates all modules
// that app.ts imports for the first time: routes → services → provider.ts.
// provider.ts reads process.env.ALCHEMY_API_KEY at module load time to construct the URL.
// If dotenv.config() runs after those imports, the env var will be undefined.
dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
