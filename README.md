# CronBuddy
NodeJS APIs for turning a crontab into a structured data store. Create, edit, delete and pause cron jobs without a traditional data store.

### Development
Initialize the `node_modules` directory with `npm install`.
Run `npm run watch:server` in the application root to watch the development folder. The output is minified to `server.js` in the application root.

### Running the Server
Start the server with root access:
`sudo node server.js`

#### Options
The recommended way is to create a configuration file at `app/config.js`. This contains your chosen port and crontab user.

Example config:
```
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

### Nginx Configuration
Here is a sample Nginx configuration for running the node APIs. This also covers SSL and passwd authentication. This configuration forces a redirect to the SSL host on non-SSL requests.

```
server {
        listen 80;
        listen [::]:80;

        server_name <hostname>;

        # Forward inbound requests to SSL port
        return 301 https://$server_name$request_uri;
}

server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;

        include /etc/nginx/snippets/ssl-certs/<ssl-cert-file>
        include /etc/nginx/snippets/ssl-params.conf;

        server_name <hostname>;

        # Node APIs
        # This location must match your server.js definition
        location /api {
                # API and Web need auth_basic to prevent direct API access
                auth_basic "Restrictred";
                auth_basic_user_file /etc/nginx/<password-location>

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-NginX-Proxy true;

                # Make sure this matches your intended node port
                proxy_pass http://localhost:9191/;
                proxy_ssl_session_reuse off;
                proxy_set_header Host $http_host;
                proxy_cache_bypass $http_upgrade;
                proxy_redirect off;
        }
}
```
