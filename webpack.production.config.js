var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var path = require('path');

module.exports = {
  entry: [
    './src/js/main.js'
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel'],
        query: {
          'presets': ['react', 'es2015'],
          'plugins': [
            'transform-object-rest-spread'
          ]
        }
      },
      { test: /\.svg$/, loader: 'file?name=/flags/[name].[ext]' }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer({ browsers: ['> 5%'] })]
  },
  plugins: [
    new TransferWebpackPlugin([
        { from: 'img', to: 'img' }
    ], path.join(__dirname, 'src')),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: './js/model-explorer.js'
  }
}
