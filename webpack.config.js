const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
   entry: {
      main: "./src/index.js", // メインのエントリーファイルのみ
   },
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].js",
      clean: true,
      publicPath: "/"
   },
   resolve: {
      alias: {
         '@fortawesome': path.resolve(__dirname, 'node_modules/@fortawesome'),
      },
   },
   mode: "production",
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader"
            }
         },
         {
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: "asset/resource",
            generator: {
               filename: "assets/images/[name][ext]"
            }
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[name][ext]',
            },
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html",
         filename: "index.html",
         chunks: ["main"] // index.html に main.js を適用
      }),
      new HtmlWebpackPlugin({
         template: "./src/about.html",
         filename: "about.html",
         chunks: [] // about.html には JS を適用しない
      }),
      new HtmlWebpackPlugin({
         template: "./src/contact.html",
         filename: "contact.html",
         chunks: ["main"] // contact.html に main.js を適用
      }),
      new MiniCssExtractPlugin({
         filename: "styles/[name].css"
      }),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/webfonts"),
               to: path.resolve(__dirname, "dist/assets/fonts"), // distにコピー
            },
            {
               from: path.resolve(__dirname, "src"), // src 内のすべてのファイルをコピー
               to: path.resolve(__dirname, "dist"),
               globOptions: {
                  ignore: ["**/*.js", "**/*.html"], // JS と HTML はコピーしない（HtmlWebpackPlugin が処理する）
               },
            },
         ]
      })
   ]
};
