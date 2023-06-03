#!/usr/bin/env node

if(process.env.NODE_ENV === 'production') {
  console.log('serving from ./dist in production');
  if(process.env.NODE_MODE === 'SSR') {
    process.env.manifest = JSON.stringify(require('./dist/manifest.json'));
  }
  
  require('./dist/server.bundle.js');
} else {
  console.log('registering babel');
  require('@babel/register')({
    plugins: [
      [
        "css-modules-transform", {
          "preprocessCss": "./config/sassPreprocessor.js",
          "extensions": [".css", ".scss"]
        }
      ],
      // used for SSR in dev mode
      /*[
        "import-static-files",
        {
          "baseDir": "/dist",
        }
      ]*/
    ]
  });
  require('@babel/polyfill'); //basically for generators
  console.log('starting server in dev mode')
  require('./src/server/app.js');
}

