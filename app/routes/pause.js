const { formatJob } = require('app/helpers/utils');

/**
  * Directive for loading all crons
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
      error: 'Insufficient parameters passed for pause',
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
      error: 'No matching paused or active jobs found',
    });
    return false;
  }

  return tab.save((err) => {
    if (!err) {
      response.send({
        message: 'Contab successfully updated',
      });
    } else {
      response.send({
        error: 'Error saving crontab',
        trace: err,
      });
    }
  });
};
