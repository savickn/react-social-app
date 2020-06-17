
import Express from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';
import Sequelize from 'sequelize';

import config from './config/environment';

const app = new Express();
const server = Server(app);

if (process.env.NODE_ENV === 'development') {
  console.log('using webpack-dev-middleware');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');

  const isSSR = process.env.NODE_MODE === 'SSR';
  const wENV = {
    analyze: false,
    mode: isSSR ? 'SSR' : 'SPA',
    env: process.env.NODE_ENV
  };
  const wconfig = require('../../webpack.config.client')(wENV);
  const compiler = webpack(wconfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: wconfig.output.publicPath,
    writeToDisk: true,
    //serverSideRender: isSSR,
  }));
  app.use(webpackHotMiddleware(compiler));
}

console.log(`node_mode --> ${process.env.NODE_MODE}`);
console.log(`node_env --> ${process.env.NODE_ENV}`);
//console.log(`manifest --> ${process.env.manifest}`);
//console.log(`loadable --> ${process.env.loadableManifest}`);

mongoose.Promise = global.Promise;

mongoose.connect(config.mongo.uri, (error) => {
  if(error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  };
})

require('./express').default(app);
require('./routes').default(app);
require('./socket').default(server);


if(process.env.NODE_MODE === 'SSR') {
  require('./ssr').default(app);
}

server.listen(config.port, (error) => {
  if(!error) {
    console.log(`Express is running on port ${config.port}`);
  }
});

export default app;


/* SEQUELIZE */

/*
const sequelize = new Sequelize({
  database: config.sequelize.dbName,
  username: config.sequelize.username,
  password: config.sequelize.password,
  host: 'localhost',
  port: 9821, 
  dialect: 'postgres', // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/

