const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const { ProvidePlugin, ProgressPlugin, DefinePlugin, ContextReplacementPlugin } = require('webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;

const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ['inline','polyfills','sw-register','vendor','main'];


function buildConfig(env) {
  const config = {
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.join(process.cwd(), 'src'), './node_modules']
    },
    resolveLoader: {
      modules: ['./node_modules']
    },
    entry: {
      main: [
        './src/main.ts'
      ],
      polyfills: [
        './src/polyfills.ts'
      ],
      vendor: [
        './src/vendor.ts'
      ]
    },
    output: {
      path: path.join(process.cwd(), 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.json$/,
          use: 'json-loader'
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              root: path.resolve(__dirname, 'src/public')
            }
          }],
          exclude: [root('src', 'public'), root('templates')]
        },
        {
          test: /\.(eot|svg)$/,
          use: 'file-loader?name=assets/images/[name].[hash:20].[ext]'
        },
        {
          test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)(\?.*$|$)$/,
          use: 'url-loader?name=assets/images/[name].[hash:20].[ext]&limit=10000',
          exclude: root('templates')
        },
        // all css required in src/app files will be merged in js files
        {
          test: /\.css$/,
          include: root('src', 'app'),
          use: [
            { loader: 'raw-loader' },
            { loader: 'postcss-loader' }
          ]
        },
        // all css required in src/app files will be merged in js files
        {
          test: /\.(scss|sass)$/,
          exclude: root('src', 'style'),
          use: [
            { loader: 'raw-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    plugins: [
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Tether: 'tether',
        Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
        Button: 'exports-loader?Button!bootstrap/js/dist/button',
        Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
        Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
        Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
        Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
        Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
        Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
        Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
        Util: 'exports-loader?Util!bootstrap/js/dist/util'
      }),
      new ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        filename: './index.html',
        hash: false,
        inject: true,
        compile: true,
        favicon: false,
        minify: false,
        cache: true,
        showErrors: true,
        chunks: 'all',
        excludeChunks: [],
        title: 'Webpack App',
        xhtml: true,
        chunksSortMode: function sort(left, right) {
          let leftIndex = entryPoints.indexOf(left.names[0]);
          let rightindex = entryPoints.indexOf(right.names[0]);
          if (leftIndex > rightindex) {
              return 1;
          }
          else if (leftIndex < rightindex) {
              return -1;
          }
          else {
              return 0;
          }
      }
      }),
      new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => module.resource && module.resource.startsWith(nodeModules),
        chunks: [
          'main'
        ]
      }),
      new DefinePlugin({
        // Environment helpers
        PRODUCTION: env.production
      }),
      new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/,
        root('src')
      ),

    ],
    node: {
      fs: 'empty',
      global: true,
      crypto: 'empty',
      tls: 'empty',
      net: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };

  return config;
}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

module.exports = buildConfig
