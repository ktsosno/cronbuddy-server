module.exports = (router) => {
  const crontab = require('../app/helpers/crontab');
  const utils = require('../app/helpers/utils');

  const loadDirective = require('../app/routes/load');
  const createDirective = require('../app/routes/create');
  const deleteDirective = require('../app/routes/delete');

  /**
    * Load all cron jobs for the current user
    * @return Array of current jobs
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
    const payload = utils.extractPayload(request);
    crontab(createDirective, response, payload);
  });

  /**
    * Delete a cron entry
    * @param action {String} The script or command to delete
    * @return Success message
    */
  router.post('/delete', (request, response) => {
    const payload = utils.extractPayload(request);
    crontab(deleteDirective, response, payload);
  });
};