import express from "express";

import cors from "cors"
import { upload } from "./multer.js";

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())





app.use("/download" ,(req, res) => {
    
    res.redirect(301, "/");

})

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(8000, () => {
	console.log("Server is running at port 8000");
});
