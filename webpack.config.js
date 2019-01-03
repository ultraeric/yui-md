var path = require('path');
const webpack = require('webpack');
var _ = require('lodash');
var os = require('os');
const UglifyEsPlugin = require('uglify-es-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
  entry: './App/App.jsx',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
    },
    extensions: [
      '.js', '.jsx', '.css', ',scss'
    ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets:[ 'env', 'react', 'stage-3' ]
        }
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader?sourceMap&sourceComments'
        ],
        include: path.join(__dirname, 'node_modules'),
        exclude: /flexboxgrid/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
        include: /flexboxgrid/
      },
      {
        test: /\.scss$/,
        use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "sass-loader"}]
      }
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart:['babel src -d lib --copy-files']
    })
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify('production')
    //   }
    // })
    // ,
    // new UglifyEsPlugin()
  ]
};
