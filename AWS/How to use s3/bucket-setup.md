# 🪣 BUCKET COMMANDS

---

## 1. ListBucketsCommand

```js
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client();

const command = new ListBucketsCommand({});
const response = await s3Client.send(command);
console.log(response.Buckets);
```

---

## 2. CreateBucketCommand

```js
import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client();

const command = new CreateBucketCommand({
  Bucket: "procodrr-nodejs-bucket",
});
await s3Client.send(command);
console.log("Bucket created");
```

---

## 3. Unblock Public Access (BlockPublicAccess = false)

```js
import { S3Client, DeletePublicAccessBlockCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client();

const command = new DeletePublicAccessBlockCommand({
  Bucket: "procodrr-nodejs-bucket",
});

await s3Client.send(command);
console.log("✅ Public access block configuration deleted.");
```

or

```js
import { S3Client, PutPublicAccessBlockCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client();

const command = new PutPublicAccessBlockCommand({
  Bucket: "procodrr-nodejs-bucket",
  PublicAccessBlockConfiguration: {
    BlockPublicAcls: false,
    IgnorePublicAcls: false,
    BlockPublicPolicy: false,
    RestrictPublicBuckets: false,
  },
});
await s3Client.send(command);
console.log("Unblocked public access");
```

---

## 4. Update Bucket Policy (Make Bucket Public)

```js
import { S3Client, PutBucketPolicyCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client();

const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: "arn:aws:s3:::procodrr-nodejs-bucket/*",
    },
  ],
};

const command = new PutBucketPolicyCommand({
  Bucket: "procodrr-nodejs-bucket",
  Policy: JSON.stringify(policy),
});

await s3Client.send(command);
console.log("Bucket policy updated to public");
```

---

## 5. DeleteBucketCommand

```js
import { S3Client, DeleteBucketCommand } from "@aws-sdk/client-s3";
const s3Client = new S3Client();

const command = new DeleteBucketCommand({
  Bucket: "procodrr-nodejs-bucket",
});
await s3Client.send(command);
console.log("Bucket deleted");
```

---