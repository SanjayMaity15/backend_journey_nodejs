import express from "express";
import Course from "../models/Course.js";
import Session from "../models/Session.js";

const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
	try {
		const { sid } = req.signedCookies;

		let session = null;

		if (sid) {
			session = await Session.findById(sid);
		}

		// যদি session না থাকে → guest session বানাও
		if (!session) {
			session = await Session.create({});

			res.cookie("sid", session._id.toString(), {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000,
				signed: true,
			});
		}

		const courses = await Course.find();

		res.json(courses);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

export default router;
