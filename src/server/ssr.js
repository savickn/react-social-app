
import path from 'path';
import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import config from './config/environment';
import App from '../client/components/App/App';
import sagas from '../client/sagas';
import configureStore from './store';

export default function(app) {
  console.log('registering SSR');
  const env = app.get('env');

  app.use('*', (req, res, next) => {
    console.log(`Using SSR, ${req.originalUrl}, ${env} mode`);
    const isProd = env === 'production';

    //const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
    //const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);
    //const loadableManifest = process.env.loadableAssets && JSON.parse(process.env.loadableAssets);
    //const manifest = process.env.manifest && JSON.parse(process.env.manifest);
    
    const manifest = path.resolve(config.root, 'dist/manifest.json');
    const statsFile = path.resolve(config.root, 'dist/loadable-stats.json');
    /*console.log('manifest --> ', manifest);
    console.log('statsFile --> ', statsFile);*/

    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['app'] 
    });
    //console.log('extractor --> \n', extractor);

    const reduxStore = configureStore();
    const context = {};

    const appJSX = extractor.collectChunks(
      <Provider store={reduxStore}>
        <StaticRouter location={req.originalUrl} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    if (context.url) {
      res.status(301).redirect(context.url);
      return;
    }
  
    /*
    ${isProd ?
    `//<![CDATA[
    window.webpackManifest = ${JSON.stringify(chunkManifest)};
    //]]>` : ''}
    */

    // used to listen for dispatches until 'END' is called
    reduxStore.runSaga(sagas).done.then(() => { 
      //const css = styleManager.sheetsToString();
      const helmet = Helmet.renderStatic();
      const preloadedState = reduxStore.getState(); // should have results of dispatches
      //console.log('preloadedState --> \n', preloadedState);

      const reactDom = renderToString(appJSX); //should render app with populated reduxStore
      //console.log('finalRender --> \n', reactDom);

      const scriptTags = extractor.getScriptTags(); // to get script tags or extractor.getScriptElements();
      const linkTags = extractor.getLinkTags(); // to get "preload/prefetch" links or extractor.getLinkElements();
      const styleTags = extractor.getStyleTags(); // to get style tags (if using "mini-css-extract-plugin") or extractor.getStyleElements();

      /*console.log('scriptTags --> \n', scriptTags);
      console.log('linkTags --> \n', linkTags);*/
      //console.log('styleTags --> \n', styleTags);

      const str = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${styleTags}
          </head>
          <body>
            <div id="root">${reactDom}</div>
            <div class="ssr"> rendered via ssr! </div>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            ${scriptTags}
          </body>
        </html>
      `;

      return res.status(200).header({"Content-Type": "text/html"}).send(str);
    });

    const midRender = renderToString(appJSX); //used to trigger 'componentWillMount' which will 'dispatch' actions to redux-sagas
    //console.log('midRender --> \n', midRender);

    reduxStore.close(); //used to trigger 'reduxStore.done' above
  });
}


/*
const str = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' />
            <link rel="icon" type="image/png" href="/assets/favicon.ico" />
            ${isProd ? `<link rel="stylesheet" href="${manifest['app.css']}">`: ''}
          </head>
          <body>
            <div id="root">${reactDom}</div>
            <div class="ssr"> rendered via ssr! </div>
            <scipt>
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </scipt>
            <script type="text/javascript" src="${isProd ? manifest['polyfills.js'] : '/polyfills.bundle.js'}"></script>
            <script type="text/javascript" src="${isProd ? manifest['app.js'] : '/app.bundle.js'}"></script>
            ${isProd ? `<script type="text/javascript" src="${manifest['vendor.js']}"></script>` : ''}
            ${isProd ? `<script type="text/javascript" src="${manifest['common.js']}"></script>` : ''}
          </body>
        </html>
      `;
      */

      //const htmlSteam = renderToNodeStream(jsx);
      //htmlSteam.pipe(res, { end: false });
      //htmlSteam.on('end', () => {});

      /*
    const htmlStr = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            <link rel="icon" type="image/png" href="/assets/favicon.ico" />
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <div id="root"></div>
          <script>
              // WARNING: See the following for security issues around embedding JSON in HTML:
              // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <style id="jss-server-side">${css}</style>
          <script src="/assets/vendor.js"></script>
          <script src="/assets/client.js"></script>
          ${loadableState.getScriptTag()}
        </body>
      </html>
    `;
    */