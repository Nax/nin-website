const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = process.env.NODE_ENV || 'development';
const dev = (env !== 'production');

const VERSION = '0.7.1';

module.exports = {
  mode: (dev ? 'development' : 'production'),
  entry: {
    app: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (dev ? '[name].js' : '[name].[contenthash].min.js'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.css$/,
      loaders: [
        dev ? 'style-loader' : MiniCssExtractPlugin.loader,
        { loader: 'css-loader', options: { importLoaders: 1 } },
        'postcss-loader'
      ]
    }, {
      test: /\.(png|gif|jpe?g|svg)$/,
      use: { loader: 'file-loader', options: { name: (dev ? '_assets/[name].[ext]' : '_assets/[contenthash].[ext]') } }
    }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FaviconsWebpackPlugin({
      logo: './app/assets/logo.png',
      cache: true,
      prefix: '_assets/',
      favicons: {
        appName: 'Nin',
        appDescription: 'A NES Emulator',
        developerName: 'Maxime Bacoux',
        developerURL: 'https://nax.io',
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: true,
          windows: false,
          yandex: false
        }
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].min.css'
    }),
    new HtmlWebpackPlugin({
      template: './app/index.html.ejs',
      templateParameters: { VERSION }
    })
  ]
};
