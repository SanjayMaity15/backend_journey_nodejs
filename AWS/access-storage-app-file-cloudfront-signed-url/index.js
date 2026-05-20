import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import fs, { readFile } from "node:fs/promises"



const url = "https://d1zlmvd4z0a8wc.cloudfront.net/rocket-removebg-preview.png"
const privateKey = await readFile("./private_key.pem", "utf-8")
const keyPairId = "";
const dateLessThan = new Date(Date.now() + 1000 * 60 * 60).toISOString(); // any Date constructor compatible

const signedUrl = getSignedUrl({
	url,
	keyPairId,
	dateLessThan,
	privateKey,
});

console.log(signedUrl)
