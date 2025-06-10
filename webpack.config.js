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
      path: path.resolve(__dirname, "docs"), // `dist` → `docs`
      filename: "js/main.js",
      clean: true,
      publicPath: "auto" // GitHub Pages 用
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
               "style-loader",
               {
                  loader: "css-loader",
                  options: {
                     esModule: false, // ✅ これを追加
                  },
               },
            ],
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
               filename: 'assets/fonts/[name][ext]',
            },
         },
         {
            test: /\.(png|jpe?g|gif|svg|ico)$/i,
            type: "asset/resource",
            generator: {
               filename: "assets/images/[name][ext]" // `docs/` を含めず、相対パスを調整
            }
         },
         {
            test: /\.mp3$/i,
            type: 'asset/resource',
            generator: {
               filename: 'assets/audio/[name][ext]', // 出力先を指定
            },
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html",
         filename: "index.html",
         meta: {
            "Content-Security-Policy": {
               "http-equiv": "Content-Security-Policy",
               content: "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'"
            }
         }
      }),
      // 🔹 html を docs/ に出力
      new HtmlWebpackPlugin({
         template: "./src/information.html",
         filename: "information.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/gallery.html",
         filename: "gallery.html",
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
         template: "./src/matching.html",
         filename: "matching.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/header.html",
         filename: "header.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/footer.html",
         filename: "footer.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/sidebaer.html",
         filename: "sidebaer.html",
      }),
      new HtmlWebpackPlugin({
         template: "./src/bot.html",
         filename: "bot.html",
      }),
      new MiniCssExtractPlugin({
         filename: "styles/main.css"
      }),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "node_modules/@fortawesome/fontawesome-free/webfonts"),
               to: path.resolve(__dirname, "docs/assets/fonts"),
            },
            {
               from: path.resolve(__dirname, "src/assets/images"),
               to: path.resolve(__dirname, "docs/assets/images"),
            },
         ]
      }),
      new ImageMinimizerPlugin({
         minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
               plugins: [
                  ["mozjpeg", { quality: 75 }],
                  ["pngquant", { quality: [0.6, 0.8] }],
                  ["gifsicle", { interlaced: true }],
                  ["svgo", {}],
               ],
            },
         },
      }),
   ],
   devServer: {
      static: path.resolve(__dirname, "docs"),
      hot: true,
      historyApiFallback: true,
   }
};
