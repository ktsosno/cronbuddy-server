const { formatJob } = require('app/helpers/utils');

/**
  * Directive for loading all crons
  */
module.exports = (tab, response, payload) => {
  const parsedJobs = [];
  const type = payload.type;
  let jobs = [];

  if (type === 'paused') {
    jobs = tab.pausedJobs();
  } else {
    jobs = tab.jobs();
  }

  if (jobs.length > 0) {
    jobs.forEach((job) => {
      parsedJobs.push(formatJob(job));
    });
  }

  response.send({ jobs: parsedJobs });
};
