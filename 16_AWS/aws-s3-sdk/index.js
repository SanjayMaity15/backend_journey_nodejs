// s3Client.js
import {  PutBucketPolicyCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client();

const policy = {
	Version: "2012-10-17",
	Statement: [
		{
			Sid: "PublicReadGetObject",
			Effect: "Allow",
			Principal: "*",
			Action: "s3:GetObject",
			Resource: "arn:aws:s3:::nodejs-1-abcdef/*",
		},
	],
};

const command = new PutBucketPolicyCommand({
    Bucket: "nodejs-1-abcdef",
    Policy: JSON.stringify(policy)
});
const response = await s3Client.send(command)

console.log(response)

export default s3Client;
