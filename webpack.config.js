const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const { NoEmitOnErrorsPlugin, LoaderOptionsPlugin } = require('webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","vendor","main"];

const ENV = process.env.npm_lifecycle_event;
const isProd = ENV === 'build';

module.exports = function() {
  const config = {
    devtool: isProd ? 'nosources-source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.join(process.cwd(), 'src'), './node_modules']
    },
    resolveLoader: {
      modules: ['./node_modules']
    },
    entry: {
      bootstrap: 'bootstrap-loader',
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
      filename: isProd ? 'assets/js/[name].[hash].js' : 'assets/js/[name].js',
      chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            /\/node_modules\//
          ]
        },
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader?', 'angular2-template-loader', '@angularclass/hmr-loader'],
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            root: path.resolve(__dirname, 'src/public')
          },
          exclude: [root('src', 'public'), root('templates')]
        },
        {
          test: /\.(eot|svg)$/,
          loader: 'file-loader?name=assets/images/[name].[hash:20].[ext]'
        },
        {
          test: /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
          loader: 'url-loader?name=assets/images/[name].[hash:20].[ext]&limit=10000',
          exclude: root('templates')
        },
        {
          exclude: [
            path.join(process.cwd(), 'src/styles.sass')
          ],
          test: /\.css$/,
          loaders: [
            'exports-loader?module.exports.toString()',
            'css-loader?{"sourceMap":' + (isProd ? 'false' : 'true') + ',"importLoaders":1, "root": "public"}',
            'postcss-loader'
          ]
        },
        {
          exclude: [
            path.join(process.cwd(), 'src/styles.sass')
          ],
          test: /\.scss$|\.sass$/,
          loaders: [
            'exports-loader?module.exports.toString()',
            'css-loader?{"sourceMap":' + (isProd ? 'false' : 'true') + ',"importLoaders":1, "root": "public"}',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          include: [
            path.join(process.cwd(), 'src/styles.sass')
          ],
          test: /\.scss$|\.sass$/,
          loaders: ExtractTextPlugin.extract({
            use: [
              'css-loader?{"sourceMap":' + (isProd ? 'false' : 'true') + ',"importLoaders":1, "root": "public"}',
              'postcss-loader',
              'sass-loader'
            ],
            fallback: 'style-loader',
            publicPath: ''
          })
        },
        { test: /bootstrap[/\\]dist[/\\]js[/\\]umd[/\\]/, loader: 'imports-loader?jQuery=jquery' }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
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
      new ExtractTextPlugin({
        filename: 'assets/css/[name].bundle.css',
        disable: !isProd
      }),
      new LoaderOptionsPlugin({
        sourceMap: !isProd,
        options: {
          postcss: [
            autoprefixer()
          ],
          sassLoader: {
            sourceMap: !isProd,
            includePaths: []
          },
          context: ''
        }
      }),
      new webpack.DefinePlugin({
        // Environment helpers
        PRODUCTION: isProd
      })
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
    },
    devServer: {
      contentBase: './src/public'
    }
  };

  if (isProd) {
    config.module.rules.push({
      test: /\.ts$/,
      loader: ['@ngtools/webpack', 'angular2-template-loader']
    }),
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin(),
      new AotPlugin({
        mainPath: './src/main.ts',
        exclude: [],
        tsConfigPath: 'tsconfig.json',
        skipCodeGeneration: false
      }),
      new CopyWebpackPlugin([{
        from: root('src/public/templates'), to: 'templates'
        }
      ])
    );
  }

  return config;
}()

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
