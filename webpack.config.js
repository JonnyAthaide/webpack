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
  module: {
    rules: [{
        test: /\.(sa|sc|c)ss$/,
        use: [
            miniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
            ]
        },
        {
            test: /\.css$/i,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            // use: {
            //     loader: 'babel-loader',
            //     options: {
            //         presets: ['@babel/preset-env']
            //     }
            // }
        },
        // {
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     loader: 'file-loader',
        //     options: {
        //         name: '[name].[ext]'
        //     },
        // },
        {
            test: /\.(png|jpe?g)$/,
            use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/', // pasta de saída para as imagens
                    },
                },
                {
                    loader: 'webp-loader',
                },
            ],
        },
    ]
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
