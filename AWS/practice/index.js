import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
	region: "ap-south-1",
	credentials: {
		accessKeyId: "",
		secretAccessKey: "",
	},
});

const command = new ListBucketsCommand({})
const res = await s3Client.send(command)

console.log(res.Buckets)

export default s3Client;
