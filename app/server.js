/**
  * CronBuddy Server
  * <ktsosno@gmail.com>
  */

const log = require('minilog')('app');
require('minilog').enable();
global.log = log;

const express = require('express');
const bodyParser = require('body-parser');
const username = require('username');
const argv = require('minimist')(process.argv.slice(2));
const appRouter = require('./app/router');

let appConfig = {};
try {
  appConfig = require('./app/config');
} catch (e) {
  log.warn('No config found, using application defaults', e);
  appConfig = {
    PORT: 9191,
    USER: 'root',
  };
}

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', router);

appRouter(router);

username().then((nodeUser) => {
  const serverPort = argv.p || appConfig.PORT;
  const serverUser = argv.u || appConfig.USER;
  const serverIP = argv.i || '127.0.0.1';

  app.listen(serverPort, serverIP);

  global.username = serverUser;

  global.log.info('CronBuddy Server Running');
  global.log.info(`Cron User: ${serverUser}`);
  global.log.info(`Node User: ${nodeUser}`);
  global.log.info(`Port: ${serverPort}`);
  global.log.info(`IP: ${serverIP}`);
});
