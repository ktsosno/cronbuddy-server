/**
  * Directive for creating a new cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action || !payload.timing) {
    return response.send({
      error: 'Insufficient parameters passed for create'
    });
  }

  const action = payload.action;
  const jobs =  tab.jobs();

  let isDuplicate = false;
  jobs.forEach(job => {
    if (job.command() === action) {
      // No reasonable situation where you'd make the same
      // job with multiple timings
      isDuplicate = true;
      response.send({
        error: 'Attempting to create duplicate job'
      });
    };
  });

  if (isDuplicate) {
    return false;
  }

  const task = tab.create(payload.action, payload.timing);
  if (!task) {
    return response.send({
      error: 'Failed to create new job',
      task
    });
  } else {
    tab.save((err, tab) => {
      if(!err) {
        return response.send({
          message: 'Job successfully created'
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
