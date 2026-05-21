  # 📦 S3 Bucket CRUD Operations using AWS SDK (Node.js)

  This project demonstrates how to perform **Create, Read, Update, and Delete (CRUD)** operations on an S3 bucket using the AWS SDK v3 in a Node.js backend.

  ---

  ## 🚀 Tech Stack

  * Node.js
  * Express.js
  * Amazon Web Services (S3 - Simple Storage Service)
  * AWS SDK v3 (`@aws-sdk/client-s3`)
  * Multer (for file uploads)
  * dotenv (for environment variables)

  ---

  ## 📁 Project Setup

  ### 1. Install dependencies

  ```bash
  npm install express @aws-sdk/client-s3 multer dotenv crypto
  ```

  ---

  ### 2. Create `.env` file

  ```env
  AWS_REGION=ap-south-1
  AWS_ACCESS_KEY=your_access_key
  AWS_SECRET_KEY=your_secret_key
  AWS_BUCKET_NAME=your_bucket_name
  PORT=5000
  ```

  ---

  ## ⚙️ S3 Client Setup

  ### `s3.js`

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

  # 🟢 CRUD OPERATIONS

  ---

  ## 1️⃣ CREATE (Upload file to S3)

  ### `upload.js`

  ```js
  import express from "express";
  import multer from "multer";
  import crypto from "crypto";
  import { PutObjectCommand } from "@aws-sdk/client-s3";
  import { s3 } from "./s3.js";

  const router = express.Router();
  const upload = multer({ storage: multer.memoryStorage() });

  router.post("/upload", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;

      const fileKey = `${crypto.randomUUID()}-${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await s3.send(command);

      res.json({
        message: "File uploaded successfully",
        key: fileKey,
        url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  export default router;
  ```

  ---

  ## 📖 2️⃣ READ (Get file + List files)

  ---

  ### 🔹 Get a file (Generate signed URL)

  ```js
  import { GetObjectCommand } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

  router.get("/file/:key", async (req, res) => {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key,
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

      res.json({ url });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  ```

  ---

  ### 🔹 List all files in bucket

  ```js
  import { ListObjectsV2Command } from "@aws-sdk/client-s3";

  router.get("/files", async (req, res) => {
    try {
      const command = new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME,
      });

      const data = await s3.send(command);

      res.json(data.Contents);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  ```

  ---

  ## ✏️ 3️⃣ UPDATE (Replace file in S3)

  ⚠️ S3 does not support direct update. You overwrite the file using the same key.

  ```js
  router.put("/file/:key", upload.single("file"), async (req, res) => {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key, // overwrite same file
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      });

      await s3.send(command);

      res.json({ message: "File updated successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  ```

  ---

  ## ❌ 4️⃣ DELETE (Remove file from S3)

  ```js
  import { DeleteObjectCommand } from "@aws-sdk/client-s3";

  router.delete("/file/:key", async (req, res) => {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key,
      });

      await s3.send(command);

      res.json({ message: "File deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  ```

  ---


  # 📥 5️⃣ DOWNLOAD (S3 File Download)

  ### 🔹 Download file using Signed URL (Recommended)

  ```js
  import { GetObjectCommand } from "@aws-sdk/client-s3";
  import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

  router.get("/download/:key", async (req, res) => {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key,
      });

      // generate temporary download link
      const url = await getSignedUrl(s3, command, {
        expiresIn: 60, // 1 minute (you can increase)
      });

      res.json({
        message: "Download link generated successfully",
        downloadUrl: url,
      });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  ```

  ---

  ### 🔹 Frontend usage

  ```javascript
  const res = await axios.get("/api/download/file-key");

  window.open(res.data.downloadUrl, "_blank");
  ```

  ---

  # ⚡ Alternative: Direct File Download (Backend Stream)

  ```js
  router.get("/download-file/:key", async (req, res) => {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.params.key,
      });

      const data = await s3.send(command);

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${req.params.key}"`
      );

      data.Body.pipe(res);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  ```

  ---

  # ✅ Summary

  | Method     | Use Case                          | Recommended |
  | ---------- | --------------------------------- | ----------- |
  | Signed URL | Frontend download (React, mobile) | ⭐ YES       |
  | Streaming  | Force backend-controlled download | Optional    |


  # 🧠 Key Concepts

  ### 📌 S3 is object storage

  * No folders (only “keys”)
  * Example key:
    `uploads/user1/image.png`

  ### 📌 Update = overwrite

  * Same key → new file replaces old file

  ### 📌 No database inside S3

  * Store metadata in MongoDB:

    * file name
    * S3 key
    * URL
    * user ID

  ---

  # 🔐 Best Practices

  * Use **IAM roles** instead of root keys
  * Prefer **pre-signed URLs** for uploads in production
  * Keep bucket private and serve via:

    * Signed URLs OR
    * CloudFront CDN
  * Enable versioning if needed
