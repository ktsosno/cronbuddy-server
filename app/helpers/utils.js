/**
  * Directive for creating a new cron job
  * @param request {Object} The request body object
  * @return extracted payload from request body
  */
exports.extractPayload = (request = {}) => {
  const payload = {};

  if (request.method === 'GET') {
    Object.assign(payload, request.query);
  } else {
    Object.assign(payload, request.body);
  }

  return payload;
};

exports.formatJob = (job) => {
  if (job === null || !job.isValid()) {
    return {};
  }

  const jobArr = job.toString().split(' ');
  const timingArr = jobArr.slice(0, 5);
  const timingStr = timingArr.join(' ');
  const action = job.command();

  return {
    action,
    timing: {
      fullString: timingStr,
      values: {
        dow: timingArr[0],
        month: timingArr[1],
        dom: timingArr[2],
        hour: timingArr[3],
        minute: timingArr[4],
      },
    },
  };
};
