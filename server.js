'use strict';module.exports={PORT:9191,USER:'kyle',PUSHOVER_KEY:'1234xyz4321',TWILIO_KEY:'1234xyz4321'};
'use strict';var crontab=require('crontab');module.exports=function(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:{};return crontab.load(global.username,function(d,e){return d?b.send({error:'Failed to invoke crontab for \''+global.username+'\'',trace:d}):void a(e,b,c)})};
"use strict";exports.extractPayload=function(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:{},b={};for(var c in a.body)b[c]=a.body[c];return b};
'use strict';module.exports=function(a){var b='../app/routes',c='../app/helpers',d=require(c+'/crontab'),e=require(c+'/utils'),f=require(b+'/load'),g=require(b+'/create'),h=require(b+'/delete'),i=require(b+'/edit');a.get('/load',function(j,k){global.log&&global.log.info('request:/load'),d(f,k)}),a.post('/create',function(j,k){var l=e.extractPayload(j);global.lob&&(global.log.info('request:/create'),global.log.info(JSON.stringify(l))),d(g,k,l)}),a.post('/delete',function(j,k){var l=e.extractPayload(j);global.lob&&(global.log.info('request:/delete'),global.log.info(JSON.stringify(l))),d(h,k,l)}),a.post('/edit',function(j,k){var l=e.extractPayload(j);global.lob&&(global.log.info('request:/edit'),global.log.info(JSON.stringify(l))),d(i,k,l)})};
'use strict';module.exports=function(a,b,c){if(!c.action||!c.timing)return b.send({error:'Insufficient parameters passed for create'});var d=c.action,e=a.jobs();e.forEach(function(g){if(g.command()===d)return b.send({error:'Attempting to create duplicate job'})});var f=a.create(c.action,c.timing);return f?void a.save(function(g){return g?b.send({error:'Error saving crontab',trace:g}):b.send({message:'Job successfully created'})}):b.send({error:'Failed to create new job',task:f})};
'use strict';module.exports=function(a,b,c){if(!c.action)return b.send({error:'Insufficient parameters passed for delete'});var d=a.remove({command:c.action});return d?void a.save(function(e){return e?b.send({error:'Error deleting cron job',trace:e}):b.send({message:'Cron job successfully deleted'})}):b.send({message:'Failed to remove cron job'})};
'use strict';module.exports=function(a,b,c){if(!c.action)return b.send({error:'Insufficient parameters passed for edit'});a.remove({command:c.action});var d=a.create(c.action,c.timing);return d?void a.save(function(e){return e?b.send({error:'Error saving crontab',trace:e}):b.send({message:'Job successfully edited'})}):b.send({error:'Failed to edit job',job:d})};
'use strict';var later=require('later');module.exports=function(a,b){var c=[],d=a.jobs();0<d.length&&d.forEach(function(e){e.isValid()||global.log.warn('Invalid job found in crontab');var f=e.toString().split(' '),g=f.slice(0,5),h=g.join(' '),i=e.command(),j={action:i,timing:{fullString:h,values:{dow:g[0],month:g[1],dom:g[2],hour:g[3],minute:g[4]}}};c.push(j)}),b.send({jobs:c})};
'use strict';var log=require('minilog')('app');require('minilog').enable(),global.log=log;var express=require('express'),bodyParser=require('body-parser'),username=require('username'),argv=require('minimist')(process.argv.slice(2)),userRoute='./app',appRouter=require(userRoute+'/router'),appConfig={};try{appConfig=require(userRoute+'/config')}catch(a){log.warn('No config found, using application defaults',a),appConfig={PORT:9191,USER:'root'}}var app=express(),router=express.Router();app.use(bodyParser.urlencoded({extended:!1})),app.use(bodyParser.json()),app.use('/',router),appRouter(router),username().then(function(){var b=argv.p||appConfig.PORT,c=argv.u||appConfig.USER,d=argv.i||'127.0.0.1';app.listen(b,d),global.username=c,global.log.info('CronBuddy Server Running'),global.log.info('User: '+c),global.log.info('Port: '+b),global.log.info('IP: '+d)});
