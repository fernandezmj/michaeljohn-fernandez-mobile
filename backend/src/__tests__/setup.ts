// setupFiles runs before the Jest framework is installed.
// Only use this file for environment variables and polyfills.
// Do NOT add jest.fn() or jest.mock() here — Jest is not yet available.
// For global mocks, use setupFilesAfterFramework in package.json instead.
process.env.ALCHEMY_API_KEY = 'test-api-key';
process.env.PORT = '3001';
process.env.NODE_ENV = 'test';
