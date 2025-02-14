const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
   devtool: "source-map",
   entry: {
      main: "./src/index.js",
   },
   output: {
      path: path.resolve(__dirname, "docs"), // `dist` → `docs` に変更
      filename: "js/main.js",
      clean: true,
      publicPath: "./" // GitHub Pages 用に修正
   },
   resolve: {
      alias: {
         '@fortawesome': path.resolve(__dirname, 'node_modules/@fortawesome'),
         "@assets": path.resolve(__dirname, "src/assets")
      },
   },
   mode: "production",
   module: {
      rules: [
         {
            test: /\.css$/i,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: "css-loader",
                  options: { url: true }
               }
            ]
         },
         {
            test: /\.js$/i,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader"
            }
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
               filename: 'fonts/[name][ext]',
            },
         },
         {
            test: /\.(png|jpe?g|gif|svg|ico)$/i,
            type: "asset/resource",
            generator: {
               filename: "../assets/images/[name][ext]"
            }
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html",
         filename: "index.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/about.html",
         filename: "about.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/service.html",
         filename: "service.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/contact.html",
         filename: "contact.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/policy.html",
         filename: "policy.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/blog/categories.html",
         filename: "blog/categories.html",
      }),
      new MiniCssExtractPlugin({
         filename: "styles/main.css"
      }),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/webfonts"),
               to: path.resolve(__dirname, "docs/assets/fonts"), // コピー先を変更
            },
            {
               from: path.resolve(__dirname, "src/assets/images"),
               to: path.resolve(__dirname, "docs/assets/images"), // コピー先を変更
            },
         ]
      }),
      new ImageMinimizerPlugin({
         minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
               plugins: [
                  ["mozjpeg", { quality: 75 }],
                  ["pngquant", { quality: [0.6, 0.8] }], // PNG の圧縮調整
                  ["gifsicle", { interlaced: true }],
                  ["svgo", {}],
               ],
            },
         },
      }),
   ],
   devServer: {
      static: path.resolve(__dirname, "docs"), // `dist` → `docs`
      hot: true,
      historyApiFallback: true,
   }
};
