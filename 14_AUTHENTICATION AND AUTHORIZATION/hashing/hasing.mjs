import crypto from "crypto"

const hashValue = crypto
	.createHash("sha256")
	.update(
		"E:\\BACKEND-PROCODRR-SERIES-26\\14_AUTHENTICATION AND AUTHORIZATION\\hashing\\file.txt",
	)
	.digest("hex");
console.log(hashValue)

