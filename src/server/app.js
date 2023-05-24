
import Express from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';
import Sequelize from 'sequelize';
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

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


                                          /* GCLOUD */ 

const client = new SecretManagerServiceClient();

async function getSecret(name) {
  const [ version ] = await client.accessSecretVersion({
    name: `projects/326645683225/secrets/${name}/versions/latest`,
  });
  return version.payload.data.toString();
}

/* MongoDB */

getSecret('mongo_uri').then((mongoURI) => {
  console.log('secret --> ', mongoURI);
  
  mongoose.Promise = global.Promise;

  mongoose.connect(/*config.mongo.uri*/ 
    "mongodb+srv://nadmin:admin_omb@savick-meetup.ktdsvft.mongodb.net/meetup_clone?retryWrites=true&w=majority", (error) => {
    if(error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    };
    console.log('Connected to MongoDB');
  })
}).catch((err) => {
  console.log(err);
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

