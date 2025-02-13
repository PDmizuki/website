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
      path: path.resolve(__dirname, "dist"),
      filename: "js/main.js",
      clean: true,
      publicPath: "./"
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
                  options: {
                     url: true  // CSS 内の画像 URL を正しく解決
                  }
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
               filename: "assets/images/[name][ext]" // ハッシュなしのファイル名
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
         filename: "categories.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/header.html",
         filename: "header.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/footer.html",
         filename: "footer.html",
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
               from: path.resolve(__dirname, "src/assets/images"), // 画像のみコピー
               to: path.resolve(__dirname, "dist/assets/images"),
            },
         ]
      }),
      new ImageMinimizerPlugin({
         minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
               plugins: [
                  ["mozjpeg", { quality: 75 }], // JPEG 圧縮
                  ["pngquant", { quality: [0.65, 0.8] }], // PNG 圧縮
                  ["gifsicle", { interlaced: true }], // GIF 最適化
                  ["svgo", {}], // SVG 最適化
               ],
            },
         },
      }),
   ],
   devServer: {
      static: path.resolve(__dirname, "dist"),
      hot: true
   }
};
