# Complete Step-by-Step React Deployment on AWS S3 + CloudFront + Custom Domain + HTTPS + CloudFront Function

This is the modern professional deployment method for React/Vite apps.

Architecture:

```text id="w1n8qa"
React App
   ↓
S3 Bucket
   ↓
CloudFront CDN
   ↓
CloudFront Function
   ↓
Custom Domain + HTTPS
```

---

# PART 1 — Build React App

---

## STEP 1 — Open Project

Go to frontend folder:

```bash id="x7m3pf"
cd client
```

---

## STEP 2 — Install Dependencies

```bash id="c2v8rk"
npm install
```

---

## STEP 3 — Build Production App

```bash id="u4p1ny"
npm run build
```

After build you get:

```text id="d6q9hz"
dist/
```

Inside dist:

```text id="t1r5jw"
index.html
assets/
```

IMPORTANT:

You will upload contents INSIDE dist folder.

---

# PART 2 — Create S3 Bucket

---

## STEP 4 — Open S3 Console

[AWS S3 Console](https://console.aws.amazon.com/s3/?utm_source=chatgpt.com)

---

## STEP 5 — Create Bucket

Click:

```text id="n9k2mb"
Create Bucket
```

---

## STEP 6 — Bucket Name

Use domain name.

Example:

```text id="j5x7cq"
skyl.online
```

---

## STEP 7 — Region

Choose nearest region.

Example:

```text id="h8m1zp"
ap-south-1 (Mumbai)
```

---

## STEP 8 — Disable Public Access Block

IMPORTANT.

Uncheck:

```text id="r3w6tn"
Block all public access
```

AWS warning appears.

Check:

```text id="f7q2lv"
I acknowledge...
```

---

## STEP 9 — Create Bucket

Click:

```text id="m2v4pk"
Create Bucket
```

---

# PART 3 — Upload React Build

---

## STEP 10 — Open Bucket

Click your bucket.

---

## STEP 11 — Upload Files

Click:

```text id="q1z9xr"
Upload
```

---

## STEP 12 — Upload DIST CONTENTS

Open dist folder locally.

Upload:

```text id="w8p6jn"
index.html
assets/
```

NOT the dist folder itself.

Correct:

```text id="v4m1sy"
index.html
assets/
```

Wrong:

```text id="t7n3qb"
dist/index.html
```

---

## STEP 13 — Finish Upload

Click:

```text id="a6r2kf"
Upload
```

---

# PART 4 — Enable Static Website Hosting

---

## STEP 14 — Open Properties

Inside bucket:

```text id="p9w4dm"
Properties
```

Scroll down.

---

## STEP 15 — Static Website Hosting

Click:

```text id="e5k7yn"
Edit
```

Enable:

```text id="s3m1vh"
Enable
```

---

## STEP 16 — Set Index Document

```text id="x8r4tz"
index.html
```

---

## STEP 17 — Save Changes

Click:

```text id="k2n9jc"
Save Changes
```

---

# PART 5 — Add Bucket Policy

---

## STEP 18 — Open Permissions

Go:

```text id="b6v1qs"
Permissions
```

---

## STEP 19 — Bucket Policy

Click:

```text id="g9m3xr"
Edit
```

Paste:

```json id="l4w7pk"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::skyl.online/*"
    }
  ]
}
```

Replace:

```text id="y5t8nh"
skyl.online
```

with your bucket name.

---

## STEP 20 — Save

Click:

```text id="d3q6mj"
Save Changes
```

---

# PART 6 — Test S3 Hosting

---

## STEP 21 — Copy Website Endpoint

Go:

```text id="u1v5xp"
Properties
   ↓
Static Website Hosting
```

Copy endpoint URL.

Example:

```text id="m8n2wk"
http://skyl.online.s3-website-ap-south-1.amazonaws.com
```

Open in browser.

Your React app should work.

---

# PART 7 — Create SSL Certificate

IMPORTANT:

CloudFront ONLY uses ACM certificates from:

```text id="f2r7lv"
us-east-1
```

---

## STEP 22 — Switch Region

Top-right AWS region selector:

Choose:

```text id="c9m4pt"
N. Virginia (us-east-1)
```

---

## STEP 23 — Open ACM

[AWS Certificate Manager](https://console.aws.amazon.com/acm/?utm_source=chatgpt.com)

---

## STEP 24 — Request Certificate

Click:

```text id="t5k8qn"
Request
```

Choose:

```text id="v7p2mx"
Request Public Certificate
```

---

## STEP 25 — Add Domains

Add:

```text id="r4m9zc"
skyl.online
```

and:

```text id="j1x6vh"
*.skyl.online
```

---

## STEP 26 — Validation Method

Choose:

```text id="n8q3ys"
DNS Validation
```

Continue.

---

## STEP 27 — Create Certificate

Click:

```text id="p2v5rk"
Request
```

---

# PART 8 — Verify Domain

---

## STEP 28 — Copy CNAME Records

AWS provides DNS records.

Example:

```text id="d6m1tw"
Name
Value
```

---

## STEP 29 — Add DNS Records

Go to your DNS provider:

* Cloudflare
* Namecheap
* GoDaddy
* Route53

Add provided CNAME records.

---

## STEP 30 — Wait

Wait 5–30 minutes.

Status becomes:

```text id="k7v2nf"
Issued
```

---

# PART 9 — Create CloudFront Distribution

---

## STEP 31 — Open CloudFront

[AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/?utm_source=chatgpt.com)

---

## STEP 32 — Create Distribution

Click:

```text id="x3m7jp"
Create Distribution
```

---

## STEP 33 — Origin Domain

Select S3 bucket.

IMPORTANT:

Select bucket itself.

NOT website endpoint.

---

## STEP 34 — Origin Access

Choose:

```text id="v9q1td"
Origin Access Control Settings
```

Create new OAC.

Click:

```text id="b4n8wk"
Create Control Setting
```

Then:

```text id="m6r2yv"
Create
```

---

## STEP 35 — Viewer Protocol Policy

Choose:

```text id="c5x9pf"
Redirect HTTP to HTTPS
```

---

## STEP 36 — Allowed Methods

Choose:

```text id="r8n4zk"
GET, HEAD
```

---

## STEP 37 — Alternate Domain Name

Add:

```text id="p1v7mq"
skyl.online
```

Optional:

```text id="j6w2ty"
www.skyl.online
```

---

## STEP 38 — SSL Certificate

Choose:

```text id="n3x5kc"
Custom SSL Certificate
```

Select ACM certificate.

---

## STEP 39 — Default Root Object

Set:

```text id="y7q1mh"
index.html
```

---

## STEP 40 — Create Distribution

Click:

```text id="t2m8rv"
Create Distribution
```

---

# PART 10 — Create CloudFront Function

---

## STEP 41 — Open Functions

Inside CloudFront:

```text id="w5n9kp"
Functions
```

---

## STEP 42 — Create Function

Click:

```text id="m1v4zt"
Create Function
```

Name:

```text id="q8r2yx"
react-router-function
```

---

## STEP 43 — Create

Click:

```text id="d4m7jc"
Create Function
```

---

## STEP 44 — Add Function Code

Delete existing code.

Paste:

```js id="c7n3vk"
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // If no file extension exists
    if (!uri.includes('.')) {
        request.uri = '/index.html';
    }

    return request;
}
```

---

## STEP 45 — Save Function

Click:

```text id="z1v5qt"
Save Changes
```

---

## STEP 46 — Publish Function

Click:

```text id="r6m9xn"
Publish
```

Confirm publish.

---

# PART 11 — Attach Function to Distribution

---

## STEP 47 — Open Distribution

Go to your distribution.

---

## STEP 48 — Behaviors

Open:

```text id="x4k8pm"
Behaviors
```

---

## STEP 49 — Edit Behavior

Select default behavior.

Click:

```text id="b9v2tr"
Edit
```

---

## STEP 50 — Function Associations

Find:

```text id="m7q4yc"
Function Associations
```

---

## STEP 51 — Viewer Request

Choose:

```text id="j3n8pw"
Viewer Request
```

Select:

```text id="q6r1tm"
react-router-function
```

---

## STEP 52 — Save

Click:

```text id="v5m9xz"
Save Changes
```

---

# PART 12 — Add DNS Domain

---

## STEP 53 — Copy CloudFront URL

Example:

```text id="n2x7rv"
d123abcxyz.cloudfront.net
```

---

## STEP 54 — Add DNS Record

Go to DNS provider.

---

## STEP 55 — Root Domain

Create:

```text id="c4m8pk"
CNAME or ALIAS
```

Point to:

```text id="x7q2wn"
d123abcxyz.cloudfront.net
```

---

## STEP 56 — WWW Domain

Optional:

```text id="r1v6tz"
www → d123abcxyz.cloudfront.net
```

---

# PART 13 — Wait for Deployment

---

## STEP 57 — Wait

CloudFront deployment takes:

```text id="m5x9jc"
10–30 minutes
```

Status becomes:

```text id="p8q4vn"
Deployed
```

---

# FINAL RESULT

Your site now works with:

```text id="s3m7rx"
https://skyl.online
```

and React routes work:

```text id="d6v1kp"
/about
/dashboard
/settings
```

without using CloudFront error pages.

---

# Final Production Architecture

```text id="h2m8qw"
Users
   ↓
CloudFront CDN
   ↓
CloudFront Function
   ↓
S3 Bucket
```

