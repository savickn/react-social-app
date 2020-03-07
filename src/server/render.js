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
            ${isProd ? `<link rel="stylesheet" href="${manifest['app.css']}">`: ''}
          </head>
          <body>
            <div id="root">${reactDom}</div>
            <div class="ssr"> rendered via ssr! </div>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
            <script type="text/javascript" src="${isProd ? manifest['app.js'] : '/app.bundle.js'}"></script>
            ${isProd ? `<script type="text/javascript" src="${manifest['vendor.js']}"></script>` : ''}
            ${isProd ? `<script type="text/javascript" src="${manifest['common.js']}"></script>` : ''}
          </body>
        </html>
      `;

      // not necessary when using 'serve-favicon'
      //<link rel="icon" type="image/png" href="/assets/favicon.ico" />
