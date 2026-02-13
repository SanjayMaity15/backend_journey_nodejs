import crypto from "crypto"
import { open, readFile } from "fs/promises"

const my_signature_key = "my-name-is-sanjay-maity"
const fileContent = await readFile("./certificate.txt", "utf-8")

const signature = crypto.createHash("sha256").update(fileContent).update(my_signature_key).digest("hex")

const writeStreamHandle = await open("certificate-sign.txt", "w+")
const writeStream = writeStreamHandle.createWriteStream({ highWaterMark: 1 * 1024 * 1024 })

writeStream.write(fileContent)
writeStream.end(signature)

