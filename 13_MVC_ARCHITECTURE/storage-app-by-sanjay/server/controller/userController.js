import express from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import { ObjectId } from "mongodb";
import User from "../model/userModel.js";
import Directory from "../model/directoryModel.js";

export const signup = async (req, res, next) => {
	const { name, email, password } = req.body;
	console.log(req.body);
	const foundUser = await User.findOne({ email });
	if (foundUser) {
		return res.status(409).json({
			error: "User already exists",
			message:
				"A user with this email address already exists. Please try logging in or use a different email.",
		});
	}
	try {
		const rootDirId = new ObjectId();
		const userId = new ObjectId();

		const createdUser = await User.create({
			_id: userId,
			username: name,
			email,
			password,
			rootDirId,
		});

		const userRootDir = await Directory.create({
			_id: rootDirId,
			directoryName: `root-${email}`,
			parentDirId: null,
			author: userId,
		});

		res.status(201).json({
			message: "User signup successfully",
			createdUser,
			userRootDir,
		});
	} catch (err) {
		if (err.code === 121) {
			console.log(err.errorResponse.errmsg);
			res.status(400).json({ error: err.errorResponse.errmsg });
		} else {
			next(err);
		}
	}
};

export const login = async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		return res.status(404).json({ error: "User not exist" });
	}
	if (user.password !== password) {
		return res.status(404).json({ error: "password not match" });
	}

	res.cookie("uid", user._id.toString(), {
		httpOnly: true,
		maxAge: 60 * 1000 * 60 * 24 * 7,
	});
	res.json({ message: "logged in" });
};

export const getCurrentUser = async (req, res) => {
	try {
		res.status(200).json({
			name: req.user.name,
			email: req.user.email,
		});
	} catch (error) {
		console.log(error);
	}
};


export const handleLogout = async (req, res) => {
	try {
		res.clearCookie("uid");
		res.status(204).end();
	} catch (error) {
		console.log(error);
	}
};
