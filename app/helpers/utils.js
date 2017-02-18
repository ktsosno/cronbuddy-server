/**
  * Directive for creating a new cron job
  * @param request {Object} The request body object
  * @return extracted payload from request body
  */
exports.extractPayload = (request = {}) => {
  const payload = {}
  for (let x in request.body) {
    payload[x] = request.body[x];
  }
  return payload;
}
