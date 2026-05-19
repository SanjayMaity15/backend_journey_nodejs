// s3Client.js
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client();

const command = new ListBucketsCommand()
const response = await s3Client.send(command)

console.log(response.Buckets)

export default s3Client;
