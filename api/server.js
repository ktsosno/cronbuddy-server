const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const crontabber = require('crontab');
const router = express.Router();

const SERVER_PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);

//app.listen(SERVER_PORT);
//console.log(`Listening on ${SERVER_PORT}...`);

crontabber.load(function(err, crontab) {
  var jobs = crontab.jobs();
  console.log(jobs);
});

// router.get('/load', (request, response) => {
//   crontabber.load((err, crontab) => {
//     const jobs = crontab.jobs();
//     const parsedResponse = {
//       err,
//       jobs
//     }
//     response.send(parsedResponse);
//   });
// });
//
// router.post('/edit', (request, response) => {
//   response.send(request.body);
// });
//
// router.post('/create', (request, response) => {
//   response.send(request.body);
// });
//
// router.post('/delete', (request, response) => {
//   response.send(request.body);
// });
