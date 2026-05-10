import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "node:crypto";

import { redisClient } from "./redis.js";

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	}),
);

app.use("/login/:sid", async (req, res) => {
	const { sid } = req.params;
	const existUser = await redisClient.json.get(`session:${sid}`);

	if (existUser) {
		return res.status(200).json({
			data: existUser,
		});
	}

	const randomUUid = crypto.randomUUID();
	const sessionId = `session:${randomUUid}`;
	const userData = {
		userId: new mongoose.Types.ObjectId(),
	};
    const result = await redisClient.json.set(sessionId, "$", userData);
    
    res.status(200).json({
        data: "Logged in successfully"
    })
});

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(8000, () => {
	console.log("Server is running at 8000");
});
