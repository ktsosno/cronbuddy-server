const { formatJob } = require('app/helpers/utils');

/**
  * Directive for loading all crons
  */
module.exports = (tab, response) => {
  const parsedJobs = [];
  const jobs = tab.jobs();

  if (jobs.length > 0) {
    jobs.forEach((job) => {
      if (!job.isValid()) {
        global.log.warn('Invalid job found in crontab');
      }

      parsedJobs.push(formatJob(job));
    });
  }

  response.send({ jobs: parsedJobs });
};
