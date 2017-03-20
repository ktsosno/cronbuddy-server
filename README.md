# CronBuddy Node APIs
Node APIs for turning a crontab into a data store. Create, edit, delete and pause cron jobs using only the native crontab. These APIs leverage [node-crontab](https://github.com/dachev/node-crontab) for access to the tab via Node.

### Development
Initialize the `node_modules` directory with `npm install`.
Run `npm run watch:server` in the application root to watch the development folder. The output is minified to `server.js` in the application root.

### Running the Server
You can start the server with a certain user or as root to be able to access all users' crontabs. There is `start_server` script included if you are running this outside of pm2.

```
$ sudo ./start_server 
[sudo] password for kyle: 
app info CronBuddy Server Running
app info Cron User: kyle
app info Node User: root
app info Port: 9191
app info IP: 127.0.0.1
```

### Documentation

**Load Jobs**

Method `GET`

Sample Request:
```
/api/load               // All active jobs
/api/load?type=paused   // All paused jobs
```

Sample Response:
```json
{
  "jobs": [
    {
      "action": "ls -l",
      "timing": {
        "fullString": "0 12 * * *",
        "values": {
          "dow": "0",
          "month": "12",
          "dom": "*",
          "hour": "*",
          "minute": "*"
        }
      }
    }
  ]
}
```

------
**Create Job**

Method `POST`

Params:
```json
{
 'action': 'ls -l',
 'timing': '0 12 * * *'
}
```

Sample Request:
```
/api/create
```

Sample Response:
```json
{
  "message": "Job successfully created",
  "success": true
}
```

------
**Delete Job**

Method `POST`

Params:
```json
{
 'action': 'ls -l',
 'timing': '0 11 * * *'
}
```

Sample Request:
```
/api/edit
```

Sample Response:
```json
{
  "message": "Job successfully edited",
  "success": false
}
```

------
**Pause Job**

Method `POST`

Params:
```json
{
 'action': 'ls -l'
}
```

Sample Request:
```
/api/pause
```

Sample Response:
```json
{
  "message": "Contab successfully updated",
  "success": true
}
```

Note: Short of commenting out a line, there isn't a way to pause a job in the crontab. This API prepends the command with a `#paused` comment to track its state.

------

#### Options
The recommended way is to create a configuration file at `app/config.js`. This contains your chosen port and crontab user.

Example config:
```js
module.exports = {
  PORT: 9191,                    // Default if no config created
  USER: 'root'                   // Default if no config created
};
```

You can also override some of the configurations with the command line:
```
node server.js 
        -p=8181         // Specify the port for node server
        -u=myUser       // Specify which user's crontab to invoke, default `whoami`
        -i=127.0.0.1    // Override the local IP
```
