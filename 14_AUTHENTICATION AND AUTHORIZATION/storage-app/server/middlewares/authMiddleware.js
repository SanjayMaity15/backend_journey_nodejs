
import User from "../models/userModel.js";
import crypto from "crypto";``

export default async function checkAuth(req, res, next) {
	const { token } = req.signedCookies;
	
	
	if (!token) {
		return res.status(401).json({ error: "Not logged!" });
	}

	// const id = token.slice(0, 24)
	// const expiretime = parseInt(token.slice(24), 16)
	// console.log({ id, expiretime })

	// const [payload, oldSignature] = token.split(".");

	// const jsonPayload = Buffer.from(payload, "base64url").toString();

	// const newSignature = crypto
	// 	.createHmac("sha256", my_secret)
	// 	.update(jsonPayload)
	// 	.digest("base64url");
	
	
	// console.log({ newSignature, oldSignature });

	// if (oldSignature !== newSignature) {
	// 	res.clearCookie("token");
	// 	return res.status(401).json({ error: "Not logged!" });
	// }

	const { id, expiryTime } = JSON.parse(Buffer.from(token, "base64url").toString());

	if (Date.now() > expiryTime) {
		res.clearCookie("token");
		return res.status(401).json({ error: "Not logged!" });
	}
	// console.log(new Date(expiryTime).toString())

	const user = await User.findOne({ _id: id }).lean();
	if (!user) {
		return res.status(401).json({ error: "Not logged!" });
	}
	req.user = user;
	next();
}
