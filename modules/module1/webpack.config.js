const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
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
    port: 3003,
  },
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  devtool: false,
  plugins: [
    new ModuleFederationPlugin({
      name: "module1",
      remotes: {
        shared: "shared@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        'some-library': {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
  ],
};
