'use strict';module.exports={PORT:9191,USER:'kyle',PUSHOVER_KEY:'1234xyz4321',TWILIO_KEY:'1234xyz4321'};
'use strict';var crontab=require('crontab');module.exports=function(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{},d=c.username||global.username,e=crontab.load(d,function(f,g){f?b.send({error:'Failed to invoke crontab for \''+d+'\'',trace:f}):a(g,b,c)});return e};
'use strict';exports.extractPayload=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},b={};return'GET'===a.method?Object.assign(b,a.query):Object.assign(b,a.body),b},exports.formatJob=function(a){if(null===a||!a.isValid())return{};var b=a.toString().split(' '),c=b.slice(0,5),d=c.join(' '),e=a.command();return{action:e,timing:{fullString:d,values:{dow:c[0],month:c[1],dom:c[2],hour:c[3],minute:c[4]}}}};
'use strict';var crontab=require('app/helpers/crontab'),loadDirective=require('app/routes/load'),createDirective=require('app/routes/create'),deleteDirective=require('app/routes/delete'),editDirective=require('app/routes/edit'),pauseDirective=require('app/routes/pause'),_require=require('app/helpers/utils'),extractPayload=_require.extractPayload;module.exports=function(a){a.get('/load',function(b,c){var d=extractPayload(b);global.log&&(global.log.info('request:/load'),global.log.info(JSON.stringify(d))),crontab(loadDirective,c,d)}),a.post('/create',function(b,c){var d=extractPayload(b);global.lob&&(global.log.info('request:/create'),global.log.info(JSON.stringify(d))),crontab(createDirective,c,d)}),a.post('/delete',function(b,c){var d=extractPayload(b);global.lob&&(global.log.info('request:/delete'),global.log.info(JSON.stringify(d))),crontab(deleteDirective,c,d)}),a.post('/edit',function(b,c){var d=extractPayload(b);global.lob&&(global.log.info('request:/edit'),global.log.info(JSON.stringify(d))),crontab(editDirective,c,d)}),a.post('/pause',function(b,c){var d=extractPayload(b);global.lob&&(global.log.info('request:/pause'),global.log.info(JSON.stringify(d))),crontab(pauseDirective,c,d)})};
'use strict';module.exports=function(a,b,c){if(!c.action||!c.timing)return b.send({error:'Insufficient parameters passed for create'});var d=c.action,e=c.timing,g=a.jobs(),h=a.pausedJobs(),i=function checkDupilcate(k){var l=!1;return k.forEach(function(m){m.command()===d&&(l=!0)}),l}(g.concat(h));if(i)return b.send({error:'Attempting to create duplicate job'}),!1;var j=a.create(d,e);return j?a.save(function(k){k?b.send({error:'Error saving crontab',trace:k}):b.send({message:'Job successfully created'})}):b.send({error:'Failed to create new job'})};
'use strict';module.exports=function(a,b,c){if(!c.action)return b.send({error:'Insufficient parameters passed for delete'});var d=a.remove({command:c.action});return d?a.save(function(e){e?b.send({error:'Error deleting cron job',trace:e}):b.send({message:'Cron job successfully deleted'})}):b.send({message:'Failed to remove cron job'})};
'use strict';module.exports=function(a,b,c){if(!c.action)return b.send({error:'Insufficient parameters passed for edit'});var d=c.action,e=c.timing,f=a.remove({command:d});if(!f)return b.send({error:'Unable to find job to edit'}),!1;var g=a.create(d,e);return g?a.save(function(h){h?b.send({error:'Error saving crontab',trace:h}):b.send({message:'Job successfully edited'})}):b.send({error:'Failed to edit job',job:g})};
'use strict';var _require=require('app/helpers/utils'),formatJob=_require.formatJob;module.exports=function(a,b,c){var d=[],e=c.type,f=[];f='paused'===e?a.pausedJobs():a.jobs(),0<f.length&&f.forEach(function(g){g.isValid()||global.log.warn('Invalid job found in crontab'),d.push(formatJob(g))}),b.send({jobs:d})};
'use strict';var _require=require('app/helpers/utils'),formatJob=_require.formatJob;module.exports=function(a,b,c){var d=a.pausedJobs(),e=a.jobs(),f=c.action,g=function extractFormattedJob(j){return 0!==j.length&&j.find(function(k){return!(k.command()!==f)&&formatJob(k)})};if(!f)return b.send({error:'Insufficient parameters passed for pause'}),!1;var h=g(d),i=g(e);if(h&&!i)a.activateJob(h);else if(!h&&i)a.pauseJob(i);else return b.send({error:'No matching paused or active jobs found'}),!1;return a.save(function(j){j?b.send({error:'Error saving crontab',trace:j}):b.send({message:'Contab successfully updated'})})};
'use strict';var log=require('minilog')('app');require('minilog').enable(),global.log=log;var express=require('express'),bodyParser=require('body-parser'),username=require('username'),argv=require('minimist')(process.argv.slice(2)),appRouter=require('./app/router'),appConfig={};try{appConfig=require('./app/config')}catch(a){log.warn('No config found, using application defaults',a),appConfig={PORT:9191,USER:'root'}}var app=express(),router=express.Router();app.use(bodyParser.urlencoded({extended:!1})),app.use(bodyParser.json()),app.use('/',router),appRouter(router),username().then(function(a){var b=argv.p||appConfig.PORT,c=argv.u||appConfig.USER,d=argv.i||'127.0.0.1';app.listen(b,d),global.username=c,global.log.info('CronBuddy Server Running'),global.log.info('Cron User: '+c),global.log.info('Node User: '+a),global.log.info('Port: '+b),global.log.info('IP: '+d)});
