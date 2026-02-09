import express from "express";
import { connectDB } from "./db/db.js";
import blogRouter from "./routes/blogRoutes.js"

const app = express();

app.use(express.json());
app.use("/api", blogRouter)

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(8000, () => {
    connectDB()
	console.log("Server is running at 8000 port");
});
