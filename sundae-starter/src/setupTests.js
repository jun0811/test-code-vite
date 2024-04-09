import '@testing-library/jest-dom';

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../mocks/server';

// Establish API Mocking before all tests
beforeAll(() => server.listen());

// Reset any req handlers that we may add during tests
afterEach(() => server.resetHandlers());

// Clean-Up
afterAll(() => server.close());
