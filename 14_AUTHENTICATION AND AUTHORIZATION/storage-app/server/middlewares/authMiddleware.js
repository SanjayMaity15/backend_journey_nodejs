
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import crypto from "crypto";``

export default async function checkAuth(req, res, next) {
	const { sid } = req.signedCookies;
	
	
	if (!sid) {
		return res.status(401).json({ error: "Not logged!" });
	}

	const session = await Session.findOne({_id: sid})
	
	if (!session) {
		return res.status(401).json({ error: "Not logged!" });
	}

	const user = await User.findOne({ _id: session.userId }).lean();
	if (!user) {
		return res.status(401).json({ error: "Not logged!" });
	}
	req.user = user;
	next();
}
