import User from "../models/userModel.js";

export default async function checkAuth(req, res, next) {
	const { uid } = req.cookies;
	if (!uid) {
		return res.status(401).json({ error: "Not logged!" });
	}

	// const id = uid.slice(0, 24)
	// const expiretime = parseInt(uid.slice(24), 16)
	// console.log({ id, expiretime })

	const { id, expiryTime } = JSON.parse(Buffer.from(uid, "base64url").toString());

	if (Date.now() > expiryTime) {
		res.clearCookie("uid");
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
