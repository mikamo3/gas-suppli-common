const path = require("path");
const GasPlugin = require("gas-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  devtool: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      model: path.resolve(__dirname, "./src/model"),
      testhelper: path.resolve(__dirname, "./__testhelper__"),
      datastore: path.resolve(__dirname, "./src/datastore"),
      repository: path.resolve(__dirname, "./src/repository"),
      constant: path.resolve(__dirname, "./src/constant"),
      env: path.resolve(__dirname, "./src/env"),
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new GasPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "./appsscript.json", to: "./" }]),
    new webpack.DefinePlugin({
      "precess.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
