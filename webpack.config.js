const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
   devtool: "source-map",
   entry: {
      main: "./src/index.js",
   },
   output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/main.js",
      clean: true,
      publicPath: "./"
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
            test: /\.js$/i,
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
         chunks: ["main"]
      }),
      new HtmlWebpackPlugin({
         template: "./src/about.html",
         filename: "about.html",
         chunks: ["main"]
      }),
      new HtmlWebpackPlugin({
         template: "./src/service.html",
         filename: "service.html",
         chunks: ["main"]
      }),
      new HtmlWebpackPlugin({
         template: "./src/contact.html",
         filename: "contact.html",
         chunks: ["main"]
      }),
      new HtmlWebpackPlugin({
         template: "./src/policy.html",
         filename: "policy.html",
         chunks: ["main"]
      }),
      new HtmlWebpackPlugin({
         template: "./src/blog/categories.html",
         filename: "categories.html",
         chunks: ["main"]
      }),
      new HtmlWebpackPlugin({
         template: "./src/header.html",
         filename: "header.html",
         chunks: ["main"]
      }),
      new HtmlWebpackPlugin({
         template: "./src/footer.html",
         filename: "footer.html",
         chunks: ["main"]
      }),
      new MiniCssExtractPlugin({
         filename: "styles/main.css"
      }),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/webfonts"),
               to: path.resolve(__dirname, "dist/assets/fonts"),
            },
            {
               from: path.resolve(__dirname, "src"),
               to: path.resolve(__dirname, "dist"),
               globOptions: {
                  ignore: ["**/*.js", "**/*.html"], // HTML と JS は Webpack で処理するためコピーしない
               },
            },
         ]
      })
   ],
   devServer: {
      static: path.resolve(__dirname, "dist"),
      hot: true
   }
};
