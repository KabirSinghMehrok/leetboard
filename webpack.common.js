const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    popup: path.resolve("./src/popup/Popup.jsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
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
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Leetboard",
      template: "./src/popup/popup.html",
      filename: "popup.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
    }),
  ],
  devServer: {
    static: './dist',
		client: {
			overlay: false,
		}
  },
  watchOptions: {
    ignored: ['**/node_modules', '**/dist', '**/public'],
  }
};
