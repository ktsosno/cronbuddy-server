/**
  * Directive for editing a cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action) {
    return response.send({
      error: 'Insufficient parameters passed for edit',
    });
  }

  const { action, timing } = payload;
  const removedJob = tab.remove({ command: action });

  if (!removedJob) {
    response.send({
      error: 'Unable to find job to edit',
    });
    return false;
  }

  const job = tab.create(action, timing);
  
  if (!job) {
    return response.send({
      error: 'Failed to edit job',
      job,
    });
  }

  return tab.save((err) => {
    if (!err) {
      response.send({
        message: 'Job successfully edited',
      });
    } else {
      response.send({
        error: 'Error saving crontab',
        trace: err,
      });
    }
  });
};
