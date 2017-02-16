const crontab = require('crontab');

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
