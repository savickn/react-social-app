
if(process.env.NODE_ENV === 'production') {
  console.log('serving from ./dist in production');
  process.env.manifest = JSON.stringify(require('./dist/manifest.json'));
  require('./dist/server.bundle.js');
} else {
  console.log('registering babel');
  require('@babel/register')({
    plugins: [
      "dynamic-import-node",
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

