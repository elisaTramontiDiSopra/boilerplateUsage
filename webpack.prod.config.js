const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

module.exports = function(env) {
  return merge(baseConfig.call(this, env), {
    devtool: 'nosources-source-map',
    output: {
      filename: 'assets/js/[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          use: 'source-map-loader',
          exclude: [
            /\/node_modules\//
          ]
        },
        // Support for CSS as raw text
        // use 'null' loader in test mode (https://github.com/webpack/null-loader)
        // all css in src/style will be bundled in an external css file
        {
          test: /\.css$/,
          exclude: root('src', 'app'),
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader']})
        },
        // support for .scss files
        // use 'null' loader in test mode (https://github.com/webpack/null-loader)
        // all css in src/style will be bundled in an external css file
        {
          test: /\.(scss|sass)$/,
          exclude: root('src', 'app'),
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']})
        },
        {
          test: /\.ts$/,
          use: ['@ngtools/webpack', 'angular2-template-loader']
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'assets/css/[name].bundle.css',
      }),
      new webpack.optimize.UglifyJsPlugin(),
      new AngularCompilerPlugin({
        mainPath: './src/main.ts',
        exclude: [],
        tsConfigPath: 'tsconfig.json',
        skipCodeGeneration: false
      })
    ]
  })
}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
