/**
  * Directive for creating a new cron job
  */
module.exports = (tab, response, payload) => {
  if (!payload.action || !payload.timing) {
    return response.send({
      message: 'Insufficient parameters passed for create',
      success: false,
    });
  }

  const { action, timing } = payload;
  const checkDupilcate = (jobSet) => {
    let isDuplicate = false;
    jobSet.forEach((job) => {
      if (job.command() === action) {
        isDuplicate = true;
      }
    });
    return isDuplicate;
  };

  const jobs = tab.jobs();
  const pausedJobs = tab.pausedJobs();
  const isDuplicate = checkDupilcate(jobs.concat(pausedJobs));

  if (isDuplicate) {
    response.send({
      message: 'Attempting to create duplicate job',
      success: false,
    });
    return false;
  }

  const task = tab.create(action, timing);
  if (!task) {
    return response.send({
      message: 'Failed to create new job',
      success: false,
    });
  }

  return tab.save((err) => {
    if (!err) {
      response.send({
        message: 'Job successfully created',
        success: true,
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
