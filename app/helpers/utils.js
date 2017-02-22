/**
  * Directive for creating a new cron job
  * @param request {Object} The request body object
  * @return extracted payload from request body
  */
exports.extractPayload = (request = {}) => {
  const payload = {};

  Object.assign(payload, request.body);

  return payload;
};
