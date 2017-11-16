const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const path = require('path');

module.exports = function(env) {
  return merge(baseConfig.call(this, env), {
    devtool: 'eval-source-map',
    output: {
      filename: 'assets/js/[name].js',
      chunkFilename: '[id].chunk.js'
    },
    module: {
      rules: [
        // Support for CSS as raw text
        // use 'null' loader in test mode (https://github.com/webpack/null-loader)
        // all css in src/style will be bundled in an external css file
        {
          test: /\.css$/,
          exclude: root('src', 'app'),
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' }
          ]
        },
        // support for .scss files
        // use 'null' loader in test mode (https://github.com/webpack/null-loader)
        // all css in src/style will be bundled in an external css file
        {
          test: /\.(scss|sass)$/,
          exclude: root('src', 'app'),
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        },
        {
          test: /\.ts$/,
          use: [
            '@angularclass/hmr-loader',
            'awesome-typescript-loader',
            'angular2-template-loader',
          ]
        }
      ]
    },
    devServer: {
      hot: env.HMR,
      inline: true,
      port: env.PORT,
      contentBase: './src/public',
      historyApiFallback: true,
      quiet: true,
      stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
    }
  });
}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
