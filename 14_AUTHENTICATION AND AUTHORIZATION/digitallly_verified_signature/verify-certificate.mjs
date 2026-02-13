import crypto from "crypto"
import { open, readFile } from "fs/promises"

const my_signature_key = "my-name-is-sanjay-maity"
const fileContent = await readFile("./certificate-sign.txt", "utf-8")

const [file, oldsignature] = fileContent.split("Certificate ID: ");

const newFileContent = file + "Certificate ID: ";

const signature = crypto.createHash("sha256").update(newFileContent).update(my_signature_key).digest("hex")


if (signature === oldsignature) {
    console.log("Certificate is valid")
} else {
    console.log("Certificate is invalid")
}


