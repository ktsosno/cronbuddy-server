/**
  * Directive for editing a cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action) {
    return response.send({
      message: 'Insufficient parameters passed for edit',
      success: false,
    });
  }

  const { action, timing } = payload;
  const removedJob = tab.remove({ command: action });

  if (!removedJob) {
    response.send({
      message: 'Unable to find job to edit',
      success: false,
    });
    return false;
  }

  const job = tab.create(action, timing);

  if (!job) {
    return response.send({
      message: 'Failed to edit job',
      success: false,
    });
  }

  return tab.save((err) => {
    if (!err) {
      response.send({
        message: 'Job successfully edited',
        success: false,
      });
    } else {
      response.send({
        message: 'Error saving crontab',
        success: false,
        trace: err,
      });
    }
  });
};
