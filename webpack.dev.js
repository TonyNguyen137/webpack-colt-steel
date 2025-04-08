const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = (env, argv) => {
  return merge(common, {
    mode: "development",
    devtool: "source-map",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "static/[name].min.js",
    },
    stats: {
      // enables scss @debug
      loggingDebug: ["sass-loader"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack App",
        filename: "index.html",
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: (pathData) => {
          return pathData.chunk.name === "index"
            ? "static/style.min.css"
            : "static/[name].min.css";
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/i,
          // 1. sass-loader compiles Sass to CSS,
          // 2. css-loader resolves @import and url() like import/require()
          // css-loader loads the CSS file,
          // 3. style-loader injects CSS into the DOM
          // 4. MiniCssExtractPlugin.loader extracts CSS into separate files

          // use: ["style-loader", "css-loader", "sass-loader"],
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
  });
};
