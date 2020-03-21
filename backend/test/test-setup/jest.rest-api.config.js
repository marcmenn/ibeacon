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
}
