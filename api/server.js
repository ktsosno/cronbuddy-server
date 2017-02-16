/**
  * CronBuddy
  * <ktsosno@gmail.com>
  */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

// Import application specific helpers
const crontab = require('./api/helpers/crontab');

// Import route specific directives
const loadDirective = require('./api/routes/load');
const createDirective = require('./api/routes/create');
const deleteDirective = require('./api/routes/delete');

const SERVER_PORT = 8080

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(SERVER_PORT);
console.log(`Listening on ${SERVER_PORT}...`);

/**
  * Load all cron jobs for the current user
  * TODO: Handle other users
  */
router.get('/load', (request, response) => {
  crontab(loadDirective, response);
});

/**
  * Create a new cron entry
  * @param action {String} The script or command to create
  * @param timing {String} The cron timing sequence
  * @return Success message
  */
router.post('/create', (request, response) => {
  const payload = {};

  payload.action = request.body.action;
  payload.timing = request.body.timing;

  if (!payload.action || !payload.timing) {
    response.send({
      error: 'Insufficient parameters passed for create'
    });
  }

  crontab(createDirective, response, payload);
});

/**
  * Delete a cron entry
  * @param action {String} The script or command to delete
  * @return Success message
  */
router.post('/delete', (request, response) => {
  const payload = {};

  payload.action = request.body.action;
  if (!payload.action) {
    response.send({
      error: 'Insufficient parameters passed for delete'
    })
  }

  crontab(deleteDirective, response, payload);
});
