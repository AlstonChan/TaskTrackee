const webpack = require("webpack");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  // Rules of how webpack will take our files, compile & bundle them for the browser
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|avif|heic|heif|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[base]",
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new Dotenv({ safe: true, systemvars: true }),
  ],
  resolve: {
    alias: {
      $Public: path.resolve(__dirname, "public/"),
      $Icon: path.resolve(__dirname, "public/icon/"),
      $Lib: path.resolve(__dirname, "src/lib/"),
      $Routes: path.resolve(__dirname, "src/routes/"),
      $Styles: path.resolve(__dirname, "src/styles/"),
      $Components: path.resolve(__dirname, "src/components/"),
    },
    extensions: [".tsx", ".ts", ".jsx", ".js", ".scss"],
    plugins: [
      new TsconfigPathsPlugin({
        /* options: see below */
      }),
    ],
  },
  target: "web",
};
