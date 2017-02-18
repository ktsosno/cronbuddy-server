
/**
  * Directive for creating a new cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action || !payload.timing) {
    response.send({
      error: 'Insufficient parameters passed for create'
    });
  }

  const task = tab.create(payload.action, payload.timing);
  if (!task) {
    response.send({
      error: 'Failed to create new job'
    });
  } else {
    tab.save((err, tab) => {
      if(!err) {
        response.send({
          message: 'Job successfully created'
        });
      } else {
        response.send({
          error: 'Error saving crontab',
          trace: err
        });
      }
    });
  }
};
