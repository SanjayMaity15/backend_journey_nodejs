# 📦 Direct Client-to-S3 CRUD Operations using AWS SDK (Node.js + React)

This project demonstrates how to perform **Create, Read, Update, Delete, and Download** operations directly between the client and Amazon Web Services S3 using **pre-signed URLs**.

✅ File does NOT upload to backend
✅ Real upload progress possible
✅ Better scalability
✅ Production-ready architecture

---

# 🚀 Architecture

```text
Frontend ↔ Backend ↔ S3
```

Backend only:

* generates signed URLs
* handles auth/permissions

Frontend directly:

* uploads to S3
* downloads from S3
* updates files
* deletes files

---

# 🚀 Tech Stack

* Node.js
* Express.js
* React.js
* AWS S3
* AWS SDK v3
* Axios

---

# 📁 Install Dependencies

## Backend

```bash
npm install express dotenv @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

---

## Frontend

```bash
npm install axios
```

---

# ⚙️ Environment Variables

## `.env`

```env
AWS_REGION=ap-south-1
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
AWS_BUCKET_NAME=your_bucket_name
PORT=5000
```

---

# ⚙️ S3 Client Setup

## `s3.js`

```js
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export const s3 = new S3Client({
  region: process.env.AWS_REGION,

  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
```

---

# 🟢 1️⃣ CREATE (Direct Upload to S3)

---

# Backend → Generate Upload URL

## `routes/upload.js`

```js
import express from "express";

import crypto from "crypto";

import {
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { s3 } from "../s3.js";

const router = express.Router();

router.post("/generate-upload-url", async (req, res) => {

  try {

    const { fileName, fileType } = req.body;

    const key = `${crypto.randomUUID()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(
      s3,
      command,
      { expiresIn: 60 }
    );

    res.json({
      uploadUrl,
      key,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
});

export default router;
```

---

# Frontend → Upload Directly to S3

```js
import axios from "axios";

const uploadFile = async (file) => {

  // get signed URL
  const res = await axios.post(
    "http://localhost:5000/generate-upload-url",
    {
      fileName: file.name,
      fileType: file.type,
    }
  );

  const { uploadUrl, key } = res.data;

  // upload directly to S3
  await axios.put(uploadUrl, file, {

    headers: {
      "Content-Type": file.type,
    },

    onUploadProgress: (e) => {

      const percent = Math.round(
        (e.loaded * 100) / e.total
      );

      console.log(percent + "%");
    },
  });

  console.log("Uploaded");
  console.log(key);
};
```

---

# 📖 2️⃣ READ (Get File)

---

# Backend → Generate Read URL

```js
import {
  GetObjectCommand,
} from "@aws-sdk/client-s3";

router.get("/file/:key", async (req, res) => {

  try {

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
    });

    const url = await getSignedUrl(
      s3,
      command,
      { expiresIn: 3600 }
    );

    res.json({ url });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
});
```

---

# Frontend

```js
const res = await axios.get(
  `/file/${key}`
);

window.open(res.data.url);
```

---

# ✏️ 3️⃣ UPDATE (Replace File)

S3 update = overwrite same key.

---

# Backend → Generate Update URL

```js
router.put("/update-url/:key", async (req, res) => {

  try {

    const { fileType } = req.body;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(
      s3,
      command,
      { expiresIn: 60 }
    );

    res.json({ uploadUrl });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
});
```

---

# Frontend

```js
await axios.put(uploadUrl, updatedFile, {
  headers: {
    "Content-Type": updatedFile.type,
  },
});
```

---

# ❌ 4️⃣ DELETE (Delete File)

---

# Backend

```js
import {
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

router.delete("/file/:key", async (req, res) => {

  try {

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
    });

    await s3.send(command);

    res.json({
      message: "File deleted successfully",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
});
```

---

# 📥 5️⃣ DOWNLOAD (Direct Download)

---

# Backend → Generate Download URL

```js
router.get("/download/:key", async (req, res) => {

  try {

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
    });

    const downloadUrl = await getSignedUrl(
      s3,
      command,
      { expiresIn: 60 }
    );

    res.json({ downloadUrl });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });
  }
});
```

---

# Frontend

```js
const res = await axios.get(
  `/download/${key}`
);

window.open(res.data.downloadUrl);
```

---

# 🔥 Advantages of Direct S3 Upload

| Feature              | Benefit |
| -------------------- | ------- |
| Real upload progress | ✅       |
| Faster uploads       | ✅       |
| Less backend load    | ✅       |
| Better scalability   | ✅       |
| Large file support   | ✅       |

---

# 🔐 Best Practices

* Keep bucket private
* Use signed URLs
* Never expose AWS secret keys
* Store only S3 key in DB
* Add auth before generating signed URLs
* Use CloudFront for production CDN

---

# 🧠 Key Concepts

| Concept       | Meaning                 |
| ------------- | ----------------------- |
| S3 Key        | Unique file path        |
| Signed URL    | Temporary secure access |
| Update        | Overwrite same key      |
| Direct Upload | Frontend uploads to S3  |

---

# ✅ Final Architecture

```text
Frontend
   ↓
Backend generates signed URL
   ↓
Frontend uploads directly to S3
```

No Multer required.
