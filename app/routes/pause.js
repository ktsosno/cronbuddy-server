const { formatJob } = require('app/helpers/utils');

/**
  * Directive for loading all paused crons
  */
module.exports = (tab, response, payload) => {
  const pausedJobs = tab.pausedJobs();
  const allJobs = tab.jobs();
  const action = payload.action;

  const extractFormattedJob = (jobSet) => {
    if (jobSet.length === 0) {
      return false;
    }

    return jobSet.find((job) => {
      if (job.command() === action) {
        return formatJob(job);
      }
      return false;
    });
  };

  if (!action) {
    response.send({
      message: 'Insufficient parameters passed for pause',
      success: false,
    });
    return false;
  }

  // Check if there is a matching paused and active job
  const pausedJob = extractFormattedJob(pausedJobs);
  const activeJob = extractFormattedJob(allJobs);

  if (pausedJob && !activeJob) {
    tab.activateJob(pausedJob);
  } else if (!pausedJob && activeJob) {
    tab.pauseJob(activeJob);
  } else {
    response.send({
      message: 'No matching paused or active jobs found',
      success: false,
    });
    return false;
  }

  return tab.save((err) => {
    if (!err) {
      response.send({
        message: 'Contab successfully updated',
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
