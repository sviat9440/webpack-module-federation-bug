const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  target: 'node',
  devtool: false,
  plugins: [
    new ModuleFederationPlugin({
      shared: {
        'some-library/': {
          singleton: true,
        },
      },
    }),
  ]
};
