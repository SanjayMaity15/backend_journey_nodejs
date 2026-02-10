import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import directoryRoutes from "./routes/directoryRoutes.js";
// import fileRoutes from "./routes/fileRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { connectDB } from "./config/dbConnedtion.js";

try {
	

	const app = express();

	app.use(cookieParser());
	app.use(express.json());
	app.use(
		cors({
			origin: "http://localhost:5173",
			credentials: true,
		}),
	);


	app.use("/directory", directoryRoutes);
	// app.use("/file", checkAuth, fileRoutes);
	app.use("/user", userRoutes);

	app.use((err, req, res, next) => {
		console.log(err);
		res.status(err.status || 500).json({
			error: "Something went wrong!!",
		});
	});

	app.get("/", (req, res) => {
		res.send("Server is running")
	})

	app.listen(4000, () => {
		connectDB()
		console.log(`Server Started`);
	});
} catch (error) {
	console.log(error);
}
