const later = require('later');

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

      // We can be smarter about this, null values returned on
      // direct function access, e.g. job.second();
      let jobArr = job.toString().split(' ');
      let timingArr = jobArr.slice(0,5);
      let timingStr = timingArr.join(' ');
      let action = jobArr.slice(5).join(' ');

      // Construct more useable job object
      const parsedJob = {
        action,
        timing: {
          fullString: timingStr,
          values: {
            dayOfWeek: timingArr[0],
            month: timingArr[1],
            dayOfMonth: timingArr[2],
            hour: timingArr[3],
            minute: timingArr[4],
            second: timingArr[5]
          }
        }
      };

      parsedJobs.push(parsedJob);
    });
  }

  response.send({ jobs: parsedJobs });
};
