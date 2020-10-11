const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env.local')
})

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    port: dotenv.parsed.APP_PORT,
    historyApiFallback: true,
    hot: false,
    hotOnly: false
  },
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: `http://localhost:${dotenv.parsed.APP_PORT}/`,
  },

  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'vue',
      library: { type: 'var', name: 'vue' },
      filename: 'vue.js',
      remotes: {},
      exposes: {
        './App': './src/bootstrap',
      },
      shared: [
        'babel-loader',
        '@babel/core',
        'vue-template-compiler',
        'vue-loader',
      ],
    }),
  ],
}
