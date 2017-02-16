/**
  * Directive for loading all crons
  */

module.exports = (tab, response) => {
  const jobs = tab.jobs();
  const parsedJobs = [];

  if (jobs.length > 0) {
    jobs.forEach((job) => {
      parsedJobs.push(job.toString());
    });
  }

  response.send({ jobs: parsedJobs });
};
