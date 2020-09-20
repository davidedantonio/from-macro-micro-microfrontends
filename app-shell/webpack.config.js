const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin
const path = require('path')
const deps = require('./package.json').dependencies
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
});

module.exports = {
  entry: './src/index',
  mode: 'development',
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, 'dist'),
    port: dotenv.parsed.APP_PORT,
    historyApiFallback: true,
    hot: false,
    hotOnly: false
  },
  resolve: {
    alias: {
      events: 'events'
    }
  },
  output: {
    publicPath: `http://localhost:${dotenv.parsed.APP_PORT}/`,
    chunkFilename: "[id].[contenthash].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      library: { type: "var", name: "shell" },
      filename: "appShell.js",
      remotes: {
        nav: "nav",
        auth: "auth",
        users: "users",
        tickets: "tickets",
        vue: "vue"
      },
      exposes: {
        "./AppShell": "./src/components/AppShell",
        "./Service": "./src/components/Service"
      },
      shared: [
        {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
        "./src/components/Service",
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.ejs",
      templateParameters: {
        ...dotenv.parsed
      },
    })
  ]
}