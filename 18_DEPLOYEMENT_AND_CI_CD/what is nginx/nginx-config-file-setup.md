# ===================================
# USER
# ===================================

# Linux user running nginx worker processes
user www-data;



# ===================================
# WORKER PROCESSES
# ===================================

# Auto-detect CPU cores
worker_processes auto;



# ===================================
# EVENTS BLOCK
# ===================================

events {

    # Maximum simultaneous connections
    worker_connections 1024;
}



# ===================================
# HTTP BLOCK
# ===================================

http {

    # MIME TYPES
    include /etc/nginx/mime.types;

    default_type application/octet-stream;



    # ===================================
    # LOGS
    # ===================================

    access_log /var/log/nginx/access.log;

    error_log /var/log/nginx/error.log;



    # ===================================
    # PERFORMANCE
    # ===================================

    sendfile on;

    tcp_nopush on;

    keepalive_timeout 65;



    # ===================================
    # GZIP
    # ===================================

    gzip on;

    gzip_types
        text/plain
        text/css
        application/json
        application/javascript
        text/xml
        application/xml;



    # ===================================
    # SERVER BLOCK
    # ===================================

    server {

        # Port
        listen 80;

        # Domain
        server_name api.skyl.online;



        # ===================================
        # LOCATION BLOCK
        # ===================================

        location / {

            # Forward request to backend
            proxy_pass http://localhost:8000;



            # ===================================
            # HEADERS
            # ===================================

            proxy_set_header Host $host;

            proxy_set_header X-Real-IP $remote_addr;

            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

            proxy_set_header X-Forwarded-Proto $scheme;



            # ===================================
            # WEBSOCKET SUPPORT
            # ===================================

            proxy_http_version 1.1;

            proxy_set_header Upgrade $http_upgrade;

            proxy_set_header Connection "upgrade";
        }
    }
}