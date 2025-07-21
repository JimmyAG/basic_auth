/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
}
