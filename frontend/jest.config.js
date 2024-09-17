
const config = {
    verbose:true,
    transform: {
        "^.+\\.jsx$": "babel-jest", 
        "^.+\\.js$": "babel-jest", 
    },
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy" //for css imports jest not handles out of the box
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
      moduleDirectories: ['node_modules', '<rootDir>/', 'src'],
      collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
      moduleFileExtensions: ['js', 'mjs', 'jsx'],
      clearMocks: true,
      testMatch: ['<rootDir>/frontend/src/**/*.test.jsx'],
      testPathIgnorePatterns: ['/node_modules/', '/playwrightTests/', '/test-results/', 'playwright-report'],
      modulePathIgnorePatterns: ['<rootDir>/playwrightTests/.*\\.spec\\.js$'], 
};

module.exports = config;