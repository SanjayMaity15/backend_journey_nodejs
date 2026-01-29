import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();
// app.use(cors());

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./store");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.post("/send", upload.single("profile"), (req, res) => {
    console.log(req.file);
    console.log(req.body)
	res.send("File uploaded successfully");
});

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.listen(8000, () => console.log("Server is running"));
