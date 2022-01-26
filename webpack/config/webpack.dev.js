const { merge } = require('webpack-merge');
const common = require('./webpack.common');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

  // server
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true, // HMR
    port: 8080,
  },

  // turn on and off
  // plugins: [
  //   new BundleAnalyzerPlugin()
  // ],

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
})