# CronBuddy
The API server for management of your crontab via a simple UI.

### Development
Initialize the `node_modules` directory with `npm install`.
Run `npm run watch:server` in the application root to watch the development folder. The output is minified to `server.js` in the application root.

### Running the Server
Start the server with root access:
`sudo node server.js`

Options
```
node server.js -p=8181      // Specify the port for node server
node server.js -u=myUser    // Specify which user's crontab to invoke
```

Nginx Configuration
Here is a sample Nginx configuration for running the node and react server in tandem. This also covers SSL and passwd authentication.
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

        # Handle socket communication for react
        add_header X-Frame-Options "SAMEORIGIN";

        # React Application
        location / {
                auth_basic "Restrictred";
                auth_basic_user_file /etc/nginx/<password-location>

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-NginX-Proxy true;

                # Make sure this matches your intended react port
                proxy_pass http://localhost:3000/;
                proxy_ssl_session_reuse off;
                proxy_set_header Host $http_host;
                proxy_cache_bypass $http_upgrade;
                proxy_redirect off;
        }

        # Node APIs
        location /api {
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
