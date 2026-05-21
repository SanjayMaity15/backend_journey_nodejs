import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
	region: "ap-south-1",
});

// ! for get

const command = new GetObjectCommand({
	Bucket: "nodejs-1-abcdef",
	Key: "profile.jpeg",
	ContentType: "image/jpeg",
});

// ! for put
// const command = new PutObjectCommand({
// 	Bucket: "nodejs-1-abcdef",
//     Key: "profile.jpeg",
//     ContentType: "image/jpeg",

// });

const res = await getSignedUrl(s3, command);

console.log(res);
