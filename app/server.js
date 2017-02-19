/**
  * CronBuddy Server
  * <ktsosno@gmail.com>
  */

// Instantiate logger and globalize
const log = require('minilog')('app');
require('minilog').enable();
global.log = log;

const express = require('express');
const bodyParser = require('body-parser');
const username = require('username');
const argv = require('minimist')(process.argv.slice(2));

// TODO: These context paths change on user (?), set for root for now
const userRoute = './app';
const appRouter = require(`${userRoute}/router`);

// TODO: Better way of handling application config?
let appConfig = {
  PORT: 9191,
  USER: 'root'
};
try {
    appConfig = require(`${userRoute}/config`);
} catch(e) {
    log.warn('No config found, using application defaults', e);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// This application is intended to have its
// routing handled on the virtual host level
app.use('/', router);

// Register application routes
appRouter(router);

username().then(username => {
  const serverPort = argv.p || appConfig.PORT;
  const serverUser = argv.u || appConfig.USER;
  const serverIP = argv.i || 'localhost';

  app.listen(serverPort, serverIP);

  global.username = serverUser;

  global.log.info('CronBuddy Server Running');
  global.log.info(`User: ${serverUser}`);
  global.log.info(`Port: ${serverPort}`);
  global.log.info(`IP: ${serverIP}`);
});
