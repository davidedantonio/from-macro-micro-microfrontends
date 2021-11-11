const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const { DefinePlugin } = require('webpack')
const path = require('path')
const deps = require('./package.json').dependencies
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env.local')
})

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: dotenv.parsed.APP_PORT,
    historyApiFallback: true,
    hot: false
  },
  output: {
    publicPath: `http://localhost:${dotenv.parsed.APP_PORT}/`,
    chunkFilename: '[id].[contenthash].js',
  },
  resolve: {
    alias: {
      events: 'events',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
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
    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed)
    }),
    new ModuleFederationPlugin({
      name: 'users',
      library: { type: 'var', name: 'users' },
      filename: 'users.js',
      remotes: {
        shell: 'shell',
        auth: 'auth',
        tickets: 'tickets',
        vue: 'vue',
        nav: 'nav'
      },
      exposes: {
        './Users': './src/components/Users'
      },
      shared: [
        {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.ejs',
      templateParameters: {
        ...dotenv.parsed
      }
    })
  ],
}
