# CronBuddy
The API server for management of your crontab via a simple UI.

### Development
Initialize the `node_modules` directory with `npm install`.
Run `npm run watch:server` in the application root to watch the development folder.

### Running the Server
Start the server with root access:
`sudo node server.js`

To specify port (default 8080):
```
-p=8181
```

To specify user (default to node process):
```
-u=myUser
```
