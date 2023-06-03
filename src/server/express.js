
import express from 'express';
import path from 'path';
//import shrinkRay from 'shrink-ray';
import compression from 'compression';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import cors from 'cors';

import config from './config/environment';

import { ipTracker, } from './util/ipMiddleware';
 
export default async function(app) { 
  console.log('registering express'); 
  let env = app.get('env'); 


                                      /* IMPORTANT MIDDLEWARE */

  app.set('views', path.resolve(config.root, 'src/server/views'));
  app.set('view engine', 'pug');
  app.use(compression());
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.use(cors());

  /*app.use(session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      db: 'passport'
    })
  }));*/

                                    /* CUSTOM MIDDLEWARE */

  //app.use(ipTracker);


  /* ASSETS */

  console.log('dirname --> ', path.resolve(__dirname));
  console.log('rootDir --> ', path.resolve(config.root));

  //console.log('process.env --> ', process.env);
  
  // refers to folder containing images / etc (should be different for production)
  app.set('staticDir', path.resolve(config.root, 'src/server/public'));
  app.use(express.static(app.get('staticDir'))); // serves images from 'public dir'

  //console.log('appDir --> ', path.resolve(config.root));
  //console.log('staticDir --> ', path.resolve(config.root));

  if(env === 'production') {
    app.set('appPath', path.resolve(config.root));
    app.use(favicon(path.resolve(config.root, 'favicon.ico'))); 
  }

  if(env === 'development') {
    app.set('appPath', path.resolve(config.root, 'dist'));
    app.use(favicon(path.resolve(config.root, 'src/favicon.ico'))); 
  }

  // refers to root folder of application (must contain 'index.html')
  // app.set('appPath', path.resolve(config.root));
  app.use(express.static(app.get('appPath'))); // serves static files from 'dist' dir 

  if(env === 'development') {
    app.use(errorHandler()); // must be last
  }

  console.log(`root --> ${path.resolve(config.root)}`);
  console.log(`appPath --> ${app.get('appPath')}`);
}
