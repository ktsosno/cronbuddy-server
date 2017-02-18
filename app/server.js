/**
  * CronBuddy Server
  * <ktsosno@gmail.com>
  */

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
  app.listen(serverPort);

  // Used to invoke crontab on the same user as the node process
  global.username = serverUser;

  console.log(`
  CronBuddy Server Running...

  User: ${serverUser}
  Port: ${serverPort}`);
});
