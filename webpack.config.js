const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: './js/main.js',
    path: path.resolve(__dirname, 'content'),
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'content/assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      /* Comentei as regras para babel
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      */
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new miniCssExtractPlugin({
      filename: 'main.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets',
          globOptions: {
            ignore: ['*.png', '*.jpg', '*.jpeg'],
          },
        },
      ],
    }),
  ],
};
