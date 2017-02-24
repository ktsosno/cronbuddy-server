const crontab = require('crontab');

/**
  * Directive for creating a new cron job
  * @param directive {Function} The route directive (action) to be taken
  * @param response {Object} The forwarded node response object
  * @param payload {Object} Optional payload data for CRUD operations
  */
module.exports = (directive, response, payload = {}) => {
  // Use a passed in user for a specific tab, or fallback to the config
  const username = payload.username || global.username;
  const loadedCrontab = crontab.load(username, (err, tab) => {
    if (!err) {
      directive(tab, response, payload);
    } else {
      response.send({
        error: `Failed to invoke crontab for '${global.username}'`,
        trace: err,
      });
    }
  });

  return loadedCrontab;
};
