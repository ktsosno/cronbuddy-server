/**
  * Directive for loading all crons
  */
module.exports = (tab, response) => {
  const pausedJobs = tab.paused();
  // First delete the job from the active crons
  // Push a flagged comment into the lines

  response.send({ pausedJobs });
};
