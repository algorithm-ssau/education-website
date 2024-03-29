import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  roots: ['<rootDir>'],
  moduleDirectories: ['src', 'node_modules'],
  modulePaths: ['<rootDir>'],
  transform: {
    '\\.html$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
  }
};

export default config;