/**
  * Directive for creating a new cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action || !payload.timing) {
    return response.send({
      error: 'Insufficient parameters passed for create',
    });
  }

  const { action, timing } = payload;
  const jobs = tab.jobs();

  let isDuplicate = false;
  jobs.forEach((job) => {
    if (job.command() === action) {
      // No reasonable situation where you'd make the same
      // job with multiple timings
      isDuplicate = true;
    }
  });

  if (isDuplicate) {
    response.send({
      error: 'Attempting to create duplicate job',
    });
    return false;
  }

  const task = tab.create(action, timing);
  if (!task) {
    return response.send({
      error: 'Failed to create new job',
    });
  }

  return tab.save((err) => {
    if (!err) {
      response.send({
        message: 'Job successfully created',
      });
    } else {
      response.send({
        error: 'Error saving crontab',
        trace: err,
      });
    }
  });
};
