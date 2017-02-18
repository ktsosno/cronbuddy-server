/**
  * CronBuddy Server
  * <ktsosno@gmail.com>
  */

const log = require('minilog')('app');
require('minilog').enable();

const express = require('express');
const bodyParser = require('body-parser');
const username = require('username');
const argv = require('minimist')(process.argv.slice(2));
const appRouter = require('./app/router');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);

// Register application routes
appRouter(router);

username().then(username => {
  const serverPort = argv.p || 8080;
  const serverUser = argv.u || username;
  const serverIP = argv.i || 'localhost';

  app.listen(serverPort, serverIP);

  global.username = serverUser;
  global.log = log;

  global.log.info('CronBuddy Server Running');
  global.log.info(`User: ${serverUser}`);
  global.log.info(`Port: ${serverPort}`);
  global.log.info(`IP: ${serverIP}`);
});
