/**
  * Directive for editing a cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action) {
    response.send({
      error: 'Insufficient parameters passed for edit'
    });
  }

  // Delete and re-add
  // TODO: Pull request into crontab to return delete success
  tab.remove({ command: payload.action });
  const job = tab.create(payload.action, payload.timing);

  if (!job) {
    response.send({
      error: 'Failed to edit job',
      job
    });
  } else {
    tab.save((err, tab) => {
      if(!err) {
        response.send({
          message: 'Job successfully edited'
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
