const path = require("node:path");

module.exports = {
  entry: { index: "./src/index.js" },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpe?g|avif|svg|webp)$/i,
        type: "asset", // Automatically chooses between inline/resource
        generator: {
          filename: "static/[name][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024, // 4kb - files smaller will be inlined
          },
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/[name][ext]",
        },
      },
      {
        test: /sprite\.svg$/,
        type: "asset/resource",
        generator: {
          filename: "static/[name][ext]",
        },
      },
    ],
  },
};
