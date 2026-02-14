import express from "express";
import Course from "../models/Course.js";
import Session from "../models/Session.js";

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
	const { sid } = req.signedCookies;

	try {
		const courses = await Course.find();

		if (!sid) {
			const createGuestSesssion = await Session.create({});
			res.cookie("sid", createGuestSesssion.id, {
				httpOnly: true,
				maxAge: 30* 24* 60 * 60 * 1000,
				signed: true,
			});
		}

		res.json(courses);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
