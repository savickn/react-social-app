
const webpack = require('webpack');
const path = require('path');

const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlHardDiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const ManifestPlugin = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

module.exports = function(env) {
  console.log('Webpack ENV Variables --> ', env);

  var plugins = [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[chunkhash].css"
    }),
  ];

  if(env.mode === 'SPA') {
    plugins.push(new HtmlWebpackPlugin({
      template: './src/client/template.html',
      filename: 'index.html',
      alwaysWriteToDisk: true,
    }));
    plugins.push(new HtmlHardDiskPlugin());
  }

  if(env.mode === 'SSR') {
    plugins.push(new ManifestPlugin());
    plugins.push(new LoadablePlugin());
  }
  
  if(env.mode === 'analyze') {
    console.log('analyzing');
    plugins.push(new BundleAnalyzerPlugin());
  };
  
  const config = {
    //context: '???',
    target: 'web', 
    mode: env.env, 
    devtool: 'source-map', 
    entry: {
      //polyfills: path.resolve(__dirname, 'polyfills.js'),
      app: [
        path.resolve(__dirname, 'polyfills.js'),
        path.resolve(__dirname, 'src/client/index.js'),
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].[chunkhash].js',
    },
    resolve: {
      modules: [
        './node_modules',
        './src',
      ],
      extensions: ['*', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [/node_modules/, /\*\.config.js/],
          loader: 'babel-loader',
        },
        {
          test: /\.(css|scss|sass)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[hash:base64]',
                importLoaders: 2,
                modules: true,
                sourceMap: true,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  postcssFocus(),
                  cssnext({
                    browsers: ['last 2 versions', 'IE > 10'],
                  }),
                  cssnano({
                    autoprefixer: false,
                  }),
                  postcssReporter({
                    clearMessages: true,
                  }),
                ]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jp(e)?g|svg|gif)$/i,
          loader: 'url-loader?limit=10000',
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ]
    },
    optimization: {
      minimize: true,
      splitChunks: {
        cacheGroups: {
          vendors: false,
          defaults: false,
          vendor: {
            name: 'vendor', 
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      },
      noEmitOnErrors: true,
      nodeEnv: 'production'
    },
    plugins,
  };

  return config;
}
