const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  devtool: false,
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist"),
  },
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
  plugins: [new CleanWebpackPlugin()],
};
