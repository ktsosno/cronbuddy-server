exports.extractPayload = (request = {}) => {
  const payload = {}
  for (let x in request.body) {
    payload[x] = request.body[x];
  }
  return payload;
}
