module.exports = {
    preset: 'jest-playwright-preset',
    testEnvironment: 'jest-playwright-preset',
    testPathIgnorePatterns: ['/node_modules/'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  };