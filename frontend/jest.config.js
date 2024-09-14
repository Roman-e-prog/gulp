
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
      // for test files in the build folder
      testMatch: ['<rootDir>/build/**/*.test.js'],
      //using testRegex
      testRegex: '(/build/.*|(\\.|/)(test|spec))\\.jsx?$',
};

module.exports = config;