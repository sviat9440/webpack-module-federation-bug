const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: path.resolve(__dirname, './main.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    uniqueName: 'shared',
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3002,
  },
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  devtool: false,
  plugins: [
    new ModuleFederationPlugin({
      name: 'shared',
      filename: 'remoteEntry.js',
      exposes: {
        '.': path.join(__dirname, './main'),
      },
      shared: {
        'some-library': {
          singleton: true,
        },
      },
    }),
  ],
};
