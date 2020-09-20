const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const { DefinePlugin } = require("webpack");
const path = require("path");
const deps = require("./package.json").dependencies;
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
});

module.exports = {
  entry: "./src/index",
  mode: "development",
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, "dist"),
    port: dotenv.parsed.APP_PORT,
    historyApiFallback: true,
    hot: false,
    hotOnly: false,
  },
  output: {
    publicPath: `http://localhost:${dotenv.parsed.APP_PORT}/`,
    chunkFilename: "[id].[contenthash].js",
  },
  resolve: {
    alias: {
      events: "events",
    },
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
    new DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed)
    }),
    new ModuleFederationPlugin({
      name: "tickets",
      library: { type: "var", name: "tickets" },
      filename: "tickets.js",
      remotes: {
        shell: "shell",
        auth: "auth",
        users: "users",
        vue: "vue",
        nav: "nav"
      },
      exposes: {
        "./Tickets": "./src/components/Tickets"
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
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.ejs",
      templateParameters: {
        ...dotenv.parsed
      },
    }),
  ],
};
