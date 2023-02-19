const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
const IS_PROD = NODE_ENV === "production" ? true : false;
const IS_DEV = NODE_ENV === "development" ? true : false;

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  mode: NODE_ENV ? NODE_ENV : "development",
  entry: ["@babel/polyfill", "./src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.[tj]sx?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.(sass)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
                auto: (resourcePath) => !resourcePath.endsWith(".m.css"),
              },
            },
          },
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: path.resolve("./src/style", "variables.sass"),
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]--[hash:base64:5]",
                auto: (resourcePath) => !resourcePath.endsWith(".m.css"),
              },
            },
          },
        ],
      },
      {
        test: /\.(jpeg|png|jpg)$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.svg$/,
        resourceQuery: /svgr/,
        use: [
          {
            loader: "@svgr/webpack",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: IS_PROD ? IS_PROD : false,
  },
  devtool: IS_PROD ? false : "source-map",
};
