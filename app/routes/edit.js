/**
  * Directive for editing a cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action) {
    return response.send({
      error: 'Insufficient parameters passed for edit'
    });
  }

  // Delete and re-add
  // TODO: Pull request into crontab to return delete success
  tab.remove({ command: payload.action });
  const job = tab.create(payload.action, payload.timing);

  if (!job) {
    return response.send({
      error: 'Failed to edit job',
      job
    });
  } else {
    tab.save((err, tab) => {
      if(!err) {
        return response.send({
          message: 'Job successfully edited'
        });
      } else {
        return response.send({
          error: 'Error saving crontab',
          trace: err
        });
      }
    });
  }

};
