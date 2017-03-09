const crontab = require('app/helpers/crontab');
const loadDirective = require('app/routes/load');
const createDirective = require('app/routes/create');
const deleteDirective = require('app/routes/delete');
const editDirective = require('app/routes/edit');
const pauseDirective = require('app/routes/pause');
const { extractPayload } = require('app/helpers/utils');

/**
  * Router for application
  */
module.exports = (router) => {
  /**
    * Load all cron jobs for the current user
    * @param type {String} The type of jobs to load (active|paused)
    * @return Array of current jobs
    */
  router.get('/load', (request, response) => {
    // TODO: Add extractQuery method to get query param requests
    const payload = extractPayload(request);

    if (global.log) {
      global.log.info('request:/load');
      global.log.info(JSON.stringify(payload));
    }

    crontab(loadDirective, response, payload);
  });

  /**
    * Create a new cron entry
    * @param action {String} The script or command to create
    * @param timing {String} The cron timing sequence
    * @return Success message
    */
  router.post('/create', (request, response) => {
    const payload = extractPayload(request);

    if (global.log) {
      global.log.info('request:/create');
      global.log.info(JSON.stringify(payload));
    }

    crontab(createDirective, response, payload);
  });

  /**
    * Delete a cron entry
    * @param action {String} The script or command to delete
    * @return Success message
    */
  router.post('/delete', (request, response) => {
    const payload = extractPayload(request);

    if (global.log) {
      global.log.info('request:/delete');
      global.log.info(JSON.stringify(payload));
    }

    crontab(deleteDirective, response, payload);
  });

  /**
    * Edit an existing crontab entry
    * @param id {Integer} The ID of the cron being edited
    * @return Success message
    */
  router.post('/edit', (request, response) => {
    const payload = extractPayload(request);

    if (global.log) {
      global.log.info('request:/edit');
      global.log.info(JSON.stringify(payload));
    }

    crontab(editDirective, response, payload);
  });

  /**
    * Pause or activate a cron
    * @param action {String} The command
    * @return Success message
    */
  router.post('/pause', (request, response) => {
    const payload = extractPayload(request);

    if (global.log) {
      global.log.info('request:/pause');
      global.log.info(JSON.stringify(payload));
    }

    crontab(pauseDirective, response, payload);
  });
};
