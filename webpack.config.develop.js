const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.common");

module.exports = merge(common, {
  mode: "development",
  entry: "./__tests__/integrate/index.ts",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist_test"),
  },
});
