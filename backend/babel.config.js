module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: 'current',
        browsers: [
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 1 Safari versions',
          'last 1 iOS versions',
        ],
      },
    }],
  ],
}
