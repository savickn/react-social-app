
//const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');

// for importing CSS via modules
const cssLoaderForModules = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: "[name]__[hash:base64:5]",
    },
    importLoaders: 2,
    modules: true,
    sourceMap: false,
  }
};

// for importing CSS globally
const cssLoaderForGlobals = {
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    sourceMap: false,
  }
};

// for transpiling new CSS features
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        'postcss-preset-env',
        /*cssnext({
          browsers: ['last 2 versions', 'IE > 10'],
        }),*/
        cssnano({
          autoprefixer: false,
        }),
      ]
    }
  }
};

// for injecting .CSS files into HTML
const styleLoader ={

};

// for transpiling SASS
const sassLoader = {
  
}

// for transpiling ES6 JavaScript
const babelLoader = {
  test: /\.(m?js|jsx)$/,
  resolve: {
    fullySpecified: false,
  },
  exclude: [
    /node_modules/, 
    /\*\.config.js/,
  ],
  loader: 'babel-loader',
  /*options: {
    presets: [
      [
        '@babel/preset-env', 
        { targets: "defaults" }
      ],
      '@babel/preset-react',
    ]
  }*/
};

// for loading images
const urlLoader = {
  test: /\.(png|jp(e)?g|svg|gif)$/i,
  loader: 'url-loader',
  options: {
    limit: 10000,
    fallback: 'file-loader',
    name: '[name]-[hash].[ext]',
    outputPath: 'images/',
  }
};

// for loading JSON (when is this used??)
const jsonLoader = {
  test: /\.json$/,
  loader: 'json-loader',
};

// for loading fonts/etc
const fileLoader = {
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  loader: 'file-loader'
};

module.exports = {
  cssLoaderForModules,
  cssLoaderForGlobals, 
  postcssLoader, 
  styleLoader, 
  sassLoader, 
  babelLoader, 
  urlLoader, 
  jsonLoader, 
  fileLoader, 
};

