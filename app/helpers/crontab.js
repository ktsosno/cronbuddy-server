const crontab = require('crontab');

/**
  * Directive for creating a new cron job
  * @param directive {Function} The route directive (action) to be taken
  * @param response {Object} The forwarded node response object
  * @param payload {Object} Optional payload data for CRUD operations
  */
module.exports = (directive, response, payload = {}) => {
  return crontab.load((err, tab) => {
    if (!err) {
      directive(tab, response, payload);
    } else {
      response.send({
        error: 'Failed to invoke crontab',
        trace: err
      })
    }
  });
}