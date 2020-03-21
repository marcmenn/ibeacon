module.exports = {
  rootDir: '../..',
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testRegex: [
    /.*\/test\/.*\.unit\.js(x)?$/,
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/temp/',
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: [
  ],
}
