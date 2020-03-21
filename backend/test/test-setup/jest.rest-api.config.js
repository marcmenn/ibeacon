module.exports = {
  rootDir: '../..',
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testRegex: [
    /.*\/test\/.*\.rest-api\.js(x)?$/,
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/temp/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  globalSetup: './test/test-setup/rest-api-setup.js',
  globalTeardown: './test/test-setup/rest-api-teardown.js',
}
