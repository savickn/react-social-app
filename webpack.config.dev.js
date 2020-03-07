
const webpack = require('webpack');
const path = require('path');

const postcssFocus = require('postcss-focus');
const cssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter'); 

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlHardDiskPlugin = require('html-webpack-harddisk-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ManifestPlugin = require('webpack-manifest-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');


const cssLoaderForModules = {
  loader: 'css-loader',
  options: {
    localIdentName: '[name]_[hash:base64:5]',
    importLoaders: 2,
    modules: true,
    sourceMap: false,
  }
};

const cssLoaderForGlobals = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    sourceMap: false,
  }
};

module.exports = function(env) {
  console.log('Webpack dev ENV --> ', env);

  const vars = {
    'process.env': {
      'NODE_ENV': JSON.stringify(env.env),
      'NODE_MODE': JSON.stringify(env.mode),
    }
  }

  const plugins = [
    //new webpack.DefinePlugin(vars),
    new webpack.HotModuleReplacementPlugin(),
  ];

  if(env.env === 'development') {
    //plugins.push(new webpack.HotModuleReplacementPlugin());
  }

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
    plugins.push(new BundleAnalyzerPlugin());
  }

  const config = {
    //context: '???',
    target: 'web',
    devtool: 'source-map',
    mode: 'development',
    entry: {
      app: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
        path.resolve(__dirname, 'polyfills.js'), //to fix regenerator runtime error
        path.resolve(__dirname, 'src/client/index.js'),
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
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
          exclude: [/node_modules/, /.+\.config.js/],
          loader: 'babel-loader',
        },
        {
          test: /\.(css|scss)$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            cssLoaderForGlobals, 
            cssLoaderForModules, 
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  postcssFocus(),
                  cssnext({
                    browsers: ['last 2 versions', 'IE > 10'],
                  }),
                  postcssReporter({
                    clearMessages: true,
                  }),
                ]
              }
            },
            'sass-loader',
          ]
        },
        {
          test: /\.(png|jp(e)?g|svg|gif)$/i,
          loader: 'url-loader?limit=10000',
        },
        {
          test: /\.(json)$/,
          loader: 'json-loader'
        }
      ]
    },
    plugins, 
  };

  return config;
}
