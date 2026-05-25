# Complete MERN Backend Deployment on AWS EC2

Production Architecture:

```text id="e7m2pk"
GitHub
   ↓
EC2 Ubuntu Server
   ↓
Node.js + Express
   ↓
PM2 Process Manager
   ↓
Nginx Reverse Proxy
   ↓
Let's Encrypt SSL
   ↓
api.skyl.online
```

---

# PART 1 — Launch EC2 Instance

---

## STEP 1 — Open EC2 Console

[AWS EC2 Console](https://console.aws.amazon.com/ec2/?utm_source=chatgpt.com)

---

## STEP 2 — Launch Instance

Click:

```text id="g4v9xt"
Launch Instance
```

---

## STEP 3 — Name Instance

Example:

```text id="r2w8mj"
mern-backend
```

---

## STEP 4 — Choose OS

Select:

```text id="x6n1kp"
Ubuntu Server 24.04 LTS
```

---

## STEP 5 — Choose Instance Type

Free tier:

```text id="f8m3qc"
t2.micro
```

Better:

```text id="z5v7tr"
t3.micro
```

---

## STEP 6 — Create Key Pair

Click:

```text id="v1q9ny"
Create Key Pair
```

Name:

```text id="m4x2pk"
backend-key
```

Type:

```text id="n8r5wv"
RSA
```

Format:

```text id="b7m1zs"
.pem
```

Download key.

IMPORTANT:

Keep safe.

---

# PART 2 — Configure Security Group

---

## STEP 7 — Create Security Group

Allow:

| Type  | Port |
| ----- | ---- |
| SSH   | 22   |
| HTTP  | 80   |
| HTTPS | 443  |

Optional:

| Custom TCP | 8000 |

ONLY for testing.

Do NOT expose 8000 in production.

---

# PART 3 — Connect to EC2

---

## STEP 8 — Copy Public IP

Example:

```text id="t6v3qm"
13.233.xx.xx
```

---

## STEP 9 — SSH Into Server

Move key to project folder.

Run:

```bash id="d3m7kc"
chmod 400 backend-key.pem
```

Connect:

```bash id="j9x1pw"
ssh -i backend-key.pem ubuntu@YOUR_PUBLIC_IP
```

---

# PART 4 — Update Server

---

## STEP 10 — Update Packages

```bash id="q5n8rv"
sudo apt update && sudo apt upgrade -y
```

---

# PART 5 — Install Node.js

---

## STEP 11 — Install NodeSource

```bash id="m2v6tx"
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
```

---

## STEP 12 — Install Node.js

```bash id="w7p1mk"
sudo apt install -y nodejs
```

---

## STEP 13 — Verify

```bash id="x4r9zn"
node -v
npm -v
```

---

# PART 6 — Install Git

---

## STEP 14 — Install Git

```bash id="n1q5vx"
sudo apt install git -y
```

---

## STEP 15 — Verify

```bash id="b8m2pw"
git --version
```

---

# PART 7 — Clone GitHub Project

---

## STEP 16 — Clone Repo

Example:

```bash id="r4v7tm"
git clone https://github.com/username/project.git
```

---

## STEP 17 — Open Project

```bash id="y9x1kc"
cd project/server
```

---

# PART 8 — Install Backend Dependencies

---

## STEP 18 — Install Packages

```bash id="u3m8zp"
npm install
```

---

# PART 9 — Create Environment Variables

---

## STEP 19 — Create .env File

```bash id="f7v2mk"
nano .env
```

Example:

```env id="d5q9xr"
PORT=8000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
NODE_ENV=production
```

Save:

```text id="m8v1ty"
CTRL + O
ENTER
CTRL + X
```

---

# PART 10 — Test Backend

---

## STEP 20 — Run Backend

```bash id="p4n7wj"
node server.js
```

or:

```bash id="s1x5qc"
npm run dev
```

---

## STEP 21 — Test API

Open browser:

```text id="k6m2pv"
http://EC2_PUBLIC_IP:8000
```

Should work.

Press:

```text id="v3q8ny"
CTRL + C
```

to stop.

---

# PART 11 — Install PM2

---

## STEP 22 — Install PM2

```bash id="x9m4tr"
sudo npm install pm2 -g
```

---

## STEP 23 — Start App With PM2

```bash id="b2v7pk"
pm2 start server.js --name backend
```

---

## STEP 24 — Check PM2

```bash id="q6m1xw"
pm2 list
```

---

## STEP 25 — View Logs

```bash id="n4r8ty"
pm2 logs backend
```

---

## STEP 26 — Enable Auto Restart

```bash id="y7m2qc"
pm2 startup
```

Run generated command.

Then:

```bash id="k1v9zp"
pm2 save
```

---

# PART 12 — Install Nginx

---

## STEP 27 — Install Nginx

```bash id="t5m3xr"
sudo apt install nginx -y
```

---

## STEP 28 — Start Nginx

```bash id="m8x1qp"
sudo systemctl start nginx
```

---

## STEP 29 — Enable Nginx

```bash id="p3v6tk"
sudo systemctl enable nginx
```

---

## STEP 30 — Check Status

```bash id="x7m2rv"
sudo systemctl status nginx
```

---

# PART 13 — Configure Nginx Reverse Proxy

---

## STEP 31 — Create Config File

```bash id="d4v9pk"
sudo nano /etc/nginx/sites-available/api.skyl.online
```

Paste:

```nginx id="h8m1qw"
server {
    listen 80;

    server_name api.skyl.online;

    location / {
        proxy_pass http://localhost:8000;

        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_set_header Host $host;

        proxy_cache_bypass $http_upgrade;

        proxy_set_header X-Real-IP $remote_addr;

        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Save.

---

## STEP 32 — Enable Site

```bash id="j2v7xm"
sudo ln -s /etc/nginx/sites-available/api.skyl.online /etc/nginx/sites-enabled/
```

---

## STEP 33 — Remove Default Site

```bash id="v6m1pk"
sudo rm /etc/nginx/sites-enabled/default
```

---

## STEP 34 — Test Nginx Config

```bash id="w3q9tx"
sudo nginx -t
```

---

## STEP 35 — Reload Nginx

```bash id="b7m4rv"
sudo systemctl reload nginx
```

---

# PART 14 — Configure Domain

---

## STEP 36 — Add DNS Record

Go to DNS provider.

Create:

```text id="m5x8qc"
A Record
```

Example:

```text id="x2n7pv"
Host: api
Value: EC2_PUBLIC_IP
```

Wait DNS propagation.

---

# PART 15 — Test Domain

---

## STEP 37 — Open Browser

```text id="v9m1tr"
http://api.skyl.online
```

Should show backend response.

---

# PART 16 — Install SSL HTTPS

---

## STEP 38 — Install Certbot

```bash id="q4m7xp"
sudo apt install certbot python3-certbot-nginx -y
```

---

## STEP 39 — Generate SSL Certificate

```bash id="n8v2pk"
sudo certbot --nginx -d api.skyl.online
```

---

## STEP 40 — Enter Email

Provide email.

---

## STEP 41 — Agree Terms

Choose:

```text id="j6m1wr"
Y
```

---

## STEP 42 — Redirect HTTP to HTTPS

Choose:

```text id="b3v9qt"
2
```

---

# PART 17 — Verify HTTPS

---

## STEP 43 — Open Browser

```text id="x7m5pk"
https://api.skyl.online
```

Should show secure lock 🔒

---

# PART 18 — Firewall Setup

---

## STEP 44 — Enable UFW

```bash id="d1q8vm"
sudo ufw allow OpenSSH
```

```bash id="v5m2tx"
sudo ufw allow 'Nginx Full'
```

```bash id="r8x4pk"
sudo ufw enable
```

---

## STEP 45 — Check Firewall

```bash id="y2m7qv"
sudo ufw status
```

---

# FINAL PRODUCTION ARCHITECTURE

```text id="n4v8xp"
Users
   ↓
HTTPS Domain
   ↓
Nginx Reverse Proxy
   ↓
PM2
   ↓
Node.js Express App
   ↓
MongoDB
```

---

# IMPORTANT PRODUCTION COMMANDS

## Restart Backend

```bash id="q6x1mv"
pm2 restart backend
```

---

## View Logs

```bash id="w9m4pk"
pm2 logs
```

---

## Restart Nginx

```bash id="t3v8qx"
sudo systemctl restart nginx
```

---

## Reload Nginx

```bash id="f7m1rp"
sudo systemctl reload nginx
```

---

## Check Nginx Config

```bash id="k2x5vm"
sudo nginx -t
```

This is the standard professional MERN backend deployment workflow on AWS EC2.
