'use strict';

var crontab = require('crontab');

module.exports = function (directive, response) {
  var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return crontab.load(function (err, tab) {
    if (!err) {
      directive(tab, response, payload);
    } else {
      response.send({
        error: 'Failed to invoke crontab'
      });
    }
  });
};
'use strict';

module.exports = function (tab, response, payload) {
  var task = tab.create(payload.action, payload.timing);
  if (!task) {
    response.send({
      error: 'Failed to create new job'
    });
  } else {
    tab.save(function (err, tab) {
      if (!err) {
        response.send({
          message: 'Job successfully created'
        });
      } else {
        response.send({
          error: 'Error saving crontab'
        });
      }
    });
  }
};
'use strict';

module.exports = function (tab, response, payload) {
  tab.remove({ command: payload.action });

  tab.save(function (err) {
    if (!err) {
      response.send({
        message: 'Cron job successfully deleted'
      });
    } else {
      response.send({
        error: 'Error deleting cron job'
      });
    }
  });
};
"use strict";

module.exports = function (tab, response) {
  var jobs = tab.jobs();
  var parsedJobs = [];

  if (jobs.length > 0) {
    jobs.forEach(function (job) {
      parsedJobs.push(job.toString());
    });
  }

  response.send({ jobs: parsedJobs });
};
'use strict';

/**
  * CronBuddy
  * <ktsosno@gmail.com>
  */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

// Import application specific helpers
var crontab = require('./api/helpers/crontab');

// Import route specific directives
var loadDirective = require('./api/routes/load');
var createDirective = require('./api/routes/create');
var deleteDirective = require('./api/routes/delete');

var SERVER_PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);

app.listen(SERVER_PORT);
console.log('Listening on ' + SERVER_PORT + '...');

/**
  * Load all cron jobs for the current user
  * TODO: Handle other users
  */
router.get('/load', function (request, response) {
  crontab(loadDirective, response);
});

/**
  * Create a new cron entry
  * @param action {String} The script or command to create
  * @param timing {String} The cron timing sequence
  * @return Success message
  */
router.post('/create', function (request, response) {
  var payload = {};

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
router.post('/delete', function (request, response) {
  var payload = {};

  payload.action = request.body.action;
  if (!payload.action) {
    response.send({
      error: 'Insufficient parameters passed for delete'
    });
  }

  crontab(deleteDirective, response, payload);
});
