import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  roots: ['./test/'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json', 
      },
    ],
  },
  moduleNameMapper: {
    // Add any path mappings if necessary
  },
  setupFilesAfterEnv: [], // Add setup files if needed
};

export default config;
