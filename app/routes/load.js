/**
  * Directive for loading all crons
  */
module.exports = (tab, response) => {
  const jobs = tab.jobs();
  const parsedJobs = [];

  if (jobs.length > 0) {
    jobs.forEach((job) => {
      // TODO: More logical parsing of this
      parsedJobs.push(job.toString());
    });
  }

  response.send({ jobs: parsedJobs });
};
