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

// These context paths change on user (?), set for root
const appRouter = require('./app/router');
const appConfig = require('./app/config');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

// Register application routes
appRouter(router);

username().then(username => {
  const serverPort = argv.p || appConfig.PORT;
  const serverUser = argv.u || appConfig.USER;
  const serverIP = argv.i || 'localhost';

  app.listen(serverPort, serverIP);

  global.username = serverUser;
  global.log = log;

  global.log.info('CronBuddy Server Running');
  global.log.info(`User: ${serverUser}`);
  global.log.info(`Port: ${serverPort}`);
  global.log.info(`IP: ${serverIP}`);
});
