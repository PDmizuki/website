const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");

// === CSP POLICYを先に定義 ===
const cspPolicy = {
   'default-src': ["'self'"],
   'script-src': [
      "'self'",
      "https://code.jquery.com",
      "https://cdnjs.cloudflare.com",
      "https://cdn.jsdelivr.net"
   ],
   'style-src': [
      "'self'",
      "https://cdnjs.cloudflare.com",
      "https://fonts.googleapis.com",
      "https://cdn.jsdelivr.net"
   ],
   'font-src': [
      "'self'",
      "https://fonts.gstatic.com",
      "https://cdnjs.cloudflare.com",
      "https://cdn.jsdelivr.net",
      "data:"
   ],
   'img-src': [
      "'self'",
      "data:",
      "https://mizukioyama.github.io/website/"
   ],
   'connect-src': [
      "'self'",
      "https://mizukioyama.github.io",
      "https://script.google.com",
      "https://script.googleusercontent.com",
      "https://cdn.jsdelivr.net",
      "https://fonts.googleapis.com"
   ],
   'object-src': ["'none'"],
   'base-uri': ["'self'"],
   'form-action': ["'self'", "https://mizukioyama.github.io"]
};

module.exports = {
   devtool: "source-map",
   entry: {
      main: "./src/index.js",
   },
   output: {
      path: path.resolve(__dirname, "docs"),
      filename: "js/main.js",
      clean: true,
      publicPath: "auto"
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
                     esModule: false,
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
               filename: "assets/images/[name][ext]"
            }
         },
         {
            test: /\.mp3$/i,
            type: 'asset/resource',
            generator: {
               filename: 'assets/audio/[name][ext]',
            },
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({ template: "./src/index.html", filename: "index.html" }),
      new HtmlWebpackPlugin({ template: "./src/information.html", filename: "information.html" }),
      new HtmlWebpackPlugin({ template: "./src/gallery.html", filename: "gallery.html" }),
      new HtmlWebpackPlugin({ template: "./src/contact.html", filename: "contact.html" }),
      new HtmlWebpackPlugin({ template: "./src/policy.html", filename: "policy.html" }),
      new HtmlWebpackPlugin({ template: "./src/matching.html", filename: "matching.html" }),
      new HtmlWebpackPlugin({ template: "./src/header.html", filename: "header.html" }),
      new HtmlWebpackPlugin({ template: "./src/footer.html", filename: "footer.html" }),
      new HtmlWebpackPlugin({ template: "./src/sidebaer.html", filename: "sidebaer.html" }),
      new HtmlWebpackPlugin({ template: "./src/bot.html", filename: "bot.html" }),

      new MiniCssExtractPlugin({ filename: "styles/main.css" }),

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

      new CspHtmlWebpackPlugin(cspPolicy, {
         enabled: true,
         hashingMethod: 'sha256',
         hashEnabled: {
            'script-src': true,
            'style-src': false
         },
         nonceEnabled: false
      })
   ],
   devServer: {
      static: path.resolve(__dirname, "docs"),
      hot: true,
      historyApiFallback: true,
   }
};
