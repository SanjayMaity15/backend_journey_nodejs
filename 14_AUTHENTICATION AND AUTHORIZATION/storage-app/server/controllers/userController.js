import Directory from "../models/directoryModel.js";
import User from "../models/userModel.js";
import { Types } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import Session from "../models/sessionModel.js";

export const register = async (req, res, next) => {
	const { name, email, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const rootDirId = new Types.ObjectId();
		const userId = new Types.ObjectId();

		// session.startTransaction();

		await Directory.insertOne(
			{
				_id: rootDirId,
				name: `root-${email}`,
				parentDirId: null,
				userId,
			},
			// { session }
		);

		await User.insertOne(
			{
				_id: userId,
				name,
				email,
				password: hashedPassword,
				rootDirId,
			},
			// { session }
		);

		// session.commitTransaction();

		res.status(201).json({ message: "User Registered" });
	} catch (err) {
		// session.abortTransaction();
		if (err.code === 121) {
			res.status(400).json({
				error: "Invalid input, please enter valid details",
			});
		} else if (err.code === 11000) {
			if (err.keyValue.email) {
				return res.status(409).json({
					error: "This email already exists",
					message:
						"A user with this email address already exists. Please try logging in or use a different email.",
				});
			}
		} else {
			next(err);
		}
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({ error: "Invalid Credentials" });
	}

	const isCorrewctPassword = await bcrypt.compare(password, user.password);

	if (!isCorrewctPassword) {
		return res.status(404).json({ error: "Invalid credential" });
	}

	const allLoggedInSessionDevices = await Session.find({ userId: user._id });

	if (allLoggedInSessionDevices.length >= 2) {
		await allLoggedInSessionDevices[0].deleteOne();
	}

	const session = await Session.create({ userId: user._id });

	res.cookie(
		"sid",

		session._id,
		{
			httpOnly: true,
			signed: true,
			maxAge: 2 * 60 * 1000,
		},
	);

	res.json({ message: "logged in" });
};

export const getCurrentUser = (req, res) => {
	res.status(200).json({
		name: req.user.name,
		email: req.user.email,
	});
};

export const logout = async (req, res) => {
	const { sid } = req.signedCookies;

	await Session.findByIdAndDelete(sid);
	res.clearCookie("sid");
	res.status(204).end();
};

export const logoutAllDevices = async (req, res) => {
	const { sid } = req.signedCookies;

	const allDevicesSession = await Session.find({ userId: req.user._id });

	const sessionIds = allDevicesSession.map((session) => session._id);

	const result = await Session.deleteMany({_id : {$in: sessionIds}})
	console.log(result)
	res.status(204).end();
};
