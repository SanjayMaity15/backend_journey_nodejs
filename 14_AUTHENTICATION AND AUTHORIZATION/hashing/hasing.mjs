import crypto from "crypto"
import { readFile } from "fs/promises";

const fileContent = await readFile("file.txt")
const newFileContent = `blob ${fileContent.length}\0${fileContent}`

const hashValue = crypto
	.createHash("sha1")
	.update(
        newFileContent
	)
	.digest("hex");
console.log(hashValue)

